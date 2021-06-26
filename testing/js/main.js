header = true;
rdy(d => {
    //Events
    on(w, "load", _ => css(d.body, {opacity:1}));
    on($("#logo1"), "click", e => goto($("header")));
    on($("#explore"), "click", e => goto($("#about")));
    on($(".navs"), "click", e => goto($(".loc")[attr(e, "t")]));
    on($(".slide"), "click", e => slide(e));
    //on($("#next"), "click", e => goto($(".loc")[loc >= ($(".loc").length) - 1 ? 0 : ++loc]));
    on(w, "scroll", _ => css($("header"), {backgroundPosition:"center " + (v.t() * 0.75) + "px"}));

    //Hover
    hov($("nav"), b => header ? null : navTog(b));
    hov($("#next"), b => header ? null : css([$("nav"), $("#next")], {opacity: b ? .85 : .65}));

    //Observables
    obv($("header"), b => {css($("#title"), {top:b ? "40vh" : "20vh", opacity:b ? 1 : 0}); navTog(header = b)});
    obv($("#about1"), b => css([css($("#about1"), {left:b ? 0 : "-4rem"}), $("#vl")], {opacity:b ? 1 : .1}));
    obv($("footer"), b => css($("footer"), {opacity:b ? 1 : 0}));
    obv($(".loc"), (b, t) => css($(".navs")[attr(t, "t")], {color: b ? "#EC058E" : "#1D252C"}), {threshold:.1});
});

navTog = b => {
    css($("nav"), {opacity: b ? .85 : .65, top: b ? 0 : "-2rem", lineHeight: b ? "4rem" : "6rem"});
    css($("#next"), {opacity: header ? 0 : b ? .85 : .65, top: b ? "4rem" : "2rem"});
    css($("#logo1"), {borderColor: b ? "#000" : "transparent"});
};

slide = (e, x, c) => {
    attr(e, "c", x = (c = +(attr(e, "c"))) >= +(attr(e, "m")) ? 0 : c + 1);
    css(e, {backgroundImage:`url(media/${attr(e, "id")}/${x}.jpg`});
};