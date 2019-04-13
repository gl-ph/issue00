const CANV_MULT_RATIO = 2;

const sectIDs      = ["home","about","dig_lit","submit","faq"];
// const buttonColors = [ "F0433A", "C9283E", "820333", "540032", "2E112D"];
const buttonColors = [ "ff1f00", "ff1f00", "ff1f00", "ff1f00", "ff1f00"];
var activePage = 0;
var menuCharWidth;
var updateScroll = true;
var sectionHeight;

var isMobile;
var isChrome;

/******************************************************************************/
/******************************* HELPERS **************************************/
/******************************************************************************/

function getDist(x1,y1,x2,y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt((a*a)+(b*b));
}

function hexToRgb(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return [
        parseInt(parseInt(m[1], 16).toFixed(1)),
        parseInt(parseInt(m[2], 16).toFixed(1)),
        parseInt(parseInt(m[3], 16).toFixed(1))
    ];
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function randInt(min, max) {
    return chance.integer({min:min,max:max});
}

/**
 * Returns a random float between min (inclusive) and max (inclusive)
 */
function randFloat(min, max) {
    return chance.floating({min:min,max:max});
}

function randChar() {
    var n = randInt(33, 255);
    var ch = String.fromCharCode(n);
    while (ch.trim().length == 0 || [157,160,150,133,148,131,154,152,157,156,155,144,143,141,147,137,159,149,142,134,140,128,132,153,130,139,135,129,127,145,146].indexOf(n) >= 0) {
        n = randInt(33, 255);
        ch = String.fromCharCode(n);
    }
    return ch;
}

function elementScrolledIntoView(el) {
    var box = el.getBoundingClientRect();
    var top = box.y;
    var height = box.height;

    return (top + height > 0) && (top < window.innerHeight);
}

function chechIfMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

/******************************************************************************/
/******************************* MENU *****************************************/
/******************************************************************************/

function updateMenuButtonPos(sID) {
    var el = document.getElementById(sID + "_mb");
    if (sectIDs.indexOf(sID) < activePage) {       // left
        el.style.left = ((sectIDs.indexOf(sID) * menuCharWidth) + el.parentElement.offsetLeft) + "px";
    }
    else if (sectIDs.indexOf(sID) == activePage) { // center
        el.style.left = (((el.parentElement.clientWidth / 2) - (menuCharWidth/2)) + el.parentElement.offsetLeft) + "px";
    }
    else {                                         // right
        el.style.left = ((el.parentElement.clientWidth - (((sectIDs.length)-sectIDs.indexOf(sID)) * menuCharWidth)) + el.parentElement.offsetLeft) + "px";
    }
}

function updateAllMenuButtons() {
    menuCharWidth = document.getElementById("home_mb").clientWidth;
    for (var i = 0; i < sectIDs.length; i++) updateMenuButtonPos(sectIDs[i]);
}

function menuButtonClickHandler(ev) {
    updateScroll = false;
    var sID = ev.target.id.replace("_mb","");
    scrollToSection(sID);
    activePage = sectIDs.indexOf(sID);
    updateAllMenuButtons();

    setTimeout(function () {
        updateScroll = true;
    }, 1000);
}

function updateTitleColors() {
    var maxDist = 200;
    var colorStep = 1;
    for (var i = 0; i < sectIDs.length; i++) {
        var buttonCh = document.getElementById(sectIDs[i] + "_mb");
        var elX = buttonCh.offsetLeft + (buttonCh.clientWidth/2);
        var elY = buttonCh.offsetTop  + (buttonCh.clientHeight/2);
        var dist = getDist(mouseX,mouseY,elX,elY);
        var mult = 1-(dist / maxDist);
        var rgb = hexToRgb(buttonColors[Math.abs(i - activePage)]);
        for (var r = 0; r < rgb.length; r++) rgb[r] = (rgb[r] * mult).toFixed(0);
        buttonCh.style.color = "rgb(" + (Math.floor(rgb[0]/colorStep)*colorStep) + "," + (Math.floor(rgb[1]/colorStep)*colorStep) + "," + (Math.floor(rgb[2]/colorStep)*colorStep) + ")";
    }
}

function initMenu() {
    menuCharWidth = document.getElementById("home_mb").clientWidth;
    updateAllMenuButtons();
    for (var i = 0; i < sectIDs.length; i++) {
        var button = document.getElementById(sectIDs[i] + "_mb");
        button.addEventListener("click",menuButtonClickHandler);
    }
    resizeHandlers.push(updateAllMenuButtons);
}

/******************************************************************************/
/******************************* GENERAL HANDLERS *****************************/
/******************************************************************************/

var mouseX;
var mouseY;

var checkMousePosInterval;

function checkMousePos() {
    updateTitleColors();
}

function handlePageMouseMove(ev) {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
    if (!checkMousePosInterval) {
        checkMousePosInterval = setInterval(checkMousePos, 10);
    }
}

/******************************************************************************/
/******************************* SECTIONS *************************************/
/******************************************************************************/

const MAX_TITLE_SKEW = 10;

var updateTitleSkewsInterval;
var curTitleSkew = 0;
var lastScrollTop = 0;

function scrollToSection(sID) {
    var scrollEl = document.getElementById(sID + "_sec");
    scrollEl.scrollIntoView({behavior: "smooth",block: "end", inline: "nearest"});
}

function isScrolledIntoView(el) {
    var headerHeight = document.getElementsByTagName("header")[0].clientHeight;
    var elemTop = el.getBoundingClientRect().top;
    var isVisible = (elemTop-1 <= headerHeight);
    return isVisible;
}

function updateTitleSkews() {
    window.requestAnimationFrame(function () {
        if (!scrolling) {
            var titles = document.getElementsByClassName("sec_title");
            for (var i = 0; i < titles.length; i++)
                titles[i].style.transform = "skew(0, " + curTitleSkew + "deg)";
            if (curTitleSkew != 0)
                curTitleSkew -= (curTitleSkew/Math.abs(curTitleSkew)) *
                                Math.min(0.5,Math.abs(curTitleSkew));
        }
    });
}

function sectionScrollHandler(ev) {
    scrolling = true;
    if (!updateScroll) return;
    var cont = ev.target;
    var sections = cont.getElementsByTagName("section");

    var i;
    for (i = sections.length-1; i >= 0; i--)
        if (isScrolledIntoView(sections[i])) break;

    activePage = sectIDs.indexOf(sections[i].id.replace("_sec",""));
    updateAllMenuButtons();

    var scrollDiff = this.scrollTop - lastScrollTop;
    var scrollDir;
    if (this.scrollTop != lastScrollTop) {
        scrollDir = scrollDiff / Math.abs(scrollDiff);
        lastScrollTop = this.scrollTop;
    }

    if (!isMobile && !isChrome) {
        curTitleSkew = Math.max(-MAX_TITLE_SKEW,Math.min(MAX_TITLE_SKEW,curTitleSkew+(scrollDiff/30)));
        if (!updateTitleSkewsInterval)
            updateTitleSkewsInterval = setInterval(updateTitleSkews, 10);
    }

    if (elementScrolledIntoView(document.getElementById("home_sec")) && !homeAutoDraw)
        startHomeDraw();
    else if (!elementScrolledIntoView(document.getElementById("home_sec"))) {
        homeAutoDraw = false;
        clearInterval(homeDrawTimeout);
    }

    setTimeout(function () {
        scrolling = false;
    }, 10);
    hideFooterTeam();
}

function fixSectionHeights() {
    document.getElementsByTagName('main')[0].style.maxHeight = window.innerHeight + "px";
    var sections = document.getElementsByTagName("section");
    sectionHeight = window.innerHeight*(17/20);
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains("home_sec"))
            sections[i].style.minHeight = (window.innerHeight*(15/20)) + "px";
        else if (sections[i].classList.contains("issue_sec"))
            sections[i].style.minHeight = (window.innerHeight*(5/20)) + "px";
        else if (!sections[i].classList.contains("about_sec") &&
                 !sections[i].classList.contains("faq_sec") &&
                 !sections[i].classList.contains("dig_lit_sec")&&
                 !sections[i].classList.contains("issue_sec"))
            sections[i].style.minHeight = sectionHeight + "px";
        
    }
}

