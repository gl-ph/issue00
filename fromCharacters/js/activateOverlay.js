$(document).ready(function() {
    let color = "black", outline = "white";
    const overlay = new Overlay(2, color, outline);
    overlay.addContent("title", showTitle);
    overlay.addContent("interview", showInterview);
    overlay.addContent("critical", showCritical);
    overlay.render(color, outline);
});

function showTitle(){
    // let titleCard = document.createElement("DIV");
    // let title = document.createElement("P");
    // title.textContent = "From Characters";
    // titleCard.appendChild(title);
    // titleCard.style("positon","absolute");
    // document.getElementById("body").appendChild(titleCard);

}

function showInterview(){}

function showCritical(){}