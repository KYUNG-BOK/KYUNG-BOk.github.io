function appendValue(value) {
    document.getElementById('display').value += value;
}       //html에서 Id가 디스플레이인 요소 찾아서 그 요소의 현재 입력값 뒤에 입력된 값을 덧붙임
        //숫자나, 연산자 버튼 클릭했을때, 내용들을 화면에 출력해줌.

function clearDisplay() {               //ac 눌렀을때
    document.getElementById('display').value = '';  
}
        //id가 디스플레이인 요소의 값을 빈 문자열로 만듬
        //초기화(클리어디스플레이버튼 호출)

function calculateResult() {        // = 눌렀을때.
    try {
    const result = eval(document.getElementById('display').value);  
    //id가 디스플레이 요소에 입력된 문자열 eval()함수로 실행 계산
    document.getElementById('display').value = result;
    //결과를 다시 디스플레이에 출력
    } catch (error) {
    alert("계산을 할 수 없다네~~");
    }       // 잘못된 수식일때 출력
}

function backspace(){               // <- 눌렀을때
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1); // 문자열 끝에 있는 한 글자를 잘라내기
}

function appendValue(value) {       // % 눌렀을때.
    const display = document.getElementById('display');

    if (value === '%') {
    display.value += '/100'; // 퍼센트를 실제 수식으로 변환
    } else {
    display.value += value;
    }
}
