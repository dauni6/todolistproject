const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

//local storage : 작은 정보를 유저의 컴퓨터에 저장하는 방법
const USER_LS = "currentUser"; 
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text); //key , value
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS); //locaStorage에서 입력받은 user 찾기
    if(currentUser === null){
       //user is not
        askForName();
    } else{
       //user is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();