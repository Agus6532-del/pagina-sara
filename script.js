document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. ESTRELLAS DE FONDO
  // =============================================
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = star.style.height = (Math.random() * 4 + 2) + 'px';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    starsContainer.appendChild(star);
  }

  // =============================================
  // 2. TABS
  // =============================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tool-panel');

  function switchTool(toolId) {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    const targetBtn = document.querySelector(`.tab-btn[data-tool="${toolId}"]`);
    if (targetBtn) targetBtn.classList.add('active');
    const targetPanel = document.getElementById('tool-' + toolId);
    if (targetPanel) targetPanel.classList.add('active');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTool(btn.dataset.tool);
    });
  });

  const resourceLinks = document.querySelectorAll('[data-tool-link]');
  resourceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTool(link.dataset.toolLink);
      document.querySelector('.tools').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // =============================================
  // 3. RULETA DE VOCABULARIO
  // =============================================
  const wheelWords = [
    'Cat', 'Dog', 'Sun', 'Moon', 'Star', 'Fish', 'Bird', 'Tree',
    'Book', 'Ball', 'Apple', 'Happy', 'Rainbow', 'Heart', 'Butterfly', 'Flower'
  ];

  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinBtn = document.getElementById('spinBtn');
  const wheelResult = document.getElementById('wheelResult');

  const colors = ['#9b59b6', '#c9a9e0', '#7d3c98', '#d2b4de', '#8e44ad', '#e8d5f5'];
  let currentAngle = 0;
  let spinning = false;

  function drawWheel(angle) {
    const seg = (2 * Math.PI) / wheelWords.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;

    for (let i = 0; i < wheelWords.length; i++) {
      const start = angle + i * seg;
      const end = start + seg;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + seg / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Nunito, sans-serif';
      ctx.fillText(wheelWords[i], r - 10, 4);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  function spinWheel() {
    if (spinning) return;
    spinning = true;
    wheelResult.textContent = '🎡 girando...';

    const spins = 5 + Math.floor(Math.random() * 5);
    const targetAngle = currentAngle + spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const startAngle = currentAngle;
    const duration = 3000;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      currentAngle = startAngle + (targetAngle - startAngle) * ease;
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        const seg = (2 * Math.PI) / wheelWords.length;
        const normalized = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(normalized / seg);
        const word = wheelWords[(wheelWords.length - 1 - idx) % wheelWords.length];
        wheelResult.textContent = '✨ ' + word + ' ✨';
      }
    }

    animate();
  }

  drawWheel(0);
  spinBtn.addEventListener('click', spinWheel);

  // =============================================
  // 4. FLASHCARDS
  // =============================================
  const flashcardInput = document.getElementById('flashcardInput');
  const flashcardBtn = document.getElementById('flashcardBtn');
  const flashcard = document.getElementById('flashcard');

  flashcardBtn.addEventListener('click', () => {
    const text = flashcardInput.value.trim();
    if (!text) return;
    flashcard.classList.remove('flipped');
    setTimeout(() => {
      document.querySelector('.flashcard-back').textContent = text;
      flashcard.classList.add('flipped');
    }, 100);
    flashcardInput.value = '';
  });

  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  // =============================================
  // 5. JUEGO DE MEMORIA
  // =============================================
  const memoryGrid = document.getElementById('memoryGrid');
  const memoryPairsSpan = document.getElementById('memoryPairs');
  const memoryReset = document.getElementById('memoryReset');

  const memoryEmojis = ['🐱', '🐶', '🐰', '🐻', '🦊', '🐸'];
  let memoryCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let lockBoard = false;

  function initMemory() {
    memoryGrid.innerHTML = '';
    const doubled = [...memoryEmojis, ...memoryEmojis];
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }

    memoryCards = doubled;
    flippedCards = [];
    matchedPairs = 0;
    lockBoard = false;
    memoryPairsSpan.textContent = 'Pares: 0 / ' + memoryEmojis.length;

    memoryCards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.index = index;
      card.dataset.emoji = emoji;
      card.textContent = '💜';
      card.addEventListener('click', () => flipMemoryCard(card));
      memoryGrid.appendChild(card);
    });
  }

  function flipMemoryCard(card) {
    if (lockBoard) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (flippedCards.length === 2) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true;
      const [c1, c2] = flippedCards;
      if (c1.dataset.emoji === c2.dataset.emoji) {
        c1.classList.add('matched');
        c2.classList.add('matched');
        matchedPairs++;
        memoryPairsSpan.textContent = 'Pares: ' + matchedPairs + ' / ' + memoryEmojis.length;
        flippedCards = [];
        lockBoard = false;

        if (matchedPairs === memoryEmojis.length) {
          setTimeout(() => {
            alert('🎉 ¡Has encontrado todas las parejas! 🎉');
          }, 300);
        }
      } else {
        setTimeout(() => {
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
          c1.textContent = '💜';
          c2.textContent = '💜';
          flippedCards = [];
          lockBoard = false;
        }, 800);
      }
    }
  }

  memoryReset.addEventListener('click', initMemory);
  initMemory();

  // =============================================
  // 6. CONTADOR DE PUNTOS
  // =============================================
  const pointsCount = document.getElementById('pointsCount');
  const pointsAdd = document.getElementById('pointsAdd');
  const pointsReset = document.getElementById('pointsReset');
  const confettiContainer = document.getElementById('confettiContainer');

  let points = parseInt(localStorage.getItem('saraPoints') || '0', 10);
  pointsCount.textContent = points;

  pointsAdd.addEventListener('click', () => {
    points++;
    pointsCount.textContent = points;
    localStorage.setItem('saraPoints', points);
    spawnConfetti();
  });

  pointsReset.addEventListener('click', () => {
    points = 0;
    pointsCount.textContent = '0';
    localStorage.setItem('saraPoints', '0');
  });

  function spawnConfetti() {
    const pieces = 20;
    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const colors = ['#9b59b6', '#c9a9e0', '#7d3c98', '#d2b4de', '#8e44ad', '#f5e6ff'];
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = (Math.random() * 200 - 100) + 'px';
      piece.style.animationDuration = (Math.random() * 0.5 + 1) + 's';
      piece.style.animationDelay = (Math.random() * 0.3) + 's';
      piece.style.width = piece.style.height = (Math.random() * 8 + 5) + 'px';
      confettiContainer.appendChild(piece);
      setTimeout(() => piece.remove(), 2000);
    }
  }

  // =============================================
  // 7. WORD OF THE DAY
  // =============================================
  const wordEmoji = document.getElementById('wordEmoji');
  const wordText = document.getElementById('wordText');
  const wordTranslation = document.getElementById('wordTranslation');
  const wordBtn = document.getElementById('wordBtn');

  const wordList = [
    { emoji: '🐱', word: 'Cat', translation: 'Gato' },
    { emoji: '🐶', word: 'Dog', translation: 'Perro' },
    { emoji: '☀️', word: 'Sun', translation: 'Sol' },
    { emoji: '🌙', word: 'Moon', translation: 'Luna' },
    { emoji: '⭐', word: 'Star', translation: 'Estrella' },
    { emoji: '🐟', word: 'Fish', translation: 'Pez' },
    { emoji: '🐦', word: 'Bird', translation: 'Pájaro' },
    { emoji: '🌳', word: 'Tree', translation: 'Árbol' },
    { emoji: '📖', word: 'Book', translation: 'Libro' },
    { emoji: '⚽', word: 'Ball', translation: 'Pelota' },
    { emoji: '🍎', word: 'Apple', translation: 'Manzana' },
    { emoji: '🌈', word: 'Rainbow', translation: 'Arcoíris' },
    { emoji: '💜', word: 'Purple', translation: 'Morado' },
    { emoji: '🦋', word: 'Butterfly', translation: 'Mariposa' },
    { emoji: '🌻', word: 'Flower', translation: 'Flor' },
    { emoji: '🐰', word: 'Rabbit', translation: 'Conejo' },
    { emoji: '🐻', word: 'Bear', translation: 'Oso' },
    { emoji: '🍦', word: 'Ice Cream', translation: 'Helado' },
    { emoji: '🚀', word: 'Rocket', translation: 'Cohete' },
    { emoji: '🎵', word: 'Music', translation: 'Música' },
  ];

  let currentWordIndex = 0;
  let lastWordDate = '';

  function getWordOfDay() {
    const today = new Date().toDateString();
    if (today !== lastWordDate) {
      lastWordDate = today;
      const hash = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      currentWordIndex = hash % wordList.length;
    }
    return wordList[currentWordIndex];
  }

  function showWord(wordObj) {
    wordEmoji.textContent = wordObj.emoji;
    wordText.textContent = wordObj.word;
    wordTranslation.textContent = wordObj.translation;
  }

  function randomWord() {
    const idx = Math.floor(Math.random() * wordList.length);
    showWord(wordList[idx]);
  }

  showWord(getWordOfDay());
  wordBtn.addEventListener('click', randomWord);

  // =============================================
  // 8. QUIZ DE VOCABULARIO
  // =============================================
  const quizData = [
    { emoji: '🐱', english: 'Cat', spanish: 'Gato', cat: 'animals' },
    { emoji: '🐶', english: 'Dog', spanish: 'Perro', cat: 'animals' },
    { emoji: '🐰', english: 'Rabbit', spanish: 'Conejo', cat: 'animals' },
    { emoji: '🐻', english: 'Bear', spanish: 'Oso', cat: 'animals' },
    { emoji: '🦊', english: 'Fox', spanish: 'Zorro', cat: 'animals' },
    { emoji: '🐸', english: 'Frog', spanish: 'Rana', cat: 'animals' },
    { emoji: '🐟', english: 'Fish', spanish: 'Pez', cat: 'animals' },
    { emoji: '🐦', english: 'Bird', spanish: 'Pájaro', cat: 'animals' },
    { emoji: '🐴', english: 'Horse', spanish: 'Caballo', cat: 'animals' },
    { emoji: '🐷', english: 'Pig', spanish: 'Cerdo', cat: 'animals' },
    { emoji: '🍎', english: 'Apple', spanish: 'Manzana', cat: 'food' },
    { emoji: '🍌', english: 'Banana', spanish: 'Plátano', cat: 'food' },
    { emoji: '🍦', english: 'Ice Cream', spanish: 'Helado', cat: 'food' },
    { emoji: '🍪', english: 'Cookie', spanish: 'Galleta', cat: 'food' },
    { emoji: '🍉', english: 'Watermelon', spanish: 'Sandía', cat: 'food' },
    { emoji: '🍓', english: 'Strawberry', spanish: 'Frutilla', cat: 'food' },
    { emoji: '🍕', english: 'Pizza', spanish: 'Pizza', cat: 'food' },
    { emoji: '🧀', english: 'Cheese', spanish: 'Queso', cat: 'food' },
    { emoji: '🥛', english: 'Milk', spanish: 'Leche', cat: 'food' },
    { emoji: '🍫', english: 'Chocolate', spanish: 'Chocolate', cat: 'food' },
    { emoji: '🔴', english: 'Red', spanish: 'Rojo', cat: 'colors' },
    { emoji: '🟢', english: 'Green', spanish: 'Verde', cat: 'colors' },
    { emoji: '🔵', english: 'Blue', spanish: 'Azul', cat: 'colors' },
    { emoji: '🟡', english: 'Yellow', spanish: 'Amarillo', cat: 'colors' },
    { emoji: '🟠', english: 'Orange', spanish: 'Naranja', cat: 'colors' },
    { emoji: '🟣', english: 'Purple', spanish: 'Morado', cat: 'colors' },
    { emoji: '⚪', english: 'White', spanish: 'Blanco', cat: 'colors' },
    { emoji: '⚫', english: 'Black', spanish: 'Negro', cat: 'colors' },
    { emoji: '🟤', english: 'Brown', spanish: 'Marrón', cat: 'colors' },
    { emoji: '🩷', english: 'Pink', spanish: 'Rosa', cat: 'colors' },
    { emoji: '1️⃣', english: 'One', spanish: 'Uno', cat: 'numbers' },
    { emoji: '2️⃣', english: 'Two', spanish: 'Dos', cat: 'numbers' },
    { emoji: '3️⃣', english: 'Three', spanish: 'Tres', cat: 'numbers' },
    { emoji: '4️⃣', english: 'Four', spanish: 'Cuatro', cat: 'numbers' },
    { emoji: '5️⃣', english: 'Five', spanish: 'Cinco', cat: 'numbers' },
    { emoji: '6️⃣', english: 'Six', spanish: 'Seis', cat: 'numbers' },
    { emoji: '7️⃣', english: 'Seven', spanish: 'Siete', cat: 'numbers' },
    { emoji: '8️⃣', english: 'Eight', spanish: 'Ocho', cat: 'numbers' },
    { emoji: '9️⃣', english: 'Nine', spanish: 'Nueve', cat: 'numbers' },
    { emoji: '🔟', english: 'Ten', spanish: 'Diez', cat: 'numbers' },
  ];

  const quizEmoji = document.getElementById('quizEmoji');
  const quizEnglish = document.getElementById('quizEnglish');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNext = document.getElementById('quizNext');
  const quizCorrect = document.getElementById('quizCorrect');
  const quizWrong = document.getElementById('quizWrong');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizCatBtns = document.querySelectorAll('.quiz-cat-btn');

  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = { correct: 0, wrong: 0 };
  let quizAnswered = false;
  let quizCurrentCat = 'all';

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getWrongOptions(correctSpanish, count) {
    const allSpanish = quizData.map(q => q.spanish);
    const unique = [...new Set(allSpanish)];
    const filtered = unique.filter(s => s !== correctSpanish);
    const shuffled = shuffleArray([...filtered]);
    return shuffled.slice(0, count);
  }

  function startQuiz(cat) {
    quizCurrentCat = cat;
    if (cat === 'all') {
      quizQuestions = shuffleArray([...quizData]);
    } else {
      quizQuestions = shuffleArray(quizData.filter(q => q.cat === cat));
    }
    quizIndex = 0;
    quizScore = { correct: 0, wrong: 0 };
    quizCorrect.textContent = '0';
    quizWrong.textContent = '0';
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    quizNext.style.display = 'none';
    showQuestion();
  }

  function showQuestion() {
    if (quizIndex >= quizQuestions.length) {
      quizEmoji.textContent = '🎉';
      quizEnglish.textContent = '¡Completaste el quiz!';
      quizOptions.innerHTML = '';
      quizFeedback.textContent = `✅ ${quizScore.correct} correctas — ❌ ${quizScore.wrong} incorrectas`;
      quizFeedback.className = 'quiz-feedback correct-fb';
      quizNext.style.display = 'none';
      quizProgressFill.style.width = '100%';
      return;
    }

    const q = quizQuestions[quizIndex];
    quizEmoji.textContent = q.emoji;
    quizEnglish.textContent = q.english;
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    quizNext.style.display = 'none';
    quizAnswered = false;

    const wrongOptions = getWrongOptions(q.spanish, 3);
    const allOptions = shuffleArray([q.spanish, ...wrongOptions]);

    quizOptions.innerHTML = '';
    allOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt;
      btn.dataset.value = opt;
      btn.addEventListener('click', () => selectAnswer(btn, q.spanish));
      quizOptions.appendChild(btn);
    });

    const progress = ((quizIndex) / quizQuestions.length) * 100;
    quizProgressFill.style.width = progress + '%';
  }

  function selectAnswer(btn, correctAnswer) {
    if (quizAnswered) return;
    quizAnswered = true;

    const allBtns = quizOptions.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.classList.add('disabled'));

    const isCorrect = btn.dataset.value === correctAnswer;

    allBtns.forEach(b => {
      if (b.dataset.value === correctAnswer) {
        b.classList.add('correct');
      }
    });

    if (isCorrect) {
      btn.classList.add('correct');
      quizFeedback.textContent = '✅ ¡Correcto! 🎉';
      quizFeedback.className = 'quiz-feedback correct-fb';
      quizScore.correct++;
      quizCorrect.textContent = quizScore.correct;
    } else {
      btn.classList.add('wrong');
      quizFeedback.textContent = `❌ La respuesta era: ${correctAnswer}`;
      quizFeedback.className = 'quiz-feedback wrong-fb';
      quizScore.wrong++;
      quizWrong.textContent = quizScore.wrong;
    }

    quizNext.style.display = 'inline-block';
  }

  quizNext.addEventListener('click', () => {
    quizIndex++;
    showQuestion();
  });

  quizCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quizCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      startQuiz(btn.dataset.cat);
    });
  });

  startQuiz('all');

  // =============================================
  // 9. COLORING PAGES
  // =============================================
  const coloringItems = document.querySelectorAll('.coloring-item');
  const coloringModal = document.getElementById('coloringModal');
  const coloringClose = document.getElementById('coloringClose');
  const coloringModalSvg = document.getElementById('coloringModalSvg');

  coloringItems.forEach(item => {
    item.addEventListener('click', () => {
      const svgClone = item.querySelector('svg').cloneNode(true);
      coloringModalSvg.innerHTML = '';
      coloringModalSvg.appendChild(svgClone);
      coloringModal.classList.add('show');
    });
  });

  coloringClose.addEventListener('click', () => {
    coloringModal.classList.remove('show');
  });

  coloringModal.addEventListener('click', (e) => {
    if (e.target === coloringModal) {
      coloringModal.classList.remove('show');
    }
  });

  // =============================================
  // 9. STORIES
  // =============================================
  const storyBtns = document.querySelectorAll('.story-btn');
  const storyContent = document.getElementById('storyContent');

  const stories = {
    1: {
      title: '🌟 The Purple Butterfly',
      paragraphs: [
        'Once upon a time, there was a little purple butterfly named Violeta. She lived in a beautiful garden full of flowers. Every morning, she would fly from flower to flower, singing a happy song.',
        'One day, she met a sad little girl named Sara. "Why are you sad?" asked Violeta.',
        '"I have no one to play with," said Sara.',
        '"I will play with you!" said Violeta. And they played together all day, laughing and dancing among the flowers.',
        'From that day on, Sara was never sad again. She had a purple friend who loved her.'
      ],
      moral: '💜 <em>A true friend can make everything better.</em>'
    },
    2: {
      title: '🌈 The Kind Rainbow',
      paragraphs: [
        'High up in the purple sky, there lived a beautiful rainbow named Purpura. She had seven colors, but her favorite was purple, just like Teacher Sara.',
        'One day, Purpura looked down and saw the children playing in the rain. They looked cold and wet. "I want to help them," she thought.',
        'So Purpura stretched her colors all the way down to the ground. The children looked up and smiled. "Wow! A rainbow!" they shouted.',
        'Purpura said, "After every rain, there is a rainbow. Never be sad, because something beautiful is coming."',
        'The children clapped and danced under the rainbow. From that day, every time it rained, they looked for Purpura in the sky.'
      ],
      moral: '🌈 <em>After every storm, something beautiful appears.</em>'
    },
    3: {
      title: '💜 Lily and the Purple Heart',
      paragraphs: [
        'Lily was a little girl who loved the color purple. She had purple shoes, a purple backpack, and even a purple pencil case.',
        'One day, she found a small purple heart on her desk. "Who left this here?" she wondered. She looked around, but nobody was there.',
        'The next day, she found another purple heart. And another. Soon, she had a collection of ten purple hearts.',
        'One of her classmates, Tom, was very shy. Lily noticed that Tom always sat alone. So she gave him one of her purple hearts.',
        'Tom smiled for the first time. "Thank you," he whispered. From that day, Lily and Tom became best friends. And Lily learned that sharing love makes it grow bigger.'
      ],
      moral: '💜 <em>Sharing love and kindness makes it grow bigger.</em>'
    }
  };

  function showStory(id) {
    const story = stories[id];
    let html = `<div class="story-text"><h4>${story.title}</h4>`;
    story.paragraphs.forEach(p => {
      html += `<p class="story-english">${p}</p>`;
    });
    html += `<div class="story-moral">${story.moral}</div></div>`;
    storyContent.innerHTML = html;

    storyBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.story-btn[data-story="${id}"]`).classList.add('active');
  }

  showStory(1);

  storyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showStory(btn.dataset.story);
    });
  });

  // =============================================
  // 11. PIZARRA VIRTUAL
  // =============================================
  const wbCanvas = document.getElementById('wbCanvas');
  wbCanvas.width = 1400;
  wbCanvas.height = 800;
  const wbCtx = wbCanvas.getContext('2d');
  wbCtx.lineCap = 'round';
  wbCtx.lineJoin = 'round';
  wbCtx.fillStyle = '#fff';
  wbCtx.fillRect(0, 0, 1400, 800);

  let wbDrawing = false, wbErasing = false, wbColor = '#4a235a', wbSize = 10, wbLastX, wbLastY;

  function wbGetPos(e) {
    const rect = wbCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const borderX = (rect.width - wbCanvas.clientWidth) / 2;
    const borderY = (rect.height - wbCanvas.clientHeight) / 2;
    return {
      x: (clientX - rect.left - borderX) / wbCanvas.clientWidth * 1400,
      y: (clientY - rect.top - borderY) / wbCanvas.clientHeight * 800
    };
  }

  function wbStartDraw(e) {
    wbDrawing = true;
    const pos = wbGetPos(e);
    wbLastX = pos.x;
    wbLastY = pos.y;
  }

  function wbDraw(e) {
    if (!wbDrawing) return;
    e.preventDefault();
    const pos = wbGetPos(e);
    wbCtx.beginPath();
    wbCtx.moveTo(wbLastX, wbLastY);
    wbCtx.lineTo(pos.x, pos.y);
    wbCtx.strokeStyle = wbErasing ? '#fff' : wbColor;
    wbCtx.lineWidth = wbErasing ? wbSize * 3 : wbSize;
    wbCtx.stroke();
    wbLastX = pos.x;
    wbLastY = pos.y;
  }

  function wbStopDraw() { wbDrawing = false; }

  wbCanvas.addEventListener('mousedown', wbStartDraw);
  wbCanvas.addEventListener('mousemove', wbDraw);
  wbCanvas.addEventListener('mouseup', wbStopDraw);
  wbCanvas.addEventListener('mouseleave', wbStopDraw);
  wbCanvas.addEventListener('touchstart', wbStartDraw, { passive: false });
  wbCanvas.addEventListener('touchmove', wbDraw, { passive: false });
  wbCanvas.addEventListener('touchend', wbStopDraw);

  document.querySelectorAll('.wb-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.wb-color-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      wbColor = btn.dataset.color;
    });
  });

  document.querySelectorAll('.wb-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.wb-size-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      wbSize = parseInt(btn.dataset.size);
    });
  });

  document.getElementById('wbEraser').addEventListener('click', function () {
    this.classList.toggle('active');
    wbErasing = this.classList.contains('active');
    wbCanvas.style.cursor = wbErasing ? 'cell' : 'crosshair';
  });

  document.getElementById('wbClear').addEventListener('click', () => {
    wbCtx.clearRect(0, 0, 1400, 800);
    wbCtx.fillStyle = '#fff';
    wbCtx.fillRect(0, 0, 1400, 800);
  });

  // =============================================
  // 12. NEKO GATITO MORADO (sigue el mouse)
  // =============================================
  window.neko = createNeko({ speed: 24 });

});
