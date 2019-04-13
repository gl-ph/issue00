document.getElementById("issue").addEventListener("click",toggle);

document.getElementById("editor").addEventListener("click",toggle);

function toggle(){
    let editor =document.getElementById("editor");
    style = window.getComputedStyle(editor);
    display = style.getPropertyValue('display');
    if (display=="none"){
        editor.style.display="block";
    } else {
        editor.style.display = "none";
    }
}