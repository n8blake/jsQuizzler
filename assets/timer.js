var timeLeft = 60 * 1000;
const timeDiv = document.querySelector("#time-div");

timerInterval = setInterval(countDown, 1000);

function countDown(){
	timeDiv.innerHTML = timeLeft / 1000;
	if(timeLeft <= 0){
		end();
	}
	timeLeft -= 1000;
}
