var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	animatePress(userChosenColour);
	playSound(userChosenColour);

	// Check the answer after the user has clicked a button
	checkAnswer();
});

function nextSequence() {
	userClickedPattern.length = 0;
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$.each(gamePattern, function (index, color) {
		setTimeout(function () {
			animatePress(color);
			playSound(color);
		}, 500 * index);
	});
	level += 1;
	$("#level-title").text("Level " + level);
}

$(document).one("keypress", nextSequence);

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour)
		.fadeOut(100)
		.fadeIn(100);
}

function checkAnswer() {
	if (userClickedPattern.length === gamePattern.length) {
		if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
			setTimeout(function () {
				nextSequence();
			}, 1000); // Delay before starting the next sequence
		} else {
			$("#level-title").text("You Lose! Refresh to start a new game.");
		}
	}
}
