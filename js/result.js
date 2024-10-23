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
  console.log('**in', scores)

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
  const resultImageDiv = document.getElementById('resultImage');
  let imageUrl;
  let resultText = ''; // 初始化結果文本
  console.log({maxCategory})
  // 設定圖片 URL
  switch (maxCategory) {
      case 'influencer':
          imageUrl = 'https://imgur.com/a/bVpgzWc';
          resultText = '你是「網美」類型，喜歡拍照打卡！';
          break;
      case 'nature':
          imageUrl = 'images/specific-result/nature.png';
          resultText = '你是「自然」類型，喜歡親近大自然！';
          break;
      case 'nostalgia':
        imageUrl = 'https://imgur.com/uC09OtC';
        resultText = '你是「懷舊」類型，喜歡懷舊風格！';
          break;
      case 'foodie':
          imageUrl = 'images/specific-result/foodie.png';
          resultText = '你是「老饕」類型，熱愛美食！';
          break;
      default:
          console.warn('未匹配的類別:', maxCategory);
          return; // 如果沒有匹配，則退出
  }

  // 創建圖片元素
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl; // 設置圖片來源
  imgElement.alt = maxCategory;
  imgElement.style.width = '100%'; // 根據需要調整大小
  imgElement.style.height = 'auto'; // 根據需要調整大小

  // 將圖片添加到顯示區域
  resultImageDiv.appendChild(imgElement);

  // 更新結果文本
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = resultText;

  // 確保此時 imgElement.src 已被設置
  console.log('Image URL:', imgElement.src); // 檢查圖片 URL
};

// 下載專屬結果圖
// function downloadSpecificImage() {
//   // 根據分數判斷最高的類別
//   const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
//   const resultImageDiv = document.getElementById('resultImage');

//   const link = document.createElement('a');
//   console.log('Image URL:', resultImageDiv.src); // 檢查圖片 URL

//   if (!resultImageDiv.src) {
//     console.warn('圖片來源未設置');
//     return; // 如果圖片來源未設置，則退出
// }
//   // 替換為圖片 URL
//   link.href = document.getElementById('resultImage').src; 
//   console.log(document.getElementById('resultImage').src)
// // 設定下載的檔案名稱
//   switch (maxCategory) {
//     case 'influencer':
//       link.download = 'influencer.png'; 
//       break;
//     case 'nature':
//       link.download = 'nature.png'; 
//       break;
//     case 'nostalgia':
//       link.download = 'nostalgia.png'; 
//       break;
//     case 'foodie':
//       link.download = 'foodie.png'; 
//       break;
//   }

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

function downloadSpecificImage() {
  const imgElement = document.querySelector('#resultImage img'); // 獲取圖片元素

  if (!imgElement || !imgElement.src) {
      console.warn('圖片元素未找到或未設置 src');
      return; // 如果圖片元素未找到或 src 未設置，則退出
  }

  const link = document.createElement('a');
  link.href = imgElement.src; // 獲取圖片的 URL
  document.body.appendChild(link);
  link.click(); // 觸發下載
  document.body.removeChild(link); // 移除鏈接
}
