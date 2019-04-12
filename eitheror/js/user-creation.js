"use strict";

//All of the variables from the document
let either = document.querySelector("#either");
let slash = document.querySelector("#slash");
let or = document.querySelector("#or");
let app = document.querySelector("#app");
let mediaButton = document.querySelector("#play");
let audio = document.querySelector("audio");

//Arrays for the different lexia/texts
let eitherTexts = new Array();
let slashTexts = new Array();
let orTexts = new Array();

/**
 * This function store the inputs with their respective ids
 * in the local storage
 */
function storeInput(){
  let eitherInput = document.getElementById("either").value;
  localStorage.setItem("eitherInput", eitherInput);

  let slashInput = document.getElementById("slash").value;
  localStorage.setItem("slashInput", slashInput);

  let orInput = document.getElementById("or").value;
  localStorage.setItem("orInput", orInput);
}

/**
* This function gets the input that was stored 
* in the local storage under the key name
*/
function getInput(name){
var item = localStorage.getItem(name);
return item;
}

/**
* This function retrieves the input data stored in the local storage 
* For each group of data (eitherInput, orInput, slashInput), the String value
* stored there is splitted by a newline character ('\n') into different parts.
* These parts will then be appended to their respective arrays.
* 
* Pre-conditions: 
*      In order for this to work as it was intended, storeInput() has
* to be called at some point before this. Otherwise, getInput() 
* probably returns nothing or "". In this case, this function will
* do nothing or maybe crash too...
*/
function addElementToTheList(){
  var eitherLists = getInput("eitherInput").split("\n");
  var slashLists = getInput("slashInput").split("\n");
  var orLists = getInput("orInput").split("\n");

  eitherLists.forEach(function(item){
    eitherTexts.push(item);
  });

  slashLists.forEach(function(item){
    slashTexts.push(item);
  });

  orLists.forEach(function(item){
    orTexts.push(item);
  });
  
    while (eitherTexts.length > slashTexts.length){
      slashTexts.push(eitherTexts[eitherTexts.length -1]);
      orTexts.push(eitherTexts[eitherTexts.length -1]);
   }
    while (orTexts.length < slashTexts.length){
      orTexts.push(slashTexts[orTexts.length-1]);
    }
  }

addElementToTheList();

//An array of all the arrays of texts
let allTexts = [eitherTexts, slashTexts, orTexts];
//Array of possible starting words
let choice = ["either", "/", "or", "neither"];
//Array of colors for background
let posColors = ["#FF3B3F", "#0375B4", "#F7B733","#CAEBF2", "#A239CA"];
//Random topic/color value
let topic = Math.floor(Math.random() * eitherTexts.length);

let toggle = false;

tick();

//The play/pause button. Linked to the soundToggle function on a click
mediaButton.isPlaying = true;
mediaButton.addEventListener("click", soundToggle);
mediaButton.addEventListener("touchend", soundToggle);

either.myArray = eitherTexts;
either.init = 0;

slash.myArray = slashTexts;
slash.init = 1;

or.myArray = orTexts;
or.init = 2;

//Set the functions to the app words and initialize the first choice
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
{
  either.addEventListener("touchend", getPhrase);
  slash.addEventListener("touchend", getPhrase);
  or.addEventListener("touchend", getPhrase);
  mediaButton.isPlaying = false;
  audio.pause();
}
else
{
  either.addEventListener("mouseover", getPhrase);
  either.addEventListener("mouseleave", reset);
  either.addEventListener("click", swap);

  slash.addEventListener("mouseover", getPhrase);
  slash.addEventListener("mouseleave", reset);
  slash.addEventListener("click", swap);

  or.addEventListener("mouseover", getPhrase);
  or.addEventListener("mouseleave", reset);
  or.addEventListener("click", swap);
}

//A ticking function to pass the time and cycle through the topics
function tick()
{
  setTimeout(tick,50000);
  topic++;
  if(topic >= eitherTexts.length)
  {
    topic = 0;
  }

  //Change the background color depending on the topic
  app.style.backgroundColor = posColors[topic];
}

//Gets a new lexia based off the current topic. Displays it in the hovered word
function getPhrase()
{
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
    this.style.fontSize = "12px";
    toggle = !toggle;
  }
  else
  {
    //Styles for legibility
    this.style.fontSize = "30px";
    this.style.cursor = "crosshair";
  }

  //The neither term does not have any associated texts
  if(this.init == 3)
  {
    this.innerHTML = "neither";
    this.style.fontSize = "70px";
  }
  else
  {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {
      this.style.fontSize = "18px";

      if(toggle)
      {
        this.innerHTML = allTexts[this.init][topic];
      }
      else
      {
        this.innerHTML = choice[this.init];
        this.style.fontSize = "40px";
      }
    }
    else
    {
      this.innerHTML = allTexts[this.init][topic];

      //Styles for legibility
      this.style.fontSize = "30px";
    }
  }

    mediaButton.style.visibility = "hidden";
    mediaButton.style.opacity = "0";
    mediaButton.style.transition = "visibility 3s linear,opacity 3s linear";
}

//When the mouse releases the word, set it back to the initial term
function reset()
{
  this.innerHTML = choice[this.init];
  this.style.fontSize = "70px";

    mediaButton.style.visibility = "visible";
    mediaButton.style.opacity = "1";
}

//On a click, the term should cycle through terms and lexias
function swap()
{
  this.init++;

  if(this.init > 3)
  {
    this.init = 0;
  }

  if(this.init == 3)
  {
    this.innerHTML = "neither";

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {
      this.style.fontSize = "40px";
    }
    else
    {
      this.style.fontSize = "70px";
    }
  }
  else
  {
    this.innerHTML = allTexts[this.init][topic];
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {
      this.style.fontSize = "20px";
    }
    else
    {
      this.style.fontSize = "30px";
    }
  }
}

//Play and pause the music, also change the image
function soundToggle()
{
  if(this.isPlaying)
  {
    audio.pause();
    this.src = "media/play.png";
  }
  else
  {
    audio.play();
    this.src = "media/pause.png";
  }

  this.isPlaying = !this.isPlaying;
}
