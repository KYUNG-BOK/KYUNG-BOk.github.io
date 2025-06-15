// 1. 점수 옵션 채우기
const select = document.getElementById("winningScore");
for (let i = 1; i <= 50; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `${i}점`;
  select.appendChild(option);
}

// 2. 점수판 기능 생성하기
let scoreA = 0;
let scoreB = 0;
let gameOver = false;

function addScore(team) {
  if (gameOver) return;

  const winningScore = parseInt(select.value);

  if (team === 'A') {
    scoreA++;
    document.getElementById('scoreA').innerText = scoreA;
    if (scoreA === winningScore) declareWinner('A팀');
  } else if (team === 'B') {
    scoreB++;
    document.getElementById('scoreB').innerText = scoreB;
    if (scoreB === winningScore) declareWinner('B팀');
  }
}

function declareWinner(teamName) {
  gameOver = true;
  const message = document.getElementById('winnerMessage');
  message.innerText = `${teamName} 이겼슈~!`;
  message.style.display = 'block';

  document.getElementById('btnA').disabled = true;
  document.getElementById('btnB').disabled = true;

  //화면에 폭죽효과 나타내기
  confetti({
    particleCount: 200,   // 터지는 조각의 개수 설정
    spread: 360,          // 조각이 퍼지는 각도
    origin: { x: 0.5, y: 0.5 },   // 화면의 정중앙에서 폭죽이 터질거에유~~
    zIndex: 999
  });
}

function resetScores() {
  scoreA = 0;
  scoreB = 0;
  gameOver = false;
  document.getElementById('scoreA').innerText = 0;
  document.getElementById('scoreB').innerText = 0;

  document.getElementById('winnerMessage').style.display = 'none';
  document.getElementById('btnA').disabled = false;
  document.getElementById('btnB').disabled = false;
}

// 3. 버튼 클릭 시 이벤트 연결
document.getElementById('btnA').addEventListener('click', () => addScore('A'));   // 누르면 a팀 1점 증가
document.getElementById('btnB').addEventListener('click', () => addScore('B'));   // 누르면 b팀 1점 증가
document.getElementById('resetBtn').addEventListener('click', resetScores);   // 점수 리셋 버튼 클릭시 리셋됨