function initSections() {
    document.getElementsByTagName("main")[0].addEventListener("scroll",sectionScrollHandler);
    fixSectionHeights();
    resizeHandlers.push(fixSectionHeights);
    initHomeSection();
    initAboutSection();
    initDigLitSection();
    initSubmitSection();
    initFAQSection();
}

/******************************************************************************/
/******************************* HOME SECTION DRAWER **************************/
/******************************************************************************/

const MAX_HOME_DRAW_SPEED = 30;
const MAX_HOME_DRAW_VECT = 50;
const MAX_HOME_DRAW_ACC = 20;
const MAX_HOME_DRAW_ACC_CHANGE = 1;
const HOME_DRAW_BOUND_PERC = 4;

var homeAutoDraw;

var homeDrawTimeout;
var curAcc;
var curVect;
var curPos;
var curSpeed = 10;

function homeDrawStep() {
    var steerXL = Math.max(0,Math.min(1, (curPos[0]/(homeCanv.width/HOME_DRAW_BOUND_PERC))));
    var steerXR = Math.max(0,Math.min(1, (Math.abs(homeCanv.width - curPos[0])/(homeCanv.width/HOME_DRAW_BOUND_PERC))));
    var steerYT = Math.max(0,Math.min(1, (curPos[1]/(homeCanv.height/HOME_DRAW_BOUND_PERC))));
    var steerYB = Math.max(0,Math.min(1, (Math.abs(homeCanv.height - curPos[1])/(homeCanv.height/HOME_DRAW_BOUND_PERC))));

    // console.log(steerXL.toFixed(2),steerXR.toFixed(2),steerYT.toFixed(2),steerYB.toFixed(2));

    curAcc[0] = Math.max(0,Math.min(MAX_HOME_DRAW_ACC,
        curAcc[0] + randFloat(-MAX_HOME_DRAW_ACC_CHANGE,MAX_HOME_DRAW_ACC_CHANGE)));
    curAcc[1] = Math.max(0,Math.min(MAX_HOME_DRAW_ACC,
        curAcc[1] + randFloat(-MAX_HOME_DRAW_ACC_CHANGE,MAX_HOME_DRAW_ACC_CHANGE)));

    // console.log(curAcc);

    curVect[0] = Math.max(-MAX_HOME_DRAW_VECT,Math.min(MAX_HOME_DRAW_VECT,
        curVect[0] + randFloat(-curAcc[0]*steerXL,curAcc[0]*steerXR)));
    curVect[1] = Math.max(-MAX_HOME_DRAW_VECT,Math.min(MAX_HOME_DRAW_VECT,
        curVect[1] + randFloat(-curAcc[1]*steerYT,curAcc[1]*steerYB)));

    var dist = Math.pow((curVect[0] * curVect[0]) + (curVect[1] * curVect[1]),0.5);

    curPos[0] = Math.max(0,Math.min(homeCanv.width, curPos[0] + curVect[0]));
    curPos[1] = Math.max(0,Math.min(homeCanv.height,curPos[1] + curVect[1]));

    var el = newHomeChar(curPos[0],curPos[1],dist);
    // console.log(el);
    curMainDrawEls.push(el);

    curSpeed = Math.min(MAX_HOME_DRAW_SPEED,Math.max(0,curSpeed + randFloat(-5,5)));
    if (homeAutoDraw) homeDrawTimeout = setTimeout(homeDrawStep, curSpeed);
}

