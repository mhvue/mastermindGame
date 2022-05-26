let enteredNum = [];
let newNum = [];
let checker = [];
let containsNum= false;
let count = 10;
let score = 0;
let hintClick = 2;
let hintArr = "";

/**
 * function randomNum
 * @returns generated numbers from api
 */
 function randomNum () {
   
    return  $.ajax({
        url: "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new",
        method: "GET"
    }).then(function(response){
        let generatedNum= [];
        //to remove whitespaces
        const num = response.replaceAll("\n", "");
        
        if(response){
            $(".modal").modal("hide")
            generatedNum.push(num);
        newNum = generatedNum.join().split("");
        console.log(newNum)
    
        //show reset button, hint button active and hite play again button on modal
        $("#reset-btn").text("Reset");
        $("#hint-btn").prop("disabled", false);
        $(".playAgainBtn").hide();
        }
      
    });
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
    $(".try-title").text("Try Again");
    $(".gameOver-title").text("Game Over");
    $(".almost-title").text("Almost");
    $(".correct-title").text("Congrats!");
    $(".hint-title").text("Hint");
    $(".messageContainer").html(message);
    $(image).prependTo(".messageContainer");
}

/**
 * function countDown is for when count goes down
 * when count reaches 0, game is over. modals pops up informing of so.
 * everything resets (score, feedback gone, count, hint)
 *  button to play again shows up.
 */
function countDown() {
    count--;
    $("#guess-num").text(count);

    switch(count){
        case 5: 
            $("#guess-num").css("color", "#FF0000");
            $("#hint-btn").attr("disabled") ?  $("hint-text").hide() : $(".hint-text").show().css("color", "#E1AD01").addClass("text-center")
            break;
        case 4: 
            $(".hint-text").hide();
            break;
        case 0:
            $(".modal-title").removeClass("try-title almost-title correct-title hint-title").addClass("gameOver-title");
            messageModal(`The answer was ${newNum.join("")}`);
            $(".playAgainBtn").show();
            $("#submitBtn, #hint-btn").each(function() {
                $(this).prop("disabled", true)
            });
            $("#reset-btn").text("Play Again");
            $("#guess-num").css("color", "#fff");
            score = 0
            break;
        default: 
            break;
    }
};


/**
 * function appendInfo is be able to show on UI the history of feedback and previous guesses to user
 * @param {string} n 
 * @param {string} feedback 
 */
 function appendInfo (n, feedback){
    let historyList= $("<li>").addClass("historyItem").append([n, feedback]).addClass("almost-text");
    $(".historyHolder").append(historyList); 
    checker = [];
}

/**
 * function closeToAnswer contains feedback about user's guesses (to show if correct or not)
 * @param {number} value 
 */
function closeToAnswer (value) {
    const almostImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
   
     //pop up message to show user they are close to guessing correct answer 
     $(".modal-title").removeClass("try-title gameOver-title correct-title hint-title")
     .addClass("almost-title");

     switch(checker.length || checker.length && containsNum){
         case 0 || 0 && true:
            appendInfo(value, " Contains correct numbers (unable to say how many) but Incorrect placements.")
            messageModal("Contains correct numbers but Incorrect placements.", almostImg)
            break;
        case 1 || 1 && true:
            appendInfo(value, " One correct number in its correct placement.")
            messageModal("One number correct in its correct placement.", almostImg)
            break;
        case 2|| 2 && true:
            appendInfo(value, " Two numbers correct in its correct placements.")
            messageModal("Two numbers correct in its correct placements.", almostImg)
            break;
        case 3|| 3 && true:
            appendInfo(value," Three numbers correct in correct placements.") 
            messageModal("Three numbers correct in its correct placements.", almostImg)
        default:
            break;
    }
        

}

/**
 * function appendHint will show the hints 
 * @param {number} randomIndex 
 */

function appendHint(randomIndex) {

    const hintImg = $("<img src='./images/hint.jpg' alt= 'hint word on keyboard' >");
    let hintNum1 = newNum[randomIndex];
    let hintNum2 = newNum[hintArr[0]];

    hintArr += randomIndex;

   $(".modal-title").removeClass("almost-title gameOver-title correct-title try-title").addClass("hint-title");

    if(hintArr.length === 1){
        hintMsg = $("<h5>").html(`Hint: It contains ${newNum[randomIndex]}`)
    }
    else if(hintNum1 !== hintNum2){
        hintMsg = $("<h5>").html(`Hint: It contains ${newNum[randomIndex]}`)
    } else {
        hintMsg = $("<h5>").html(`Hint: It contains duplicates`)
    }

    messageModal(hintMsg, hintImg);
};

//reset to run randomNum, enabled submit btn, restart count, clear guesses
$("#reset-btn").on("click", function() {

    if($(this).attr("data-win")){
        console.log("hereeeeee")
        $(".modal-title").removeClass("try-title almost-title correct-title hint-title").addClass("gameOver-title")
        randomNum();
        console.log('start again')
        messageModal("Loading...");
        $(".playAgainBtn").hide()
        //start count at 10 again 
        count = 10;
        hintClick = 2;

        //disable submit button and hint button,  show count restarted, and clear history 
        $("#submitBtn, #hint-btn").each(function() {
            $(this).prop("disabled", false)
        });
        $("#guess-num").text(count);
        $(".historyHolder").html(""); 
        $(".hint-num").text(hintClick);

    }else {
    console.log("not here")
    //pop up msg to show the correct answer and offer to replay 
    $(".modal-title").removeClass("try-title almost-title correct-title hint-title").addClass("gameOver-title");
    messageModal(`The answer was ${newNum.join("")} Hit Play Again button to play again`);
    $(".playAgainBtn").show()

    //start count at 10 again 
    count = 10;
    hintClick = 2;

    //disable submit button and hint button,  show count restarted, and clear history 
    $("#submitBtn, #hint-btn").each(function() {
        $(this).prop("disabled", true)
    });
    $("#guess-num").text(count);
    $(".historyHolder").html("");
}
});

