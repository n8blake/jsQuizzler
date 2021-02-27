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
	//event.target.classList.add('active');
	
	console.log(check(event.target.dataset.questionIndex, event.target.dataset.optionIndex));
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

	/*timeDiv.addEventListener('animationend', () => {
		//go to next question
		console.log("next");
		if(countingDown){
			try {
				nextQuestion();
			} catch (err) {
				console.log(err);
			}
			
			//console.log('next question');
			timeDiv.classList.remove('pulse-green');
			timeDiv.classList.remove('pulse-red');
		}
	});*/

}

const goToNextQuestion = () => {
	nextQuestion();
	timeDiv.classList.remove('pulse-green');
	timeDiv.classList.remove('pulse-red');
}

// Given a question number and an option,
// return if that option is the correct
// option for that question.
function check(questionIndex, optionIndex){
	return QUESTIONS[questionIndex].options[optionIndex].accuracy == 1;
}