class Card extends Comp {
    constructor(s, a) {
        super(s, a);
        this.i = 0;
        assign(this.e, {onclick:()=>this.reFrag()});
        //this.e["onclick"] = () => this.reFrag();
        this.onFrag = () => {
            this.i++;
            this.e.innerHTML = "Nebula Lib " + this.i;
        };
    }
}

on(d, "DOMContentLoaded", _ => {
    on(w, "load", _ => console.log("load"));

    //frag($("#d"),
        //e('test#testid.testclass', 'x', {style:{color:"red"}}, e('y', 'y', {style:{color:"green"}}, e('z', 'z', {style:{color:"blue"}})))
    //);

    frag($("#d"), elm('div#brandon.cuck', 'lmao', {style:{color:"red"}, onclick:function(){alert("test")}}));

    let card = new Card("nebula", {style:{color:"red"}});
    frag($('#d'), card);
});
