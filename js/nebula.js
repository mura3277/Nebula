//761 bytes
d = document; w = window; o = Object; //Assign shortcuts to common global objects
cache = {}, df = d.createDocumentFragment(); //The node creation cache and document frag

/**# Components #**/
function Comp(query, data) {
    this.e = e(query, data);
    this.pop = p => {if(p && this.onPop)this.onPop(this.p = p); if (!p)pop(this.p, this); return this.e};
}

/**# Element Creation Query #**/
e = (query, ...data) => {
    let node, q = query; //Define node (our element to build) and a copy of query as q (to preserve the original query before the split)
    if ((node = cache[query])) return node.cloneNode(false); //If The node we're trying to build exists in the cache, return a copy
    query = [(query = query.split('.'))[0].split('#'), query[1]]; //Split query to get tag, id and class ids from queries (tag#testId.testClass)
    node = d.createElement(query[0][0] || 'div'); //Create the node from the query data, use tag name if it exists, and default to div if not
    if (query[0][1]) node.id = query[0][1]; //If the query[0][1] has an entry for id, assign it
    if (query[1]) node.className = query[1]; //If the query[1] has an entry for className, assign it
    if (data) {
        let obj, type; //Save a copy of the i'th element as obj, and the type of obj for efficency
        for (let i = 0; i < data.length; i++) { //Loop over arguments starting at 1 to skip node
            obj = data[i]; type = typeof obj; //Assign efficnecy variables
            if (obj && obj.nodeType) node.appendChild(obj); //If obj is a node, append it to our newly constructed node to nest it
            else if (type === 'object') { //If we were passed an object, assign properties to our new node
                if (obj.css) css(node, obj.css); //If the object has the css property, merge it with the nodes style obj
                add(node, obj); //Merge any other objects with node like '{onclick:()=>alert(text)}'
            }
            else if (type === 'string' || type === 'number') node.textContent = obj; //If data is alphanumeric, assign it to text content
            else if (type === 'function') obj(node); //If data is a function, treat it as a callback and pass our new node
        }
    }
    return (cache[q] = node); //Finally put our new node in the cache and return it
}

/**# Common Method Shortcuts/Helpers #**/
v = {h:n => n ? n.offsetHeight : innerHeight, t:n => n ? n.offsetTop : scrollY, b:n => n ? v.t(n) + v.h(n) : scrollY + innerHeight, m:n => v.b(n) / 2};
$ = (str, ctx = d) => (x = ctx.querySelectorAll(str))[1] ? x : x[0];
on = (node, event, func) => node.addEventListener(event, func);
css = (node, obj) => o.assign(node.style, obj); //Merge the style object with the overrides from the passed object
add = (node, obj) => o.assign(node, obj); //Node Object Assigning
pop = (parent, node) => parent.appendChild(node.e ? node.pop(parent) : node);
attr = (node, key, value) => value ? node.setAttribute(key, value) : node.getAttribute(key);
data = (node, key, value) => attr(node, 'data-' + key, value);
goto = (node, settings) => node.scrollIntoView(settings || {behavior:'smooth'});
hov = (node, func) => {on(node, 'mouseenter', _ => func(!1)); on(node, 'mouseleave', _ => func(!0))};
local = (key, val) => val ? localStorage.setItem(key, val[1] ? JSON.stringify(val) : val) : localStorage.getItem(key);
load = (url, func) => fetch(url).then(response => func(response.text()));
obv = (node, func, settings) => new IntersectionObserver(callback => func(callback[0].isIntersecting, callback[0]), {threshold:settings || .5}).observe(node);