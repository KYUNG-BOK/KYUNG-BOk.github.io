// 자바스크립트 반응형 웹페이지 제작, 참고 코드

/* 기존 : 사이드바가 왼쪽에 있음, 반응형 실행 시 
    컨테이너(안) - 헤더 - (사이드바) - 메인컨텐츠 로 진행되는 코드 ; 
// function moveSidebar() {
  if (window.innerWidth <= 768) {
    // 모바일일 때: 사이드바를 container의 최상단에 위치
    if (container && sidebar && container.firstChild !== sidebar) {
      container.insertBefore(sidebar, container.firstChild);
    }
  } else {
    // 데스크탑일 때: 원래 위치로 되돌리기 (예시: pageWrapper의 container 앞)
    if (pageWrapper && container && pageWrapper.firstChild !== sidebar) {
      pageWrapper.insertBefore(sidebar, container);
    }
  }
}
*/
/* 기존 사이드바 위치는 동일, 반응형 실행 시 사이드바가 컨테이너의 상부로 위치함.
function moveSidebar() {
  if (window.innerWidth <= 768) {
    // 모바일일 때: 사이드바를 container의 최상단에 위치
    if (container && sidebar && container.firstChild !== sidebar) {
      container.insertBefore(sidebar, container.firstChild);
    }
  } else {
    // 데스크탑일 때: 원래 위치로 되돌리기 (예시: pageWrapper의 container 앞)
    if (pageWrapper && container && pageWrapper.firstChild !== sidebar) {
      pageWrapper.insertBefore(sidebar, container);
    }
  }
}
  */
