function toggleMenu() {
  const menuLinks = document.getElementById("menu-links");
  menuLinks.classList.toggle("show");
}

// 跳轉到下一個html, path是html的路徑, time是如果有需要等待的時間
function jumpToNextPage(path, time) {
  // 如果需要等待
  if (time) {
    // 設定跳轉時間，例如2秒後跳轉到結果頁或下一頁
    setTimeout(function () {
      window.location.href = path;
      // 這裡可以改成結果頁或下一步的網頁
    }, time);  // ex: 2000 毫秒 = 2 秒
  }
  // 直接跳轉
  else {
    window.location.href = path;
  }
} 