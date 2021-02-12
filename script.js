// alert("Connected!");

async function getWeather(latlng){
    var lat = latlng[0];
    var lng = latlng[1];
    
    var weather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + lng + "&appid=6cc3a417d5ec4b023721b7f64a3c4ac0");
    
    var data = await weather.json();
    
    return (Number(data["main"]["temp"]) - 273.15).toFixed(2);
}

function createColumn(url,country,capital,region,countryCode,latlng){
    var col = document.createElement("div");
    col.setAttribute("class","col-lg-4 col-sm-12");
    col.style.width=18+'rem';
    col.style.marginTop=5+'px';
    col.style.marginBottom=5+'px';
    col.style.textAlign = "center";

    var card = document.createElement("div");
    card.setAttribute("class","card");
    

    var cardHeader = document.createElement("div");
    cardHeader.setAttribute("class","card-header");
    cardHeader.innerHTML="<b>" + country + "</b>";
    cardHeader.style.backgroundColor="rgba(0,0,0,0.8)";
    cardHeader.style.color="white";

    card.appendChild(cardHeader);


    var image = document.createElement("img");
    image.setAttribute("class","card-img-top");
    image.alt="Card image cap";
    image.src=url;
    image.style.height=8+'rem';
    card.appendChild(image);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    cardBody.style.backgroundColor="rgb(200,200,200)";

    var h1 = document.createElement("h5");
    h1.innerHTML="Capital: " + capital; 
    cardBody.appendChild(h1);
    var h2 = document.createElement("h5");
    h2.innerHTML="Region: " + region;
    cardBody.appendChild(h2);
    var h3 = document.createElement("h5");
    h3.innerHTML="Country Code: " + countryCode;
    cardBody.appendChild(h3);

    var button = document.createElement("button");
    button.setAttribute("class","btn btn-primary");
    button.innerHTML="Click For Weather";
    button.onclick=function(){
        getWeather(latlng).then(
            function(data){
                alert("Current Temperature: " + data + "C");
            }
        );
    };
    cardBody.appendChild(button);

    card.appendChild(cardBody);

    col.appendChild(card);

    return col;
}

async function getCountries(){
    var countries = await fetch("https://restcountries.eu/rest/v2/all");
    
    var data = await countries.json();
    
    return data;
}

function makeEntry(data){
    var container=document.createElement("div");
    container.setAttribute("class","container-md");
    container.style.backgroundColor="#0F2027";
    
    var row = document.createElement("div");
    row.classList.add("row","d-flex","justify-content-around");
    
    container.style.margin="auto";
    
    for (var index=0;index<data.length;index++){
        var country = data[index]["name"];
        var capital = data[index]["capital"];
        var region = data[index]["region"];
        var cioc = data[index]["cioc"];
        var url = data[index]["flag"];
        var latlng = data[index]["latlng"]

        var col = createColumn(url,country,capital,region,cioc,latlng);

        row.appendChild(col);
    }
    
    container.appendChild(row);
    
    document.body.appendChild(container);
}

document.body.style.backgroundColor="#bdc3c7";
var header = document.createElement("h1");
header.innerHTML="Countries & Their Weather!"
header.style.textAlign = "center";
document.body.appendChild(header);


getCountries().then(
    function(data){
        makeEntry(data);
    }
);
