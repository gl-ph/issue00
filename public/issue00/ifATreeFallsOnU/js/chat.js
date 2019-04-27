// Initialize Firebase - test db, don't use in final site
var config = {
    apiKey: "AIzaSyDF4clJiI09UTLm_xJuZ-ZJT1wI598PPGU",
    authDomain: "gl-ph-a275f.firebaseapp.com",
    databaseURL: "https://gl-ph-a275f.firebaseio.com",
    projectId: "gl-ph-a275f",
    storageBucket: "gl-ph-a275f.appspot.com",
    messagingSenderId: "1084963336851"
};
firebase.initializeApp(config);

//firebase reference
let ref;

let username = sessionStorage.getItem('username');

function sendMessage(username, messageText) {
    firebase.database().ref('/messages/').push({
        name: username,
        text: messageText
    }).catch(function(error) {
        console.error('Error writing to database', error);
    });
}

function displayMessage(name, text) {
    if (name === username) {
        $('#chat-box').append('<div class="chat-self"><b>' + name + ':</b> ' + text + '</div>');
    } else {
        $('#chat-box').append('<div><b>' + name + ':</b> ' + text + '</div>');
    }

    div = document.getElementById('chat-box'); // have to reload the object
    div.scrollTop = parseInt(div.scrollHeight);
}

function loadMessages() {
    var callback = function(snap) {
        displayMessage(snap.val().name, snap.val().text);
    };

    if (ref === undefined) {
        ref = firebase.database().ref('/messages/');
    }

    ref.on('child_added', callback);
}

function initializeChat() {
    createChat();
    initializeDrag('chat-wrapper');

    loadMessages();

    $('#chat-input').on('keyup', function(event) {
        if (event.keyCode == 13) { // 13 = Enter Key
            if (username) {
                sendMessage(username, $('#chat-input').val());
                // displayMessage(username, $('#chat-input').val());
                $('#chat-input').val('');
            } else {
                loginToChat();
            }
        }
    });
}

function loginToChat() {
    if (username === null || username === '' || username === undefined) {
        username = prompt('Please enter your username:', 'guest');

        if (username === null || username.trim() === '') {
            username = 'guest'; //default user is guest
        } else {
            username = username.trim();
            sessionStorage.setItem('username', username);
        }
    }
}

function destroyChat() {
    let element = document.getElementById('chat-wrapper');
    if (element) {
        element.parentNode.removeChild(element);
    
        $('#chat-input').off('keyup');

        ref.off();
    }
}

function createChat() {
    var chatWrapper = document.createElement('div');
    var chatHeader = document.createElement('div');
    var chatBox = document.createElement('div');
    var chatInput = document.createElement('input');
    var chatButton1 = document.createElement('img');
    var chatPattern1 = document.createElement('div');
    var chatTitle = document.createElement('div');
    var chatPattern2 = document.createElement('div');
    var chatButton2 = document.createElement('img');
    var chatButton3 = document.createElement('img');

    chatWrapper.id = 'chat-wrapper';
    chatHeader.id = 'chat-header';
    chatBox.id = 'chat-box';
    chatInput.id = 'chat-input';
    chatInput.type = 'text';
    chatPattern1.className = 'pattern';
    chatPattern2.className = 'pattern';
    chatTitle.className = 'chat-title';
    chatTitle.innerText = 'Chat';
    chatButton1.src = 'media/button.png';
    chatButton2.src = 'media/button.png';
    chatButton3.src = 'media/button.png';
    
    // randomize starting position
    let top = Math.floor(Math.random() * (60));
    let left = Math.floor(Math.random() * (70));
    chatWrapper.style.top = top + '%';
    chatWrapper.style.left = left + '%';

    chatHeader.appendChild(chatButton1);
    chatHeader.appendChild(chatPattern1);
    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(chatPattern2);
    chatHeader.appendChild(chatButton2);
    chatHeader.appendChild(chatButton3);

    chatWrapper.appendChild(chatHeader);
    chatWrapper.appendChild(chatBox);
    chatWrapper.appendChild(chatInput);

    document.getElementsByTagName('body')[0].appendChild(chatWrapper);

    document.querySelectorAll('#chat-header > img').forEach((element) => {
        element.addEventListener('click', function() {
            window.overlay.callEvent('title');
            destroyChat();
        });
    });
}