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
    console.log(enteredNum)
});

//this is what happens next as user presses submit button 
$("#submitBtn").click(function(event){
    event.preventDefault();
    let checker = [];
    let triedNum = [];

      //attempts going down (which should go down for incorrect answers)
      count--;
      console.log(count)
      $("span").text(count)


    //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < enteredNum.length; i++){        

       //guessed correct numbers but wrong location/placment of numbers

       //guest correct number and its location
       if(enteredNum[i] === newNum[i]){
           //check value and check index of each array
           checker.push(enteredNum[i])
        console.log(checker)
           if(checker.length === newNum.length){
            console.log("congrats match!")
           }
           
        }
         //incorrect numbers 
        else{
           // triedNum.push(enteredNum[i]) --keep history of numbers tried
            console.log(enteredNum[i])
            console.log("sorry no match")
            checker = [];
            console.log(checker)
            if(i === enteredNum.length-1) {
                enteredNum = []
                console.log(enteredNum)
            }
        }
      
    }

         
});


//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
})