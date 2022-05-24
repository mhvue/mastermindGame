let enteredNum = [];
let newNum = [];
let count = 10;
let score = 0;

/**
 * function randomNum 
 * @returns generated numbers from api
 */
function randomNum () {
   
    return $.ajax({
        url: "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new",
        method: "GET"
    }).then(function(response){
        let generatedNum= [];
        //to remove whitespaces
        const num = response.replaceAll("\n", "");
        
        generatedNum.push(num);
        newNum = generatedNum.join().split("");
        console.log(newNum)
        //pop up message to welcome user
        $(".modal-title").addClass("intro-title");
        messageModal("Let's Play! Guess the 4 number combination.")

        //show reset button, hint button active and hite play again button on modal
        $("#reset-btn").text("Reset");
        $("#hint-btn").prop("disabled", false);
        $(".playAgainBtn").hide();
    })
};
randomNum();

/**
 * function to create custom messages as modal pops up
 * @param {string} message 
 * @param {string} image -optional
 */
function messageModal (message, image){
    image = image || "";

    $(".modal").modal("show")
    $(".intro-title").text("Welcome!");
    $(".try-title").text("Try Again");
    $(".gameOver-title").text("Game Over");
    $(".almost-title").text("Almost");
    $(".correct-title").text("Congrats!");
    $(".hint-title").text("Hint");
    $(".messageContainer").html(message);
    $(image).prependTo(".messageContainer");
}

/**
 * function for when the count goes down
 * when count reaches 0, game is over. modals pops up informing of so.
 * eveyrone resets (score, feedback gone, count)
 *  button to play again shows up.
 */
function countDown() {
    count--;
    $("#guess-num").text(count);

    //halfway count
    if(count === 5) {
        $("#guess-num").css("color", "#FF0000");
    }

    //game over
    if(count === 0){
       
        $(".modal-title").removeClass("intro-title try-title almost-title correct-title hint-title").addClass("gameOver-title");
        messageModal(`The answer was ${newNum.join("")}`);
        $(".playAgainBtn").show();
        $("#submitBtn, #hint-btn").each(function() {
            $(this).prop("disabled", true)
        });
        $("#reset-btn").text("Play Again");
        $("#guess-num").css("color", "#fff");
        score = 0
    }
};



//reset to run randomNum, enabled submit btn, restart count, clear guesses
$("#reset-btn").on("click", function() {
    //pop up msg to show the correct answer and offer to replay 
    $(".modal-title").removeClass("intro-title try-title almost-title correct-title hint-title").addClass("gameOver-title");
    messageModal(`The answer was ${newNum.join("")} Hit Play Again button to play again`);
    $(".playAgainBtn").show()

    //start count at 10 again 
    count = 10;

    //disable submit button and hint button,  show count restarted, and clear history 
    $("#submitBtn, #hint-btn").each(function() {
        $(this).prop("disabled", true)
    });
    $("#guess-num").text(count);
    $(".historyHolder").html("");
});

//play again button on modal 
$(".playAgainBtn").on("click", function(event) {
    event.preventDefault();
    //start generated random number again by calling api
    randomNum();

    //start count at 10 again 
    count = 10;

    //enable submit button, show count restarted, and clear history 
    $("#submitBtn").prop("disabled", false);
    $("#guess-num").text(count);
    $(".historyHolder").html("");
});


