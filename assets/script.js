let answers = document.querySelectorAll('li');

function select(event){
  answers.forEach(li => {
	li.classList.remove('active');
  });
  event.target.classList.add('active');
}

var QUESTIONS = [];
function setQuestions(data){
  //console.log("got data");
  //console.log(data.length);
  QUESTIONS = data;
}

function getQuestions(){
  return fetch('https://cdn.jsdelivr.net/gh/tombyrer/markdown-quiz-to-json@1/quiz-random.json')
.then(response => response.json())
.then(data => setQuestions(data));
}

var currentQuestion = 0;

const start = async () => {
  await getQuestions();
  //console.log(QUESTIONS[0].idx);
  setDocment();
}

var nextQuestion = function(){
  currentQuestion++;
  setDocment();
}

var previousQuestion = function(){
  if(currentQuestion > 0){
	currentQuestion--;
	setDocment();
  }
}

var setDocment = function(){
  setDocumentQuestion(QUESTIONS[currentQuestion]);
  setOptions(QUESTIONS[currentQuestion]);
}

function setDocumentQuestion(questionObject){
  document.querySelector("#question").textContent = questionObject.question;
  document.querySelector("#question-number").textContent = questionObject.idx;
  const code = document.querySelector("#code");
  code.textContent = questionObject.code;
  hljs.highlightBlock(code);
}

function setOptions(questionObject){
  let ul = document.querySelector("#options");
  ul.innerHTML = "";
  questionObject.options.forEach(option => {
	console.log(option.option);
	var li = document.createElement('li');
	li.classList.add('list-group-item');
	li.textContent = option.option;
	ul.appendChild(li);
  });
  answers = document.querySelectorAll('li');
  answers.forEach(li => {
	li.addEventListener('click', select);
  });
}

start();