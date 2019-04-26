const topLeft = `<div class="item" style="top: 0; left: 0;" id="glyph1">~</div>`;
const topRight = `<div class="item" style="top: 0; right: 0;" id="glyph2">{sym}</div>`;
const bottomLeft = `<div class="item" style="bottom: 0; left: 0;" id="glyph3">{sym}</div>`;
const bottomRight = `<div class="item" style="bottom: 0; right: 0;" id="glyph4">{sym}</div>`;
const listItem = `<div class="item" style="bottom: {bottom}; right: {right};" id="glyph{id}">{sym}</div>`;
const glphTitle = `<a class="item" id="glphTitle" href="/issue00/index.html">gl-ph</a>`;

// stores the mapping of content type to its glyph
let typeModels = {
    "title": {char: "~", id: "#glyph1", event: null, callback: null},
    "interview": {char: '"', id: "", event: null, callback: null},
    "critical": {char: "&amp;", id: "", event: null, callback: null},
    "extra": {char: "*", id: "#glyph4", event: null, callback: null},
    "misc": {char: "&#8253;", id: "", event: null, callback: null},
    "foreward": {char: ":", id: "", event: null, callback: null},
    "review": {char: "@", id: "", event: null, callback: null},
};

class Overlay {
    constructor(itemCount, color, outline) {
        this.itemCount = itemCount;
        this.color = color;
        this.outline = outline;
        this.active = 'title';
        
        this.types = {};

        if (this.itemCount > 4) {
            this.types['extra'] = typeModels['extra'];
        }
    }

    addContent(type, callback) {
        this.types[type] = typeModels[type];
        this.types[type].callback = callback;
    }
    
    callEvent(type) {
        this.types[type].event();
    }
    
    toggleList() {
        for (let i = 5; i <= this.itemCount + 1; i++) {
            $('#glyph' + i).toggle();
        }
    }
    
    addExpandingList(glyphs) {
        let id, data;
        let bottom = 100;
        let right = 100;

        // a portrait orientation can have issues with the list positioning
        let isPortrait = (window.innerHeight / window.innerWidth) > 1;
        
        if (isPortrait) {
            right = 50;
        }

        $('body').prepend(bottomRight.replace("{sym}", this.types["extra"].char));
        $(this.types["extra"].id).click(this.toggleList.bind(this));
        
        for (let i = 0; i < glyphs.length; i++) {
            id = 5 + i;
            this.types[glyphs[i]].id = '#glyph' + id;

            data = listItem.replace("{sym}", this.types[glyphs[i]].char)
                .replace("{id}", id)
                .replace("{bottom}", bottom)
                .replace("{right}", right);

            $('body').prepend(data);
            
            $(this.types[glyphs[i]].id).toggle();
            
            this.createHandler(glyphs[i]);
            
            bottom += 100;

            if (isPortrait) {
                right += 50;
            } else {
                right += 100;
            }
        }
    }
    
    createHandler(type) {
        let id = this.types[type].id;
        
        let callback = (function() {
            $("div.item").css("text-decoration", "");
            
            if (this.itemCount > 4) {
                if ($('#glyph5').css('display') !== 'none') {
                    this.toggleList();
                }
            }

            if (this.active === type) {
                // reset to title page
                this.active = 'title';
                $(this.types['title'].id).css("text-decoration", "underline");
                
                this.types['title'].callback();
            } else {
                this.active = type;
                $(this.types[type].id).css("text-decoration", "underline");
                
                this.types[type].callback();
            }
        }).bind(this);
        
        $(id).click(callback);
        this.types[type].event = callback;
    }
    
    render() {
        $('body').prepend(glphTitle);
        $('.item#glphTitle').mouseenter(function() {
            $('.item#glphTitle').text('gl~ph');
        });
        $('.item#glphTitle').mouseleave(function() {
            $('.item#glphTitle').text('gl-ph');
        });
        
        let glyphs = Object.keys(this.types).filter(name => name !== "title" && name !== "extra");
        glyphs = shuffle(glyphs);
        
        $('body').prepend(topLeft);
        this.createHandler('title');

        if (this.itemCount > 4) {
            // button for toggling the list of extra glyphs
            this.addExpandingList(glyphs.slice(2));
            // only use the first two values in loop below
            glyphs = glyphs.slice(0, 2);
        }

        for (let i = 0; i < glyphs.length; i++) {
            let type = glyphs[i];
            this.types[type].id = "#glyph" + (i + 2);

            let data = "";

            if (i === 0) {
                data = topRight.replace("{sym}", this.types[type].char);
            } else if (i === 1) {
                data = bottomLeft.replace("{sym}", this.types[type].char);
            } else if (i === 2) {
                data = bottomRight.replace("{sym}", this.types[type].char);
            } else {
                console.error("Unexpected number of extras");
            }

            $('body').prepend(data);
            this.createHandler(type);
        }
        
        $(".item").css("color", this.color);
        $(".item").css("text-shadow", `
            -1px -1px 0 ` + this.outline + `,
            1px -1px 0 ` + this.outline + `,
            -1px 1px 0 ` + this.outline + `,
            1px 1px 0 ` + this.outline + `,
            -2px 0 0 ` + this.outline + `,
            2px 0 0 ` + this.outline + `,
            0 2px 0 ` + this.outline + `,
            0 -2px 0 ` + this.outline);
        
        $(this.types['title'].id).css("text-decoration", "underline");
    }
}

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