function startHomeDraw() {
    curAcc  = [randFloat(-10,10),randFloat(-10,10)];
    curVect = [randFloat(-20,20),randFloat(-20,20)];
    curPos  = [homeCanv.width/2,homeCanv.height/2];
    homeAutoDraw = true;
    if (homeDrawTimeout) clearInterval(homeDrawTimeout);
    homeDrawTimeout = setTimeout(homeDrawStep, curSpeed);
}

/******************************************************************************/
/******************************* HOME SECTION *********************************/
/******************************************************************************/

var homeSection;

var homeCanv;
var homeCtx;
var homeCanvUpdateInterval;

var homeLastMX;
var homeLastMY;

var curMainDrawEls;

function clearHomeCanv() {
    homeCtx.clearRect(0,0,homeCanv.width,homeCanv.height);
}

function newHomeChar(x,y,dist) {
    var curChar = randChar();
    var size = Math.min(350,Math.pow(dist,1.3))*CANV_MULT_RATIO;
    var el = {
        x: x,
        y: y,
        ch: curChar,
        fill: chance.bool({likelihood: 10}),
        font: size + "px Roboto Mono"
    }
    return el;
}

function updateMainCanv() {
    window.requestAnimationFrame(function () {
        if (curMainDrawEls.length > 20) {
            if (curSpeed) {
                if (chance.bool({likelihood:Math.max(0,Math.min(100,100-curSpeed))}))
                    curMainDrawEls.splice(0,Math.max(1,Math.round(Math.pow(curMainDrawEls.length,0.5))));
            }
            else
                curMainDrawEls.splice(0,Math.max(1,Math.round(Math.pow(curMainDrawEls.length,0.35))));
            clearHomeCanv();
            for (var i = 0; i < curMainDrawEls.length; i++) {
                var curEl = curMainDrawEls[i];
                homeCtx.font = curEl.font;
                if (curEl.fill) homeCtx.fillText(curEl.ch,curEl.x,curEl.y);
                homeCtx.strokeText(curEl.ch,curEl.x,curEl.y);
            }
        }
    });
}

