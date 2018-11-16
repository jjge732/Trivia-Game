let count = 0;
let correct = 0;
let incorrect = 0;
let timeouts = 0;
let status, masterTime; 
//let prompt = [], answerOption1 = [], answerOption2 = [], answerOption3 = [], answerOption4 = [];
let timeKeeper = 0;

//if API
let categoryNumber = '';
let queryURL;
let apiQuestion = [], apiAnswerOption1 = [], apiAnswerOption2 = [], apiAnswerOption3 = [], apiAnswerOption4 = [];
let categories = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals','Television', 'Video Games', 'Board Games', 'Science & Nature', 'Computers', 'Math', 'Mythology', 'Sports', 'Geography', 'Politics', 'Art', 'Celebrities', 'Animals'];
for (let i = 0; i < categories.length; i++) {
    let newSpan = $('<span>').html(categories[i]);
    newSpan.attr('data-nbr', (i + 9));
    $('main').append(newSpan);
    if (i < categories.length / 3) {
        newSpan.attr('class', 'secondRow categories')
    }
    else if (i < categories.length * 2 / 3) {
        newSpan.attr('class', 'thirdRow categories');
    }
    else {
        newSpan.attr('class', 'fourthRow categories');
    }
}

const createMainContent = () => {
    let prompt = $('<h2>').html(apiQuestion[count]);
    let answerOption1 = $('<div>').html(apiAnswerOption1[count]);
    answerOption1.attr('class', 'clickable');
    answerOption1.attr('data-correct', 'true');
    let answerOption2 = $('<div>').html(apiAnswerOption2[count]);
    answerOption2.attr('class', 'clickable');
    answerOption2.attr('data-correct', 'false');
    let answerOption3 = $('<div>').html(apiAnswerOption3[count]);
    answerOption3.attr('class', 'clickable'); 
    answerOption3.attr('data-correct', 'false');
    let answerOption4 = $('<div>').html(apiAnswerOption4[count]);
    answerOption4.attr('class', 'clickable');
    answerOption4.attr('data-correct', 'false');
    let random = Math.floor(Math.random() * 4);
    $('main').html(prompt);
    for (let j = 0; j < 4; j++) {
        switch (random) {
            case 0:
                $('main').append(answerOption1);
                random++;
                break;
            case 1:
                $('main').append(answerOption2);
                random++;
                break;
            case 2:
                $('main').append(answerOption3);
                random++;
                break;
            case 3:
                $('main').append(answerOption4);
                random = 0;
                break;
        }

    }
    $('header').prepend('<h3>');
    timeKeeper = 1000;
    masterTime = setInterval(function() {
            timeKeeper--;
            let timeLeft = timeConverter(timeKeeper);
            $('h3').html(timeLeft);
        }, 10);
}

const nextQuestion = (accuracy = -1) => {
    clearInterval(masterTime);
    $('h3').remove();
    if (count < apiQuestion.length) {
        timeouts++; //add timeouts every time; will subtract if submit is pressed
        if (count === 0) {
            $('main').html('<h2>You have 10 seconds to answer each question!</h2>');
        }
        else if (count > 0) {
            if (accuracy === -1) {
                $('main').html(`<h2>The correct answer was ${apiAnswerOption1[count - 1]}. Try to answer more quickly!</h2>`);
            }
            else if (accuracy) {
                $('main').html('<h2>Correct!</h2>');
            }
            else if (!accuracy) {
                $('main').html(`<h2>Incorrect! The correct answer was ${apiAnswerOption1[count - 1]}.</h2>`);
            }
        }
        setTimeout(function() {
            createMainContent();
            status = setTimeout(nextQuestion, 10000);
            count++;
        }, 3000)
    }
    else if (count === apiQuestion.length) {
        if (accuracy === -1) {
            $('main').html(`<h2>The correct answer was ${apiAnswerOption1[count - 1]}. Try to answer more quickly!</h2>`);
        }
        else if (accuracy) {
            $('main').html('<h2>Correct!</h2>');
        }
        else if (!accuracy) {
            $('main').html(`<h2>Incorrect! The correct answer was ${apiAnswerOption1[count - 1]}.</h2>`);
        }
        setTimeout(nextQuestion, 3000);
        count++;
    }
    else {
        $('main').html($('<div>').html(`Number of questions answered correctly = ${correct}`));
        $('main').append($('<div>').html(`Number of questions answered incorrectly = ${incorrect}`));
        $('main').append($('<div>').html(`Number of questions unanswered = ${timeouts}`));
    }
}

const timeConverter = t => {

    let seconds = Math.floor(t / 100)
    let centiseconds = t - seconds * 100;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (centiseconds === 0) {
      centiseconds = "00";
    }

    else if (centiseconds < 10) {
      centiseconds = "0" + centiseconds;
    }

    return seconds + ":" + centiseconds;
  }

$(document).on('click', '.categories', function() {
    categoryNumber = $(this).attr('data-nbr');
    queryURL = `https://opentdb.com/api.php?amount=10&category=${categoryNumber}&type=multiple`;
    $('body').prepend($('<header>'));
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        for (let i = 0; i < 10; i++) {
            apiQuestion.push(response.results[i].question);
            apiAnswerOption1.push(response.results[i].correct_answer);
            apiAnswerOption2.push(response.results[i].incorrect_answers[0]);
            apiAnswerOption3.push(response.results[i].incorrect_answers[1]);
            apiAnswerOption4.push(response.results[i].incorrect_answers[2]);
        }
        clearTimeout(status);
        nextQuestion();
    })
})

$(document).on('click', '.clickable', function() {
    clearTimeout(status);
    let accurate;
    if ($(this).attr('data-correct') === 'true') {
        correct++;
        accurate = true
    }
    else {
        incorrect++;
        accurate = false;
    }
    timeouts--; //decrease timeouts if it does not occur to balance out addition earlier
    nextQuestion(accurate);
})