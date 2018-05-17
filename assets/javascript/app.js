$(document).ready(function () {
    initializePage();
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var time = 30;
    var intervalID;
    var timeRunning = false;
    var selection;
    var storeIndex = 0;
    var gifArray = ["assets/images/timeout.gif", "assets/images/correct.gif", "assets/images/wrong.gif"];
    

    var qA = [{
        question: "Which is the dimension of the original Rick?",
        options: ["C-137", "C-129", "C-126", "C-1324"],
        answer: 0,
    }, {
        question: "What is the name of Jerrys favorite Rick?",
        options: ["Goofus", "Roofus", "Rick James B*tch", "Doofus"],
        answer: 3,
    }, {
        question: "What job does Beth have?",
        options: ["House Wife", "Horse Surgeon", "Chef", "Parasite"],
        answer: 1,
    }, {
        question: "What is the name of Morty's High School?",
        options: ["Gene Vegan High School", "Tom Landry High School", "Cypress High School", "Harry Herpson High School"],
        answer: 3,
    }, {
        question: "What is the name of Ricks ex-wife?",
        options: ["Diane", "Joyce", "Jenna", "That lady over there"],
        answer: 0,
    }, {
        question: "What is Schmeckle?",
        options: ["Rick's favorite food", "A currency", "Rick's Cat-Person friend", "Morty's code name for his manhood"],
        answer: 1,
    }];

    function initializePage() {
        $(".box1").html("Hit Rick to Start");
        $(".box2").empty();
        $(".finish").hide();
    }

    //starts game
    $('.start').on('click', function () {
        $(this).hide();
        loadQuestions();

    });

    //restarts page
    $(".finish").on("click", function () {
        location.reload();
    })

    //time functions start......
    function showTime() {
        time--;
        $(".time-remaining").html(`<h2>Time Remaining: ${time} Seconds</h2>`);
        if (time === 0) {
            stop();
            loadAnswerPage();
        }
    }

    function countdown() {
        if (!timeRunning) {
            timeRunning = true;
            intervalId = setInterval(showTime, 1000);
        }
    }

    function stop() {
        timeRunning = false;
        clearInterval(intervalId);
    }

    //time functions end here....

    function loadQuestions() {
        $(".gif").empty();
        showTime();
        $(".box1").html(`<div>${qA[storeIndex].question}</div>`);
        // for(var i = 0; i < qA.length; i++){
        // figure out a way to do the above line of code more clean
        $(".box2").html(`<div class="answer">${qA[storeIndex].options[0]}</div>
        <div class="answer">${qA[storeIndex].options[1]}</div><div class="answer">${qA[storeIndex].options[2]}</div><div class="answer">${qA[storeIndex].options[3]}</div>`);
        countdown();
        $('.answer').on('click', function () {
            //stops time
            stop();
            //this get the index of the selection
            selection = $(".answer").index(this);
            loadAnswerPage();
            indexUp();
            time = 30;
        });
    }

    function indexUp() {
        storeIndex++;
    }

    function loadAnswerPage() {
        if (time === 0) {
            $(".box1").html(`<div>Think for yourselves. Don't be sheep. - Rick Sanchez</div>`);
            var a = $('<img>');
            a.attr("src", gifArray[0]);
            $(".gif").html(a);
            unanswered++;
            time = 30;
            indexUp();
        } else if (qA[storeIndex].answer === selection) {
            $(".box1").html(`[belch] Even Jerry Smith can get one. -Rick Sanchez...kind of`);
            var b = $('<img>');
            b.attr("src", gifArray[1]);
            $(".gif").html(b);
            correct++;
        } else {
            $(".box1").html("Wubba lubba dub dub, Loser! You're wrong. - Rick Sanchez");
            var c = $('<img>');
            c.attr("src", gifArray[2]);
            $(".gif").html(c);
            wrong++;
        }
        $(".box2").html(`<div> Answers: [belch] ${qA[storeIndex].options[qA[storeIndex].answer]} [belchhhhh]!!!</div>`);
        setTimeout(loadQuestions, 5000);
    }


    //NEED TO FINISH MOVING TO NEXT QUESTION SOMEHOW AND LOADING THE FINAL PAGE
    function loadFinishPage() {

    }











    // if(questionAnswered==true){
    //     loadAnswerPage();
    // }else{

    //     loadQuestions();
    // }









});