function homeCanvMouseMoveListener(ev) {
    homeAutoDraw = false;
    if (homeDrawTimeout) clearTimeout(homeDrawTimeout);
    var mx = ev.clientX * CANV_MULT_RATIO;
    var my = (ev.clientY + document.getElementsByTagName("main")[0].scrollTop) * CANV_MULT_RATIO;

    curPos[0]  = mx;
    curPos[1]  = my;
    curVect[0] = mx - homeLastMX;
    curVect[1] = my - homeLastMY;

    var dist = getDist(homeLastMX,homeLastMY,mx,my);
    curSpeed = dist;
    if ((!homeLastMX || !homeLastMY) || dist > 5) {
        homeLastMX = mx;
        homeLastMY = my;
        var el = newHomeChar(mx,my,dist)
        curMainDrawEls.push(el);
    }

    homeDrawTimeout = setTimeout(function () {
        homeAutoDraw = true;
        homeDrawStep();
    }, 100);
}

function initHomeCanv() {
    homeCanv = document.getElementById("homeCanv");
    homeCtx = homeCanv.getContext("2d");

    clearHomeCanv()

    homeCanv.width  = homeSection.clientWidth  * CANV_MULT_RATIO;
    homeCanv.height = homeSection.clientHeight * CANV_MULT_RATIO;


    homeCtx.textAlign = "center";
    homeCtx.stokeStyle = "white";
    homeCtx.fillStyle = "blue";

    if (homeCanvUpdateInterval) clearInterval(homeCanvUpdateInterval);
    homeCanvUpdateInterval = setInterval(updateMainCanv, 50);
}

function initHomeSection() {
    curMainDrawEls = [];
    homeSection = document.getElementById("home_sec");
    initHomeCanv();
    if (!isMobile) homeCanv.addEventListener("mousemove",homeCanvMouseMoveListener);
    resizeHandlers.push(initHomeCanv);
    startHomeDraw();
    setTimeout(function () {
        homeCanv.style.opacity = 1;
    }, 2000);
}

/******************************************************************************/
/******************************* ABOUT GL-PH SECTION **************************/
/******************************************************************************/

const ABOUT_TEXT = "Directed by undergraduates at the Rochester Institute of Technology (RIT), gl-ph is one of the first undergraduate literary journals in the nation dedicated exclusively to the publication of digital literature (otherwise known as electronic literature, or e-lit).\n\nWhy are we called gl-ph?\n\nWikipedia defines a glyph as “a hieroglyphic character or symbol; a pictograph.” We say that it’s the interface between text and icon, between code and image. The hyphen is a wild card, a parameter-driven space inside square brackets, an opening to inhabit in fluid and dynamic ways.";

var textAreaElement;

var nextAboutTextInd = 0;
var lastAboutTextLen = 0;
var aboutTypingNumExtra = 1;

var aboutAnimText = "You already know! Type away!";
var aboutAnimProg = 0;
var aboutAnimTimeout;
var doAboutAnim = true;

function handleAboutTyping(ev) {
    var inp = ev.target;
    if (inp.value.length < ABOUT_TEXT.length || ev.key == "Backspace" || ev.metaKey || ev.ctrlKey) {
        if (ev.key.replace(/\s/g, '').length == 1) document.getElementById("aboutBGLetter").innerHTML = ev.key.toUpperCase();
        setTimeout(function () {
            var len = Math.min(ABOUT_TEXT.length,inp.value.length);
            if (len > 0 && lastAboutTextLen < len) len += randInt(0,aboutTypingNumExtra);
            aboutTypingNumExtra += randInt(0,1);
            lastAboutTextLen = len;
            inp.value = ABOUT_TEXT.slice(0,len);
            inp.style.cssText = 'height:auto; padding:0';
            inp.style.cssText = 'height:' + inp.scrollHeight + 'px';
        }, 100);
    }
    else {
        ev.preventDefault();
        aboutTypingNumExtra--;
    }
}

function startAboutTypeAnim() {
    aboutAnimTimeout = setTimeout(aboutTypeAnimStep, randInt(100,700));
}

function stopAboutTypeAnim(ev) {
    textAreaElement.removeEventListener("click",stopAboutTypeAnim);
    textAreaElement.removeEventListener("keypress",stopAboutTypeAnim);
    doAboutAnim = false;
    textAreaElement.value = null;
    textAreaElement.placeholder = aboutAnimText;
    textAreaElement.addEventListener("keypress",handleAboutTyping);
    if (ev.key) handleAboutTyping(ev);
}

