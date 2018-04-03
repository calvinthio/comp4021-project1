function bombDetonate(pos_num) {
    Positions[pos_num].bomb_obj.hide();
}

function bombRespawn(pos_num) {
    Positions[pos_num].bomb_obj.show();
}

function fireBombTrail_Go(pos_num) {
    Positions[pos_num].fireball.obj_ref.show();
    Positions[pos_num].fireball.obj_ref.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 525px)");
    Positions[pos_num].fireball.active = true;

    setTimeout(function () {
        fireBombTrail_Return(pos_num);
    }, 1000);
}

function fireBombTrail_Return(pos_num) {
    Positions[pos_num].fireball.obj_ref.hide();
    Positions[pos_num].fireball.obj_ref.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 0px)");
    Positions[pos_num].fireball.active = false;

    setTimeout(function () {
        bombRespawn(pos_num);
    }, 1000);
}

function collisionBetweenMonsterAndFireball(fireball_obj, monster_entity, monster_pos) { // Check collision between monster object and fireball object
    var fireball_PosY = parseFloat(fireball_obj.css("Transform").split(",")[5]);
    var enemy_PosY = parseFloat(monster_entity.obj_ref.css("Transform").split(",")[5]);

    //console.log("Fireball Y: " + fireball_PosY + ", Enemy Y: " + enemy_PosY);
    var difference_in_Y = fireball_PosY - enemy_PosY;

    if (difference_in_Y > 261 && difference_in_Y < 347) {
        //console.log("Hit!");
        SCORE_KEEPING.score = SCORE_KEEPING.score + 100;
        //console.log("Score: " + SCORE_KEEPING.score);
        monsterGetsKilled(monster_pos);
    }
}

function fireballsTotalClear() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        Positions[i].fireball.obj_ref.remove();
    }
}
