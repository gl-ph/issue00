window.onload = function() {
    //Increment the dial by 10
    var DIAL_INCR = 20;
    //Max volume corresponds with rotation of 90 deg
    var MAX_VOL = 90;
    //Min volume corresponds with rotation of -90 deg
    var MIN_VOL = -90;
    //Initial volume level
    var INIT_VOL = 0.50;

    //Element for speaking audio
    var voice = document.getElementById("voice");
    voice.volume = INIT_VOL;
    //Element for morse code audio
    var morse = document.getElementById("morse");
    morse.volume = INIT_VOL;

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
    var button1 = document.getElementById("img3");
    //activates button press image and mutes or unmutes sound
    button1.onmousedown = function(){
        buttonPress(button1);
        //make bool val opposite of what it currently is
        voice.muted = !voice.muted;
        morse.muted = !morse.muted;
    }; 
    //returns to button up image
    button1.onmouseup = function(){buttonUp(button1);};

    //This button goes to piece
    var button2 = document.getElementById("img4");
    //Standard button press animation and redirect to piece
    button2.onmousedown = function(){
        buttonPress(button2);
        window.location.href = "/issue00/communicationInThePresenceOfNoise/Communication/index.html";
    };

    //This button turns the music on
    var button3 = document.getElementById("img5");
    //show button animation and turn music on
    button3.onmousedown = function(){
        buttonPress(button3);
        voice.play();
        morse.play();
    }
    button3.onmouseup = function(){buttonUp(button3);};

    //rotate knob1 and change volume as directed
    knob1.element.addEventListener('click', function(){
        setKnob(knob1, voice);
    });

    //rotate knob2 and change volume as directed
    knob2.element.addEventListener('click', function(){
        setKnob(knob2, morse);
    });
    
    //called when button is pressed
    function buttonPress(button){
        button.src = 'assets/images/pressed_btn@4x.png';
    }

    //called when button press is released
    function buttonUp(button){
        button.src = 'assets/images/unpressed_btn@4x.png';
    }

    /**
     * handles knob rotation when it is clicked 
     * changes the knob direction if a MIN or MAX volume is hit
     * changes the knob degree when rotated
     *  
     * @param {Knob Object} knob the knob that is currently being clicked 
     */
    function setKnob(knob, audio){
        if (knob.direction){
            knob.element.setAttribute('style', 'transform:rotate(' + (knob.deg + DIAL_INCR) + 'deg)');
            knob.deg += DIAL_INCR;
            changeVol(audio, knob)
            if (knob.deg >= MAX_VOL){
                knob.direction = false;
            }
        }
        else {
            knob.element.setAttribute('style', 'transform:rotate(' + (knob.deg - DIAL_INCR) + 'deg)');
            knob.deg -= DIAL_INCR;
            changeVol(audio, knob)
            if (knob.deg <= MIN_VOL){
                knob.direction = true;
            }
        }
    }

    /**
     * Changes the volume of specified audio by getting direction
     *      of knob to know if to increase or decrease
     * if knob degree rotation is close to endpoints, increase the
     *      the rate of volume change to get closer to max and min values
     * 
     * @param {Audio element} audio audio object to have vol changed
     * @param {Knob Object} knob get deg and direction of knob
     */
    function changeVol(audio, knob){
        var VOL_INCR;
        console.log(audio.volume);
        if (Math.abs(knob.deg) > 80)
            //set volume incrementor near endpoints
            VOL_INCR = 0.099;
        else
            //standard volume incrementor value
            VOL_INCR = 0.10;
        audio.volume = ((knob.direction) ? audio.volume + VOL_INCR: audio.volume - VOL_INCR);
    }

};