var Active_Monsters = [
    [],
    [],
    [],
    [],
    []
];

function setupMonsterLOOP() {
    setupMonster(Math.floor((Math.random() * 5)));

    setTimeout(function () {
        setupMonsterLOOP(Math.floor((Math.random() * 5)));
    }, 1000 * Math.floor((Math.random() * 1) + 1));
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

    $("#game-screen").append(newMonster.obj_ref);

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
        console.log("Monster has reached top!");
        monsterReachesTop(monster_pos)
    }
}

function monsterReachesTop(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
}

function monsterGetsKilled(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
}
