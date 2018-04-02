var NUMBER_OF_PLAYER_POSITIONS = 5;

var PLATFORM_WIDTH = 888;   // In pixels

var Positions = [];

var gameStillGoing = true;

$(document).ready(function() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        Positions[i] = {
            position: {
                x: (PLATFORM_WIDTH * 0.2) * (i - Math.floor((NUMBER_OF_PLAYER_POSITIONS/2))),
                y: 50
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
        keyDownProcess({key: e.keyCode, char: e.charCode});
    });

    $(document).on("keypress", function(e) {
        keyPressProcess({key: e.keyCode, char: e.charCode});
    });

    requestAnimationFrame(theBigHitboxCollisionDetectionLoop);
});


function theBigHitboxCollisionDetectionLoop() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        // Check each fireball object. If it's currently active and travelling down the ladder, then we check it for collision detection with any monsters.
        if (Positions[i].fireball.active != false) {
            // If Active_Monsters[i].length == 0, then this for loop will do nothing. Still, put this if condition here in case.
            if (Active_Monsters[i].length != 0) {
                for (var j = 0; j < Active_Monsters[i].length; j++) {
                    requestAnimationFrame(function () {
                        collisionBetweenMonsterAndFireball(Positions[i].fireball.obj_ref, Active_Monsters[j]);
                    });
                }
            }
        }
    }

    if (gameStillGoing == true) {
        return requestAnimationFrame(theBigHitboxCollisionDetectionLoop);
    }
}

function collisionBetweenMonsterAndFireball(fireball_obj, monster_entity) { // Check collision between monster object and fireball object



    requestAnimationFrame(function () {
        collisionBetweenMonsterAndFireball(Positions[i].fireball.obj_ref, Active_Monsters[j]);
    });
}

function setupMonsterLOOP() {
    setupMonster(Math.floor((Math.random() * 5)));

    setTimeout(function () {
        setupMonsterLOOP(Math.floor((Math.random() * 5)));
    }, 1000 * Math.floor((Math.random() * 5) + 1));
}

function keyDownProcess(code_table) {
    if (code_table.key == 37 || code_table.key == 39) {
        if ($(Player_Obj.html_id_string).attr("src") != "assets/player_attack.svg") {
            Player_Obj.currentPos = movePlayerLeftOrRight(code_table.key, Player_Obj.currentPos);
        }
    }
}

function keyPressProcess(code_table) {
    if (code_table.char == 32) {
        fireFromPosition(Player_Obj.currentPos);
    }
}
