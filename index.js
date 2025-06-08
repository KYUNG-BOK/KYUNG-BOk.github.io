window.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const container = document.querySelector(".container");
  const header = document.querySelector(".header");
  const pageWrapper = document.querySelector(".page-wrapper");

  function moveSidebar() {
    if (window.innerWidth <= 768) {
      if (container && header && sidebar && header.nextSibling !== sidebar) {
        container.insertBefore(sidebar, header.nextSibling);
      }
    } else {
      if (pageWrapper && container && pageWrapper.firstChild !== sidebar) {
        pageWrapper.insertBefore(sidebar, container);
      }
    }
  }

  function openPopup() {
    window.open('./눈사람만들기/index.html', 'popupWindow', 'width=600,height=400,scrollbars=yes,resizable=yes');
  }

  moveSidebar(); // 초기 실행
  window.addEventListener("resize", moveSidebar); // 반응형 대응
});
