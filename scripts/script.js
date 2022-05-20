let enteredNum = [];
let newNum = [];
let count = 10;

//api here. get the generated numbers and put into generatedNum array.
function randomNum () {
    return $.ajax({
        url: "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new",
        method: "GET"
    }).then(function(response){
        introMsg();
        //console.log(response);
        let generatedNum= [];
        //need to remove whitespaces
        const num = response.replaceAll("\n", "");
        generatedNum.push(num);
        newNum = generatedNum.join().split("");
        console.log(newNum)
    })
}

function introMsg () {
    $(".modal").modal("show");
    $(".modal-title").text("Ready to Play?");
    $(".messageContainer").text("Guess the 4 numbers. Good Luck!")
}
randomNum();
function countDown() {
    count--;
    //console.log("count is now " + count)
    $("#guess-num").text(count);

        //game over
    if(count === 0){
        $(".modal").modal("show");
        $(".modal-title").text("Game Over");
        $(".messageContainer").text(`The answer was ${newNum.join("")}`);
        $("#submitBtn").prop("disabled", true);
    }
};


//play again to run randomNum, enabled submit btn, restart count, clear guesses
$("#reset-playAgainBtn").on("click", function() {
    randomNum(); 
    count = 10;
    $("#submitBtn").prop("disabled", false);
    $("#guess-num").text(count);
    $(".historyHolder").html("");
});

function shortCharMsg () {
        $(".modal").modal("show");
        $(".modal-title").text("please input 4 numbers");
        $(".messageContainer").text("Try again.");
}

//user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
    let checker = [];
    let incorrectArr = []; 
    // let splitUserNum;

    $(".playAgainBtn").prop("disabled",true);
    //get the number from user and push into enteredNumArr 
    const userNum= $(".numHolder").val().trim();
   //console.log(userNum.length)
   
   //make sure values are not whitespace 
    if(userNum.length > 4 || userNum.length <=3) { 
        return shortCharMsg();
   }else {
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
                $(".modal").modal("show");
                $(".modal-title").text("Nice!")
                $(".messageContainer").text("You got all the numbers corret.")
                alert("congrats match!");
                enteredNum.length = 0;
           }
        }
        else {
            //push the non matched numbers 
            incorrectArr.push(splitUserNum[i])
            console.log("incorr ", incorrectArr)
         
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


