var Active_Monsters = [
    [],
    [],
    [],
    [],
    []
];

function setupMonster(pos_num) {
    var newMonster = $("<img></img>");
    newMonster.addClass("enemy_monster");
    newMonster.attr("src", "assets/climbing_enemy.svg");
    newMonster.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 525px)");
    newMonster.hide();

    Active_Monsters[pos_num].push({obj_ref: newMonster, timeout_func: null});

    $("#game-screen").append(newMonster);

    setTimeout(startMonsterMove({obj_ref: newMonster, timeout_func: null}, pos_num), 500);
}

function startMonsterMove(monster_entity, monster_pos) {
    monster_entity.obj_ref.show();
    monster_entity.obj_ref.css("transform", "translate(" + Positions[monster_pos].position.x.toString() + "px, 100px)");

    monster_entity.timeout_func = setTimeout(function () {
        monsterReachesTop(monster_pos);
    }, 2000);
}

function monsterReachesTop(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
}

function monsterGetsKilled(monster_pos) {

}
