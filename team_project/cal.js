const display = document.getElementById('display');             // display 변수 생성
const buttons = document.querySelectorAll('.buttons button');   // buttons 내 button클래스들 전부 불러오기.

buttons.forEach(button =>{
    button. addEventListener('click', () => {
        const value = button.getAttribute('data_value')

        switch(value){
            case 'clearDisplay':
                clearDisplay();
                break;
            case 'backspace':
                backspace();
                break;
            case 'calculateResult':
                calculateResult();
                break;
            default:
                appendValue(value);
        }
    });
});

function appendValue(val){
    if (display.innerText === '0' && val !== '.'){
        display.innerText = val;
    } else {
        display.innerText += val;
    }
}

function clearDisplay(){
    display.innerText = '0';
}