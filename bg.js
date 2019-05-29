const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image); //니꼬는 prepend사용함, 둘 다 되는듯, img태그 넣기
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); // 0~5
    
    return number;
}


function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();