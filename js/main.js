class Card extends Comp {
    constructor(query, data) {
        super(query, data);
        this.i = 0;
        add(this.e, {onclick:()=>this.reFrag()});
        this.onFrag = _ => {
            this.i++;
            this.e.innerHTML = "Nebula Lib " + this.i;
        };
    }
}

on(d, "DOMContentLoaded", _ => {
    on(w, "load", _ => console.log("load"));

    frag($("#d"),
        elm('test#testid.testclass', 'x', {css:{color:"red"}}, 
            elm('y', 'y', {css:{color:"green"}, onclick:_=>alert("y")}, 
                elm('z', 'z', {css:{color:"blue"}})))
    );

    frag($("#d"), elm('div#brandon.duck', 'lmao', {css:{color:"red"}, onclick:_=>alert("test")}));

    frag($('#d'), new Card("nebula", {css:{color:"red"}}));
});