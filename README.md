# Mastermind Game
Hello! Welcome to my version of Mastermind. Haven't played Mastermind before? Here's a [link] (https://en.wikipedia.org/wiki/Mastermind_(board_game)) to explain the game. My version involves guessing combination of 4 numbers. 

When I build something, I often put myself in the user's shoes and try to build something that is easy to use. I am only one person and the next person who plays with what I build, may not agree with me. Often, I have friends or family test what I build for feedback so I can improve.

In this game, I wanted to keep users engaged. Even though this is user vs. computer, I wanted the computer to be helpful, without giving away the answer. This is why I implmeneted the extensions below. 

I wanted to add an option to contact me via email for questions or feedback on game as I always welcome feedback.

## My Thought Process and Structure of Code 
### The Code 
You will see in this codebase, I used Bootstrap. I like Bootstrap for their Grid system and rows and columns. I also like Bootstrap for the built-in responsiveness. I know it's not perfect, but it helps, especially since more and more people are on their phones. 

I chose jQuery because I have always been more comfortable with it. If you look in [script.js](https://github.com/mhvue/mastermindGame/blob/main/scripts/script.js), you will see I listed all functions first, then the events, but this doesn't happen right away. As I work on sections of waht I'm trying to build, I write all the code I want to make it work. I'm a visual learner so I often have it open up another screen to test what I write. Once it works the way I intend it to, then I go back to review the code. I check for what can be condense, what can be a function due to repeated use, and what doesn't make sense. I added comments to help explain what each line is doing, and what each function is and waht it is doing.  

I tried to organize my [style.css](https://github.com/mhvue/mastermindGame/blob/main/styles/style.css) by keeping similar elements closer together. For examaple, I try to keep all h1 and h3 togther and anything font related together.  

### My Thought Processes
The UI design of this may not be the prettiest, but I focus more on making the game work. I added images were I felt it could help spice up the game. For example, I added them in the modal for incorrect and correct guesses. I wanted to have some color correlation. So Hint I stick to a dark mustard color, green is for anything good like getting closer to correct answer in Your Guesses, and red for warning such as when number reach 5 and is counting down to 0.

I have implemented a way to validate the characters enterd by users, making sure that it is numbers. In my code, it is a string of numbers. I did this to help the user enter in correct values and the correct length of those values. While the rules are listed, many times we get hooked in the game and forget the rules. I also check just in case no characters are  entered so submitting a blank (with no numbers) would not be allowed.

I chose a modal to provide feedback because the pop up will get the user's attention. 

With testing of this game, it was informed that Your Guesses can be hard to keep track of, specifically the guesses with positive feedback (meaning getting closer to answer). I added in font color of green so user can those stand out, to help them make the next guess. 

As I was playing the game, it was tough! So I added hints to help. I only added a couple of hints to keep game challenging. 

I added a Reset just in case a user no longer wanted to continue playing the current game and start a new one. It does show the answer to current game so the user isn't left in the unknown.


## How to Play: 
* Go to this link: https://mhvue.github.io/mastermindGame/ 
* You need to get 4 numbers between 0-7
* Your guess of numbers, needs to be in the correct placement of numbers. 
* You will be provided feedback about your guess (rather it's incorrect, correct, or contains correct numbers and/or placements of those numbers)
* You can view your prevous guesses with the feedback under Your Guesses 
* You have 10 attempts 
* You hve 2 Hints 
* If you feel you need to start over with a new game, click on Reset Game

## How you can get started
1. Clone this repository <code><pre> https://github.com/mhvue/mastermindGame.git </code></pre>
2. Open in your code editor the cloned repo. I am using Visual Studio Code (VSC).
3. Right click in index.html and find _Open in Default Browser_ to open in your preferred default browser.
4. It opens on local machine.
5. You are all set! Add and change what you will about your version of Mastermind from this.  


## Extensions 
* Modals showing to display feedback to user for:
    * Incorrect Answer 
    * Correct Answer
    * Almost correct answer - means the guess does contan the correct number(s) but incorrect placement of those numbers. 
    * If two numbers are correct and in correct placements.
    * If three numbers are corret and in correct placements.
    * With correct answer if user does not guess correct numbers by 10 attempts.
    * With correct answer if user decides to Reset to a new game.
    * Loading messaage if user decides on new game.
* Validation on input of numbers 
    * Modal shows for incorrect type of characters (i.e. abcd, ABCD, *&^%).
    * Modal shows for incorrect amount of characters (i.e. 1234567, 12, 1).
    * Modal shows for no input of numbers from users.
* Reset button
    * Offer a Reset button in case user decides to try a new combination of numbers 
    * Modal will show the answer with button to play again. 
    * If user accidently clicks outside the modal, by clicking on Play Again button sitting next to Hint button, the same modal will show again.
    * Hint button and Submit button is disabled to not allow any more inputs when Reset button clicked.  Past Guesses field is emptied to ready for next game. 
* Play Again button
    * Will start game over again and generate new combinations of numbers.
    * This button is shown if player decides to reset game by click on Reset button, triggering modal with this button
    * This button is shown once guesses correct combination of numbers, triggering modal with this button. 
    * If user accidently clicks outside the modal, by clicking on Play Again button sitting next to Hint button, the same modal will show again.
* Hint Button 
    * After Score reaches 5, computer will offer if user wants to use Hint button, if not used already.
    * When clicked on, modal revealing one of the numbers, but not the number's location. 
    * By luck, the modal might reveal that there are duplicate numbers, but will not say which number.
    * Hint can only be used twice. 
    * Since Hint can only be used twice, the button will disable so user cannot click it again. 
* Hint 
    * Number of hints is shown and goes down as user uses the Hint.
* Ding Ding for Correct Answer 
    * Sound for correct answer 
* Images on Modal 
    * X image for incorrect answers (no correct numbers) and answer with some correct numbers but wrong placement. 
    * Thumbs up image for correct answer. 
* Score
    * Score is shown, which starts at 0 and goes up by 1 per correct answer 
* Attempts
    * Attempts is shown, which starts at 10 and goes down by 1 per incorrect answer 
* The attempted numbers that are close to answer with the feedback will be in green
    * This is to help user find their previous attempts to make next best guess