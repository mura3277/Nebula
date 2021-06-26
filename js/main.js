card = (q, d, c = new Comp("card" + q, d)) => {
    c.i = 0;
    //add(c.e, {onclick:_=>c.onPop()});
    c.e.onclick = _ => c.onPop();
    c.onPop = p => c.e.innerHTML = "Nebula Lib " + (c.i++);
    return c;
}
stack = (q, c = new Comp(q, card("#nebula-a", "a"), card("#nebula-b", "b"), card("#nebula-c", "c"))) => {
    return c;
} 

on(d, "DOMContentLoaded", n => {
    //console.log(n);

    css($("#e"), {height:"5000px"});

    hov([$("#maya"), $("#luna")], (b, n) => console.log(b ? n.innerHTML + " in" : n.innerHTML + " out"));

    pop($("#c"),
        e('test#testid.testclass1 testclass2', 'x', {css:{color:"red"}},
            e('y', 'y', {css:{color:"green"}, onclick:_=>alert("y")},
                e('z', 'z', {css:{color:"blue"}})))
    );
    pop($("#c"), e('div#brandon.duck goose', '<h1>lmao</h1>', {css:{color:"red"}, onclick:_=>alert("test")}));
    pop($("#d"), stack("#stack"));
});