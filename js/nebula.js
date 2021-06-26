/**# Global Objects (882 bytes) #**/
d = document; w = window; o = Object; cache = {}, df = new DocumentFragment();

/**# Common Method Shortcuts/Helpers #**/
v = {h:n => n ? n.offsetHeight : innerHeight, t:n => n ? n.offsetTop : scrollY, b:n => n ? v.t(n) + v.h(n) : scrollY + innerHeight, m:n => v.b(n) / 2};
$ = (str, ctx = d) => (x = cache[str] || ctx.querySelectorAll(str))[1] ? [...x] : x[0]; //Either return from cache or new query, if array more than 1, convert from NodeList to normal array by using spread, otherwise, return first element
a = (nodes, func) => {x = nodes instanceof Array ? [].concat(...nodes) : [nodes]; x.forEach(n => func(n)); return x};
on = (node, event, func) => a(node, n => n.addEventListener(event, _ => func(n)));
rdy = (func) => on(d, 'DOMContentLoaded', func);
hov = (nodes, func) => a(nodes, n => {on(n, 'mouseenter', target => func(true, target));on(n, 'mouseleave', target => func(false, target))});
css = (nodes, obj) => a(nodes, n => add(n.style, obj));//Merge the style object with the overrides from the passed object
add = (parent, obj) => o.assign(parent, obj) //Node Object Assigning
pop = (parent, node) => {df.appendChild(node.e ? node.pop(parent) : node); parent.appendChild(df)};
attr = (node, key, value) => value ? node.setAttribute(key, value) : node.getAttribute(key);
data = (node, key, value) => attr(node, 'data-' + key, value);
goto = (node, settings = {behavior:'smooth'}) => node.scrollIntoView(settings);
local = (key, val) => val ? localStorage.setItem(key, val[1] ? JSON.stringify(val) : val) : localStorage.getItem(key);
load = (url, func) => fetch(url).then(response => func(response.text()));
obv = (node, func, settings = {threshold:.5}) => {inter = new IntersectionObserver(entries => func(entries[0].isIntersecting, entries[0].target), settings); a(node, n => inter.observe(n))};

/**# Components #**/
function Comp(query, ...data) {
    this.e = e(query, data); 
    this.pop = p => (p && this.onPop && this.onPop(this.p = p), p || pop(this.p, this), this.e);
}

/**# Element Creation Query #**/
e = (query, data) => {
    let node, q = query; //Define node (our element to build) and a copy of query as q (to preserve the original query before the split)
    if ((node = c[query])) return node.cloneNode(!1); //If The node we're trying to build exists in the cache, return a copy
    query = [(query = query.split('.'))[0].split('#'), query[1]]; //Split query to get tag, id and class ids from queries (tag#testId.testClass)
    node = d.createElement(query[0][0] || 'div'); //Create the node from the query data, use tag name if it exists, and default to div if not
    if(query[0][1])node.id=query[0][1]; //If the query[0][1] has an entry for id, assign it
    if(query[1])node.className=query[1]; //If the query[1] has an entry for className, assign it
    if (data) {
        let obj, type; //Save a copy of the i'th element as obj, and the type of obj for efficiency
        for (let i = 0; i < data.length; i++) { //Loop over arguments starting at 1 to skip node
            obj = data[i]; type = typeof obj; //Assign efficiency variables
            if (obj && obj.nodeType) node.appendChild(obj); //If obj is a node, append it to our newly constructed node to nest it
            else if (obj && obj.e) {
                node.appendChild(obj.e);
            } else if (type === 'object') { //If we were passed an object, assign properties to our new node
                if (obj.css) css(node, obj.css); //If the object has the css property, merge it with the nodes style obj
                add(node, obj); //Merge any other objects with node like '{onclick:()=>alert(text)}'
            }
            else if (type === 'string' || type === 'number') node.innerHTML = obj; //If data is alphanumeric, assign it to text content
            else if (type === 'function') obj(node); //If data is a function, treat it as a callback and pass our new node
        }
    }
    return (cache[q] = node); //Finally put our new node in the cache and return it
}
//TODO
//obserbable component? add component for detecting observable state