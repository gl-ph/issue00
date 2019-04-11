// Initialize Firebase - test db, don't use in final site
var config = {
    apiKey: 'AIzaSyAZEOf6-TL6CDZXsyr4KyLnRxjh_NOcQU0',
    authDomain: 'test-chat-b8de5.firebaseapp.com',
    databaseURL: 'https://test-chat-b8de5.firebaseio.com',
    projectId: 'test-chat-b8de5',
    storageBucket: 'test-chat-b8de5.appspot.com',
    messagingSenderId: '847056541338'
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
}

function loadMessages() {
    var callback = function(snap) {
        displayMessage(snap.val().name, snap.val().text);
    };

    if (ref === undefined) {
        ref = firebase.database().ref('/messages/');
    }

    ref.limitToLast(32).on('child_added', callback);
}

function initializeChat() {
    if (username === null || username === '' || username === undefined) {
        username = prompt('Please enter your username:', 'guest');

        if (username === null || username.trim() === '') {
            username = 'guest'; //default user is guest
        } else {
            username = username.trim();
            sessionStorage.setItem('username', username);
        }
    }

    createChat();
    initalizeDrag('chat-wrapper');

    loadMessages();

    $('#chat-input').on('keyup', function(event) {
        if(event.keyCode == 13) { // 13 = Enter Key
            sendMessage(username, $('#chat-input').val());
            $('#chat-input').val('');
        }
    });
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
    let top = Math.floor(Math.random() * (70));
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
        });
    });
}