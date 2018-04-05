var Active_Monsters = [
    [],
    [],
    [],
    [],
    []
];

function setupMonsterLOOP() {
    if (gameStillGoing == true) {
        setupMonster(Math.floor((Math.random() * 5)));

        loopMonsterTimeout = setTimeout(function () {
            setupMonsterLOOP(Math.floor((Math.random() * 5)));
        }, 1000 * Math.floor((Math.random() * 1) + 1));
    }
}

function setupMonster(pos_num) {
    var newMonster = {
        obj_ref: $(document.createElementNS("http://www.w3.org/2000/svg", "use"))
    }


    newMonster.obj_ref.addClass("enemy_monster");
    newMonster.obj_ref.attr("href", "#climbing_enemy_ref");
    newMonster.obj_ref.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 0px)");
    newMonster.obj_ref.hide();

    Active_Monsters[pos_num].push(newMonster);

    $("#enemies-container").append(newMonster.obj_ref);

    setTimeout(startMonsterMove(newMonster, pos_num), 500);
}

function startMonsterMove(monster_entity, monster_pos) {
    monster_entity.obj_ref.show();
    monster_entity.obj_ref.css("transform", "translate(" + Positions[monster_pos].position.x.toString() + "px, -300px)");
}

function checkHowHighMonsterClimbs(monster_entity, monster_pos) {
    var enemy_PosY = parseFloat(monster_entity.obj_ref.css("Transform").split(",")[5]);
    //console.log(JSON.stringify(enemy_PosY));

    if (enemy_PosY <= -300) {
        //console.log("Monster has reached top!");
        monsterReachesTop(monster_pos)
    }
}

function monsterReachesTop(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
    SCORE_KEEPING.hit_points = SCORE_KEEPING.hit_points - 1;

    document.getElementById("SE_playerTakeDamage").play();

    // Remove heart
    if(SCORE_KEEPING.hit_points == 2)
        $("#heart-2").hide();

    if(SCORE_KEEPING.hit_points == 1)
        $("#heart-1").hide();

    if(SCORE_KEEPING.hit_points == 0)
        $("#heart-0").hide();
}

function monsterGetsKilled(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
}

function monstersArrayTotalClear() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        if (Active_Monsters[i].length != 0) {
            var current_enemyQueue = Active_Monsters[i];
            for (var j = 0; j < current_enemyQueue.length; j++) {
                (current_enemyQueue.shift()).obj_ref.remove();
            }
        }
    }
}
