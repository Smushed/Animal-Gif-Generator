var animalsArray = ["Parakeet", "Grizzly Bear", "Bulldog", "Snake", "Shark", "Lion", "Hippopotamus", "Alligator"]

function generateGifs(animal){
    $(".gif-display").empty();

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=7rp4l9juI3COyB7bg0XLt5xDfSXaaF2E&limit=10&rating=g&rating=pg"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;

        for (var i = 0; i < results.length; i++){
            var $div = $("<div>");
            var $p = $("<p>").text("Rating: " + results[i].rating)
            var $img = $("<img>");

            $div.addClass("gifDiv");

            $img.attr("src", results[i].images.fixed_height.url);

            $div.append($p);
            $div.append($img);

            $(".gif-display").append($div);
        }
    })
}

function generateButtons(){
    $(".button-display").empty();

    for (var i = 0; i < animalsArray.length; i++){
        var $btn = $("<button>");
        $btn.text(animalsArray[i]);
        $btn.attr("animal", animalsArray[i]);
        $btn.addClass("animalButton");

        $(".button-display").append($btn);
    };
};

$("body").on("click", ".animalButton", function() {
    var animal = $(this).attr("animal");
    console.log(animal);
    generateGifs(animal);
});

generateGifs();
generateButtons();