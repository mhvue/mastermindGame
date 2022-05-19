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

//get the number from user and and to enteredNumArr
$(".numHolder").keydown(function(event){
    enteredNum.push(event.key) //numbers entered are strings
    console.log("I entered " + enteredNum)
});

function countDown() {
    count--;
    console.log("count is now " + count)
    $("span").text(count)
}

//this is what happens next as user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
    let checker = [];
    let incorrectArr= []; //do want to display this 

    

    //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < enteredNum.length; i++){        

       //guessed correct numbers 

       //guest correct number and its location
       if(enteredNum[i] === newNum[i]){
           //check value and check index of each array
           checker.push(enteredNum[i])
            //console.log(enteredNum)
            if(checker.length === 4) {
            console.log("congrats match!");
            enteredNum.length = 0;
           }
        }

        else {
            //push the non match numbers here 
            incorrectArr.push(enteredNum[i])
            // triedNum.push(enteredNum[i]) --keep history of numbers tried
            console.log("incorr ", incorrectArr)
                  // console.log("sorry no match")
            checker.length = 0
         
            if(i === enteredNum.length-1) {
                enteredNum.length = 0;
            }
          }
        }
       
//messages to user
    if(incorrectArr.length === 4){
        console.log("sorry no match at all")
        countDown();
   }
    else if(checker.length <= 3){
        console.log("checker", checker)
        console.log("almost")
        countDown();
   }
});


//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
})