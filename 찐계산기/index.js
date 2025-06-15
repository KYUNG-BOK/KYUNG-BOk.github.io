/* 6/12 ~ 6/13 학습 부분 복습 및 추가학습, 
    keydown 추가하여 키보드입력부분 감지하여,
    디스플레이에 출력되게 했슴당 */



document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
});

function appendValue(value) {
    const display = document.getElementById('display');

    if (value === '%') {
        display.value += '/100'; // 퍼센트를 실제 수식으로 변환
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        alert("계산을 할 수 없다네~~");
    }
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// 키다운 이벤트 입력부분
function handleKeyPress(event) {
    const key = event.key;

    // 숫자 및 연산자 입력
    if (/[0-9+\-*/().]/.test(key)) {
        appendValue(key);
    }
    // 퍼센트
    else if (key === '%') {
        appendValue('%');
    }
    // 엔터(Enter)는 계산 실행
    else if (key === 'Enter') {
        event.preventDefault(); // 폼 제출 방지
        calculateResult();
    }
    // 백스페이스는 한 글자 삭제
    else if (key === 'Backspace') {
        backspace();
    }
    // ESC는 전체 지우기
    else if (key === 'Escape') {
        clearDisplay();
    }
}
