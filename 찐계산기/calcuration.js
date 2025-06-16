// 유저 키보드 입력 감지, 키다운 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
});

// 계산기 화면에 값 추가하기
function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// 화면 초기화(display창 비우기)
function clearDisplay() {
    document.getElementById('display').value = '';
}

// 입력된 문자열에서 %가 붙은 숫자 찾아서 숫자*0.01로 변환
function convertPercent(expression) {
    return expression.replace(/(\d+\.?\d*)%/g, '($1*0.01)');
}

// 계산 실행
function calculateResult() {
    let input = document.getElementById('display').value;
    input = convertPercent(input);  // 퍼센트 변환 후 계산

    try {
        const result = safeEvaluate(input);         // safeEvaluate 함수 통해 계산 수행.
        document.getElementById('display').value = result;
    } catch (error) {
        alert("계산을 할 수 없다네~~");
    }
}

// 백스페이스 - 마지막 문자열 삭제
function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// 키보드 입력처리 함수
function handleKeyPress(event) {
    const key = event.key;

    if (/[0-9+\-*/().%]/.test(key)) {
        appendValue(key);           // 해당키들이 입력되면 'appendValue' 뒤에서 값을 추가하며 화면표시
    } else if (key === 'Enter') {
        event.preventDefault();     // enter키 누르면 계산실행, form누르면 새로고침 되는거 방지(preventDefault)
        calculateResult();
    } else if (key === 'Backspace') {       // <- 누르면 마지막 문자열 삭제
        backspace();
    } else if (key === 'Escape') {          // <- esc누르면 초기화
        clearDisplay();
    }
}

// 수식 계산 함수
function safeEvaluate(expression) {
    const outputQueue = [];
    const operatorStack = [];

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    // 토큰분리하기, 입력된 수식에서 숫자, 연산자, 괄호 구분 배열로 분리
    /* \d\.?\d* : 정수 또는 소수
        \+\-\*\/ : 사칙연산
        \(\) : 괄호*/
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) throw new Error("잘못된 수식입니다.");

    for (const token of tokens) {
        if (!isNaN(token)) {
            outputQueue.push(parseFloat(token));
        } else if ('+-*/'.includes(token)) {
            while (
                operatorStack.length &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (
                operatorStack.length &&
                operatorStack[operatorStack.length - 1] !== '('
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop(); // '(' 제거
        }
    }

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    const stack = [];
    for (const token of outputQueue) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    }

    return stack[0];
}