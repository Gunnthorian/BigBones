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
}

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
    if()
    let url = list[i].getAttribute('img-src');
    list[i].style.backgroundImage = "url('" + url + "')";
  }
}

window.onscroll = function(){
  var nav_bar = document.getElementById('navigation-id');
    if (document.body.scrollTop > 0 ) {
        nav_bar.className = "nav-cont nav-scrolled";
    }
    else {
        nav_bar.className = "nav-cont nav-unscrolled";
    }
};
