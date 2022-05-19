let enteredNum = [];
let newNum = [];
let count = 10;

//api here. get the generated numbers and put into generatedNum array.
$.ajax({
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
});

function countDown() {
    count--;
    console.log("count is now " + count)
    $("#guess-num").text(count)
}

//this is what happens next as user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
     let checker = [];
    let incorrectArr= []; //do want to display cd this 

    //get the number from user and and to enteredNumArr ---side note: possibly put in function
    const userNum= $(".numHolder").val().trim();
    console.log(userNum)
    enteredNum.push(userNum)
    const splitUserNum = enteredNum.join().split("")
    console.log(splitUserNum)
    //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < splitUserNum.length; i++){        

       //guest correct number and its location
       if(splitUserNum[i] === newNum[i]){
           //check value and check index of each array
          checker.push(splitUserNum[i])
           console.log("checker", checker, checker[i], i)
            //console.log(enteredNum)
            if(checker.length === 4) {
            alert("congrats match!");
            enteredNum.length = 0;

            $(".historyHolder").html("")
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


    }
    
//messages to user
    if(incorrectArr.length === 4){
        const userMsg = "sorry no match at all";
        const historyList= "<li class='historyItem'><span>"
        const incorrectVal = incorrectArr.join("");

        //get msg to pop up first then append user's guessed number with feedback
        alert(userMsg)
        $(".historyHolder").append(`${historyList + incorrectVal + "</span></li>"}`)
        $(".historyHolder").append(` feedback: ${userMsg}`)
        incorrectArr = []
        enteredNum.length = 0;
        countDown();

   }
    else if(checker.length <= 3){
        const userMsg = "almost";
        const historyList= "<li class='historyItem'><span>"
        const almostVal = splitUserNum.join("");

        //look at checker length to provide some kind of hint 
        if(checker.length >= 2){
            alert('so close! You are getting closer! but which number?!)')
        }
        //get msg to pop up first then append user's guessed number with feedback
        alert(userMsg)
        $(".historyHolder").append(`${historyList + almostVal + "</span></li>"}`)
        $(".historyHolder").append(` feedback: ${userMsg}`)
        checker = []
        enteredNum.length = 0;
        countDown();
     
   }
});


//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
})