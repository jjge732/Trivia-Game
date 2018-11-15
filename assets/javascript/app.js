let count = 0;
let correct = 0;
let incorrect = 0;
let timeouts = 0;
let status;

let questionSet = [{
    question: 'What is the capital of Illinois?',
    answerSet: [ 'Springfield', 'Chicago', 'Naperville', 'Champaign'],
    name: 'cities',
},
{
    question: 'Which president appears on Illinois Licence Plates?',
    answerSet: ['Abraham Lincoln', 'John Adams', 'Barack Obama', 'Thomas Jefferson'],
    name: 'presidents',
},
{
    question: 'What is the name of the fourth book in the Harry Potter series?',
    answerSet: ['The Goblet of Fire', 'The Half-Blood Prince', 'The Order of the Phoenix', 'The Prisoner of Azkaban'],
    name: 'books',
},
{
    question: 'What is the name of the protagonist of the Hunger Games Series?',
    answerSet: ['Katniss Everdeen', 'Primm Everdeen', 'Peeta Melark', 'Hermoine Grainger'],
    name: 'fiction',
}]

const createMainContent = () => {
    let prompt = $('<h2>').html(questionSet[count].question);
    let answerOption1 = $('<div>').html(questionSet[count].answerSet[0]);
    answerOption1.attr('class', 'clickable');
    answerOption1.attr('data-correct', 'true');
    let answerOption2 = $('<div>').html(questionSet[count].answerSet[1]);
    answerOption2.attr('class', 'clickable');
    answerOption2.attr('data-correct', 'false');
    let answerOption3 = $('<div>').html(questionSet[count].answerSet[2]);
    answerOption3.attr('class', 'clickable'); 
    answerOption3.attr('data-correct', 'false');
    let answerOption4 = $('<div>').html(questionSet[count].answerSet[3]);
    answerOption4.attr('class', 'clickable');
    answerOption4.attr('data-correct', 'false');
    $('main').html(prompt);
    $('main').append(answerOption1, answerOption2, answerOption3, answerOption4);

}

const nextQuestion = (accuracy = -1) => {
    if (count <= questionSet.length) {
        timeouts++; //add timeouts every time; will subtract if submit is pressed
        if (count === 0) {
            $('main').html('<h2>You have 10 seconds to answer each question!</h2>');
        }
        else if (count > 0) {
            if (accuracy === -1) {
                $('main').html('<h2>Try to answer more quickly!</h2>')
            }
            else if (accuracy) {
                $('main').html('<h2>Correct!</h2>')
            }
            else if (!accuracy) {
                $('main').html(`<h2>Incorrect! The correct answer was ${questionSet[count - 1].answerSet[0]}.</h2>`)
            }
        }
        setTimeout(function() {
        createMainContent();
        status = setTimeout(nextQuestion, 10000);
        count++;
    }, 3000)
    }
    else {
        $('main').html($('<div>').html(`Number of questions answered correctly = ${correct}`));
        $('main').append($('<div>').html(`Number of questions answered incorrectly = ${incorrect}`));
        $('main').append($('<div>').html(`Number of questions unanswered = ${timeouts}`));
    }
}

const timeConverter = t => {

    let seconds = Math.floor(t)
    let centiseconds = (t - seconds) * 100;

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

const createHeader = (time = 0) => {
    time++;
    let currentTime = timeConverter(time);
    $('body').prepend($('<header>').html($(`<h3>${currentTime}</h3>`)));
}

$(document).on('click', '#submit', function() {
    clearTimeout(status);
    setInterval(createHeader(), 10);
    nextQuestion();
})

$(document).on('click', '.clickable', function() {
    clearTimeout(status);
    console.log($(this).attr('data-correct'));
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