function preventType(ev) {
    ev.preventDefault();
}

function aboutTypeAnimStep() {
    if (!doAboutAnim) return;
    aboutAnimProg++;
    var inp = document.getElementById("about_input");
    if (aboutAnimProg > aboutAnimText.length) {
        aboutAnimProg = 0;
        inp.select();
        setTimeout(function () {
            aboutAnimTimeout = setTimeout(aboutTypeAnimStep, randInt(100,700));
        }, randInt(1000,2000));
    }
    else {
        inp.value = aboutAnimText.slice(0, aboutAnimProg);
        aboutAnimTimeout = setTimeout(aboutTypeAnimStep, randInt(50,500));
    }
}

function initAboutSection() {
    textAreaElement = document.getElementById("about_input");
    if (isMobile) {
        var container = textAreaElement.parentNode;
        container.removeChild(textAreaElement);
        container.innerHTML = "<p>" + ABOUT_TEXT.split("\n").join("</p><p>") + "</p>";
    }
    else {
        startAboutTypeAnim();
        textAreaElement.addEventListener("click", stopAboutTypeAnim);
        textAreaElement.addEventListener("keypress", stopAboutTypeAnim);
    }
}

/******************************************************************************/
/******************************* DIG_LIT SECTION ******************************/
/******************************************************************************/

var startLetters;
var digLitShown = false;
var digLitAnimGradientSpread = 50;
var digLitAnimInterval;

var curDigAnimEl1 = 0;
var curDigAnimEl2 = -40;

var digLitOriginialContent;
var digLitAnimElements;


function digLitAnimStep() {
    window.requestAnimationFrame(function () {
        if (curDigAnimEl1 < digLitAnimElements.length) {
            var el = digLitAnimElements[curDigAnimEl1];
            el.style.color = "red";
        }

        if (curDigAnimEl2 > -1) {
            var el = digLitAnimElements[curDigAnimEl2];
            if (el) el.style.color = "black";
            startLetters.style = null;
            startLetters.className = "done";
        }


        curDigAnimEl1++;
        curDigAnimEl2++;
        if (curDigAnimEl2 >= digLitAnimElements.length) {
            clearInterval(digLitAnimInterval);
            setTimeout(finishDigLitAnim, 500);
        }
    });
}

function finishDigLitAnim() {
    var digLitAnimSections = document.getElementsByClassName("digLitAnimSection");
    for (var i = 0; i < digLitAnimSections.length; i++) {
        digLitAnimSections[i].style.color = "black";
        digLitAnimSections[i].innerHTML = digLitOriginialContent[i];
        if (document.getElementById("digLitStartText")) document.getElementById("digLitStartText").id = null;
    }
}

function startDigLitAnim() {
    if (!digLitShown) {
        digLitShown = true;
        startLetters = document.getElementById("digLitStartText");
        startLetters.style.textDecoration = "none";
        digLitAnimElements = document.getElementsByClassName("digLitAnimElement");
        digLitAnimElements = Array.prototype.slice.call(digLitAnimElements);
        digLitAnimElements.sort(function (a,b) {
            var sx = startLetters.offsetLeft;
            var sy = startLetters.offsetTop;
            return getDist(a.offsetLeft,a.offsetTop,sx,sy) - getDist(b.offsetLeft,b.offsetTop,sx,sy);
        });
        digLitAnimInterval = setInterval(digLitAnimStep, 1);
    }
}

function initDigLitSectionAnim() {
    digLitOriginialContent = [];
    var digLitAnimSections = document.getElementsByClassName("digLitAnimSection");
    for (var i = 0; i < digLitAnimSections.length; i++) {
        digLitOriginialContent.push(digLitAnimSections[i].innerHTML);
        var secContentToks = digLitAnimSections[i].innerHTML.split(" ");
        for (var j = 0; j < secContentToks.length; j++) {
            if (secContentToks[j].startsWith("<span")) {
                j++;
                while (!secContentToks[j].endsWith("</span>")) j++;
                continue;
            }
            secContentToks[j] = "<span class='digLitAnimElement'>" + secContentToks[j] + "</span>";
        }
        digLitAnimSections[i].innerHTML = secContentToks.join(" ");
    }
}

function initDigLitSection() {
    initDigLitSectionAnim();
    document.getElementById("digLitStartText").addEventListener("click",startDigLitAnim);
}

/******************************************************************************/
/******************************* SUBMIT SECTION *******************************/
/******************************************************************************/

const SUBMIT_URL = "https://signatures.submittable.com/submit/24396/digital-electronic-literature";
const SUBMIT_ANIM_STEP_TIME = 200;