//play again button on modal 
$(".playAgainBtn").on("click", function() {
    

    //start generated random number again by calling api
     randomNum()
   
    //start count at 10 again 
    count = 10;
    hintClick  = 2;

    //enable submit button, show count restarted, and clear history 
    $("#submitBtn, #hint-btn").each(function() {
        $(this).prop("disabled", false)
    });
    
    //modal shows Loading as randomNum is called to load new random numbers 
    $(".messageContainer").text("Loading new game...")
    $(".playAgainBtn").hide();

    //count back to 10 and empty Your Guesses
    $("#guess-num").text(count);
    $(".historyHolder").html("");
    $(".hint-num").text(hintClick);
    
});

//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
});

//hint - give two hints 
$("#hint-btn").click(function() {
    //show a number randomly btwn 0-3 based on index but not location, to show value to user
   const randomIndex =  Math.floor((Math.random() * 3) + 0)

   //track how many times hint button it clicked 
    hintClick--;

    //update hint count on UI
    $(".hint-num").text(" " + hintClick)

   if(hintClick === 1){
       appendHint(randomIndex)
      $(".playAgainBtn").hide();
   }
   //trying to rule out the possibility of getting same random index twice
   else if(hintClick === 0 && randomIndex.toString() !== hintArr[0]){
        appendHint(randomIndex)
        $("#hint-btn").prop("disabled", true);
        $(".playAgainBtn").hide();
    }
    //this is what to do in case we do get the same randomeNum twice 
   else if(hintClick === 0 && randomIndex.toString() === hintArr[0]){
       appendHint(randomIndex)
        $("#hint-btn").prop("disabled", true);
        $(".playAgainBtn").hide();
    }

});

//user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
    let incorrectArr = []; 
    let splitUserNum;
    const checkRegEx = /^[0-7]+$/; //with the help from stackOverflow
    const checkLetters = /^[A-Za-z]+$/
   
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();
    $(".playAgainBtn").prop("disabled",false);
    console.log(userNum)
    //input of numbers that equal 0-7 and only 4 characters 
    if(userNum.match(checkRegEx) && userNum.length === 4){
        enteredNum.push(userNum);
        splitUserNum = enteredNum.join().split("");
    }
    //input of numbers more than 4 characters, input of numbers less than 4
    else if(userNum.length > 4 || userNum.length <= 3 || userNum.match(checkLetters)) { 
        $(".modal-title").removeClass("almost-title gameOver-title correct-title hint-title").addClass("try-title");
        return messageModal("Please input 4 numbers.");
   } 
    else{
        //input of numbers bigger than 7
        $(".modal-title").removeClass("almost-title gameOver-title correct-title hint-title").addClass("try-title");
        return messageModal("Please input numbers 0-7.");
    }


  //compared enteredNum values to genreatedNum values. 
    for(let i = 0; i < splitUserNum.length; i++){     

        //exact match of entered numbers and its location to generated numbers
       if(splitUserNum[i] === newNum[i] ){ 
           console.log(splitUserNum)
           checker.push(splitUserNum[i])
           console.log(checker)
        }

        //user input the num(s) already verified as correct, but in combination with differ incorrect numbers  
        //and the placement is incorrect
        else if(splitUserNum.includes(newNum[i])){
           containsNum = true;
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
        console.log("ehre", checker)
        const correctImg = $("<img src='./images/correctBtn.svg' alt= 'red box with white x' >");
        const correctMsg = $("<h5> You got all the numbers correct. Play Again?</h5>");
        const winSound = new Audio("./other/win_bell.wav");

        //winning sound 
        winSound.play();

        //increase score 
        score++;
        $(".scoreBoard").text(score);

        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").removeClass("almost-title gameOver-title hint-title try-title").addClass("correct-title");
        messageModal(correctMsg, correctImg);

        //option to play again 
        $(".playAgainBtn").show();
        $("#reset-btn").text("Play Again").attr("data-win", "win-game")


        //disable submit btn and hint btn as game is over. clear array containing what user input to play again
        $("#reset-btn").text("Play Again");
        $("#submitBtn, #hint-btn").each(function() {
            $(this).prop("disabled", true)
        }); 
        enteredNum.length = 0;
        checker.length = 0;
    }
    //incorrrect answers 
    else if(incorrectArr.length === 4){
        console.log(incorrectArr)
        const incorrectVal = incorrectArr.join("");
        const tryAgainImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const tryAgainMsg = $("<span> No Match </span>").addClass("text-position");
        const historyList= $("<li>").addClass("historyItem").append([incorrectVal, "<span> Sorry, no match. </span>"]);
        
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").removeClass("almost-title gameOver-title correct-title hint-title").addClass("try-title");
        messageModal(tryAgainMsg, tryAgainImg);

        //show user their guesses and history of their guesses with feedback
        $(".historyHolder").append(historyList); 

       //reset arrays and keep counting down
        incorrectArr = [];
        enteredNum.length = 0;
        countDown();

   }
   //correct numbers but incorrect position
    else if(checker.length <= 3 || containsNum === true){
        console.log(checker)
        const almostVal = splitUserNum.join("");        
        closeToAnswer(almostVal);

        //reset arrays and keep counting down;
        enteredNum.length = 0;
        countDown();
   }
});
