let enteredNum = [];
let newNum = [];

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

    //compared enteredNum values to genreatedNum values 
    for(let i = 0; i < enteredNum.length; i++){        

        // console.log(enteredNum[i] === newNum[i])
        if(enteredNum[i] === newNum[i]){
            console.log("hello")
        }
        else{
            console.log("not here")
        }
    }

});


//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
})