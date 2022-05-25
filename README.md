# Mastermind Game
Hello! Welcome to my version of Mastermind. Haven't played Mastermind before? Here's a [https://en.wikipedia.org/wiki/Mastermind_(board_game)] to explain the game. My version involves guessing combination of 4 numbers. 

## How to play:
Click the following link to play: https://mhvue.github.io/mastermindGame/ 
* It is a 4 number combination from 0-7. (ex: 1234,4567,6765 ..etc) *duplicate numbers may exist*
* You get 10 attempts to guess the 4 number combination
* Number needs to be in correct placement. If the correct number is inputted, but incorrect placement , you will be informed of so (example: 1234 but you input 1324, that's incorrect)

## How I Built the Game
I wanted to give users an interactive game to keep user engaged. Even though this is user vs. computer, I wanted the computer to be helpful, without giving away the answer. This is why I build the hint key, the reminder for hint, changing the text color to green in Previous Guesses for guesses that are close to answer to help user. The Score and Attemps is also tracked. 
In the footer, I added an option to contact me via email for questions or feedback on game. 

## Extensions 
* Modals showing to display messsages to user of:
    * Incorrect Answer 
    * Correct Answer
    * Almost correct answer - means contaning the correct number(s) but incorrect placement of those numbers. 
* Validation on input of numbers 
    * Modal shows for incorrect type of characters (i.e. abcd, ABCD, *&^%).
    * Modal shows for incorrect amount of characters (i.e. 1234567, 12, 1).
    * Modal shows for no input of numbers from users.
* Reset button
    * Offer a Reset button to in case user decides to try a new combination of numbers 
    * Modal will show the answer with button to play again. 
    * If user accidently clicks outside the modal, by clicking on Play Again button sitting next to Hint button, the same modal will show 
    again, giving user a chance to click Play Again button in the modal. 
    * Hint button and Submit button is disabled to not allow any more inputs by user.  Past Guesses field is emptied to ready for next game. 
* Play Again button
    * Will start game over again and generate new combinations of numbers.
    * Offers if player decides to reset game by click on reset button.
    * Offers if player guesses correct combination of numbers. A modal pops up showing button. 
    * If user accidently clicks outside the modal, by clicking on Play Again button sitting next to Hint button, the same modal will show again, giving user a chance to click Play Again button in the modal.
* Hint Button 
    * After Score reaches 5, computer will offer if user wants to use Hint button.
    * When clicked on, modal revealing one of the numbers, but not the number's location. 
    * Hint can only be used once (so used wisely). 
    * Since Hint can only be used once, the button will disable so user cannot click it again. 
* Ding Ding for Correct Answer 
    * Sound for correct answer 
* Images on Modal 
    * X image for incorrect answers (no correct numbers) and answer with some correct numbers but wrong placement. 
    * Thumbs up image for correct answer. 
* Score
    * Score starts at 0 and goes up by 1 point per correct answer 
* Attempts
    * Attempts starts at 10 and goes down by 1 point per incorrect answer 
* Feedback 
    * If feedback sounds confusing, option to read more about feedback provided by computer under Guesses.
* Colored in green the attempted number with the feedback
    * This is to help user find their previous attempts that were close to answer. 