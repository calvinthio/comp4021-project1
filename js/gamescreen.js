function countDown() {
    var timeRemaining = (minutes*60) + seconds;
    timeRemaining--;
   
    // Continue the countdown if there is still time
    if (timeRemaining > 0) {
        // check if 1 minute has passed
        if (timeRemaining % 60 == 0) {
            seconds = 0;
        } else if (timeRemaining % 60 == 59) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        if (minutes == 0) {
            if (seconds % 60 < 10) {
                $("#game-timer").text("00:0"+seconds);
            } else {
                $("#game-timer").text("00:"+seconds);
            }
        } else {
            if (seconds % 60 < 10) {
                $("#game-timer").text("0"+minutes+":0"+seconds);
            } else {
                $("#game-timer").text("0"+minutes+":"+seconds);
            }
        }
        inlineTimeout = setTimeout(countDown, 1000);
    }    
    
    else {
        // end the game
        gameStillGoing = false;
        timeUp = true;
        GAME_OVER(true);
    }
}



