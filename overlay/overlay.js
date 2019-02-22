const topLeft = `<div class="item" style="top: 0; left: 0;" id="glyph1">*</div>`;
const topRight = `<div class="item" style="top: 0; right: 0;" id="glyph2">{sym}</div>`;
const bottomLeft = `<div class="item" style="bottom: 0; left: 0;" id="glyph3">{sym}</div>`;
const bottomRight = `<div class="item" style="bottom: 0; right: 0;" id="glyph4">{sym}</div>`;
const listItem = `<div class="item" style="bottom: {bottom}; right: {right};" id="glyph{id}">{sym}</div>`;
const glphTitle = `<a class="item" id="glphTitle" href="https://gl-ph.com">gl-ph</a>`;

let types = {
    "title": {char: "*", id: "#glyph1", event: null},
    "interview": {char: "+", id: "", event: null},
    "critical": {char: "&amp;", id: "", event: null},
    "extra": {char: "~", id: "#glyph4", event: null},
    "fun": {char: "!", id: "", event: null},
    "fun2": {char: "#", id: "", event: null},
    "fun3": {char: "=", id: "", event: null},
    "fun4": {char: "?", id: "", event: null},
};

let data = {};

// keep track of current state
let active = 'title';

/**
The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
See https://github.com/coolaj86/knuth-shuffle
**/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let addNew = function(type, callback) {
    data[type] = callback;
}

let toggleList = function(glyphs) {
    for (let i = 0; i < glyphs.length; i++) {
        id = 5 + i;
        $('#glyph' + id).toggle();
    }
}

let addListButtons = function(glyphs) {
    let id;
    let bottom = 100;
    let right = 100;
    
    for (let i = 0; i < glyphs.length; i++) {
        id = 5 + i;
        types[glyphs[i]].id = '#glyph' + id;
        $('body').prepend(listItem.replace("{sym}", types[glyphs[i]].char).replace("{id}", id).replace("{bottom}", bottom).replace("{right}", right));
        
        $(types[glyphs[i]].id).toggle();
        
        createHandler(glyphs, glyphs[i]);
        
        bottom += 100;
        right += 100;
    }
}

let createHandler = function(glyphs, type) {
    let id = types[type].id;
    
    let callback = function() {
        $("div.item").css("text-decoration", "");
        
        if (active === type) {
            // reset to title page
            active = 'title';
            $(types['title'].id).css("text-decoration", "underline");
            
            data['title']();
        } else {
            active = type;
            $(types[type].id).css("text-decoration", "underline");
            
            data[type]();
        }
    };
    
    if (glyphs.length > 0) {
        let wrapCallback = function(values, callbackFunc) {
            if ($('#glyph5').css('display') !== 'none') {
                toggleList(values);
            }
            callbackFunc();
        }.bind(null, glyphs, callback);
        
        $(id).click(wrapCallback);
        types[type].event = wrapCallback;
    } else {
        $(id).click(callback);
        types[type].event = callback;
    }
}

// takes in base color and outline color
let render = function(color, outline) {
    $('body').prepend(glphTitle);
    $('.item#glphTitle').mouseenter(function() {
        $('.item#glphTitle').text('gl~ph');
    });
    $('.item#glphTitle').mouseleave(function() {
        $('.item#glphTitle').text('gl-ph');
    });
    
    if (color === undefined) {
        color = "black";
    }
    if (outline === undefined) {
        outline = "white";
    }
    
    glyphs = Object.keys(data).filter(name => name !== "title");
    glyphs = shuffle(glyphs);
    
    let typeOne = glyphs.pop();
    let typeTwo = glyphs.pop();
    
    if (glyphs.length > 1) {
        // button for toggling the list of extra glyphs
        $('body').prepend(bottomRight.replace("{sym}", types["extra"].char));
        $(types["extra"].id).click(toggleList.bind(null, glyphs));
        addListButtons(glyphs);
    } else if (glyphs.length > 0) {
        // in this case there are three extra glyphs
        let typeTemp = glyphs.pop();
        types[typeTemp].id = "#glyph4";
        $('body').prepend(bottomRight.replace("{sym}", types[typeTemp].char));
        createHandler(glyphs, typeTemp);
    }
    
    $('body').prepend(topLeft);
    $(types['title'].id).click();
    
    createHandler(glyphs, 'title');
    
    if (typeOne !== undefined) {
        types[typeOne].id = "#glyph2";
        $('body').prepend(topRight.replace("{sym}", types[typeOne].char));
        createHandler(glyphs, typeOne);
    }
    
    if (typeTwo !== undefined) {
        types[typeTwo].id = "#glyph3";
        $('body').prepend(bottomLeft.replace("{sym}", types[typeTwo].char));
        createHandler(glyphs, typeTwo);
    }
    
    $(".item").css("color", color);
    $(".item").css("text-shadow", `
        -1px -1px 0 ` + outline + `,
        1px -1px 0 ` + outline + `,
        -1px 1px 0 ` + outline + `,
        1px 1px 0 ` + outline + `,
        -2px 0 0 ` + outline + `,
        2px 0 0 ` + outline + `,
        0 2px 0 ` + outline + `,
        0 -2px 0 ` + outline);
    
    $(types['title'].id).css("text-decoration", "underline");
}

let callEvent = function(type) {
    types[type].event();
}