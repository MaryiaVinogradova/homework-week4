var questions = [
    {question: "Commonly used data types DO NOT include",
    answers:["strings","booleans","alerts","numbers"],
    correctAnswer: "alerts"
    },

    {question: "The condition in an if/else statment is enclosed withing_____",
    answers:["quotes","curly brackets","parentheses","square brackets"],
    correctAnswer: "parentheses"
    },

    {question: "Arrays in JavaScript can be used to store ____",
    answers:["numbers and strings","other arrays","booleans","all of the above"],
    correctAnswer: "all of the above"
    },

    {question: "String values must be enclosed within ____ when being assigned to variables",
    answers:["commas","curly brackets","quotes","parentheses"],
    correctAnswer: "quotes"
    },

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers:["JavaScript","terminal / bash","for loops","console.log"],
    correctAnswer: "console.log"
    },

];

var startScreen = document.querySelector("#start-screen");
var startBtn = document.querySelector("#startquiz");
var questionPage = document.querySelector("#question-page");
var time = document.querySelector("#timer");
var questionBox = document.querySelector("#questionBox");
var answerOptions = document.querySelector("#answerOptions");
var submitBtn = document.querySelector("#submitBtn");
var checkAnswer = document.querySelector("#check-answer");
var score = document.querySelector("score");
var scoreResultPage = document.querySelector("#scoreResultPage");
var finalScore = document.querySelector("#finalScore");

var timeLeft = 75;
var timeInterval = -1;
var count = 0;

function showQuestion(){
    questionBox.textContent = questions[count].question;
    answerOptions.textContent = "";
    for (var i=0; i<questions[count].answers.length; i++){
        var list = document.createElement("button");
        list.textContent = questions[count].answers[i];
        list.setAttribute("class", "btn btn-info");
        list.setAttribute("data",questions[count].answers[i]);
        list.setAttribute("answers",questions[count].correctAnswer);
        answerOptions.appendChild(list);
    }
}

function gameQuiz(){
     answerOptions.innerHTML= "";
     checkAnswer.innerHTML ="";
     startScreen.innerHTML="";
     scoreResultPage.innerHTML="";

    showQuestion();
}


answerOptions.addEventListener("click",function(event){
    event.preventDefault();
 
    if (event.target.getAttribute("data") === event.target.getAttribute("answers")) {
        checkAnswer.textContent = "correct!";
        
    } else {
        timeLeft = timeLeft - 10;
        checkAnswer.textContent = "wrong!";
        
    }

    if (checkQuestionsLeft()){
        //show next question
        showQuestion();
    }
}); 


function checkQuestionsLeft (){
    count++; 
    if (count >= questions.length){
        clearInterval(timeInterval);
        renderScore();
        return false;
    } 
    return true;
};

function renderScore(){
    var scoreResult = localStorage.getItem("score");
    var initialsResult = localStorage.getItem("initials");

    localStorage.setItem("score",scoreResult);
    localStorage.setItem("initials", initialsResult);
};


function showResult(){
    scoreResultPage = document.querySelector("#scoreResultPage");
    scoreResultPage.classList.add = "visible";
   if (timeLeft<0){
       timeLeft = 0;
   }
    finalScore = document.querySelector("#finalScore").textContent = score + "Your final score is " + timeLeft;
    document.querySelector("#timer").textContent = timeLeft;

    submitBtn.addEventListener("click",function(event){
        event.preventDefault();

        var scoreResult = timeLeft;
        var initialsResult = document.querySelector("#initials").value;

        localStorage.setItem("score",scoreResult);
        localStorage.setItem("initials", initialsResult);

        renderScore();

        // scoreResultPage.style.display = "none";
        scoreResultPage.classList.add = "visible";
        highscores.classList.add = "visible";
        

        var highscoresResult = document.querySelector("#highscoresResult");
        highscoresResult.textContent = initialsResult + "-" + scoreResult;


        document.querySelector("#clearBtn").addEventListener("click", function(){
           highscoresResult.innerHTML = '<h4>Your Score is clear</h4>';
           document.querySelector("#clearBtn").style.display ="none";
           localStorage.clear();
           var upper =  document.querySelector("#upper");
           upper.setAttribute("class", "displayPage");
           upper.style.margin = "100px";
          
        })

        document.querySelector("#goBackBtn").addEventListener("click", function(){
            location.reload();
          
        })
    });
}



startBtn.addEventListener("click", function(){

    if (timeInterval === -1){
        timeInterval = setInterval(function(){
            timeLeft--;
            time.textContent=timeLeft;
    if (timeLeft === 0 ){
      
        clearInterval(timeInterval);
        showResult();
    }
        }, 1000);
    }

    gameQuiz();

});