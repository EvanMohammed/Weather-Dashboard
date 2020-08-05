
let $cardBody = $(".card-body");
let $cityName = $("#weatherResult");

function getApiData(response) {
    console.log(response);

}
// setting on click function to get API info when clicked



$("#search-button").on("click", function (event) {
    event.preventDefault();
    let $cityResult = $("#search-text").val();


    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityResult + "&appid=f8d07bd7e4035443b7b68adedae5b1a2";
    console.log(event);


    // using the api info and input to retrieve the weather descriptions
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function weatherInfo(response) {
        console.log(response);
        $cityName.text(`${response.name}  (${moment().format("MMM Do YYYY")})`);
        // converting the weather value to F from K
        let tempInF = Math.floor((response.main.temp - 273.15) * 9 / 5 + 32);
        $("#temp").text(`Temperature : ${tempInF} °F`);
        $("#humidity").text(`humidity : ${response.main.humidity} %`);
        $("#windSpeed").text(`wind speed : ${response.wind.speed} MPH`);

        // assigning two variables to retrieve the lon and lat in order to use them later to get UV index
        const $lat = response.coord.lat;
        const $lon = response.coord.lon;

        let uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f8d07bd7e4035443b7b68adedae5b1a2&" + "lat=" + $lat + "&lon=" + $lon;
        return $.ajax({
            url: uvIndexURL,
            method: "GET"
        })
    })
        // retrieving UV index value 
        .then(function (response) {
            console.log(response)
            $("#uvIndex").text(` UV Value : ${response.value}`);
            let $latSecond = response.lat;
            let $lonSecond = response.lon;
            let foreCastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + $latSecond + "&lon=" + $lonSecond + "&appid=f8d07bd7e4035443b7b68adedae5b1a2&";
            return $.ajax({
                url: foreCastURL,
                method: "GET"
            })
        })
        // getting the weather forecast for the next 5 days from the response info in the api 
        .then(function (response) {
            console.log(response);
            $("#card-header1").text(response.city.name)
            $(".card-title1").text(response.list[6].dt_txt)
            let $tempInF1 = Math.floor((response.list[6].main.temp - 273.15) * 9 / 5 + 32);
            $("#temperature1").text(` Temperature : ${$tempInF1} °F`);
            $("#humidity1").text(` Humidity : ${response.list[6].main.humidity} %`);

            $("#card-header2").text(response.city.name)
            $(".card-title2").text(response.list[12].dt_txt)
            let $tempInF2 = Math.floor((response.list[12].main.temp - 273.15) * 9 / 5 + 32);
            $("#temperature2").text(` Temperature : ${$tempInF2} °F`);
            $("#humidity2").text(` Humidity : ${response.list[12].main.humidity} %`);

            $("#card-header3").text(response.city.name)
            $(".card-title3").text(response.list[20].dt_txt)
            let $tempInF3 = Math.floor((response.list[20].main.temp - 273.15) * 9 / 5 + 32);
            $("#temperature3").text(` Temperature : ${$tempInF3} °F`);
            $("#humidity3").text(` Humidity : ${response.list[20].main.humidity} %`);

            $("#card-header4").text(response.city.name)
            $(".card-title4").text(response.list[25].dt_txt)
            let $tempInF4 = Math.floor((response.list[25].main.temp - 273.15) * 9 / 5 + 32);
            $("#temperature4").text(` Temperature : ${$tempInF4} °F`);
            $("#humidity4").text(` Humidity : ${response.list[25].main.humidity} %`);

            $("#card-header5").text(response.city.name)
            $(".card-title5").text(response.list[32].dt_txt)
            let $tempInF5 = Math.floor((response.list[32].main.temp - 273.15) * 9 / 5 + 32);
            $("#temperature5").text(` Temperature : ${$tempInF5} °F`);
            $("#humidity5").text(` Humidity : ${response.list[32].main.humidity} %`);
        })

})
// making an empty array so that it will store the searched cities 
var recentlySearchedCities = [];
recentlySearchedCities.push($cityName);
localStorage.setItem("recentlySearchedCities", JSON.stringify(recentlySearchedCities));
// trying to retrieve the searched cities *did not work!
$("#recent5").on("click", function () {
    JSON.parse(localStorage.getItem(recentlySearchedCities))
})
