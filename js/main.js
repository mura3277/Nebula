class Card {
    constructor(d) {
        this.e = e(`#${d}`);
    }
    update(d) {
        this.e.innerHTML = d;
    }
    onFrag(p) {
        console.log("Fragged onto:", p);
    }
}

on(d, "DOMContentLoaded", _ => {
    on(w, "load", _ => console.log("load"));

    frag($("#d"),
        e('x', 'x', {style:{color:"red"}}, e('y', 'y', {style:{color:"green"}}, e('z', 'z', {style:{color:"blue"}})))
    );

    let card = new Card("nebula");
    card.update("Nebula Lib");
    frag($('#d'), card);
});
