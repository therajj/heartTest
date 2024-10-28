let scores = {
  influencer: 0,
  nature: 0,
  nostalgia: 0,
  foodie: 0
}

// 在頁面加載時重設分數
window.onload = function () {
  // 獲取分數
  scores = JSON.parse(localStorage.getItem('scores'));

  if (!scores || Object.keys(scores).length === 0) {
    scores = {
      influencer: 0,
      nature: 0,
      nostalgia: 0,
      foodie: 0
    }
  }

  // 判斷最高的類別
  const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  let imageUrl;

  // 設定圖片 URL
  switch (maxCategory) {
    case 'influencer':
      imageUrl = 'images/final-result/influencer.png';
      break;
    case 'nature':
      imageUrl = 'images/final-result/nature.png';
      break;
    case 'nostalgia':
      imageUrl = 'https://final.com/uC09OtC';
      break;
    case 'foodie':
      imageUrl = 'images/final-result/foodie.png';
      break;
    default:
      return; // 沒有匹配，則退出
  }

  // 創建圖片元素
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl; // 設置圖片來源
  imgElement.alt = maxCategory;
  imgElement.style.width = '100%'; // 根據需要調整大小
  imgElement.style.height = 'auto'; // 根據需要調整大小

  // 將圖片添加到顯示區域
  const resultImageDiv = document.getElementById('resultImage'); // 確保這裡獲取到正確的 div
  resultImageDiv.appendChild(imgElement); // 將圖片插入到指定的 div 中

  // 更新結果文本
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = resultText;
};

function downloadFinalImage() {
  const imgElement = document.querySelector('#resultImage img'); // 獲取圖片元素
  window.open(imgElement.src, '_blank'); // 在新分頁中打開圖片
}
