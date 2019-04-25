

function initializePhone() {
    createPhone();
    initializeDrag('phone');

    addText(messages[0].text, messages[0].isRight);

    let pos = 1;
    let postMessage = function() {
        if (!document.getElementById('phone')) {
            clearInterval(messageTimer);
            return;
        }

        addText(messages[pos].text, messages[pos].isRight);
        pos++;
        if (pos >= messages.length) {
            clearInterval(messageTimer);
        }
    }

    let messageTimer = setInterval(postMessage.bind(this), 1500);

    let back = document.getElementById('header-back');
    back.addEventListener('click', (() => {
        window.overlay.callEvent('title');
        // clearInterval(messageTimer);
    }).bind(this));
    
    let sendText = document.getElementsByClassName('footer-send')[0];
    sendText.addEventListener('click', (() => {
        let messageDiv = document.getElementsByClassName('footer-text')[0];
        let text = messageDiv.value;
        
        if (text && text !== '') {
            addText(text, true);
            messageDiv.value = '';
            sendText.disabled = true;
        }
    }).bind(this));

    let inputText = document.getElementsByClassName('footer-text')[0];
    inputText.addEventListener('input', (() => {
        if (inputText.value !== '') {
            sendText.disabled = false;
        }
    }).bind(this));

    let sendEmoji = document.getElementById('footer-smile');
    sendEmoji.addEventListener('click', (() => {
        // list shuffle function is in the overlay js file
        shuffle(emojis);
        let text = emojis[0];
        addText(text, true);
    }).bind(this));

    let day = new Date(), time = day.getMinutes();
    if (day.getMinutes() < 10) {
        time = '0' + day.getMinutes();
    }
    if (day.getHours() > 12) {
        time = (day.getHours() - 12) + ':' + time + ' PM';
    } else if (day.getHours() == 12) {
        time = '12:' + time + ' PM';
    } else if (day.getHours() == 0) {
        time = '12:' + time + ' AM';
    } else {
        time = day.getHours() + ':' + time + ' AM';
    }
    document.getElementById('header-status-time').innerText = time;
}

function destroyPhone() {
    let element = document.getElementById('phone');
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function addText(text, isRight) {
    if (!isRight) {
        // this will run the animation again
        let element = document.getElementById('phone');
        element.classList.remove("phone-animation");
        void element.offsetWidth;
        element.classList.add("phone-animation");
    }

    div = document.getElementsByClassName('text-wrapper')[0];
    let textDiv = document.createElement("div");
    textDiv.innerText = text;

    if (isRight) {
        textDiv.className = 'text right';
    } else {
        textDiv.className = 'text';
    }

    div.appendChild(textDiv);

    div = document.getElementsByClassName('text-wrapper')[0]; // have to reload the object
    div.scrollTop = parseInt(div.scrollHeight);
}

function createPhone() {
    let backSvg = `<svg style="padding-top:5px" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#FAA820" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    let moreSvg = `<svg style="padding:6px 0 0 4px" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path xmlns="http://www.w3.org/2000/svg" fill="#FAA820" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
    let phoneSvg = `<svg style="padding-top:6px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22"><path d="M0 0h24v24H0z" fill="none"/><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#FAA820"/></svg>`;
    let paperclipSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="padding: 8px 0 8px 0;transform: rotate(225deg);"><path xmlns="http://www.w3.org/2000/svg" fill="#8d8d8d" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>`;
    let emojiSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="padding: 7px 0 0 3px;"><path d="M0 0h24v24H0z" fill="none"></path><path xmlns="http://www.w3.org/2000/svg" fill="#8d8d8d" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>`;
    
    var phoneDiv = document.createElement("div");
    var headerDiv = document.createElement("div");
    var footerDiv = document.createElement("div");
    var textDiv = document.createElement("div");

    var headerStatus = document.createElement("div");
    var headerStatusTime = document.createElement("div");
    var headerStatusImg = document.createElement("img");
    var headerBack = document.createElement("div");
    var headerMiddle = document.createElement("div");
    var headerName = document.createElement("div");
    var headerNumber = document.createElement("div");
    var headerPhone = document.createElement("div");
    var headerMore = document.createElement("div");
    
    var footerAttach = document.createElement("div");
    var footerText = document.createElement("input");
    var footerSmile = document.createElement("div");
    var footerSend = document.createElement("button");

    phoneDiv.id = 'phone';
    headerDiv.className = 'header-wrapper';
    textDiv.className = 'text-wrapper';
    footerDiv.className = 'footer-wrapper';

    // randomize starting position
    let top = Math.floor(Math.random() * (70));
    let left = Math.floor(Math.random() * (70));
    phoneDiv.style.top = top + '%';
    phoneDiv.style.left = left + '%';

    headerStatus.id = 'header-status';
    headerStatusTime.id = 'header-status-time';
    headerStatusImg.src = 'media/status.png';
    headerBack.className = 'phone-glyph';
    headerBack.id = 'header-back';
    headerPhone.className = 'phone-glyph';
    headerMore.className = 'phone-glyph';
    headerMiddle.id = 'header-middle';
    headerName.id = 'header-name';
    headerNumber.id = 'header-number';

    headerBack.innerHTML = backSvg;
    headerPhone.innerHTML = phoneSvg;
    headerMore.innerHTML = moreSvg;

    headerName.innerText = 'Brandon Dcruz';
    headerNumber.innerText = '+1 555-566-5837';

    footerAttach.className = 'phone-glyph';
    footerText.className = 'footer-text';
    footerSmile.className = 'phone-glyph';
    footerSmile.id = 'footer-smile';
    footerSend.className = 'footer-send';
    footerSend.disabled = true;
    footerText.placeholder = 'Enter message';
    footerSend.innerText = 'SEND';

    footerAttach.innerHTML = paperclipSvg;
    footerSmile.innerHTML = emojiSvg;

    headerMiddle.appendChild(headerName);
    headerMiddle.appendChild(headerNumber);

    headerStatus.appendChild(headerStatusTime);
    headerStatus.appendChild(headerStatusImg);

    headerDiv.appendChild(headerStatus);
    headerDiv.appendChild(headerBack);
    headerDiv.appendChild(headerMiddle);
    headerDiv.appendChild(headerPhone);
    headerDiv.appendChild(headerMore);

    footerDiv.appendChild(footerAttach);
    footerDiv.appendChild(footerText);
    footerDiv.appendChild(footerSmile);
    footerDiv.appendChild(footerSend);

    phoneDiv.appendChild(headerDiv);
    phoneDiv.appendChild(textDiv);
    phoneDiv.appendChild(footerDiv);
    document.getElementsByTagName('body')[0].appendChild(phoneDiv);
}
