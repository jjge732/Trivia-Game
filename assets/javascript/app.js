let count = 0;
let correct = 0;
let incorrect = 0;
let timeouts = 0;

let questionSet = [{
    question: 'What is the capital of Illinois?',
    answerSet: [ 'Springfield', 'Chicago', 'Naperville', 'Champaign'],
    name: 'cities',
    alreadySeen: false
},
{
    question: 'What president appears on Illinois Liscence Plates?',
    answerSet: ['Abraham Lincoln', 'Thomas Jefferson', 'Barack Obama', 'Thomas Jefferson'],
    name: 'presidents',
    alreadySeen: false
},
{
    question: 'What is the name of the fourth book in the Harry Potter series?',
    answerSet: ['The Goblet of Fire', 'The Half-Blood Prince', 'The Order of the Phoenix', 'The Prisoner of Azkaban'],
    name: 'books',
    alreadySeen: false
},
{
    question: 'What is the name of the protagonist of the Hunger Games Series?',
    answerSet: ['Katniss Everdeen', 'Primm Everdeen', 'Peeta Melark', 'Hermoine Grainger'],
    name: 'fiction',
    alreadySeen: false
}]

const insertQuestion = (radio, label, i) => {
        radio.attr('name', questionSet[count].name);
        radio.val(questionSet[i].question);
        label.html(questionSet[count].answerSet[i]);
}

const createForm = () => {
    let newDiv = $('<div>');
    let newButton = $('<button id="submit">Next Question!</button>');
    let newForm = $('<form>').html(questionSet[0].question + '<br>');
    for (let i = 0; i < 4; i++) {
        let createRadioInput = $('<input>').attr('type', 'radio');
        let newLabel = $('<label>');
        insertQuestion(createRadioInput, newLabel, i);
        newForm.append(createRadioInput);
        newForm.append(newLabel);
        newForm.append($('<br>'));
        newDiv.append(newForm);
    }
    $('main').html(newDiv);
    $('main').append(newButton);
    return newDiv;
}

const nextQuestion = () => {
    if (count < questionSet.length) {
        $('main').html('Please wait for the next question to load');
    setTimeout(function() {
    createForm();
    setTimeout(nextQuestion, 10000);
    count++;
    }, 3000)
    }
    else {
        $('main').append($('<div>').html(correct));
        $('main').append($('<div>').html(incorrect));
        $('main').append($('<div>').html(timeouts));
    }
}

$(document).on('click', '#submit', function() {
    if ()
    nextQuestion();
})