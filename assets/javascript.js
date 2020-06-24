var edamamURL = "https://api.edamam.com/search?q=";
var edamAppID = "578c5ca1";
var edamKey = "8bca4f7e2dc388b15b67b50c90a7cf77";


$("#drink-button").on("click", function(event){
    event.preventDefault();
    //This is the drink portion of the website. Ray figured out the API call, and the info that returns
    var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    $("#drink-info").empty();
   
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        let drinkDiv = $("<div>");
        let drink = response.drinks[0];
        let drinkName = $("<h2>").text(drink.strDrink);
        let drinkPic = $("<img>");
        let drinkPicImg = drink.strDrinkThumb;
        let ingDiv = $("<div>");
        //Ben build this for loop that displays ingredients and amounts
        for( var i = 1; i < 16; i++){
            let ing = 'strIngredient' + [i];
            let ingAmt = 'strMeasure' + [i];
            if(ingAmt === null){
                ingAmt = ""
            };
            let currAmt = drink[ingAmt];
            let currIng = $("<p>" + drink[ing] + ": " + currAmt + "</p>");

            if(drink[ing] === null){
                break;
            }else{
                ingDiv.append(currIng)
            };
        };
        drinkPic.attr("src", drinkPicImg);
        drinkPic.attr("class", "is-rounded mt-3");
        let instructions = drink.strInstructions;       
        drinkDiv.append(drinkName, drinkPic, ingDiv, instructions);
        $("#drink-info").append(drinkDiv);
    });
});


//here is the second API call. Ray figured out how to format the url, and the info that returns.
$("#recipe-button").on("click", function(event){
    event.preventDefault();
    $("#recipeDiv").empty();
    var searchQ = $(".input").val()
    var maxCookTime = $("#cook-time select").val()
     $("#cook-time select").val()
    var queryURL = edamamURL + searchQ + "&app_id=" + edamAppID + "&app_key=" + edamKey + "&from=0&to=30&time=1-" + maxCookTime ; 
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL)
        console.log(response)
        //Ben added the randomization or the recipe
        let j = Math.ceil(Math.random() * 30)
        let recipe = response.hits[j].recipe;
        console.log(j)
        //both Ray and Ben build the appending system for the recipe
        let recipeCard = $("<div>");
        let title = $('<p>').text(recipe.label);
        title.attr('class', "title is-4")
        let recipeImg = $('<img>' + "<br>");
        let cookTime = $('<p>').text(recipe.totalTime + " minutes");
        let recipeLink = $("<a>" + "Click Here For the Recipe!" + "</a>");
        recipeLink.attr("href", recipe.url)
        recipeLink.attr("target", "_blank")
        recipeImg.attr('src', recipe.image);
        recipeCard.attr('class', "recipe-card");
        recipeCard.append(title);
        $("#recipeDiv").append(recipeCard, cookTime, recipeImg, recipeLink)
        

    })//inside the ajax response

})//inside the click listener    