bind(document, "DOMContentLoaded", i => {
    locs = get("loc"); navs = get("navs"); slides = get("slide");
    title = get("title"); aboutLeft = get("about-left"); nav = get("nav"); logo1 = get("logo1"); next = get("next"); explore = get("explore"); divider = get("divider"); footer = get("footer");
    header = get("header"); about = get("about");
    loc = 0; isNav = 1; hTrig = m(header) - 200; aTrig = m(about); lct = 0;
    bind(window, "load", i => document.body.css("opacity", "1"));
    hover(nav, i => navTog(true), i => navTog(loc == 0));
    hover(next, i => loc == 0 ? null : [nav[0], next[0]].css("opacity", "0.85"), i => loc == 0 ? null : [nav[0], next[0]].css("opacity", "0.65"));
    bind(slides, "click", function() { slide(this); });
    bind(navs, "click", function() { scroll(locs[this.atr("t")]); });
    bind(logo1, "click", i => scroll(header[0]));
    bind(explore, "click", i => scroll(header[0]));
    bind(next, "click", i => scroll([locs[loc >= l(locs) - 1 ? 0 : loc + 1]]));
    bind(window, "scroll", i => {
        if (c.t() < h(header)) header.css("background-position", "center " + (c.t() * 0.75) + "px");
        if ((d = c.t() - lct) > 100 || d < -100) {
            lct = c.t();
            locs.forEach((e, i) => {
                loc = (v = c.t() > t(e) - 75) ? i : loc;
                if (v && e.atr("t") != null) { navs.css("color", "#1D252C"); navs[int(e.atr("t"))].css("color", "#EC058E"); }
            });
            navTog(loc == 0);
            if (loc >= 0 && loc <= 1) {
                b = c.t() > hTrig;
                title.css("top", b ? "20vh" : "40vh").css("opacity", b ? "0" : "1");
                b = c.b() > (aTrig - 10) && c.t() < aTrig;
                [aboutLeft.css("left", b ? "0" : "-4rem"), divider].css("opacity", b ? "1" : "0.1");
            }
            if (loc >= 8) footer.css("opacity", c.b() >= t(footer) + 50 ? "1" : "0");
        }
    });
});
navTog = b => {
    nav.css("opacity", b ? "0.85" : "0.65").css("top", b ? "0" : "-2rem").css("line-height", b ? "4rem" : "6rem");
    logo1.css("border-color", b ? "#000" : "transparent");
    next.css("top", b ? "4rem" : "2rem").css("opacity", loc == 0 ? "0" : b ? "0.85" : "0.65");
}
slide = e => {
    //e.atr("c", x = (c = int(e.atr("c"))) >= int(e.atr("m")) ? 0 : c + 1);
    //e.css("background-image", "url(media/" + e.atr("id") + "/" + x + ".jpg");
}