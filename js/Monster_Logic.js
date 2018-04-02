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

    Active_Monsters[pos_num].push(newMonster);

    $("#game-screen").append(newMonster);

    setTimeout(startMonsterMove(newMonster, pos_num), 1000);
}

function startMonsterMove(monster_obj, monster_pos) {
    monster_obj.show();
    monster_obj.css("transform", "translate(" + Positions[monster_pos].position.x.toString() + "px, 100px)");

    setTimeout(function () {
        endMonsterMove(monster_obj, monster_pos);
    }, 2000);
}

function endMonsterMove(monster_obj, monster_pos) {

}
