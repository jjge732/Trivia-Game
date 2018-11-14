const insertQuestion = (radio, label, i) => {
        radio.val(i);
        label.html(i);
}

const createForm = () => {
    let newDiv = $('<div>');
    let newButton = $('<button id="submit">Next Question!</button>');
    for (let i = 0; i < 4; i++) {
        let createRadioInput = $('<input>').attr('type', 'radio');
        let newLabel = $('<label>');
        insertQuestion(createRadioInput, newLabel, i);
        let newForm = $('<form>')
        newForm.append(createRadioInput);
        newForm.append(newLabel);
        newDiv.append(newForm);
    }
    $('main').html(newDiv);
    $('main').append(newButton);
    return newDiv;
}

const nextQuestion = () => {
    $('main').html('Please wait for the next question to load');
    setTimeout(function() {
    createForm();
    setTimeout(nextQuestion, 10000);
    }, 3000)

}

$(document).on('click', '#submit', function() {
    nextQuestion();
})