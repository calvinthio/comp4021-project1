function setup_BombsAndLadders() {
    for (var i = 0; i < NUMBER_OF_PLAYER_POSITIONS; i++) {
        /*
        Positions[i].ladder_obj = $("<img>");
        Positions[i].ladder_obj.addClass("platform_ladder");
        Positions[i].ladder_obj.attr("src", "assets/platform_ladder.svg");
        Positions[i].ladder_obj.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 195px)");
        $("#game-screen").append(Positions[i].ladder_obj);

        Positions[i].bomb_obj = $("<img>");
        Positions[i].bomb_obj.addClass("platform_bomb");
        Positions[i].bomb_obj.attr("src", "assets/platform_bomb.svg");
        Positions[i].bomb_obj.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 125px)");
        $("#game-screen").append(Positions[i].bomb_obj);

        Positions[i].fireball.obj_ref = $("<img>");
        Positions[i].fireball.obj_ref.addClass("bomb_fireball");
        Positions[i].fireball.obj_ref.attr("src", "assets/bomb_fireball.svg");
        Positions[i].fireball.obj_ref.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 125px)");
        Positions[i].fireball.obj_ref.hide();
        $("#game-screen").append(Positions[i].fireball.obj_ref);
        */


        Positions[i].ladder_obj = $(document.createElementNS("http://www.w3.org/2000/svg", "use"));
        Positions[i].ladder_obj.addClass("platform_ladder");
        Positions[i].ladder_obj.attr("href", "#platform_ladder_ref");
        Positions[i].ladder_obj.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 0px)");
        $("#game-screen").append(Positions[i].ladder_obj);

        Positions[i].bomb_obj = $(document.createElementNS("http://www.w3.org/2000/svg", "use"));
        Positions[i].bomb_obj.addClass("platform_bomb");
        Positions[i].bomb_obj.attr("href", "#platform_bomb_ref");
        Positions[i].bomb_obj.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 0px)");
        $("#game-screen").append(Positions[i].bomb_obj);

        Positions[i].fireball.obj_ref = $(document.createElementNS("http://www.w3.org/2000/svg", "use"));
        Positions[i].fireball.obj_ref.addClass("bomb_fireball");
        Positions[i].fireball.obj_ref.attr("href", "#bomb_fireball_ref");
        Positions[i].fireball.obj_ref.css("transform", "translate(" + Positions[i].position.x.toString() + "px, 0px)");
        Positions[i].fireball.obj_ref.hide();
        $("#game-screen").append(Positions[i].fireball.obj_ref);
    }
}
