let user_score = 0;
function loadQuestions(){
    
  fetch('/assets/json/data.json').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    let questions = data;
    let cards_container = document.getElementById('cards-container');


    for(let i = 0; i < questions.length; i++){
        //create a card
        let card = document.createElement('div');
        card.setAttribute('class', 'card card_' + i);


        //create the question
        let question = questions[i]['question'];
        let card_question = document.createElement('p');
        card_question.setAttribute('class', 'question');
        card_question.innerHTML = question;
        card.appendChild(card_question);

        
        //get the answers from json
        

        //creat the possible answers list
        let possible_answers_list = document.createElement('ul');
        possible_answers_list.setAttribute('class', 'possible-answers-list');

        
        //create answers
        for(letter in questions[i]['answers']){
            let answer_letter = letter;
            let answer_value = questions[i]['answers'][letter];
             
            let possible_answer = document.createElement('li');
            let input_answer = document.createElement('input');
            let p_tag = document.createElement('p');
            input_answer.setAttribute('type', 'radio');
            input_answer.setAttribute('id', 'group' + i);
            input_answer.setAttribute('name', 'group' + i);
            input_answer.setAttribute('value', answer_letter);
            input_answer.checked = false;
            p_tag.innerHTML = answer_letter + ": " + answer_value; 
            possible_answer.appendChild(input_answer);
            possible_answer.appendChild(p_tag);
           
             
            possible_answers_list.appendChild(possible_answer);
        }

        card.appendChild(possible_answers_list);
        cards_container.appendChild(card);
       
    }


    //console.log(data[0]['question']);

   // console.log(data[0]['answers']['b']);

    //console.log(data[0]['correctAnswer']);

  }).catch(err => {
    // Do something for an error here
  });
}

loadQuestions()


function checkResults(){
    var cards_container = document.getElementById('cards-container');
    cards_container.setAttribute('class', 'cards-container');

    var submit_button = document.getElementById('submit-button');
    submit_button.setAttribute('class', 'submit-button');

    var results_container = document.getElementById('result-container');
    results_container.setAttribute('class', 'result-container active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch('/assets/json/data.json').then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        let questions = data;
       
        for(let i = 0; i < questions.length; i++){
            for(let j = 0; j < 3; j++){
                var radio_answer = document.getElementById('group' + i);
                var checked_value;
                
                if(radio_answer.checked){
                  
                  checked_value = radio_answer.value;
                  let correct_answer = questions[i]['correctAnswer'];
                  if(checked_value == correct_answer){
                      user_score ++;
                  }
                }
            }
        }


        document.getElementById('result-title').innerHTML = "Your score is: " + user_score + "/3";
    
      }).catch(err => {
        // Do something for an error here
      });
}


function tryAgain(){
    var cards_container = document.getElementById('cards-container');
    cards_container.setAttribute('class', 'cards-container active');

    var submit_button = document.getElementById('submit-button');
    submit_button.setAttribute('class', 'submit-button active');

    var results_container = document.getElementById('result-container');
    results_container.setAttribute('class', 'result-container');
    user_score = 0;
   // loadQuestions();
}
