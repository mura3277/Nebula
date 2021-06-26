loc = 0;
on(d, "DOMContentLoaded", _ => {
    on(w, "load", _ => css(d.body, {opacity:1}));

    
    
    
    
    on(w, "scroll", _ => {
    //     if ((x.t() - lwt) > 100 || (x.t() - lwt) < -100) { //Throttle check
    //         lwt = x.t();
    //         //navPos();
    //         navTog(loc === 0);
    //         if (loc === 0 || loc === 1) {
    //             let b = x.t() > hTrig;
    //             css($("#title"), {top:b ? "20vh" : "40vh", opacity:b ? 0 : 1});
    //             b = x.b() > (aTrig - 10) && x.t() < aTrig;
    //             css([css($("#about1"), {left:b ? 0 : "-4rem", opacity:b ? 1 : .1}), divider], {opacity:b ? 1 : .1});
    //         }
    //         if (loc >= 8) css($("footer"), {opacity:x.b() >= t($("footer")[0]) + 50 ? 1 : 0});
    //     }
    //     if (loc < 2 && x.t() < h($("header")[0])) css($("header"), {backgroundPosition:"center " + (x.t() * 0.75) + "px"});
        //navPos();
    });
    
    // obv(locs, (b, o) => {
    //     if (b) {
    //         $("#logo1").innerHTML = attr(o.target, "t");
    //         css($(".navs")[attr(o.target, "t")], {color:"#EC058E"});
    //     } else {
    //         css($(".navs"), {color:"#1D252C"});
    //     }
    // }, 0);
});
