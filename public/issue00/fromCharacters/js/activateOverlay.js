$(document).ready(function() {
    let color = "black", outline = "white";
    const overlay = new Overlay(2, color, outline);
    overlay.addContent("title", showTitle);
    // overlay.addContent("interview", showInterview);
    // overlay.addContent("critical", showCritical);
    overlay.render(color, outline);
});

function showTitle(){
    let titleCard = document.createElement("DIV");
    titleCard.id = "titleCard";
    //title card styles
    titleCard.style.position = "absolute";
    titleCard.style.left = "33vw";
    titleCard.style.top = "20vh";
    titleCard.style.backgroundColor = "black";
    titleCard.style.color = "white";
    titleCard.style.padding = "3vw 4vw";
    titleCard.style.width = "33vw";

    //piece title
    let title = document.createElement("H1");
    title.textContent = "From Characters";

    //author name
    let authorName = document.createElement("H2");
    authorName.textContent = "By Nick Monfort";

    //piece links
    let linkList = document.createElement("UL");

    //B
    let B = document.createElement("LI");
    let B_link = document.createElement("A");
    B_link.target = "blank";
    B_link.textContent = "B_Construction";
    B_link.href = "piece/b_construction.html";
    B.appendChild(B_link);

    //I
    let I = document.createElement("LI");
    let I_link = document.createElement("A");
    I_link.target = "blank";
    I_link.textContent = "I_Attitudes_Compound";
    I_link.href = "piece/i_attitudes_compound.html";
    I.appendChild(I_link);

    //L
    let L = document.createElement("LI");
    let L_link = document.createElement("A");
    L_link.target = "blank";
    L_link.textContent = "L_Typing_Her";
    L_link.href = "piece/l_typing_her.html";
    L.appendChild(L_link);

    //O
    let O = document.createElement("LI");
    let O_link = document.createElement("A");
    O_link.target = "blank";
    O_link.textContent = "O_Right_Around";
    O_link.href = "piece/o_right_around.html";
    O.appendChild(O_link);

    //X
    let X = document.createElement("LI");
    let X_link = document.createElement("A");
    X_link.target = "blank";
    X_link.textContent = "X_The_Spot";
    X_link.href = "piece/x_the_spot.html";
    X.appendChild(X_link);
    
    let bio = document.createElement("p");
    bio.innerHTML="Nick Montfort constructs computational poetry online, for galleries, and for publication in books such as <em>#!, Autopia, The Truelist</em>, and <em>Hard West Turn</em>. He is professor of digital media at MIT, where he directs The Trope Tank. Montfort edits Using Electricity, a series of computer-generated books from Counterpath. He runs the micropress Bad Quarto and publishes the online magazine <em>Taper</em>. His most recent non-computer-generated book is <em>The Future</em> (MIT Press, 2017). He lives in New York and Boston.";
    

    //exit button
    let exitButton = document.createElement("BUTTON");
    exitButton.id = "exitButton"; 
    exitButton.textContent = "X";
    exitButton.addEventListener("click", () => {
        let titleCard = document.getElementById("titleCard")
        titleCard.parentElement.removeChild(titleCard);
    });

    //append links to list
    linkList.appendChild(B);
    linkList.appendChild(I);
    linkList.appendChild(L);
    linkList.appendChild(O);
    linkList.appendChild(X);

    //append children
    titleCard.appendChild(exitButton);
    titleCard.appendChild(title);
    titleCard.appendChild(authorName);
    titleCard.appendChild(linkList);
    titleCard.appendChild(bio);
    document.body.appendChild(titleCard);

}

// function showInterview(){}
// function showCritical(){}