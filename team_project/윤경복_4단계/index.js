// 25.06.17 , 3단계 : 계산기 버튼을 눌렀을때 디스플레이 또는 콘솔에 출력하기
const display = document.getElementById('display');       // display 변수 생성, 값이 변하는 동적요소로 get사용
const buttons = document.querySelectorAll('.buttons button');   // buttons내 button클래스들 전부 불러오기.

// 25.06.18 , 4단계 : firstOperand, operator, secondOperand 변수 선언
let firstOperand = null;            // 첫번째 피연산자를 저장할 변수
let operator = null;                // 연산자(+,-,*,/)를 저장할 변수
let secondOperand = null;           // 두번째 피연산자를 저장할 변수
let waitingForSecondOperand = false;        // 첫번째에서 다음 수를 입력하기 전의 수를 임시로 저장할 변수

// 이벤트 리스너 -> 클릭감지, 'AC', '<-', '=' 제외의 버튼들은 눌러지는 값을 그대로 출력하기.
buttons.forEach(button =>{              // buttons내부에 있는 각 button에 반복작업, 이벤트 리스너를 하나씩 붙일거에유.
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value')     // getAttribute통해 'data-value' 속성 불러오기
        switch(value){
            case 'clearDisplay':        // 초기화
                clearDisplay();
            break;
            case 'toggleSign':           // 부호변경
                toggleSign();
            break;
            case 'calculateResult':     // 결과
                calculateResult();
            break;      
            case '+':                   
            case '-':
            case '*':
            case '/':
                handOperator(value);       // "+.-.*./" 연산자 처리
            break;
            default:
                if (isNumber(value) || value === '.') {
                    // 숫자나 소수점만 디스플레이에 출력
                    appendValue(value);
                } else {
                    // 연산자는 콘솔에만 출력
                    console.log('연산자 버튼 :', value);
                }
        }
    });
});

// val이 숫자인지, 아닌지 판단하는 함수
function isNumber(val) {               
    return !isNaN(val);
}


// 디스플레이에 값을 출력해봅시댱.!
function appendValue(val){          // val은 사용자가 누른 값이 입력됨
    if (waitingForSecondOperand) {          // 두 번째 숫자를 새로 입력 시작할 때는 디스플레이 초기화
        display.innerText = val === '.' ? '0.' : val;
        waitingForSecondOperand = false;
    } else {
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
}

// AC버튼 눌렀을때 0으로 초기화하기!, 이젠 모든 변수를 초기화.
// 3단계 도전과제 : AC버튼 눌렀을때 디스플레이 창 초기화
// 4단계 : AC버튼 눌렀을때 모든 변수 초기화
function clearDisplay() {
    display.innerText = '0';        
    firstOperand = null;        
    secondOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

// 연산자 눌렀을때 계산하게
function handOperator(nextOperator) {
    const inputValue = display.innerText;       // 현재 디스플레이에 있는 값

    if (firstOperand === null) {        // firstOperand : null, 즉 처음눌린 숫자라면
        firstOperand = parseFloat(inputValue);      // 현재 디스플레이에 있는 값을 숫자로 변환, 변수에 저장
        console.log('firstOperand:', firstOperand);  // firstOperand 값 출력

    } else if (operator) {          // '+-*/'가 눌린 뒤, 다음 피연산자를 눌렀을 경우
        secondOperand = parseFloat(inputValue);     //  눌러진 값을 숫자로 변환, 변수에 저장
        const result = calculate(firstOperand, secondOperand, operator);    // calculate함수로 계산된 결과.
        display.innerText = String(result);     // 디스플레이에 결과를 출력해줌
        firstOperand = result;          // 이번 계산의 결과값이, 다음 계산의 시작점
    }   else {
        console.log('firstOperand:', firstOperand);  // firstOperand 값 출력

    }

    operator = nextOperator;
    console.log('operator:', operator);  // operator 출력
    waitingForSecondOperand = true;
}

// 실제로 계산 처리 하는 부분
function calculate(a, b, op) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

// 플러스마이너스 전환
function toggleSign() {
    const currentValue = display.innerText;
    if (currentValue === '0') return;
    
    if (currentValue.startsWith('-')) {
        display.innerText = currentValue.slice(1);
    } else {
        display.innerText = '-' + currentValue;
    }
}

// 계산 결과 
function calculateResult() {
    if (firstOperand === null || operator === null) return;

    secondOperand = parseFloat(display.innerText);
    const result = calculate(firstOperand, secondOperand, operator);
    display.innerText = String(result);

    // 상태 초기화
    firstOperand = result;
    operator = null;
    secondOperand = null;
    waitingForSecondOperand = true;
}

