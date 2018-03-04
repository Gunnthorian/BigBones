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
  setupAnchors()
  animateElLoads()
}

window.onscroll = function(){
  animateElLoads()
  navAnimation()
};

function divImgEqualToParent(){
  var list = document.querySelectorAll("div[img-src]");
  let body_elem = document.getElementsByTagName('body')[0];

  for (var i = 0; i < list.length; i++) {
    var u = list[i].getAttribute('img-src');
    var img = new Image;
    img.src = u;
    var ratio = img.height/img.width;
    var alt_u = list[i].getAttribute('img-src-hori');
    var alt_img = new Image;
    alt_img.src = alt_u;
    var alt_ratio = alt_img.height/alt_img.width;
    // Handles the height of the image's element
    var parentElem = list[i].parentElement;
    if(body_elem.clientWidth >= mobile_condense || list[i].hasAttribute('mobile')){
      let siblings = parentElem.getElementsByTagName('div');
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
    }else{
      if(list[i].hasAttribute("img-height")){
        list[i].style.height = list[i].getAttribute("img-height") + "px";
      }else{
        list[i].style.height = (body_elem.clientWidth * alt_ratio) + "px";
      }
    }

    // Handles giving the element a background specified by the attr `img-src`
    list[i].style.backgroundImage = "url('" + list[i].getAttribute('img-src') + "')";
    if(body_elem.clientWidth < mobile_condense && list[i].getAttribute('img-src-hori') != null){
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

function setupAnchors(){
  var anchors = document.getElementsByTagName("anchor");
  for (var i = 0; i < anchors.length; i++){
    var anchor_id = anchors[i].getAttribute("id");
    var child = document.createElement("div");
    var child_a = document.createElement("div");
    child_a.setAttribute("anchor_id", anchor_id);
    child_a.innerHTML = "#"+anchor_id;
    child.appendChild(child_a);
    anchors[i].appendChild(child);
  }
}

function copyAnchor(){
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();

  let anchor = window.location.href +

  /* Copy the text inside the text field */
  document.execCommand("Copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
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
    if((box.top + box.height/4) > viewport.h || box.bottom < 0) return false;
    if(box.right < 0 || box.left > viewport.w) return false;
    return true;
}
