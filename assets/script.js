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
	updateDOM();
}

var nextQuestion = function(){
	currentQuestion++;
	updateDOM();
}

var previousQuestion = function(){
	if(currentQuestion > 0){
		currentQuestion--;
		updateDOM();
	}
}

var updateDOM = function(){
	setDocumentQuestion(QUESTIONS[currentQuestion]);
	setOptions(QUESTIONS[currentQuestion]);
}

function setDocumentQuestion(questionObject){
	document.querySelector("#question").textContent = questionObject.question;
	document.querySelector("#question-number").textContent = questionObject.idx;
	const code = document.querySelector("#code");
	code.textContent = questionObject.code;
}

function setOptions(questionObject){
	let ul = document.querySelector("#options");
	ul.innerHTML = "";
	questionObject.options.forEach(option => {
		//console.log(option.option);
		var li = document.createElement('li');
		li.classList.add('list-group-item');
		li.setAttribute('data-question-index', QUESTIONS.indexOf(questionObject));
		li.setAttribute('data-question-number', questionObject.idx);
		li.setAttribute('data-option-index', questionObject.options.indexOf(option));	
		li.textContent = option.option;
		ul.appendChild(li);
	});
	answers = document.querySelectorAll('li');
	answers.forEach(li => {
		li.addEventListener('click', select);
	});
}

start();