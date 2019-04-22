$(document).ready(function() {
    window.overlay = new Overlay(4, 'white', 'black');
    
    overlay.addContent("title", showTitle);
    overlay.addContent("interview", showInterview);
    overlay.addContent("misc", showChat);
    
    overlay.render();
    // document.getElementById('piece-link').addEventListener('click', function() {
    //     window.overlay.callEvent('critical');
    // });
    // document.getElementById('interview-link').addEventListener('click', function() {
    //     window.overlay.callEvent('interview');
    // });
    // document.getElementById('chat-link').addEventListener('click', function() {
    //     window.overlay.callEvent('fun');
    // });

    createPopup();

    initializePhone();
    initializeChat();
});

function showTitle() {
    // hideEverything();
    document.getElementById('popup').style.zIndex = 999;
    document.getElementById('phone').style.zIndex = 998;
    document.getElementById('chat-wrapper').style.zIndex = 997;
}

function showInterview() {
    // hideEverything();
    // document.getElementById('interview-link').classList.add('visited');
    // initializePhone();
    document.getElementById('popup').style.zIndex = 998;
    document.getElementById('phone').style.zIndex = 999;
    document.getElementById('chat-wrapper').style.zIndex = 997;
}

function showChat() {
    // hideEverything();
    // document.getElementById('chat-link').classList.add('visited');
    // initializeChat();
    document.getElementById('popup').style.zIndex = 997;
    document.getElementById('phone').style.zIndex = 998;
    document.getElementById('chat-wrapper').style.zIndex = 999;
}

function hideEverything() {
    destroyPhone();
    destroyChat();
}

function initializeDrag(id) {
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

function destroyPopup() {
    let element = document.getElementById('popup');
    if (element) {
        element.parentNode.removeChild(element);
    
        $('#popup').off('keyup');

        ref.off();
    }
}

function createPopup() {
    var popup = document.createElement('div');
    var xButton = document.createElement('span');
    var viewButton = document.createElement('button');

    popup.id = 'popup';
    xButton.id = 'close-popup';
    viewButton.id = 'piece-link';

    xButton.innerText = 'x';
    viewButton.innerText = 'view';

    popup.appendChild(xButton);
    popup.appendChild(document.createTextNode('if a tree falls on u'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createTextNode('Brandon Dcruz'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(viewButton);

    document.getElementsByTagName('body')[0].appendChild(popup);

    document.getElementById('close-popup').addEventListener('click', function() {
        window.overlay.callEvent('title');
    });

    document.getElementById('piece-link').addEventListener('click', function() {
        window.open('/public/issue00/trees/trees.html');
    });

    initializeDrag('popup');
}