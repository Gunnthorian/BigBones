//  Config for BareBones's javascript sizings

img_src_fallback_height = 300;
// Height of images on the grid system that dont have a sibling element to
// reference their height off of.
mobile_condense = 700;
// Width of page when it jumps to mobile

function documentOnResize(){
  divImgEqualToParent()
}

function documentOnLoad(){
  divImgEqualToParent()
  setupAnimateElLoads()
}

window.onscroll = function(){
  animateElLoads()
  navAnimation()
};

function divImgEqualToParent(){
  var list = document.querySelectorAll("div[img-src]");

  for (var i = 0; i < list.length; i++) {
    // Handles the height of the image's element
    let siblings = list[i].parentElement.getElementsByTagName('div');
    let largest_sibling = 0;
    for (var j = 0; j < siblings.length; j++){
      if(siblings[j].hasAttribute("img-src") == false){
        if(siblings[j].clientHeight > largest_sibling){
          largest_sibling = siblings[j].clientHeight;
        }
      }
    }
    if(largest_sibling == 0){
      if(list[i].getAttribute('img-height') != null){
        largest_sibling = list[i].getAttribute('img-height');
      }else{
        largest_sibling = img_src_fallback_height;
      }
    }
    list[i].style.height = largest_sibling + "px";
    // Handles giving the element a background specified by the attr `img-src`
    list[i].style.backgroundImage = "url('" + list[i].getAttribute('img-src') + "')";
    let body_elem = document.getElementsByTagName('body')[0];
    console.log(body_elem.clientWidth);
    if(body_elem.clientWidth < 700 && list[i].getAttribute('img-src-hori') != null){
      list[i].style.backgroundImage = "url('" + list[i].getAttribute('img-src-hori') + "')";
    }
  }
}

function setupAnimateElLoads(){
  var list = document.querySelectorAll("div[onload-rise]");
  for (var i = 0; i < list.length; i++) {
    list[i].style.transform = "translateY(50px)"
    list[i].style.opacity = "0"
  }
}

function animateElLoads(){
  var list = document.querySelectorAll("div[onload-rise]");
  for (var i = 0; i < list.length; i++) {
    if(isViewportVisible(list[i])){
      list[i].style.transform = "translateY(0)"
      list[i].style.opacity = "1"
    }
  }
}

function navAnimation(){
  var nav_bar = document.getElementById('navigation-id');
  if (document.body.scrollTop > 0 ) {
      nav_bar.className = "nav-cont nav-scrolled";
  }
  else {
      nav_bar.className = "nav-cont nav-unscrolled";
  }
}

function getViewportSize(w) {
    var w = w || window;
    if(w.innerWidth != null) return {w:w.innerWidth, h:w.innerHeight};
    var d = w.document;
    if (document.compatMode == "CSS1Compat") {
        return {
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        };
    }
    return { w: d.body.clientWidth, h: d.body.clientWidth };
}

function isViewportVisible(e) {
    var box = e.getBoundingClientRect();
    var height = box.height || (box.bottom - box.top);
    var width = box.width || (box.right - box.left);
    var viewport = getViewportSize();
    if(!height || !width) return false;
    if((box.top + box.height/1.5) > viewport.h || box.bottom < 0) return false;
    if(box.right < 0 || box.left > viewport.w) return false;
    return true;
}
