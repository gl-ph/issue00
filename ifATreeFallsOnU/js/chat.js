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
        $('#chat-box').append('<div style="background:red">' + text + '</div>');
    } else {
        $('#chat-box').append('<div>' + text + '</div>');
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
    createChat();

    loadMessages();

    $('#chat-input').on('keyup', function(event) {
        if(event.keyCode == 13) { // 13 = Enter Key
            sendMessage('chris', $('#chat-input').val());
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
    var chatBox = document.createElement('div');
    var chatInput = document.createElement('input');

    chatWrapper.id = 'chat-wrapper';
    chatBox.id = 'chat-box';
    chatInput.id = 'chat-input';
    chatInput.type = 'text';

    chatWrapper.appendChild(chatBox);
    chatWrapper.appendChild(chatInput);

    document.getElementsByTagName('body')[0].appendChild(chatWrapper);
}