var Player_Obj = {
    html_id_string: "#player_char",
    currentPos: 2,
    current_state: "idle"
}

function fireFromPosition(player_pos) {
    if (Player_Obj.current_state == "attacking") {
        return;
    }

    $(Player_Obj.html_id_string).attr("href", "assets/player_attack_NEW.svg");
    Player_Obj.current_state = "attacking";
    setTimeout(function () {
        $(Player_Obj.html_id_string).attr("href", "assets/player_idle_NEW.svg");
        Player_Obj.current_state = "idle";
    }, 250);

    if (Positions[player_pos].canFireShotFromHere == true) {
        // Fire the shot
        var fire_sound = document.getElementById("SE_attackBomb");
        fire_sound.volume = 0.15;
        fire_sound.load();
        fire_sound.play();

        bombDetonate(player_pos);
        fireBombTrail_Go(player_pos);

        Positions[player_pos].canFireShotFromHere = false;

        setTimeout(function () {
            Positions[player_pos].canFireShotFromHere = true;
        }, 1000);
    } else {
        var noFire_sound = document.getElementById("soundEffect_attackNoBomb");
        noFire_sound.volume = 0.3;
        noFire_sound.load();
        noFire_sound.play();
    }
}

function movePlayerLeftOrRight(key_code, current_pos) {
    var direction = key_code - 38;
    var new_pos = current_pos + direction;

    if (new_pos >= 0 && new_pos < NUMBER_OF_PLAYER_POSITIONS) {
        setNewPlayerPosition(new_pos);
        return new_pos;
    } else {
        return current_pos;
    }
}

function setNewPlayerPosition(pos_num) {
    $(Player_Obj.html_id_string).css("transform", "translate(" + Positions[pos_num].position.x.toString() + "px, " + Positions[pos_num].position.y.toString() + "px)");
}
