const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList"); //ul tag

const TODOS_LS = `toDos`;

let toDos = [];

//let parentNodeLi =``; anonymous function 안 쓰고 delete하려면 전역으로 이렇게 li 빼주기

/*
function filterFunc(toDo){ //
    //array하나를 만들고 함수가 리턴하는 아이템이 있다면 true
    //true인 아이템들만 가지고 새로운 array를 만든다.
    //li.id가 string으로 나오기때문에 변환해줄 것
    //console.log(toDo.id, li.id); 여기서 li찾을 수 없고 전역으로 빼든지 해야함.
    return toDo.id !== parseInt(li.id);
}
*/

function deleteToDo(event){
    //console.log(event.target); //어떤 버튼이 지워질지 알아야함.
    //그러나 이 녀석의 부모가 누구인지(li)를 알아야한다. 따라서 console.dir();을 사용
    //console.dir(event.target); //console에서 확인 후 li 번호 확인하기
    //console.log(event.target.parentNode); //굿 잘나옴
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //const cleanToDos = toDos.filter(filterFunc); //filter는 마치 forEach에서 function을 실행하는 것과 같이 각각의 item과 같이 실행 됨. filter는 MDN API참고하면 설명이 자세 나와있다.
    //console.log(cleanToDos);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; //제거된 array로 다시 저장
    saveToDos();
}

function saveToDos(){
    //주의 localStorage에는 자바스크립트의 data를 저장할 수 없다. String만 가능
    //자바스크립트는 localStorage에 있는 모든 데이터를 String으로 저장하려하기 때문
    //따라서 저장할 때 Obejct를 반드시 String으로 저장하도록 해야한다.
    //JSON.stringify를 사용하면 자바스크립트 Object를 String으로 바꿔준다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); 
}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span); //li는 순서대로 붙는다
    li.id = newId;
    toDoList.appendChild(li);
   
    
    const toDoObj = {
        text : text,
        id : newId
    };
    
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
       const parsedToDos = JSON.parse(loadedToDos); //String된 toDos를 다시 자바스크립트 Object형으로 바꿔주기
        parsedToDos.forEach(function(toDo){//array에 담겨있는 것들 각각에 한 번씩 함수를 실행(item을 실행)
            //array가 forEach라는 녀석을 갖고 있음
            paintToDo(toDo.text);
        }); 
        
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();