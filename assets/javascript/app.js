let count = 0;
let correct = 0;
let incorrect = 0;
let timeouts = 0;
let status, masterTime; 
let prompt = [], answerOption1 = [], answerOption2 = [], answerOption3 = [], answerOption4 = [];
let timeKeeper = 0;

//if API
let categoryNumber = '';
let queryURL;
let apiQuestion = [], apiAnswerOption1 = [], apiAnswerOption2 = [], apiAnswerOption3 = [], apiAnswerOption4 = [];
let categories = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals & Theatres','Television', 'Video Games', 'Board Games', 'Science & Nature', 'Computers', 'Math', 'Mythology', 'Sports', 'Geography', 'Politics', 'Art', 'Celebrities', 'Animals'];
for (let i = 0; i < categories.length; i++) {
    let newSpan = $('<span class="categories">').html(categories[i]);
    newSpan.attr('data-nbr', (i + 9));
    $('body').append(newSpan);
}

// let questionSet = [{
//     question: 'What is the capital of Illinois?',
//     answerSet: [ 'Springfield', 'Chicago', 'Naperville', 'Champaign'],
//     name: 'cities',
// },
// {
//     question: 'Which president appears on Illinois Licence Plates?',
//     answerSet: ['Abraham Lincoln', 'John Adams', 'Barack Obama', 'Thomas Jefferson'],
//     name: 'presidents',
// },
// {
//     question: 'What is the name of the fourth book in the Harry Potter series?',
//     answerSet: ['The Goblet of Fire', 'The Half-Blood Prince', 'The Order of the Phoenix', 'The Prisoner of Azkaban'],
//     name: 'books',
// },
// {
//     question: 'What is the name of the protagonist of the Hunger Games Series?',
//     answerSet: ['Katniss Everdeen', 'Primm Everdeen', 'Peeta Melark', 'Hermoine Grainger'],
//     name: 'fiction',
// }]

const createMainContent = () => {
    // let prompt = $('<h2>').html(questionSet[count].question);
    // let answerOption1 = $('<div>').html(questionSet[count].answerSet[0]);
    // answerOption1.attr('class', 'clickable');
    // answerOption1.attr('data-correct', 'true');
    // let answerOption2 = $('<div>').html(questionSet[count].answerSet[1]);
    // answerOption2.attr('class', 'clickable');
    // answerOption2.attr('data-correct', 'false');
    // let answerOption3 = $('<div>').html(questionSet[count].answerSet[2]);
    // answerOption3.attr('class', 'clickable'); 
    // answerOption3.attr('data-correct', 'false');
    // let answerOption4 = $('<div>').html(questionSet[count].answerSet[3]);
    // answerOption4.attr('class', 'clickable');
    // answerOption4.attr('data-correct', 'false');
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
    $('main').html(prompt);
    $('main').append(answerOption1, answerOption2, answerOption3, answerOption4);
    $('body').prepend('<h3>');
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
                $('main').html(`<h2>The correct answer was ${apiAnswerOption1[count - 1].apiAnswerOption1[count]}. Try to answer more quickly!</h2>`);
            }
            else if (accuracy) {
                $('main').html('<h2>Correct!</h2>');
            }
            else if (!accuracy) {
                $('main').html(`<h2>Incorrect! The correct answer was ${apiAnswerOption1[count - 1].apiAnswerOption1[count]}.</h2>`);
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
            $('main').html(`<h2>The correct answer was ${apiAnswerOption1[count - 1].apiAnswerOption1[0]}. Try to answer more quickly!</h2>`);
        }
        else if (accuracy) {
            $('main').html('<h2>Correct!</h2>');
        }
        else if (!accuracy) {
            $('main').html(`<h2>Incorrect! The correct answer was ${apiAnswerOption1[count - 1].apiAnswerOption1[0]}.</h2>`);
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

// $(document).on('click', '#submit', function() {
//     clearTimeout(status);
//     // setInterval(createHeader, 10);
//     nextQuestion();
//     // headerTime = $('body').prepend($('<header>'));
// })

$(document).on('click', '.clickable', function() {
    clearTimeout(status);
    nextQuestion();
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