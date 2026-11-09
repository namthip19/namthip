(() => {
  "use strict";

  const questions = [
    {
      question: "เมื่อใช้สวนสาธารณะและมีขยะจากอาหารที่รับประทาน ควรทำอย่างไร?",
      answers: ["วางไว้ข้างม้านั่งให้เจ้าหน้าที่เก็บ", "ทิ้งลงถังขยะที่จัดไว้ และแยกขยะเมื่อมีจุดรองรับ", "ซ่อนไว้ใต้พุ่มไม้"],
      correct: 1,
      explanation: "การเก็บและทิ้งขยะให้ถูกที่ช่วยรักษาความสะอาดและลดภาระของผู้ดูแล"
    },
    {
      question: "บนรถโดยสารสาธารณะ ควรปฏิบัติอย่างไรเมื่อมีผู้โดยสารกำลังลง?",
      answers: ["รีบแทรกขึ้นไปก่อน", "ยืนขวางประตูเพื่อรอขึ้น", "เว้นทางให้ผู้โดยสารลงก่อนแล้วจึงขึ้น"],
      correct: 2,
      explanation: "การให้ผู้โดยสารลงก่อนช่วยให้ขึ้นลงได้สะดวกและปลอดภัย"
    },
    {
      question: "หากต้องรับโทรศัพท์ในห้องสมุด ควรทำอย่างไร?",
      answers: ["ออกไปคุยในบริเวณที่อนุญาต", "เปิดลำโพงคุยเบา ๆ ที่โต๊ะ", "คุยตามปกติเพราะเป็นเรื่องเร่งด่วน"],
      correct: 0,
      explanation: "ควรรักษาความเงียบและออกไปใช้พื้นที่ที่เหมาะสมในการสนทนา"
    },
    {
      question: "ทางลาดสำหรับรถเข็นและผู้ที่มีข้อจำกัดในการเคลื่อนไหวควรใช้แบบใด?",
      answers: ["วางสิ่งของชั่วคราวได้ถ้าไม่นาน", "เว้นให้โล่ง ไม่กีดขวาง", "ใช้เป็นที่จอดจักรยานได้"],
      correct: 1,
      explanation: "ทางลาดเป็นเส้นทางจำเป็นที่ต้องเข้าถึงได้ตลอดเวลา"
    },
    {
      question: "หากพบอุปกรณ์สาธารณะชำรุด ควรทำอย่างไร?",
      answers: ["ลองซ่อมเองแม้ไม่มีความรู้", "ปล่อยไว้เพราะไม่ใช่หน้าที่", "หลีกเลี่ยงการใช้งานและแจ้งผู้ดูแลสถานที่"],
      correct: 2,
      explanation: "การแจ้งผู้ดูแลช่วยป้องกันอุบัติเหตุและทำให้ซ่อมแซมได้อย่างเหมาะสม"
    }
  ];

  const byId = (id) => document.getElementById(id);
  const menuToggle = byId("menuToggle");
  const mainNav = byId("mainNav");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
  });
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "เปิดเมนู");
    });
  });

  byId("year").textContent = new Date().getFullYear();

  let currentQuestion = 0;
  const answers = Array(questions.length).fill(null);
  const questionArea = byId("questionArea");
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");
  const quizForm = byId("quizForm");
  const result = byId("quizResult");

  function renderQuestion() {
    const q = questions[currentQuestion];
    byId("questionCount").textContent = `คำถาม ${currentQuestion + 1} จาก ${questions.length}`;
    const percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    byId("progressPercent").textContent = `${percent}%`;
    byId("progressBar").style.width = `${percent}%`;
    questionArea.innerHTML = `
      <p class="question-kicker">QUESTION ${String(currentQuestion + 1).padStart(2, "0")}</p>
      <h3 class="question-title">${q.question}</h3>
      <div class="answer-list">
        ${q.answers.map((answer, index) => `
          <label class="answer-option">
            <input type="radio" name="answer" value="${index}" ${answers[currentQuestion] === index ? "checked" : ""}>
            <span>${answer}</span>
          </label>
        `).join("")}
      </div>`;
    questionArea.querySelectorAll('input[name="answer"]').forEach(input => {
      input.addEventListener("change", event => {
        answers[currentQuestion] = Number(event.target.value);
      });
    });
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.hidden = currentQuestion === questions.length - 1;
    submitBtn.hidden = currentQuestion !== questions.length - 1;
  }

  nextBtn.addEventListener("click", () => {
    if (answers[currentQuestion] === null) {
      const first = questionArea.querySelector('input[name="answer"]');
      first.focus();
      questionArea.querySelector(".answer-list").setAttribute("data-error", "กรุณาเลือกคำตอบก่อน");
      let notice = questionArea.querySelector(".answer-error");
      if (!notice) {
        notice = document.createElement("p");
        notice.className = "answer-error";
        notice.style.cssText = "color:#a34f3f;font-size:12px;margin:8px 0 0";
        notice.textContent = "กรุณาเลือกคำตอบก่อน";
        questionArea.querySelector(".answer-list").after(notice);
      }
      return;
    }
    currentQuestion += 1;
    renderQuestion();
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      renderQuestion();
    }
  });

  quizForm.addEventListener("submit", event => {
    event.preventDefault();
    if (answers[currentQuestion] === null) {
      nextBtn.click();
      return;
    }
    const score = answers.reduce((total, answer, index) =>
      total + (answer === questions[index].correct ? 1 : 0), 0);
    const percent = Math.round((score / questions.length) * 100);
    let message = "ลองทบทวนหลักมารยาทอีกครั้ง แล้วทำแบบทดสอบใหม่ได้นะ";
    if (score === questions.length) message = "ยอดเยี่ยม! คุณเข้าใจการใช้พื้นที่สาธารณะอย่างใส่ใจแล้ว";
    else if (score >= 3) message = "ทำได้ดี! อีกนิดเดียวก็ครบทุกข้อแล้ว";
    result.innerHTML = `
      <div class="result-score">${score} / ${questions.length}</div>
      <h3>${percent === 100 ? "ยอดเยี่ยมมาก!" : "สรุปผลแบบทดสอบ"}</h3>
      <p>${message}</p>
      <button type="button" id="retryQuiz">ทำแบบทดสอบอีกครั้ง ↻</button>`;
    result.hidden = false;
    questionArea.hidden = true;
    byId("quizForm").querySelector(".quiz-progress").hidden = true;
    byId("quizForm").querySelector(".quiz-controls").hidden = true;
    byId("retryQuiz").addEventListener("click", resetQuiz);
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function resetQuiz() {
    currentQuestion = 0;
    answers.fill(null);
    result.hidden = true;
    questionArea.hidden = false;
    byId("quizForm").querySelector(".quiz-progress").hidden = false;
    byId("quizForm").querySelector(".quiz-controls").hidden = false;
    renderQuestion();
  }

  byId("pledgeBtn").addEventListener("click", () => {
    const confirm = byId("pledgeConfirm");
    confirm.hidden = false;
    byId("pledgeBtn").textContent = "ร่วมสร้างพื้นที่ที่น่าอยู่แล้ว ✓";
    byId("pledgeBtn").disabled = true;
    byId("pledgeBtn").style.opacity = ".75";
  });

  renderQuestion();
})();