var numSubmitElements = 25;
var centerSE = 13;
var middleSE = [7,8,9,12,14,17,18,19];
var outerSE  = [1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25];
var submitButton;

var submitAnimTimeout;
var curSubmitStage;

const SUBMIT_ANIM_STAGES = [
    //outerSE        |middleSE
    //color   stroke |color    stroke
    ["blue", "blue", "blue",  "white"], // 0
    ["blue", "white","blue",  "white"], // 1
    ["blue", "white","white", "white"], // 2
    ["white","white","white", "white"], // 3
    ["white","white","white", "red"],   // 4
    ["white","red",  "white", "red"],   // 5
    ["red",  "red",  "red",   "red"],   // 6
    ["white","red",  "white", "red"],   // 7
];

function updateOuterSE(color,stroke,func) {
    var outerSEElements = document.getElementsByClassName("outerSE");
    for (var i = 0; i < outerSEElements.length; i++) {
        outerSEElements[i].style.color = color;
        outerSEElements[i].style.textStroke = "1px " + stroke;
        outerSEElements[i].style.webkitTextStroke = "1px " + stroke;
        if (func) func(outerSEElements[i]);
    }
}

function updateMiddleSE(color,stroke,func) {
    var middleSEElements = document.getElementsByClassName("middleSE");
    for (var i = 0; i < middleSEElements.length; i++) {
        middleSEElements[i].style.color = color;
        middleSEElements[i].style.textStroke = "1px " + stroke;
        middleSEElements[i].style.webkitTextStroke = "1px " + stroke;
        if (func) func(middleSEElements[i]);
    }
}

function submitStageStep(forward) {
    submitButton.classList.remove("stage" + curSubmitStage);
    if (forward) curSubmitStage++;
    submitButton.classList.add("stage" + curSubmitStage);

    updateOuterSE(SUBMIT_ANIM_STAGES[curSubmitStage][0],SUBMIT_ANIM_STAGES[curSubmitStage][1]);
    updateMiddleSE(SUBMIT_ANIM_STAGES[curSubmitStage][2],SUBMIT_ANIM_STAGES[curSubmitStage][3]);
    if (forward) {
        if (curSubmitStage+1 >= SUBMIT_ANIM_STAGES.length)
            submitAnimTimeout = setTimeout(openSubmitLink, SUBMIT_ANIM_STEP_TIME);
        else submitAnimTimeout = setTimeout(function () {
            submitStageStep(true);
        }, SUBMIT_ANIM_STEP_TIME);
    }
    else {
        if (curSubmitStage-1 < 0) {
            submitAnimTimeout = setTimeout(function () {
                updateOuterSE( "blue","blue");
                updateMiddleSE("blue","blue");
                setTimeout(function () {submitButton.innerHTML = "SUBMIT";}, 300);
                submitButton.className = "submitElement centerSE";
                clearTimeout(submitAnimTimeout);
            }, SUBMIT_ANIM_STEP_TIME);
        }
        else submitAnimTimeout = setTimeout(function () {
            submitStageStep(false);
        }, SUBMIT_ANIM_STEP_TIME);
    }
    if (!forward)  curSubmitStage--;
}

function submitClickHandler() {
    curSubmitStage = 0;
    submitButton.innerHTML = "HOLD";
    submitButton.classList.add("stage" + curSubmitStage);
    updateOuterSE(SUBMIT_ANIM_STAGES[curSubmitStage][0],SUBMIT_ANIM_STAGES[curSubmitStage][1]);
    updateMiddleSE(SUBMIT_ANIM_STAGES[curSubmitStage][2],SUBMIT_ANIM_STAGES[curSubmitStage][3]);
    submitAnimTimeout = setTimeout(function () {
        submitStageStep(true)
    }, SUBMIT_ANIM_STEP_TIME);
}

function submitCancelHandler() {
    clearTimeout(submitAnimTimeout);
    submitStageStep(false);
}

function openSubmitLink() {
    submitButton.innerHTML = "HOORAY";
    setTimeout(function () {
        submitButton.innerHTML = "THANKS";
        setTimeout(function () {
            setTimeout(function () {
                submitCancelHandler();
            }, 10);
            var link = document.createElement("a");
            link.style.display = "none";
            link.href = SUBMIT_URL;
            document.body.appendChild(link);
            link.click();
            delete link
        }, 300);
    }, 300);
}

