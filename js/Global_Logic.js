var NUMBER_OF_PLAYER_POSITIONS = 5;

var PLATFORM_WIDTH = 888;   // In pixels

var Positions = [];

var gameStillGoing = true;

var SCORE_KEEPING = {
    score: 0,
    hit_points: 3
};

// $(document).ready(function() {
        // for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        //     Positions[i] = {
        //         position: {
        //             x: (PLATFORM_WIDTH * 0.2) * (i - Math.floor((NUMBER_OF_PLAYER_POSITIONS/2))),
        //             y: 0
        //         },
        //         canFireShotFromHere: true,
        //         bomb_obj: null,
        //         ladder_obj: null,
        //         fireball: {
        //             obj_ref: null,
        //             active: false
        //         }
        //     }
        // }

        // setup_BombsAndLadders();

        // setNewPlayerPosition(Player_Obj.currentPos);

        // setTimeout(function () {
        //     if (gameStillGoing == true) {
        //         setupMonsterLOOP()
        //     }
        // }, 1000 * Math.floor((Math.random() * 5) + 1));

        // $(document).on("keydown", function(e) {
        //     if (gameStillGoing == true) {
        //         keyDownProcess({key: e.keyCode, char: e.charCode});
        //     }
        // });

        // $(document).on("keypress", function(e) {
        //     if (gameStillGoing == true) {
        //         keyPressProcess({key: e.keyCode, char: e.charCode});
        //     }
        // });

        // requestAnimationFrame(theBigHitboxCollisionDetectionLoop);

// });

// run this function once the start button is clicked
function startButtonClicked() {
    if(SCORE_KEEPING.hit_points == 0)
        resetGame();

    $("#game-screen").fadeIn(400);
    $("#game-start").hide();

     for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
            Positions[i] = {
                position: {
                    x: (PLATFORM_WIDTH * 0.2) * (i - Math.floor((NUMBER_OF_PLAYER_POSITIONS/2))),
                    y: 0
                },
                canFireShotFromHere: true,
                bomb_obj: null,
                ladder_obj: null,
                fireball: {
                    obj_ref: null,
                    active: false
                }
            }
        }

        setup_BombsAndLadders();

        setNewPlayerPosition(Player_Obj.currentPos);

        setTimeout(function () {
            if (gameStillGoing == true) {
                setupMonsterLOOP()
            }
        }, 1000 * Math.floor((Math.random() * 5) + 1));

        $(document).on("keydown", function(e) {
            if (gameStillGoing == true) {
                keyDownProcess({key: e.keyCode, char: e.charCode});
            }
        });

        $(document).on("keypress", function(e) {
            if (gameStillGoing == true) {
                keyPressProcess({key: e.keyCode, char: e.charCode});
            }
        });

        requestAnimationFrame(theBigHitboxCollisionDetectionLoop);
}

function GAME_OVER(didYouWin) {
    monstersArrayTotalClear();
    fireballsTotalClear()
    clearBombs();
    clearLadders();
    var whichScreenToShow = "";

    if (didYouWin == true) {
        $("#game-over-screen > .final-score").text("Score: " + SCORE_KEEPING.score);
        whichScreenToShow = "#game-over-screen";
    } else {
        $("#game-death-screen > .final-score").hide();
        whichScreenToShow = "#game-death-screen";
    }

    $("#game-screen").hide();
    $(whichScreenToShow).show();
}

function theBigHitboxCollisionDetectionLoop() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        // Check each fireball object. If it's currently active and travelling down the ladder, then we check it for collision detection with any monsters.
        var current_fireball = Positions[i].fireball;

        if (Active_Monsters[i].length != 0) {
            var current_enemyQueue = Active_Monsters[i];
            for (var j = 0; j < current_enemyQueue.length; j++) {

                checkHowHighMonsterClimbs(current_enemyQueue[j], i);
                if (current_fireball.active != false) {
                    collisionBetweenMonsterAndFireball(current_fireball.obj_ref, current_enemyQueue[j], i);
                }
            }
        }
    }

    if (SCORE_KEEPING.hit_points <= 0) {
        gameStillGoing = false;
        GAME_OVER(false);
    }

    if (gameStillGoing == true) {
        return requestAnimationFrame(theBigHitboxCollisionDetectionLoop);
    }
}

function keyDownProcess(code_table) {
    if (code_table.key == 37 || code_table.key == 39) {
        if (Player_Obj.current_state == "idle") {
            Player_Obj.currentPos = movePlayerLeftOrRight(code_table.key, Player_Obj.currentPos);
        }
    }
}

function keyPressProcess(code_table) {
    if (code_table.char == 32) {
        fireFromPosition(Player_Obj.currentPos);
    }
}

function ifGameStarted() {
    gameStarted = true;
}

function resetGame() {
    $("#game-death-screen").hide();
    SCORE_KEEPING.hit_points = 3;
    SCORE_KEEPING.score = 0;
    gameStillGoing = true;

    Player_Obj.currentPos = 2;

    // Clear Timeout
    clearTimeout(loopMonsterTimeout);

}

