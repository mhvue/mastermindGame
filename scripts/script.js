let enteredNum = [];
let newNum = [];
let count = 10;
let score = 0;

/**
 * 
 * @returns generated numbers from api
 */
function randomNum () {
   
    return $.ajax({
        url: "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new",
        method: "GET"
    }).then(function(response){
        
        //console.log(response);
        let generatedNum= [];
        //need to remove whitespaces
        const num = response.replaceAll("\n", "");
        generatedNum.push(num);
        newNum = generatedNum.join().split("");
        console.log(newNum)
        $(".modal-title").addClass("intro-title");
        $("#reset-btn").text("Reset");
        $("#hint-btn").prop("disabled", false);
        messageModal("Let's Play! Guess the 4 number combination.")
        $(".playAgainBtn").hide();
    })
};
randomNum();


/**
 * function to create custom messages as modal pops up
 * @param {string} message 
 * @param {string} image 
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
 * function as the count goes down
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
$("#reset-btn").on("click", function(event) {
    event.preventDefault();

    $(".modal-title").removeClass("intro-title try-title almost-title correct-title hint-title").addClass("gameOver-title");
    messageModal(`The answer was ${newNum.join("")} Hit Play Again button to play again`);
    $(".playAgainBtn").show()

    count = 10;
    $("#submitBtn").prop("disabled", false);
    $("#guess-num").text(count);
    $(".historyHolder").html("");
});

//play again button on modal 
$(".playAgainBtn").on("click", function(event) {
    event.preventDefault();
    randomNum();
    count = 10;
    $("#submitBtn").prop("disabled", false);
    $("#guess-num").text(count);
    $(".historyHolder").html("");
    
});


//user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
    let checker = [];
    let incorrectArr = []; 
    let containsArr =[];
    let splitUserNum;
    const checkRegEx = /^[0-7]+$/; //with the help from stackOverflow
   
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();
    console.log(userNum)

    $(".playAgainBtn").prop("disabled",false);
    console.log(userNum.length)

    //Checking Values-make sure values are no more than 4 positions but no less. 
    if(userNum.match(checkRegEx) && userNum.length === 4){
        enteredNum.push(userNum);
        splitUserNum = enteredNum.join().split("");
    }
    else if(userNum.length > 4 || userNum.length <= 3) { 
        console.log("shortChar")
        $(".modal-title").removeClass("intro-title almost-title gameOver-title correct-title hint-title").addClass("try-title");
        return messageModal("Please input 4 numbers.");
   }
   
    else{
        //make values are not bigger than entering 7 four times
        console.log("false")
        return messageModal("Numbers bigger than 7 detected. Please input 0-7.");
    }

  

 
  //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < splitUserNum.length; i++){        
       //guest correct number and its location
       if(splitUserNum[i] === newNum[i]){
           //check value and check index of each array
          checker.push(splitUserNum[i])

          
        }
        //if user input the num already verified as correct, but in combo with differ nums
        else if(splitUserNum.includes(newNum[i])){
            containsArr.push(newNum[i])
        }
        else {
            //push the non matched numbers 
            incorrectArr.push(splitUserNum[i])
         
            if(i === enteredNum.length-1) {
                enteredNum.length = 0;
            }
          }
    };
    
//messages to user
    if(checker.length === 4) {
        const correctImg = $("<img src='./images/correctBtn.svg' alt= 'red box with white x' >");
        const correctMsg = $("<h5> You got all the numbers corret. Play Again?</h5>");

        score++;
        $(".scoreBoard").text(score);
        $(".modal-title").removeClass("intro-title almost-title gameOver-title hint-title try-title").addClass("correct-title");
        messageModal(correctImg, correctMsg);
        $(".playAgainBtn").show();
        $("#reset-btn").text("Play Again").addClass(".playAgainBtn");
        $("#submitBtn, #hint-btn").each(function() {
            $(this).prop("disabled", true)
        });
        enteredNum.length = 0;
    }
    else if(incorrectArr.length === 4){
        const incorrectVal = incorrectArr.join("");
        const tryAgainImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const tryAgainMsg = $("<span> No Match </span>").addClass("text-position");
        const historyList= $("<li>").addClass("historyItem").append([incorrectVal, "<span> Sorry, no match. </span>"]);
        
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").removeClass("intro-title almost-title gameOver-title correct-title hint-title").addClass("try-title");
        messageModal(tryAgainMsg, tryAgainImg);
        $(".historyHolder").append(historyList); 

        //reset arrays and count
        incorrectArr = [];
        enteredNum.length = 0;
        countDown();

   }
    else if(checker.length <= 3 || containsArr.length <= 3){
      
        const almostVal = splitUserNum.join("");
        const almostImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const almostMsg = $("<span> You are close! Keep trying. </span>").addClass("text-position");
        const historyList= $("<li>").addClass("historyItem").append(`${almostVal} `).append("<span>Almost.</span>");
        
        $(".modal-title").removeClass("intro-title try-title gameOver-title correct-title hint-title")
                          .addClass("almost-title");
        //get msg to pop up first then append user's guessed number with feedback
        messageModal(almostMsg, almostImg);
        $(".historyHolder").append(historyList); 

        //look at checker length to provide some kind of hint 
        if(checker.length === 2 || containsArr.length === 2){
            $(".modal-title").removeClass("intro-title try-title gameOver-title correct-title hint-title")
                          .addClass("almost-title");
            $(".messageContainer").text("Pssstt..You got two numbers correct. Keep going!");
        }

        //reset arrays 
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
   const hintMsg = $("<p>").text(`It contains ${newNum[randomIndex]}`).addClass("text-position");

   //show modal with hint
   $(".modal-title").removeClass("intro-title almost-title gameOver-title  correct-title try-title").addClass("hint-title");
   messageModal(hintImg, hintMsg);
   $(".playAgainBtn").hide();
   $("#hint-btn").prop("disabled", true);
});


