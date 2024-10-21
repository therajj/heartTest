function startQuiz() {
  console.log("立即檢測");
  const container = document.getElementById("container"); // 首頁容器
  container.style.background = "linear-gradient(180deg, #FDFCFB 0%, #E2D1C3 100%)"; // 設原本的背景
  document.getElementById("mainPage").style.display = "none"; // 隱藏首頁
  document.getElementById("question1").style.display = "flex"; // 顯示第一題
  updateProgress();
}


// 紀錄分數並跳到下一題
let scores;

// 增加分數並跳轉下一題
function addScoreAndNext(currentQuestion, scoreObject) {
  console.log({ scoreObject })
  scores = JSON.parse(localStorage.getItem('scores'));

  // 更新分數邏輯
  scores.influencer = scores.influencer + scoreObject.influencer;
  scores.nature = scores.nature + scoreObject.nature;
  scores.nostalgia = scores.nostalgia + scoreObject.nostalgia;
  scores.foodie = scores.foodie + scoreObject.foodie;

  console.log(scores)
  // 更新進度
  updateProgress();

  // 儲存分數到 localStorage
  localStorage.setItem('scores', JSON.stringify(scores));

  // 跳到下一題
  nextQuestion(currentQuestion);
}

function nextQuestion(currentQuestion) {
  const currentDiv = document.getElementById('question' + currentQuestion);
  const nextDiv = document.getElementById('question' + (currentQuestion + 1));

  if (currentDiv) {
    currentDiv.style.display = 'none';  // 隱藏當前題目
  }

  // 更新 localStorage 中的 currentQuestion
  localStorage.setItem('currentQuestion', currentQuestion);

  // 如果是最後一題，跳轉到 loading 畫面
  if (currentQuestion === 9) {
    setTimeout(() => {
      window.location.href = 'loading.html';  // 500毫秒後跳轉到 loading.html
    }, 1000);
  } else if (nextDiv) {
    nextDiv.style.display = 'flex';  // 顯示下一題
  } else {
    showResult();  // 如果已經是最後一題，顯示結果
  }
}


// 總題目數
const totalQuestions = 11;
// 當前題目編號
let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;

// 更新進度條
function updateProgress() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    const progressPercentage = (currentQuestion / totalQuestions) * 100;

    // 獲取進度條目前的寬度
    const progressElement = document.querySelector('.progress');

    // 更新進度條的高度
    progressElement.style.height = progressPercentage + '%';

    // 獲取魚的圖標元素
    const fishIcon = document.querySelector('.fish-icon');

    // 計算進度條的實際高度
    const progressHeight = (progressPercentage / 100) * 500; // 假設進度條高度是500px
    fishIcon.style.bottom = `calc(100% - ${progressHeight + 5}px)`;  // 直接設置為進度條的高度
  }
}

// 顯示測驗結果
function showResult() {
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

  document.getElementById('resultText').innerText = resultText;
  // 顯示結果彈出框
  document.getElementById('resultModal').classList.remove('hidden');

  // 隱藏進度條
  document.getElementById('progressBar').classList.add('hidden');

  // 清除 currentQuestion
  localStorage.removeItem('currentQuestion');

}

function closeHintModal() {
  // 隱藏提示彈出框
  document.getElementById('hintModal').classList.add('hidden');
}

function checkAnswerOne() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    alert('請選擇一個答案！');
    return;
  }

  if (selectedAnswer.value === 'correct') {
    updateProgress();
    // 跳到下一個提示頁面
    jumpToNextPage('question11.html', 0);
  } else {
    // 顯示錯誤提示
    alert('猜錯囉～～');
    document.getElementById("hint-area").classList.remove("hidden");
    // 清空選擇
    document.getElementById('quiz-form').reset(); // 清空選擇
  }
}

function checkAnswerTwo() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  console.log({ currentQuestion })
  if (!selectedAnswer) {
    alert('請選擇一個答案！');
    return;
  }

  if (selectedAnswer.value === 'correct') {
    updateProgress();
    // 跳到選禮物頁面
    window.location.href = 'gift.html';
  } else {
    // 顯示錯誤提示
    alert('猜錯囉～～');
    document.getElementById("hint-area").classList.remove("hidden");
    // 清空選擇
    document.getElementById('quiz-form').reset(); // 清空選擇
  }
}

function closeHintModal() {
  // 隱藏結果彈出框
  document.getElementById('hintModal').classList.add('hidden');
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
