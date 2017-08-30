'user strict';

// treba da ne vraca sliku na hover kada je povecana skroz

var widthIncrementer = 100;
var fullWidth = (window.innerWidth || screen.fullWidthPx);
var fullWidthPx = fullWidth + "px";
var images = document.querySelectorAll('.single-element-img');
var wrappers = document.querySelectorAll('.single-element-wrapper');
var numElements = images.length;


for (var i = 0; i < numElements; i++) {
    wrappers[i].addEventListener("click", toggleFullWidth);
    wrappers[i].addEventListener("mouseover", incrementWrapperWidth);
    wrappers[i].addEventListener("mouseout", decrementWrapperWidth);

    images[i].style.width = fullWidthPx;
    images[i].style.marginLeft = - (i * (fullWidth / numElements)) + "px";

    (i < numElements/2) ? setWrapperLeft(i) : setWrapperRight(i);       // jshint ignore:line

    var thisImg = findChildImage(wrappers[i]);
    rememberPositions(wrappers[i], thisImg);   // after setWrapper
}   // for


// special case (zasto images umesto wraper?)
images[numElements-1].addEventListener("mouseover", incrementLastImage);
images[numElements-1].addEventListener("mouseout", decrementLastImage);


/*** FUNCTIONS ***/

function toggleFullWidth () {
    var img = findChildImage(this);
    isNotFullWidth(this) ? setFullWidth(this, img) : returnInitialWidth(this, img);  // jshint ignore:line
}   // toggleFullWidth


function setFullWidth (wrapper, img) {
    wrapper.style.width = fullWidthPx;
    wrapper.style.zIndex = 99;
    if (isLeftBased(wrapper)) wrapper.style.left = 0;
    if (isRightBased(wrapper)) wrapper.style.right = 0;
    img.style.marginLeft = 0;
    wrapper.isFullWidth = true;
}   // setFullWidth

function returnInitialWidth (wrapper, img) {
    wrapper.style.width = "";  // use default CSS 25%
    wrapper.style.zIndex = 1;
    if (isLeftBased(wrapper)) wrapper.style.left = wrapper.initialLeft;
    if (isRightBased(wrapper)) wrapper.style.right = wrapper.initialRight;
    img.style.marginLeft = img.initialMarginLeft;
    wrapper.isFullWidth = false;
}   // returnInitialWidth


function incrementWrapperWidth () {
    var wrapper = this;
    if(wrapper.isFullWidth) return;
    var img = findChildImage(this);
    wrapper.style.width = (fullWidth / 4) + widthIncrementer + "px";
    wrapper.style.zIndex = 99;
}   // incrementWrapperWidth

function decrementWrapperWidth () {
    var wrapper = this;
    if(wrapper.isFullWidth) return;
    var img = findChildImage(this);
    returnInitialWidth (wrapper, img);
}   // decrementWrapperWidth


// special cases
function incrementLastImage () {
    var wrapper = this.parentNode;
    if(wrapper.isFullWidth) return;
    this.style.marginLeft = - ((3/4) * fullWidth) + widthIncrementer + "px";
}

function decrementLastImage () {
    var wrapper = this.parentNode;
    if(wrapper.isFullWidth) return; 
    this.style.marginLeft = this.initialMarginLeft;
}


/*** POSITIONING ***/

function setWrapperLeft (i) {
      wrappers[i].style.left = i * (1 / numElements) * 100 + "%";
} // setWrapperLeft

function setWrapperRight (i) {
    wrappers[i].style.right = (numElements - i - 1) * (1 / numElements) * 100 + "%";
}   // setWrapperRight

function rememberPositions (wrapper, img) {
    if (isLeftBased(wrapper) && isNotSet(wrapper.initialLeft)) wrapper.initialLeft = wrapper.style.left;
    if (isRightBased(wrapper) && isNotSet(wrapper.initialRight)) wrapper.initialRight = wrapper.style.right;

    if (isNotSet(img.initialMarginLeft)) img.initialMarginLeft = img.style.marginLeft;
    if (isNotSet(img.initialMarginRight)) img.initialMarginRight = img.style.marginRight;
}   // rememberPositions


/*** HELPERS ***/

function isNotFullWidth (el) {
    return el.style.width !== fullWidthPx;
}   // isNotFullWidth

function isLeftBased (el) {
    return el.style.left !== "";
}   // isLeftBased

function isRightBased (el) {
    return el.style.right !== "";
}   // isRightBased

function isNotSet (attr) {
      return attr === undefined;
} // isNotSet

function findChildImage (wrapper) {
    return wrapper.getElementsByClassName("single-element-img")[0];
}   // findChildImage
