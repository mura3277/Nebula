card = (q, d) => {
    c = new Comp(q, d);
    c.i = 0;
    add(c.e, {onclick:_=>c.pop()});
    c.onPop = p => c.e.innerHTML = "Nebula Lib " + (c.i++);
    return c;
}

on(d, "DOMContentLoaded", _ => {
    pop($("#d"),
        e('test#testid.testclass', 'x', {css:{color:"red"}},
            e('y', 'y', {css:{color:"green"}, onclick:_=>alert("y")},
                e('z', 'z', {css:{color:"blue"}})))
    );
    pop($("#d"), e('div#brandon.duck', 'lmao', {css:{color:"red"}, onclick:_=>alert("test")}));
    pop($('#d'), card("nebula", {css:{color:"red"}}));
});