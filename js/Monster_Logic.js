var Active_Monsters = [
    [],
    [],
    [],
    [],
    []
];

function setupMonster(pos_num) {
    var newMonster = $(document.createElementNS("http://www.w3.org/2000/svg", "use"));
    newMonster.addClass("enemy_monster");
    newMonster.attr("href", "#climbing_enemy_ref");
    newMonster.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 0px)");
    newMonster.hide();

    Active_Monsters[pos_num].push({obj_ref: newMonster, timeout_func: null});

    $("#game-screen").append(newMonster);

    setTimeout(startMonsterMove({obj_ref: newMonster, timeout_func: null}, pos_num), 500);
}

function startMonsterMove(monster_entity, monster_pos) {
    monster_entity.obj_ref.show();
    monster_entity.obj_ref.css("transform", "translate(" + Positions[monster_pos].position.x.toString() + "px, -300px)");

    monster_entity.timeout_func = setTimeout(function () {
        monsterReachesTop(monster_pos);
    }, 2000);
}

function monsterReachesTop(monster_pos) {
    (Active_Monsters[monster_pos].shift()).obj_ref.remove();
}

function monsterGetsKilled(monster_pos) {

}
