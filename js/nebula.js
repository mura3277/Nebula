const cache = {}, df = document.createDocumentFragment();

function e(s, ...a) {
    let e, q = s;
    if ((e = cache[s])) return e.cloneNode(false);
    s = [(s = s.split('.'))[0].split('#'), s[1]];
    e = document.createElement(s[0][0] || 'div');
    if (s[0][1]) e.id = s[0][1];
    if (s[1]) e.className = s[1];
    if (a) {
        let b, type;
        for (let i = 0; i < a.length; i++) {
            b = a[i]; type = typeof b;
            if (b&& b.nodeType) e.appendChild(b);
            else if (type === 'object') {
                for (let j in b) {
                    if (j === 'style') for (let k in b.style) e.style[k] = b.style[k];
                    else e[j] = b[j];
                }
            }
            else if (type === 'string' || type === 'number') e.textContent = b;
            else if (type === 'function') b(e);
        }
    }
    return (cache[q] = e);
}

function frag(p, c) {
    if (c.e) {
        df.appendChild(c.e);
        if (c.onFrag) c.onFrag(p);
    } else {
        df.appendChild(c);
    }
    p.appendChild(df);
}