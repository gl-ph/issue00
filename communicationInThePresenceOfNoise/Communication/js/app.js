console.log("app");

$(document).ready(function() {

    function loadGrammar(name) {
        $("#output").html("");

        var grammar = tracery.createGrammar(grammars[name]);
        $("#grammar").html(grammar.toText());


        var s = grammar.flatten("#origin#");
        console.log(s);
        var div = $("<div/>", {
            class : "outputSample",
            html : s
        });

        $("#output").append(div);

    }

    setTimeout(function() {
        loadGrammar("communication");

    }, 10);

    $('#grammarSelect').on('change', function() {
        loadGrammar(this.value);
    });
});
