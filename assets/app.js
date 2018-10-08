var animalsArray = ["Parakeet", "Grizzly Bear", "Bulldog", "Snake", "Shark", "Lion", "Hippopotamus", "Alligator"]

function generateGifs(animal) {
    $(".gif-display").empty();

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=7rp4l9juI3COyB7bg0XLt5xDfSXaaF2E&limit=10&rating=g&rating=pg"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var $div = $("<div>");
            var $p = $("<p>").text("Rating: " + results[i].rating)
            var $img = $("<img>");

            $div.addClass("gifDiv");

            $img.attr("src", results[i].images.fixed_height_still.url);
            $img.attr("img-still", results[i].images.fixed_height_still.url);
            $img.attr("img-animate", results[i].images.fixed_height.url);
            $img.attr("img-state", "still")
            $img.addClass("gif")

            $div.append($p);
            $div.append($img);

            $(".gif-display").append($div);
        };
    });
};


function generateButtons() {
    $(".button-display").empty();

    for (var i = 0; i < animalsArray.length; i++) {
        var $btn = $("<button>");
        $btn.text(animalsArray[i]);
        $btn.attr("animal", animalsArray[i]);
        $btn.addClass("animalButton");

        $(".button-display").append($btn);
    };
};

$(".new-animal").on("click", function () {
    var userInput = $(".user-input").val().trim();
    if (userInput !== "") {
        animalsArray.push(userInput);
    };
    generateButtons();
    $(".user-input").val("");
});

$("body").on("click", ".gif", function(){
    var state = $(this).attr("img-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("img-animate"));
        $(this).attr("img-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("img-still"));
        $(this).attr("img-state", "still");
    }
});

$("body").on("click", ".animalButton", function () {
    var animal = $(this).attr("animal");
    generateGifs(animal);
});

generateGifs(animalsArray[0]);
generateButtons();