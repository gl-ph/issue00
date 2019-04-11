$(document).ready(function() {
    window.overlay = new Overlay(4, 'white', 'black');
    
    overlay.addContent("title", showTitle);
    overlay.addContent("interview", showInterview);
    overlay.addContent("critical", showCritical);
    overlay.addContent("fun", showChat);
    
    overlay.render();
    document.getElementById('piece-link').addEventListener('click', function() {
        window.overlay.callEvent('critical');
    });
    document.getElementById('interview-link').addEventListener('click', function() {
        window.overlay.callEvent('interview');
    });
    document.getElementById('chat-link').addEventListener('click', function() {
        window.overlay.callEvent('fun');
    });
});

function showTitle() {
    hideEverything();
}

function showInterview() {
    hideEverything();
    document.getElementById('interview-link').classList.add('visited');
    initializePhone();
}

function showChat() {
    hideEverything();
    document.getElementById('chat-link').classList.add('visited');
    initializeChat();
}

function showCritical() {
    hideEverything();
    document.getElementById('piece-link').classList.add('visited');
    showTitle();
}

function hideEverything() {
    destroyPhone();
    destroyChat();
}

function initalizeDrag(id) {
    var mousePosition;
    var offset = [0,0];
    var div;
    var isDown = false;

    div = document.getElementById(id);

    document.body.appendChild(div);

    div.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
        
                x : event.clientX,
                y : event.clientY
        
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}