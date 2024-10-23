// 在頁面加載時重設分數
window.onload = function () {
  // 儲存分數到 localStorage
  scores = JSON.parse(localStorage.getItem('scores'));
};

// 增加分數並跳轉下一題
function addScoreAndNext(currentQuestion, scoreObject) {
  console.log({ scoreObject })
  scores = JSON.parse(localStorage.getItem('scores'));
  console.log({ scores })
  // 檢查 orgScores 是否存在，如果不存在則初始化
  if (!scores) {
    scores = {
      influencer: 0,
      nature: 0,
      nostalgia: 0,
      foodie: 0
    };
  }

  // 更新分數邏輯
  scores.influencer = scores.influencer + scoreObject.influencer;
  scores.nature = scores.nature + scoreObject.nature;
  scores.nostalgia = scores.nostalgia + scoreObject.nostalgia;
  scores.foodie = scores.foodie + scoreObject.foodie;

  localStorage.setItem('scores', JSON.stringify(scores));

  // 跳到第一個儲存圖片頁面
  window.location.href = 'result.html';
}