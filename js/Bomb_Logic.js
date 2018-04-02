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
    Positions[pos_num].fireball.obj_ref.css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, 125px)");
    Positions[pos_num].fireball.active = false;

    setTimeout(function () {
        bombRespawn(pos_num);
    }, 1000);
}
