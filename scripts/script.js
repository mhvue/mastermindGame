let enteredNum = []

//clear form when clicked on 
$("input").click(function() {
    $("input").val(" ");
})

//get the number from user and and to enteredNumArr
$(".numHolder").keydown(function(event){
    enteredNum.push(event.key) //numbers entered are strings
});

