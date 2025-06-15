//%연산자 계산하기
function appendValue(value) {
    const display = document.getElementById('display');

    if (value === '%') {
    display.value += '/100';
    } else {
    display.value += value;
    }
}

//ac눌렀을때
function clearDisplay() {
    document.getElementById('display').value = '';
}
//<-눌렀을때
function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
//eval함수 이용, 디스플레이에 입력된 부분을 계산하게....ㅎㅎ
function calculateResult() {
    try {
    const result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
    } catch (error) {
    alert("계산 할수없다네~");
    }
}
