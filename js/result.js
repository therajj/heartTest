let scores;

// 在頁面加載時重設分數
window.onload = function () {
  // 儲存分數到 localStorage
  scores = JSON.parse(localStorage.getItem('scores'));
  console.log("reload gift", scores)
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

  console.log({ scores })
  // 更新分數邏輯
  scores.influencer = scores.influencer + scoreObject.influencer;
  scores.nature = scores.nature + scoreObject.nature;
  scores.nostalgia = scores.nostalgia + scoreObject.nostalgia;
  scores.foodie = scores.foodie + scoreObject.foodie;

  localStorage.setItem('scores', JSON.stringify(scores));

  // 跳到儲存圖片頁面
  window.location.href = 'result.html';
}

// 顯示測驗結果
function showResult() {
  console.log('##in')
  // 根據分數判斷最高的類別
  const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  let resultText = '';
  switch (maxCategory) {
    case 'influencer':
      resultText = '你是「網美」類型，喜歡拍照打卡！';
      break;
    case 'nature':
      resultText = '你是「自然」類型，喜歡親近大自然！';
      break;
    case 'nostalgia':
      resultText = '你是「懷舊」類型，喜歡懷舊風格！';
      break;
    case 'foodie':
      resultText = '你是「老饕」類型，熱愛美食！';
      break;
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerText = resultText; // 更新結果文本

  // 清除 currentQuestion
  localStorage.removeItem('currentQuestion');

}