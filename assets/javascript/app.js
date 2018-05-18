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
    var audio = new Audio('assets/images/rickandmortytheme.mp3');

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
    }, {
        question: "Who are Rick Sanchez's two best friends?",
        options: ["Eagleperson and Scrunchy", "Beakbeak and Squinchy", "Birdperson and Squanchy", "Hawkperson and Sqelchy"],
        answer: 2,
    }, {
        question: "What non-human species makes up half of Morty's son?",
        options: ["Kanye West", "Gurglenstein", "Gazorpazorp", "Gesaffelstein"],
        answer: 2,
    }, {
        question: "What word should you never say to a Traflorkian?",
        options: ["Glip Glop", "Bee Bop", "Hip Hop", "Fart Fart"],
        answer: 0,
    }, {
        question: "What are the Ball Fondlers?",
        options: ["Avengers arch nemesis", "Rick and Morty's arch nemisis", "Donald Trump's Arch nemisis", "Rick and Morty's favorite TV show"],
        answer: 3,
    }];

    //audio.play();  audio.pause(); figure it out
    function initializePage() {
        $(".box1").html("Hit Rick to Start");
        $(".box2").empty();
        $(".finish").hide();
    }

    //starts game
    $('.start').on('click', function () {
        $(this).hide();
        loadQuestions();
        audio.play();
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
            $(".answer").hide();
            unanswered++;
            time = 30;
            indexUp();
            loadFinishPage();

        } else if (qA[storeIndex].answer === selection) {
            $(".box1").html(`Even Jerry Smith can get one. -Rick Sanchez...kind of`);
            var b = $('<img>');
            b.attr("src", gifArray[1]);
            $(".gif").html(b);
            correct++;
            loadFinishPage();
        } else {
            $(".box1").html("Wubba lubba dub dub, Loser! You're wrong. - Rick Sanchez");
            var c = $('<img>');
            c.attr("src", gifArray[2]);
            $(".gif").html(c);
            wrong++;
            loadFinishPage();
        }
        $(".box2").html(`<div> Answers: ${qA[storeIndex].options[qA[storeIndex].answer]} [belchhhhh]!!!</div>`);
        //The page time is based on the time increment below
        setTimeout(loadQuestions, 4000);
        setTimeout(loadFinishPage, 5000);
    }

    function loadFinishPage() {
        //update storeIndex if you want to add questions  
        if (storeIndex === 10) {
            audio.pause();
            $(".time-remaining").empty();
            $(".box1").replaceWith(`<video width="320" height="240" autoplay>
            <source src="assets/images/endingvideo.mp4" type="video/mp4">
          </video>`);
            $('.box2').replaceWith(`<div class="fin">Correct: ${correct}, Wrong: ${wrong}, Unanswered: ${unanswered}.<br> Good job, now enjoy this video.<br> Click on Morty to play again.</div>`);
            $('.gif').remove();
            $(".finish").show();
        }
    }
});