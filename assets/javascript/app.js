var ques = [{
	question: "question 1",
	answers: ["1", "2", "3", "4"],
	correct: "3",
	img: ""
},
{
	question: "question 2",
	answers: ["5", "6", "7", "8"],
	correct: "5",
	img: ""
},
{
	question: "question 3",
	answers: ["9", "10", "11", "12"],
	correct: "12",
	img: ""
},
{
	question: "question 4",
	answers: ["13", "14", "15", "16"],
	correct: "14",
	img: ""
}];
var quesIndex = 0;
var timer = 30;
var result = "";
var intervalId = "";
var correct = 0;
var wrong = 0;
var unanswered = 0;
var openRow = "<div class='row align-items-center'><div class='col text-center'>";
var closeRow = "</div></div>";

$(document).ready(function() {

	// class mainContent append start button
		// class btn btn-secondary btn-lg
	$(".mainContent").append("<div class='row align-items-center startRow'><div class='col text-center'><button class='btn btn-secondary btn-lg start'>Start</button></div></div>");

	// function of displaying question and answer
	// question()
	function question() {
		// search ques[quesIndex] for question, corresponding answers, correct answer
		var question = ques[quesIndex].question;
		var answer = ques[quesIndex].answers;

		// append <p> class h4 question
		$(".trivia").append(openRow + "<p class='h3 question'>" + question + "</p>" + closeRow);

		// append <div> class answer
			// append the 4 answers
			// 		- for loop
			//		- use button (class btn btn-secondary btn-lg answer) 
		for (var i = 0; i < 4; i++) {
			$(".trivia").append(openRow + "<button class='btn btn-secondary btn-lg answers'>" + answer[i] + "</button>" + closeRow);
		}

		// result = correct answer
		result = ques[quesIndex].correct;
	}
		
	// function to change time remain
	// timeRemain()
	function timeRemain() {
		timer--;

		// find class timeRemain and change text 
		$(".timeRemain").text("Time remaining: " + timer + " Seconds");

		// if timer === 0
		if (timer === 0){
			Result(0);
			// clearInterval(interval);
			clearInterval(intervalId);
		}
	}
		
	// function of displaying correct guess or not
	// result(answer)
	function Result(answer) {	
		// pass in user answer
		// find class trivia
		// .empty() to remove all children
		$(".trivia").empty();

		// if answer === 0 || answer !== result;
		if (answer === 0 || answer !== result) {
			// if answer === 0 
			if (answer === 0) {
				unanswered++;
				// append <p> class h4 Out of Time!
				$(".trivia").append(openRow + "<p class='h4'>Out of Time!</p>" + closeRow);
			}
			// else 
			else {
				wrong++;
				// append <p> class h4 Nope!
				$(".trivia").append(openRow + "<p class='h4'>Nope!</p>" + closeRow);
			}
			// append <p> The Correct Answer was: result
			$(".trivia").append(openRow + "<p class='h4'>The Correct Answer was: " + result + "</p>" + closeRow);
		}
		// else 
		else {
			correct++;
			// append <p> class h4 Correct!
			$(".trivia").append(openRow + "<p class='h4'>Correct!</p>" + closeRow);
		}
		// append <img> src = ques[quesIndex].img
		$(".trivia").append(openRow + "<img src=" + ques[quesIndex].img + ">" + closeRow);

		quesIndex++;
		// setTimeout(function() {}, 4000);
		setTimeout(function() {
			// if ques[quesIndex] !== "undefined"
			if (ques[quesIndex] !== undefined) {
				// find class trivia
				// .empty() to remove all children
				$(".trivia").empty();

				timer = 30;
				$(".timeRemain").text("Time remaining: " + timer + " Seconds");
				question();

				// set interval
					// timeRemain()
				intervalId = setInterval(timeRemain, 1000);
			}
			// else 
			else {
				// find class trivia
				// .empty() to remove all children
				$(".trivia").empty();

				// append <p> class h4 All done, heres how you did!
				$(".trivia").append(openRow + "<p class='h4'>All done, here's how you did!</p>" + closeRow);
				// append <p> "Correct Answer:" + correct;
				$(".trivia").append(openRow + "<p>Correct Answer: " + correct + "</p>" + closeRow);
				// append <p> "Incorrect Answer:" + wrong;
				$(".trivia").append(openRow + "<p>Incorrect Answer: " + wrong + "</p>" + closeRow);
				// append <p> "Unanswered:" + unanswered;
				$(".trivia").append(openRow + "<p>Unanswered: " + unanswered + "</p>" + closeRow);
				// append <button> (class btn btn-secondary btn-lg restart) Start Over?
				$(".trivia").append(openRow + "<button class='btn btn-secondary btn-lg restart'>Start Over?</button>" + closeRow);
			}
		}, 4000);
	}

	// when start button is pressed
	$(".start").click(function() {
		// remove start button
		$(".startRow").remove();

		// in class mainContent
			// append <p> class h4 time remain
			// append <div> class trivia
		$(".mainContent").append(openRow + "<p class='h4 timeRemain'>Time Remaining: 30 Seconds</p>" + closeRow);
		$(".mainContent").append("<div class='trivia'></div>");

		// call question();
		question();

		// set interval
			// timeRemain()
		intervalId = setInterval(timeRemain, 1000);
	});
		
	// when answer button is pressed
	$(document).on('click', ".answers", function() {
		// clearInterval(interval);
		clearInterval(intervalId);

		Result($(this).text());
	});

	// when restart button is pressed
	$(document).on('click', ".restart", function() {
		quesIndex = 0;
		timer = 30;
		result = "";
		interval = "";
		correct = 0;
		wrong = 0;
		unanswered = 0;
		$(".mainContent").empty();

		// in class mainContent
			// append <p> class h4 time remain
			// append <div> class trivia
		$(".mainContent").append(openRow + "<p class='h4 timeRemain'>Time Remaining: 30 Seconds</p>" + closeRow);
		$(".mainContent").append("<div class='trivia'></div>");

		// call question();
		question();

		// set interval
			// timeRemain()
		intervalId = setInterval(timeRemain, 1000);
	});

});