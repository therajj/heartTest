// 在頁面加載時重設分數
window.onload = function () {
  // 將分數重置為 0
  scores = {
    influencer: 0,
    nature: 0,
    nostalgia: 0,
    foodie: 0
  };
  // 儲存分數到 localStorage
  localStorage.setItem('scores', JSON.stringify(scores));
  localStorage.setItem('currentQuestion', 0);
};
