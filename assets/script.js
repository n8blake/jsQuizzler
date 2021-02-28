var QUESTIONS = [];
var HIGH_SCORES = [];
var gameStartDate = new Date();

const setQuestions = (data) =>{
	//console.log("got data");
	//console.log(data.length);
	QUESTIONS = data;
}

const getQuestions = () => {
	return fetch('https://cdn.jsdelivr.net/gh/tombyrer/markdown-quiz-to-json@1/quiz-random.json')
	.then(response => response.json())
	.then(data => setQuestions(data));
}

var currentQuestion = 0;

let countingDown = true;

const start = async () => {
	//Update action button
	currentQuestion = 0;
	actionBtn.removeEventListener('click', start);
	actionBtn.addEventListener('click', end);
	actionBtn.textContent = "End Game";
	actionBtn.classList.remove('text-primary');
	actionBtn.classList.add('text-danger');
	await getQuestions();
	shuffleQuestions();
	gameStartDate = new Date();
	
	//Show the quiz, hide the scores
	document.querySelector("#quiz").style.display = "block";
	document.querySelector("#scores").style.display = "none";

	updateDOM();
	timeLeft = 60 * 1000;
	timerInterval = setInterval(countDown, 1000);
}

const end = () => {
	countingDown = false;
	clearInterval(timerInterval);

	//update the action button
	actionBtn.removeEventListener('click', end);
	actionBtn.addEventListener('click', start);
	actionBtn.classList.remove('text-danger');
	actionBtn.classList.add('text-primary');
	actionBtn.textContent = "Start Game";
	// save score and initals
	document.querySelector("#display-score").textContent = "SCORE: " + correct;
	document.querySelector("#time-div").textContent = "Game Over!";
	document.querySelector("#quiz").style.display = "none";
	document.querySelector("#scores").style.display = "block";
	document.querySelector("#score-form").style.display = "block";
}

const nextQuestion = () => {
	currentQuestion = currentQuestion + 1;
	//console.log(currentQuestion);
	if(currentQuestion < QUESTIONS.length){
		updateDOM();
	} else {
		end();
	}
}

const previousQuestion = () => {
	if(currentQuestion > 0){
		currentQuestion--;
		updateDOM();
	}
}

const updateDOM = () => {
	setDocumentQuestion(QUESTIONS[currentQuestion]);
	setOptions(QUESTIONS[currentQuestion]);
}

const setDocumentQuestion = (questionObject) => {
	document.querySelector("#question").textContent = questionObject.question;
	let questionNumber = document.querySelector("#question-number");
	questionNumber.innerHTML = QUESTIONS.indexOf(questionObject) + 1 + "<small class='text-muted'> of " + QUESTIONS.length + "</small>";
	const code = document.querySelector("#code");
	code.textContent = questionObject.code;
}

const setOptions = (questionObject) => {
	let ul = document.querySelector("#options");
	ul.innerHTML = "";
	questionObject.options.forEach(option => {
		//console.log(option.option);
		var li = document.createElement('li');
		li.classList.add('list-group-item');
		li.classList.add('text-monospace');
		li.classList.add('btn');
		li.classList.add('btn-outline-secondary');
		li.classList.add('m-2');
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

const getScores = () => {
	if(localStorage.getItem('HIGH_SCORES') === null){
		setScores();
	}
	return JSON.parse(localStorage.getItem('HIGH_SCORES'));
}

const setScores = () => {
	localStorage.setItem('HIGH_SCORES', JSON.stringify(HIGH_SCORES));
}

const addScore = (event) => {
	initials.value;
	let newScore = {};
	newScore.initials = initials.value.trim();
	newScore.score = correct;
	newScore.date = gameStartDate;
	HIGH_SCORES.push(newScore);
	setScores();
	renderScoreTable();
}

const renderScoreTable = () => {
	const table = document.querySelector("#high-scores-table-body");
	table.innerHTML = "";
	//const _table = document.createElement('tbody');
	//_table.setAttribute('id', 'high-scores-table-body');
	for(let i = 0; i < HIGH_SCORES.length; i++){
		let row = document.createElement('tr');
		for (const [key, value] of Object.entries(HIGH_SCORES[i])) {
			let cell = document.createElement('td');
			if(key == 'date') {
				let date = new Date(value);
				cell.textContent = date.toLocaleString();
			} else {
				cell.textContent = value;
			}
			row.appendChild(cell);
			//console.log(`${key}: ${value}`);
		}
		table.appendChild(row);
	}
}

const enableSaveScore = () => {
	if(initials.value){
		if(initials.value.length > 0 &&  /\S/.test(initials.value)){
			addScoreBtn.disabled = false;
			return;
		}
	}
	addScoreBtn.disabled = true;
}

const actionBtn = document.querySelector("#actionBtn");
const addScoreBtn = document.querySelector("#addScoreBtn");
const initials = document.querySelector("#initials");
//console.log(addScoreBtn);
//console.log("WTF");
addScoreBtn.disabled = true;
addScoreBtn.addEventListener('click', addScore);
actionBtn.addEventListener('click', start);
initials.addEventListener('keyup', enableSaveScore);

HIGH_SCORES = getScores();
renderScoreTable();


//start();