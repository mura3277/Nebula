d = document; w = window; o = Object;
v = {h:_ => innerHeight, t:_ => scrollY, b:_ => scrollY + innerHeight};
$ = (s, ...e) => {comb(s).some(i => {e = [...e, ...d.querySelectorAll(i)]}); return (e[1] ? e : e[0])};
h = e => e.offsetHeight; t = e => e.offsetTop; b = e => t(e) + h(e); m = e => t(e) + h(e) / 2;
ary = a => Array.isArray(a);
comb = e => [].concat(e).flat();
attr = (e, s, v) => v ? e.setAttribute(s, v) : e.getAttribute(s);
data = (e, s, v) => attr(e, 'data-' + s, v);
goto = (e, o) => e.scrollIntoView(o || {behavior:'smooth'});
css = (e, v) => {comb(e).some(i => {o.assign(i.style, v)}); return e};
on = (e, s, f) => {comb(e).some(i => {i.addEventListener(s, _ => f(i))}); return e};
hov = (e, f) => {on(e, 'mouseenter', _ => f(!1)); on(e, 'mouseleave', _ => f(!0))};
local = (s, v) => v ? localStorage.setItem(s, ary(v) ? JSON.stringify(v) : v) : localStorage.getItem(s);
load = (u, f) => fetch(u).then(r => f(r.text()));
obv = (e, f, o) => comb(e).some(i => new IntersectionObserver(j => f(j[0].isIntersecting, j[0]), {threshold:o || .5}).observe(i));
// el = (s, a) => {
//     s = [(s = s.split('.'))[0].split('#'), s[1]];
//     let e = d.createElement(s[0][0]);
//     e.id = s[0][1] || '';
//     e.className = s[1] || '';
//     return e;
// };
// frag = (p, e) => {
//     df.append(...comb(e)); if (p)comb(p).some(i => i.append(df))
// };

//mount = (p, e) => {df.append(...comb(e)); comb(p).some(i => i.append(df))};
//unmount = e => df.append(e);