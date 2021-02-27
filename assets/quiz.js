let answers = document.querySelectorAll('li');
let questionCount = 0;
let correct = 0;

function select(event){
	//console.log(event.target.dataset);
	questionCount++;
	document.querySelector("#number-total").textContent = questionCount;
	answers.forEach(li => {
		li.removeEventListener('click', select);
	});
	//console.log(check(event.target.dataset.questionIndex, event.target.dataset.optionIndex));
	if(check(event.target.dataset.questionIndex, event.target.dataset.optionIndex)){
		event.target.classList.add('bg-success');
		timeDiv.classList.add('pulse-green');
		timeLeft += 2000;
		correct++;
		document.querySelector("#number-correct").textContent = correct;
	} else {
		event.target.classList.add('bg-danger');
		timeDiv.classList.add('pulse-red');
		timeLeft -= 2000;
	}
	
	time = setTimeout(goToNextQuestion, 500);

}

const goToNextQuestion = () => {
	nextQuestion();
	timeDiv.classList.remove('pulse-green');
	timeDiv.classList.remove('pulse-red');
}

const shuffleQuestions = () => {
	let array = QUESTIONS;
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
}


// Given a question number and an option,
// return if that option is the correct
// option for that question.
function check(questionIndex, optionIndex){
	return QUESTIONS[questionIndex].options[optionIndex].accuracy == 1;
}