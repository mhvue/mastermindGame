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
        $("#reset-playAgainBtn").text("Reset");
        $("#hint-btn").prop("disabled", false);
        introMsg();
    })
};
randomNum();

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
        $("#guess-num").css("color", "#8B0000")
    }

    //game over
    if(count === 0){
        $(".modal").modal("show");
        $(".modal-title").text("Game Over");
        $(".messageContainer").text(`The answer was ${newNum.join("")}. Hit Play Again button to play again.`);
        $("#submitBtn").prop("disabled", true);
        $("#hint-btn").prop("disabled", true);
        $("#reset-playAgainBtn").text("Play Again");
        $("#guess-num").css("color", "#fff")
        score = 0
    }
};

function shortCharMsg () {
    $(".modal").modal("show");
    $(".modal-title").text("Please Input 4 Numbers");
    $(".messageContainer").text("Try again.");
}

function largeValCharMsg () {
    $(".modal").modal("show");
    $(".modal-title").text("please input numbers between 0 - 7");
    $(".messageContainer").text("Try again.");
}



//play again to run randomNum, enabled submit btn, restart count, clear guesses
$("#reset-playAgainBtn").on("click", function(event) {
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
    let splitUserNum;
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();
    console.log(userNum)

    $(".playAgainBtn").prop("disabled",true);
    console.log(userNum.length)
   //make sure values are no more than 4 positions but no less 
    if(userNum.length > 4 || userNum.length <= 3) { 
        console.log("shortChar")
        return shortCharMsg();
   }
   //make values are not bigger than entering 7 four times
   else if(userNum > "7777" ){
       return largeValCharMsg ();
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
           //console.log("checker", checker, checker[i], i)
            //console.log(enteredNum)
            if(checker.length === 4) {
                score++;
                $(".scoreBoard").text(score)
                $(".modal").modal("show");
                $(".modal-title").text("Nice!")
                $(".messageContainer").text("You got all the numbers corret. Play Again?")
                enteredNum.length = 0;
           }
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
    if(incorrectArr.length === 4){
        const userMsg = "Sorry, no match.";
        const historyList= "<li class='historyItem'><span>";
        const incorrectVal = incorrectArr.join("");

        //get msg to pop up first then append user's guessed number with feedback
        $(".modal").modal("show");
        $(".modal-title").text("Incorrect.");
        $(".messageContainer").text("Try again.");
        $(".historyHolder").append(`${historyList + incorrectVal + "</span></li>"}`);
        $(".historyHolder").append(` Feedback: ${userMsg}`);

        //reset arrays and count
        incorrectArr = [];
        enteredNum.length = 0;
        countDown();

   }
    else if(checker.length <= 3){
        const userMsg = "Almost";
        const historyList= "<li class='historyItem'><span>";
        const almostVal = splitUserNum.join("");
        console.log(almostVal.length === 0)
        
    
        //get msg to pop up first then append user's guessed number with feedback
        $(".modal").modal("show");
        $(".modal-title").text("So Close");
        $(".messageContainer").text("Try again.");
        $(".historyHolder").append(`${historyList + almostVal + "</span></li>"}`);
        $(".historyHolder").append(` feedback: ${userMsg}`);

        //look at checker length to provide some kind of hint 
        if(checker.length >= 2){
            $(".messageContainer").text("Getting closer!");
        }

        //reset arrays 
        checker = [];
        enteredNum.length = 0;
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

   //show modal with hint
   $(".modal").modal("show");
   $(".modal-title").text("Hint");
   $(".messageContainer").text(`It contains ${newNum[randomIndex]}.`);

   $("#hint-btn").prop("disabled", true)
});


