window.onscroll = function(){
  var nav_bar = document.getElementById('navigation-id');
    if (document.body.scrollTop > 0 ) {
        nav_bar.className = "nav-cont nav-scrolled";
    }
    else {
        nav_bar.className = "nav-cont nav-unscrolled";
    }
};
