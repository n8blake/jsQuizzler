let answers = document.querySelectorAll('li');

function select(event){
	//console.log(event.target.dataset);
	answers.forEach(li => {
		li.classList.remove('active');
	});
	event.target.classList.add('active');
	console.log(check(event.target.dataset.questionIndex, event.target.dataset.optionIndex));
}

// Given a question number and an option,
// return if that option is the correct
// option for that question.
function check(questionIndex, optionIndex){
	return QUESTIONS[questionIndex].options[optionIndex].accuracy == 1;
}