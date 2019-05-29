const weather = document.querySelector(".js-weather");

//API(Application Programming Interface) 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
const API_KEY = `4010a726431859d64babaca4b2ce3cc3`;
const COORDS = `coords`;

//JavaScript를 이용해서 특정 URL을 호출 (network단에서 확인 - network패널은 우리가 request한 내용을 보여줌)
// JavaScript는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있는데
//가져온 데이터를 Refresh 없이도 나의 웹사이트에 적용시킬 수 있기 때문.
//예를들어 새로고침하지 않아도 실시간으로 메일이 오는것을 확인할 수 있는 이유. 이 때문에 JS가 강력한 것.
function getWeather(lat, lon){
    //data를 얻으려면 fetch라는걸 사용, ()안에 가져올 데이터가 들어감 http:// 넣어줄 것, backtick` 사용
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `celcius : ${temperature} @ ${place}`;
    });
    //then함수의 역할은 데이터가 완전히 들어온 다음 호출, JS에서 뭔가가 끝나길 기다리는 방법은 then을 한 번더 사용
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
   const latitude = position.coords.latitude;
   const longitute = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitute : longitute
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitute);
}

function handleGeoError(){
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); //얘 때문에 허용하시겠습니까? 뜨는듯
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
       } else{
           const parseCoords = JSON.parse(loadedCoords);
           //console.log(parseCoords);
           getWeather(parseCoords.latitude, parseCoords.longitute);
       }
}

function init(){
    loadCoords();
}

init();