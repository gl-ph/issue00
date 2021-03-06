$(document).ready(function() {
    window.overlay = new Overlay(3, 'white', 'black');
    
    overlay.addContent("title", showTitle);
    overlay.addContent("interview", showInterview);
    overlay.addContent("misc", showChat);
    
    overlay.render();

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

    // first time entering chat they must enter username
    loginToChat();
}

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
    
    let bio = document.createElement("p");
    bio.id = "bio";
    bio.innerHTML = 'Brandon Dcruz is a fourth-year SOIS student at RIT studying music composition and production, creative writing, web design, and film. He is the president of the RIT Jam Club, a former literary team lead for Signatures Magazine, and the director of the Altona Meadows BIG BAND! Brandon is also a frequent composer for various RIT student films, including last year\'s "Nobody\'s Home" directed by Jesse James. When he\'s not performing on stages, Brandon loves exploring record stores, tinkering with JavaScript oddities, napping, or drumming for the RIT Jazz Ensemble or local band Cigs Inside. His work can be found on his website https://dcruzships.github.io/, or on Facebook, YouTube, and Spotify @AltonaMeadows.'
    
    popup.appendChild(xButton);
    popup.appendChild(document.createTextNode('if a tree falls on u'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createTextNode('by Brandon Dcruz'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(viewButton);
    popup.appendChild(bio);

    document.getElementsByTagName('body')[0].appendChild(popup);

    document.getElementById('close-popup').addEventListener('click', function() {
        destroyPopup();
        if (Math.random() > 0.5) {
            window.overlay.callEvent('interview');
        } else {
            window.overlay.callEvent('misc');
        }
    });

    document.getElementById('piece-link').addEventListener('click', function() {
        window.open('piece/trees.html');
    });

    initializeDrag('popup');
}