function initSubmitSectionElements() {
    for (var i = 0; i < numSubmitElements; i++) {
        var elID = i+1;
        var submitElement = document.createElement("p");
        submitElement.innerHTML = "SUBMIT";
        submitElement.className = "submitElement";
        if (elID == centerSE) {
            submitElement.classList.add("centerSE");
            submitElement.id = "centerSE";
        }
        else if (middleSE.indexOf(elID) > -1) {
            submitElement.classList.add("middleSE");
        }
        else if (outerSE.indexOf(elID) > -1) {
            submitElement.classList.add("outerSE");
        }
        document.getElementById("submit_sec").appendChild(submitElement);
    }
}

function initSubmitSection() {
    if (!isMobile) {
        document.getElementById("submit_sec").classList.remove("mobile");
        document.getElementById("submit_sec").innerHTML = null;
        initSubmitSectionElements();
        submitButton = document.getElementById("centerSE");
        submitButton.addEventListener("mousedown",submitClickHandler);
        submitButton.addEventListener("mouseup",submitCancelHandler);
    }
}

/******************************************************************************/
/******************************* FAQ SECTION **********************************/
/******************************************************************************/

const FAQ_ANIM_STEP = 0.1;
const FAQ_ANIM_STEP_TIME = 20;

var questions = [
    [["When will you be ", "We are "], "open for submissions", ["?", " right now, submit your work using the link above!"]],
    [["How do I know if my work counts as ", "We take a pretty broad view about what constitutes "], "digital literature", ["?", ". You can submit your work and find out, or you can contact us in advance."]],
    [["When will y", "We’re looking to release "], "our first issue", [" come out?", " (Issue 00 - Source)  during the summer of 2018."]],
    [["When are ", "We’re looking at the first 100 "], "submissions", [" due?", ", on a rolling basis. The sooner you submit, the more likely your work will be featured!"]],
    [["Who can submit ", "Anyone and everyone. We’re looking for "], "work ", ["to gl-ph?", "from undergraduates, graduate students, educators, and any/all artists/writers/creators working with digital literature. "]],
    [["What ", "Here "], "are some examples of digital literature that reflect what", [" you’re ", " we're "], " looking for in a submission", ["?",": <a href='http://luckysoap.com/ethericocean/'>Etheric Ocean by J.R. Carpenter</a>, <a href='http://www.altx.com/thebody/'>my body & a Wunderkammer by Shelley Jackson</a>"]],
    [["I want to","You can"]," keep track of what gl-ph is up to",[". How can I tune in?"," by following us on <a href='https://fb.me/gl.ph.team'>facebook</a> and <a href='https://www.instagram.com/gl__ph/'>instagram</a>."]]
];

var faqElStates = {};

function initFAQSectionQuestions() {
    var faqClasses = ["faqEl left","faqEl left"];
    var curClass = 0;
    for (var i = 0; i < questions.length; i++) {
        var questionEle = document.createElement("div");
        questionEle.id = "question_" + i;
        questionEle.className = faqClasses[curClass];

        var qElAccent = document.createElement("p");
        qElAccent.className = "accent";
        qElAccent.id = "questionaccent_" + i;
        qElAccent.innerHTML = "Q";

        var qElText = document.createElement("p");
        qElText.id = "questiontext_" + i;
        qElText.innerHTML = retrieveQuestionText(i, true, 1);

        questionEle.appendChild(qElAccent);
        questionEle.appendChild(qElText);

        if (isMobile) {
            questionEle.addEventListener("click", showFAQAnswers);
            questionEle.addEventListener("mouseleave", showFAQQuestions);
        }
        else {
            questionEle.addEventListener("mouseenter", showFAQAnswers);
            questionEle.addEventListener("mouseleave", showFAQQuestions);
        }
        document.getElementById("faq_sec").appendChild(questionEle);
        curClass = (curClass+1)%2;
    }

}

function retrieveQuestionText(qInd) {
    var finalStr = "";
    for (var j = 0; j < questions[qInd].length; j++) {
        if (Array.isArray(questions[qInd][j])) {
            var perc  = Math.max(0,Math.min(1,faqElStates[qInd].cur));
            var qText = questions[qInd][j][0];
            var aText = questions[qInd][j][1];
            var tokLen = Math.round(qText.length + ((aText.length - qText.length)*perc));

            for (var i = 0; i < tokLen; i++) {
                if (chance.bool({likelihood: perc*100})) {
                    if (i < aText.length) finalStr += aText[i];
                    else finalStr += chance.character({alpha: true});
                }
                else {
                    if (i < qText.length) finalStr += qText[i];
                    else finalStr += chance.character({alpha: true});
                }
            }
        }
        else finalStr += questions[qInd][j];
    }
    return finalStr;
}

