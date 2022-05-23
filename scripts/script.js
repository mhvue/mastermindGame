let enteredNum = [];
let newNum = [];
let count = 10;
let score = 0;
//api here. get the generated numbers and put into generatedNum array.


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
        $("#reset-btn").text("Reset");
        $("#hint-btn").prop("disabled", false);
        introMsg();
        $("#playAgainBtn").hide();
    })
};
randomNum();


//modal messages 
function messageModal (message, image){

    $(".modal").modal("show");
    $(".modal-title").text("Try Again");
    $(".gameOver-title").text("Game Over");
    $(".correct-title").text("Congrats!");
    $(".messageContainer").html(image).append(message);

    
}

function introMsg () {
    $(".modal").modal("show");
    $(".modal-title").text("Ready to Play?");
    $(".messageContainer").text("Guess the 4 numbers. Good Luck!")
}


function countDown() {
    count--;
    //console.log("count is now " + count)
    $("#guess-num").text(count);

    //halfway count
    if(count === 5) {
        $("#guess-num").css("color", "#8B0000");
    }

    //game over
    if(count === 0){
       
       // $(".modal").modal("show");
        $(".modal-title").addClass("gameOver-title");
        messageModal(`The answer was ${newNum.join("")}`);
        // $(".modal-title").text("Game Over");
        //$(".messageContainer").text(`The answer was ${newNum.join("")}. Hit Play Again button to play again.`);
       // $("#playAgainBtn").show()
        $("#submitBtn").prop("disabled", true);
        $("#hint-btn").prop("disabled", true);
        $("#reset-btn").text("Play Again");
        $("#guess-num").css("color", "#fff");
        score = 0
    }
};



//play again to run randomNum, enabled submit btn, restart count, clear guesses
$("#reset-btn").on("click", function(event) {
    event.preventDefault();

    $(".modal").modal("show");
    $(".modal-title").text("Game Over");
    $(".messageContainer").text(`The answer was ${newNum.join("")}. Hit Play Again button to play again.`);
    $("#playAgainBtn").show()


    count = 10;
    $("#submitBtn").prop("disabled", false);
    $("#guess-num").text(count);
    $(".historyHolder").html("");
});

//play again button on modal 
$("#playAgainBtn").on("click", function() {
    randomNum()
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
   
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();
    console.log(userNum)

    $("#playAgainBtn").prop("disabled",false);
    console.log(userNum.length)

    //Checking Values-make sure values are no more than 4 positions but no less. 
    if(userNum.length > 4 || userNum.length <= 3) { 
        console.log("shortChar")
        return messageModal("You are short on numbers. Please input 4 numbers.");
   }
   //make values are not bigger than entering 7 four times
   else if(userNum > "7777" ){
       return messageModal("Your numbers are bigger than 7. Please input 0-7.");
   }
   else {
        enteredNum.push(userNum);
        splitUserNum = enteredNum.join().split("");
    }
   

  //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < splitUserNum.length; i++){        
       //guest correct number and its location
       if(splitUserNum[i] === newNum[i]){
           //check value and check index of each array
          checker.push(splitUserNum[i])
           console.log("checker", checker, checker[i], i)
            console.log(enteredNum)
            console.log(splitUserNum[i])
          
        }
        //if user input the same num already verified as correct, but in combo with differ nums
        else if(splitUserNum.includes(newNum[i])){
            console.log(containsArr)
            containsArr.push(newNum[i])
        }
        else {
            //push the non matched numbers 
            incorrectArr.push(splitUserNum[i])
          //  console.log("incorr ", incorrectArr)
         
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
        $(".modal-title").addClass("correct-title");
        messageModal(correctImg, correctMsg)
        $("#playAgainBtn").show()
        $("#reset-btn").text("Play Again");
        enteredNum.length = 0;
    }
    else if(incorrectArr.length === 4){
        const feedbackMsg = $("<p> Sorry No Match </p>")
        const historyList= $("<li class='historyItem'><span>");
        const incorrectVal = incorrectArr.join("");
        const tryAgainImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const tryAgainMsg = $("<h5>Sorry, no match.</h5>");
        
        
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal-title").addClass("incorrect-title")
        messageModal(tryAgainImg, tryAgainMsg);
        $(".historyHolder").append(historyList).append([incorrectVal, feedbackMsg]); //WORKING ON THIS

        //reset arrays and count
        incorrectArr = [];
        enteredNum.length = 0;
        countDown();

   }
    else if(checker.length <= 3 || containsArr.length <= 3){
        const userMsg = "Almost";
        const historyList= "<li class='historyItem'><span>";
        const almostVal = splitUserNum.join("");
        const tryAgainImg = $("<img src='./images/xBtn.svg' alt= 'red box with white x' >");
        const tryAgainMsg = $("<p> Try Again </p>");
        
    
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal").modal("show");
        $(".modal-title").text("So Close");
        $(".messageContainer").html(tryAgainImg).append(tryAgainMsg);
        $(".historyHolder").append(`${historyList + almostVal}`);
        $(".historyHolder").append(` feedback: ${userMsg}`);

        //look at checker length to provide some kind of hint 
        if(checker.length === 2 ){
            $(".messageContainer").text("Getting closer!");
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
   //show a number randomly btwn 0-3 based on index but not location
   const randomIndex =  Math.floor((Math.random() * 3) + 0);
   const hintImg = $("<img src='./images/hint.jpg' alt= 'hint word on keyboard' >");
   const hintMsg = $("<p>").text(`It contains ${newNum[randomIndex]}`);

   //show modal with hint
   $(".modal").modal("show");
   $(".modal-title").text("Hint");
   $(".messageContainer").html(hintImg).append(hintMsg);
   $("#playAgainBtn").hide();
   $("#hint-btn").prop("disabled", true)
});


