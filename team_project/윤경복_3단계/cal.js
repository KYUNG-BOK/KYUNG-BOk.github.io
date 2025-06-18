const display = document.getElementById('display');       // display 변수 생성, 값이 변하는 동적요소로 get사용
const buttons = document.querySelectorAll('.buttons button');   // buttons내 button클래스들 전부 불러오기.

// 이벤트 리스너 -> 클릭감지, 'AC', '<-', '=' 제외의 버튼들은 눌러지는 값을 그대로 출력하기.
buttons.forEach(button =>{              // buttons내부에 있는 각 button에 반복작업, 이벤트 리스너를 하나씩 붙일거에유.
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value')     // getAttribute통해 'data-value' 속성 불러오기
        console.log('눌려진 버튼 : ', value);               // 눌려진 버튼을 콘솔에 출력
        switch(value){
            case 'clearDisplay':
                clearDisplay();
            break;
            case 'backspace':
                backspace();
            break;
            case 'calculateResult':ㅇ
                calculateResult();
            break;
            default:
                appendValue(value);
        }
    });
});

// 디스플레이에 값을 출력해봅시댱.!
function appendValue(val){          // val은 사용자가 누른 값이 입력됨
    if (display.innerText.length >= 16) return;     // 디스플레이 내 숫자가 넘치지 않게 16자로 제한

    const current = display.innerText;

    // 1. 디스플레이에 출력된 숫자가 0일 경우
    if (current === '0') {
        if (val === '.') {              // 0상태에서 .을 눌렀을 경우
            display.innerText = '0.'; // '0.' 출력
        } else if (val !== '0') {
            display.innerText = val; // 0이 아닌 다른 숫자가 클릭되면 해당 숫자가 출력됨.
        }
    }

    // 2. 0이 아닌 다른 숫자가 있을 경우
    else {
        // 소수점이 이미 포함되어 있으면 또 추가하지 않음
        if (val === '.' && current.includes('.')) return;       // '.' 중복 입력 무시

        display.innerText += val;       // 이외의 값은 뒤에 이어서 출력
    }
}

// AC버튼 눌렀을때 0으로 초기화하기!
function clearDisplay(){
    display.innerText = '0';
}


//아직, '=', 백스페이스는 설정을 안했기 때문에 "   " is not defined가 떠유.