//user presses submit button 
$("#submitBtn").click(function(){
    //event.preventDefault();
    let checker = [];
    let incorrectArr = []; 
    let containsArr =[];
    let splitUserNum;
    const checkRegEx = /^[0-7]+$/; //with the help from stackOverflow
    const checkLetters = /^[A-Za-z]+$/
   
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();

    $(".playAgainBtn").prop("disabled",false);
    $(".playAgainBtn").hide();

    //input of numbers that equal 0-7 and only 4 characters 
    if(userNum.match(checkRegEx) && userNum.length === 4){
        enteredNum.push(userNum);
        splitUserNum = enteredNum.join().split("");
    }
    //input of numbers more than 4 characters, input of numbers less than 4
    else if(userNum.length > 4 || userNum.length <= 3 || userNum.match(checkLetters)) { 
        $(".modal-title").removeClass("intro-title almost-title gameOver-title correct-title hint-title").addClass("try-title");
        return messageModal("Please input 4 numbers.");
   }
   
    else{
        //input of numbers bigger than 7
        console.log("false")
        return messageModal("Numbers bigger than 7 detected. Please input 0-7.");
    }

  

 
  //compared enteredNum values to genreatedNum values. 
    for(let i = 0; i < splitUserNum.length; i++){     

        //if number entered by user (now splitUserNum) equals elements in generatedNum (now as newNum)
       if(splitUserNum[i] === newNum[i]){
          checker.push(splitUserNum[i])
        }
        //user input the num already verified as correct, but in combination with differ incorrect numbers
        else if(splitUserNum.includes(newNum[i])){
            containsArr.push(newNum[i])
        }
        else {
            //push the non matched numbers to incorrectArr
            incorrectArr.push(splitUserNum[i])
            
            //clear enteredNum array once end of loop
            if(i === enteredNum.length-1) {
                enteredNum.length = 0;
            }
          }
    };
    
//messages to user
    //correct answers
    if(checker.length === 4) {
        const correctImg = $("<img src='./images/correctBtn.svg' alt= 'red box with white x' >");
        const correctMsg = $("<h5> You got all the numbers corret. Play Again?</h5>");
        const winSound = new Audio("./other/win_bell.wav");

        //winning sound 
        winSound.play();

        //increase score 
        score++;
        $(".scoreBoard").text(score);

        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").removeClass("intro-title almost-title gameOver-title hint-title try-title").addClass("correct-title");
        messageModal(correctMsg, correctImg);
        $(".playAgainBtn").show();

        //disable submit btn and hint btn as game is over. clear array containing what user input to play again(if user chose to)
        $("#reset-btn").text("Play Again").addClass(".playAgainBtn");
        $("#submitBtn, #hint-btn").each(function() {
            $(this).prop("disabled", true)
        });
        enteredNum.length = 0;
    }
    //incorrrect answers
    else if(incorrectArr.length === 4){
        const incorrectVal = incorrectArr.join("");
        const tryAgainImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const tryAgainMsg = $("<span> No Match </span>").addClass("text-position");
        const historyList= $("<li>").addClass("historyItem").append([incorrectVal, "<span> Sorry, no match. </span>"]);
        
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").removeClass("intro-title almost-title gameOver-title correct-title hint-title").addClass("try-title");
        messageModal(tryAgainMsg, tryAgainImg);

        //show user their guesses and history of their guesses with feedback
        $(".historyHolder").append(historyList); 

       //reset arrays and keep counting down
        incorrectArr = [];
        enteredNum.length = 0;
        countDown();

   }
   //correct numbers but incorrect position
    else if(checker.length <= 3 || containsArr.length <= 3){
      
        const almostVal = splitUserNum.join("");
        const almostImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const almostMsg = $("<span> You are close! Keep trying. </span>").addClass("text-position");
        const historyList= $("<li>").addClass("historyItem").append(`${almostVal} `).append("<span>Almost.</span>");
        
        //pop up message to show user they are close to guessing correct answer 
        $(".modal-title").removeClass("intro-title try-title gameOver-title correct-title hint-title")
                          .addClass("almost-title");
        messageModal(almostMsg, almostImg);

         //show user their guesses and history of their guesses with feedback
        $(".historyHolder").append(historyList); 

        //look at checker length to provide hint to user
        if(checker.length === 2 || containsArr.length === 2){
            $(".modal-title").removeClass("intro-title try-title gameOver-title correct-title hint-title")
                          .addClass("almost-title");
            messageModal("You got two numbers correct. Keep going!")
        }

        //reset arrays and keep counting down
        checker = [];
        enteredNum.length = 0;
        containsArr.length = 0;
        countDown();
    
   }
});


//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
});

//hint - can only hit once
$("#hint-btn").click(function() {
   //show a number randomly btwn 0-3 based on index but not location, to show value to user
   const randomIndex =  Math.floor((Math.random() * 3) + 0);
   const hintImg = $("<img src='./images/hint.jpg' alt= 'hint word on keyboard' >");
   const hintMsg = $("<h5>").text(`It contains ${newNum[randomIndex]}`);

   //show modal with hint
   $(".modal-title").removeClass("intro-title almost-title gameOver-title  correct-title try-title").addClass("hint-title");
   messageModal(hintMsg, hintImg);
   $(".playAgainBtn").hide();
   $("#hint-btn").prop("disabled", true);
});


