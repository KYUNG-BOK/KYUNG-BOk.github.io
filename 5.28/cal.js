const numberSeven = document.querySelector('#number7') /*변수에 할당*/
const display = document.querySelector(".display")
console.log(display.textContent); // 0


// function 뒤에 괄호가 빠지면 안됨 ㅠㅠ
numberSeven.addEventListener('click', function(){
    // 1. display.textContent = 0
    // 2. display.textContent =/= 0
    if (Number(display.textContent) === 0) {
        display.textContent = '7';
    } else {
        //현재 디스플레이에 7이 찍혀있음
        //display.textContent = "7" + 7 -> "77"
        display.textContent = display.textContent + 7;
    }
    });