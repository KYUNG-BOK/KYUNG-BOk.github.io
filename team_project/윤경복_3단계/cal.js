const display = document.getElementById('display');             // display 변수 생성
const buttons = document.querySelectorAll('.buttons button');   // buttons내 button클래스들 전부 불러오기.

// 이벤트 리스너 -> 클릭감지, 'AC', '<-', '=' 제외의 버튼들은 눌러지는 값을 그대로 출력하기.
buttons.forEach(button =>{
    button. addEventListener('click', () => {
        const value = button.getAttribute('data-value')     // getAttribute통해 'data-value' 속성 불러오기
        console.log('눌려진 버튼 : ', value);
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

// 디스플레이에 값을 출력해봅시댱.!
function appendValue(val){
    if (display.innerText.length >= 17) return; // 숫자가 많으니 계산기 밖으로 빠져나가서, 제한합니다.
    // 디스플레이에 0만 표시되어 있을때, 뒤에 .은 소숫점일 경우도 배제할 수 없기에
    if (display.innerText === '0' && val !== '.'){      
        display.innerText = val; // 0일 경우, 눌러진 새로운 값을 표시
    } else {
        display.innerText += val;   // 0이 아닐 경우, 눌러진 값을 기존 값 뒤에 이어붙임.
    }
}

// AC버튼 눌렀을때 0으로 초기화하기!
function clearDisplay(){
    display.innerText = '0';
}


//아직, '=', 백스페이스는 설정을 안했기 때문에 "   " is not defined가 떠유.