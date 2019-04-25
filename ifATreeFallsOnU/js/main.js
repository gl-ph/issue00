$(document).ready(function() {
    window.overlay = new Overlay(3, 'white', 'black');
    
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
    if (document.getElementById('popup') !== null) {
        document.getElementById('popup').style.zIndex = 999;
    } else {
        createPopup();
        document.getElementById('popup').style.zIndex = 999;
    }
    if (document.getElementById('phone') !== null) {
        document.getElementById('phone').style.zIndex = 998;
    }
    if (document.getElementById('chat-wrapper') !== null) {
        document.getElementById('chat-wrapper').style.zIndex = 997;
    }
}

function showInterview() {
    if (document.getElementById('popup') !== null) {
        document.getElementById('popup').style.zIndex = 998;
    }
    if (document.getElementById('phone') !== null) {
        document.getElementById('phone').style.zIndex = 999;
    } else {
        initializePhone();
        document.getElementById('phone').style.zIndex = 999;
    }
    if (document.getElementById('chat-wrapper') !== null) {
        document.getElementById('chat-wrapper').style.zIndex = 997;
    }
}

function showChat() {
    if (document.getElementById('popup') !== null) {
        document.getElementById('popup').style.zIndex = 998;
    }
    if (document.getElementById('phone') !== null) {
        document.getElementById('phone').style.zIndex = 997;
    }
    if (document.getElementById('chat-wrapper') !== null) {
        document.getElementById('chat-wrapper').style.zIndex = 999;
    } else {
        initializeChat();
        document.getElementById('chat-wrapper').style.zIndex = 999;
    }
}

// function hideEverything() {
//     destroyPhone();
//     destroyChat();
// }

function initializeDrag(id) {
    var mouse;
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
            mouse = { x: event.clientX, y: event.clientY };
            div.style.left = (mouse.x + offset[0]) + 'px';
            div.style.top  = (mouse.y + offset[1]) + 'px';
        }
    }, true);

    div.addEventListener('touchstart', function(e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.touches[0].clientX,
            div.offsetTop - e.touches[0].clientY
        ];
    }, true);

    document.addEventListener('touchend', function() {
        isDown = false;
    }, true);

    document.addEventListener('touchmove', function(event) {
        if (isDown) {
            mouse = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            div.style.left = (mouse.x + offset[0]) + 'px';
            div.style.top  = (mouse.y + offset[1]) + 'px';
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
    popup.appendChild(document.createTextNode('by Brandon Dcruz'));
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