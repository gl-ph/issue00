$(document).ready(function() {
    window.overlay = new Overlay(4, 'white', 'black');
    
    overlay.addContent("title", showTitle);
    overlay.addContent("interview", showInterview);
    overlay.addContent("critical", showCritical);
    overlay.addContent("fun", function(){});
    
    overlay.render();

    $('img').click(function() {
        $(this).addClass('visited');
    });
});

function showTitle() {
    hideEverything();
    $('img').show();
}

function showInterview() {
    hideEverything();
    initializePhone();
}

function showCritical() {
    hideEverything();
    showTitle();
    $('center#title').css('animation-name', 'example');
    $('center#title').css('animation-duration', '8s');
    $('center#title').css('animation-iteration-count', 'infinite');
    $('center#title').css('animation-timing-function', 'linear');
}

function hideEverything() {
    $('img').hide();
    destroyPhone();
}