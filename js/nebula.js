const cache = {}, df = document.createDocumentFragment(); //The node creation cache and document frag

class Comp {
    constructor(s, a) { //Copies the args for e(), to pass directly
        this.e = elm(s, a);
        this.frag = (p) => this.onFrag(this.p = p);
        this.reFrag = () => frag(this.p, this);
        this.onFrag = () => {};
    }
}

function elm(s, ...a) {
    let e, q = s; //Define e (our element to build) and a copy of s as q (to preserve the original query before the split)
    if ((e = cache[s])) return e.cloneNode(false); //If The node we're trying to build exists in the cache, return a copy
    s = [(s = s.split('.'))[0].split('#'), s[1]]; //Split s to get tag, id and class ids from queries (tag#testId.testClass)
    e = document.createElement(s[0][0] || 'div'); //Create the node from the query data, as a div tag?
    if (s[0][1]) e.id = s[0][1]; //If the query[0][1] has an entry for id, assign it
    if (s[1]) e.className = s[1]; //If the query[1] has an entry for className, assign it
    if (a) assign(e, ...a); //If extra data was passed into the function
    return (cache[q] = e); //Finally put our new node in the cache and return it
}


function assign(node) {
    let b, type; //Save a copy of the i'th element as b, and the type of b for efficency
    for (let i = 1; i < arguments.length; i++) { //Loop over arguments starting at 1 to skip node
        b = arguments[i]; type = typeof b; //Assign efficnecy variables
        if (b && b.nodeType) node.appendChild(b); //If b is a node, append b to our newly constructed node to nest it
        else if (type === 'object') { //If we were passed an object, assign properties to our new node
            for (let j in b) { //Loop over properties
                if (j === 'style') { //The root object for css data must begin with a style -> object mapping
                    for (let k in b.style) { //Loop over all the entries inside the style object
                        node.style[k] = b.style[k]; //For every entry in the style object, assign it to our new node
                    }
                } else {
                    node[j] = b[j]; //Otherwise, assign node properties to the data passed. This could be onclick: function(){alert(test)}
                }
            }
        }
        else if (type === 'string' || type === 'number') node.textContent = b; //If data is alphanumeric, assign it to text content
        else if (type === 'function') b(node); //If data is a function, treat it as a callback and pass our new node
    }
}



function frag(p, c) {
    if (c.e) { //If passed a object with a member of e assigned, assume to be a component and access the node
        df.appendChild(c.e); //Append to document frag
        if (c.frag) c.frag(p); //If the component has a onFrag method defined, call it
    } else {
        df.appendChild(c); //Otherwise, assume we got a normal node and append it to the document frag
    }
    if (p) p.appendChild(df); //Finally append the node(s) in the frag to the parent element if it is assigned
}