let user_score = 0;
let number_of_questions = 0;
let num_of_answers_per_question = 3;
function loadQuestions(){
    
  fetch('/assets/json/data.json').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    let questions = data;
    let cards_container = document.getElementById('cards-container');
    number_of_questions = questions.length;
    
    let id = 0;
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
        
        let req = 0;
        //create answers
        for(letter in questions[i]['answers']){
            
            let answer_letter = letter;
            let answer_value = questions[i]['answers'][letter];
            
            let possible_answer = document.createElement('li');
          
            
            let input_answer = document.createElement('input');
            let p_tag = document.createElement('p');
            input_answer.setAttribute('type', 'radio');
            input_answer.setAttribute('id',id);
            id++;
            input_answer.setAttribute('name', 'group' + i);
           
            input_answer.setAttribute('value', answer_letter);
            if(req == 0){
              input_answer.required = true;
              req++;
            }
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
    let meets_the_requirements = checkIfAtLeastOneIsChecked(number_of_questions);
     
    if(meets_the_requirements){
  //    removeClassFromLi();
  
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
              for(let j = 0; j < num_of_answers_per_question; j++){
                  var radio_answer = document.getElementById(i * num_of_answers_per_question + j);
                  
                  var checked_value;
                  if(radio_answer.value == questions[i]['correctAnswer']){
                    radio_answer.parentElement.setAttribute('class', 'right-answer');
                  }
                  if(radio_answer.checked){
                    checked_value = radio_answer.value;
                    let correct_answer = questions[i]['correctAnswer'];
                    if(checked_value == correct_answer){
                        user_score ++;
                    }else{
                      radio_answer.parentElement.setAttribute('class', 'wrong-answer');
                    }
                  }
              }
          }
  
  
          document.getElementById('result-title').innerHTML = "Your score is: " + user_score + "/" +questions.length ;
      
        }).catch(err => {
          // Do something for an error here
        });
    }else{
      var meetTheReqMsg = document.getElementById('meets-the-requirements-message');
      meetTheReqMsg.setAttribute('class', 'meets-the-requirements-message active');
      delay(2000).then(() => meetTheReqMsg.setAttribute('class', 'meets-the-requirements-message'));
    }
    
  
}


function tryAgain(){
    makeAllButtonsUnchecked(number_of_questions, num_of_answers_per_question);
    removeClassFromLi();
    var cards_container = document.getElementById('cards-container');
    cards_container.setAttribute('class', 'cards-container active');
    
    var submit_button = document.getElementById('submit-button');
    submit_button.setAttribute('class', 'submit-button active');

    var results_container = document.getElementById('result-container');
    results_container.setAttribute('class', 'result-container');
    
    user_score = 0;
   
}



function checkIfAtLeastOneIsChecked(num_of_questions){
  //this must be equal to the number of questions 
  let radios_checked = 0;
  for(let i = 0; i < num_of_questions; i++){
    for(let j = 0; j < num_of_answers_per_question; j++){
        var radio = document.getElementById(i * num_of_answers_per_question + j);
       
        if(radio.checked){
          radios_checked++;
        }
    }
}

    if(radios_checked == num_of_questions){
      
      return true;
    }
    return false;
}



function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function makeAllButtonsUnchecked(num_of_questions, num_of_answers_per_question){
  for(let i = 0; i < num_of_questions; i++){
    for(let j = 0; j < num_of_answers_per_question; j++){
        var radio = document.getElementById(i * num_of_answers_per_question + j);
        radio.checked = false;
    }
  }
}

function removeClassFromLi(){
 



 
   var right_answer_elements = document.querySelectorAll(".right-answer");
   for(i=0; i<right_answer_elements.length; i++)
   { 
    right_answer_elements[i].classList.remove('right-answer');
   }


   var wrong_answer_elements = document.querySelectorAll(".wrong-answer");
   for(i=0; i<wrong_answer_elements.length; i++)
   { 
    wrong_answer_elements[i].classList.remove('wrong-answer');
   }
  
}