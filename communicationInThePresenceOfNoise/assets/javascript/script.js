window.onload = function() {
    //Increment the dial by 10
    var DIAL_INCR = 10;
    //Max volume corresponds with rotation of 90 deg
    var MAX_VOL = 90;
    //Min volume corresponds with rotation of -90 deg
    var MIN_VOL = -90;

    /**
     * left knob
     * element: html element with id "img1"
     * deg: initial degree rotation is 0
     * direction: initial direction is true, to the left
     */
    var knob1 = { 
        element: document.getElementById("img1"), 
        deg: 0, 
        direction: true
    };

    /**
     * right knob
     * element: html element with id "img2"
     * deg: initial degree rotation is 0
     * direction: initial direction is true, to the left
     */
    var knob2 = {
        element: document.getElementById("img2"),
        deg: 0,
        direction: true
    };

    //The button that turns the sound on 
    var button = document.getElementById("img3");
    button.onmousedown = buttonPress;
    button.onmouseup = buttonUp;

    knob1.element.addEventListener('click', function(){setKnob(knob1);});

    knob2.element.addEventListener('click', function(){setKnob(knob2);});
    
    //called when button is pressed
    function buttonPress(){
        button.src = 'assets/images/pressed_btn@4x.png';
    }

    //called when button press is released
    function buttonUp(){
        button.src = 'assets/images/unpressed_btn@4x.png';
    }

    /**
     * handles knob rotation when it is clicked 
     * changes the knob direction if a MIN or MAX volume is hit
     * changes the knob degree when rotated
     *  
     * @param {Object} knob the knob that is currently being clicked 
     */
    function setKnob(knob){
        if (knob.direction){
            knob.element.setAttribute('style', 'transform:rotate(' + (knob.deg + DIAL_INCR) + 'deg)');
            knob.deg += DIAL_INCR;
            if (knob.deg == MAX_VOL){
                knob.direction = false;
            }
        }
        else {
            knob.element.setAttribute('style', 'transform:rotate(' + (knob.deg - DIAL_INCR) + 'deg)');
            knob.deg -= DIAL_INCR;
            if (knob.deg == MIN_VOL){
                knob.direction = true;
            }
        }
    }

};