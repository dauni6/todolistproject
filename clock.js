const clockContainer = document.querySelector(".js-clock"); //결과가 없으면 null
const clockTitle = clockContainer.querySelector("h1"); 

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes <10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime(); //이걸 한 번 먼저 실행시키지 않으면 00:00:00에서 갑자기 15:31:23 이렇게 바뀐다. 보기 싫으니까 한 번 페이지 로드될 때 실행 시킬 것
    setInterval(getTime, 1000);
}

init();