function faqAnimStep(qEl,id) {
    var dir = 1;
    if (faqElStates[id].targ < faqElStates[id].cur) dir = -1;
    faqElStates[id].cur += (dir * FAQ_ANIM_STEP);
    document.getElementById("questiontext_" + id).innerHTML = retrieveQuestionText(id);
    if (faqElStates[id].cur.toFixed(2) != faqElStates[id].targ.toFixed(2)) {
        setTimeout(function () {
            faqAnimStep(qEl,id);
        }, FAQ_ANIM_STEP_TIME);
    }
    else faqElStates[id].anim = false;
}

function showFAQQuestions(ev) {
    var qEl = ev.target;
    qEl.classList.remove("expanded");
    var questions = qEl.id;
    var id = parseInt(questions.charAt(questions.length-1));
    document.getElementById("questionaccent_" + id).innerHTML = "Q";
    faqElStates[id].targ = 0;
    if (faqElStates[id].anim) return;
    faqElStates[id].anim = true;
    faqAnimStep(qEl,id);
}

function showFAQAnswers(ev) {
    var qEl = ev.target;
    qEl.classList.add("expanded");
    var questions = qEl.id;
    var id = parseInt(questions.charAt(questions.length-1));
    document.getElementById("questionaccent_" + id).innerHTML = "A";
    faqElStates[id].targ = 1;
    if (faqElStates[id].anim) return;
    faqElStates[id].anim = true;
    faqAnimStep(qEl,id,0);
}

function initFAQSection() {
    for (var i = 0; i < questions.length; i++)
        faqElStates[i] = {cur: 0,targ: 0,anim: false};
    initFAQSectionQuestions();
}

/******************************************************************************/
/******************************* FOOTER ***************************************/
/******************************************************************************/

// footertext
// teamlist

function showFooterTeam() {
    document.getElementById("footertext").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("footertext").style.display = "none";
        document.getElementById("teamlist").style.display = "flex";
        setTimeout(function () {
            document.getElementById("teamlist").style.opacity = 1;
        }, 50);
    }, 500);
}

function hideFooterTeam() {
    document.getElementById("teamlist").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("teamlist").style.display = "none";
        document.getElementById("footertext").style.display = null;
        setTimeout(function () {
            document.getElementById("footertext").style.opacity = null;
        }, 50);
    }, 500);
}

function initFooter() {
    document.getElementById("footerTeamButton").addEventListener("click",showFooterTeam);
}

/******************************************************************************/
/******************************* LOADING **************************************/
/******************************************************************************/

var loadingInterval;

// var loadChs = "-+×*~.,\\|".split("");
var loadChs = "\\|/-".split("");
var curLoadCh = 0;

function loadStep() {
    var loadEl = document.getElementById('title_sp');
    loadEl.innerHTML = loadChs[curLoadCh];
    curLoadCh++;
    if (curLoadCh > loadChs.length-1) curLoadCh = 0;
}

function startLoad() {
    var headerEl = document.getElementsByTagName("header")[0];
    headerEl.style.top = (window.innerHeight/2) - (headerEl.clientHeight/2) + "px";
    loadingInterval = setInterval(loadStep, 100);
}

function endLoad() {
    if (loadingInterval) clearInterval(loadingInterval);
    document.getElementById('title_sp').innerHTML = "-";
    setTimeout(function () {
        document.body.addEventListener("mousemove", handlePageMouseMove);
        var headerEl = document.getElementsByTagName("header")[0];
        headerEl.style.top = 0;
        document.getElementById('loading_overlay').style.opacity = 0;
        setTimeout(function () {
            document.getElementById("mb_cont").style.opacity = 1;
            document.getElementById('loading_overlay').style.display = "none";
            setTimeout(function () {
                document.getElementById('title_sp').innerHTML = "&nbsp;";
                document.getElementById('loading_overlay').parentNode.removeChild(document.getElementById('loading_overlay'));
            }, 1000);
        }, 1100);
    }, 200);
    loaded = true;
}

/******************************************************************************/
/******************************* RESIZE ***************************************/
/******************************************************************************/

var resizeHandlers = [];
var resizeTimeout;

function resize() {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        for (var i = 0; i < resizeHandlers.length; i++) {
            resizeHandlers[i]();
        }
    }, 100);
}

/******************************************************************************/
/******************************* INIT *****************************************/
/******************************************************************************/

function init() {
    startLoad();
    isMobile = chechIfMobile();
    isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    grainOverlay.init();
    initMenu();
    initSections();
    initFooter();
    setTimeout(endLoad, randInt(300,700));
}

window.onload = init;
window.onresize = resize;
