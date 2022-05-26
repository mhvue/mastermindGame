# Mastermind Game
Hello! Welcome to my version of Mastermind. Haven't played Mastermind before? Here's a https://en.wikipedia.org/wiki/Mastermind_(board_game) to explain the game. My version involves guessing combination of 4 numbers. 

When I build something, I often put myself in the user's shoes and try to build something that is easy to use and fun. I'm only one person and the next person who plays with what I build, may not agree with me. Often, I have friends or family test what I build, for feedback so I can improve.

In this game, I wanted to give users an interactive game to keep user engaged. Even though this is user vs. computer, I wanted the computer to be helpful, without giving away the answer. This is why I implmeneted the extensions below. 

In the footer, I added an option to contact me via email for questions or feedback on game as I always welcome feedback.

# Structure of code 
You will see in this codebase,  I used Bootstrap. I like Bootstrap for their Grid system and rows and columns. I also like Bootstrap for the built-in responsiveness. I know it's not perfect, but it helps, especially since more and more people are on their phones. 

I chose jQuery because I have always been more comfortable with it. If you look in script.js, you will see I listed all functions first, then the events. This doesn't happen right away as I like to write my code all out first. Then I go back to review my code, to see what can be condense, what can be a function due to repeated use, and what doesn't make sense. I added comments to help explain what each line is doing, and what each function is and is doing. 



Click on link: https://github.com/mhvue/mastermindGame.git </code></pre>
2. Open in your code editor the cloned repo (I am using Visual Studio Code (VSC) )
3. Right click in index.html and find Open in Default Browsser or if on Windows, press ALT + B
4. It opens with your locally.
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
    * Score is shown, which starts at 0 and goes up by 1 point per correct answer 
* Attempts
    * Attempts is shown, which starts at 10 and goes down by 1 point per incorrect answer 
* The attempted numbers that are close to answer with the feedback will be in green
    * This is to help user find their previous attempts to make next best guess