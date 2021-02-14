function listeners() {
    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);

    window.addEventListener('click', function (evt) {
        // on passe le temps en parametres, en millisecondes
        setInterval(sprite.addBullet(Date.now()), 100);
        assets.shoot.play();
        // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
        // ici, mais juste l'évébement click au lieu de mousedown
        // tu ne pourras pas tirer plus vite, il te faudra
        // marteler le bouton.
        // compare en gardant space appuyé avec la cadence de
        // tir à zero.

        switch (etatJeu) {
            case "menuPrincipal":
                creerDesEnnemis(niveau*5);
                etatJeu = "jeuEnCours";
                break;
            case "ecranChangementNiveau":
                updateNiveau();
                etatJeu = "jeuEnCours";
                break;
            case "gameOver":
                etatJeu = "menuPrincipal";
                aEnemies = [];
                vie = 3;
                niveau = 1;
                score = 0;
                break;
        }
    });

    window.addEventListener('keydown', function (evt) {
        inputStates.SPACE = true;
        inputStates.MOUSEDOWN = true;
    });

    window.addEventListener('keyup', function (evt) {
        inputStates.SPACE = false;
        inputStates.MOUSEDOWN = false;
    });
}

function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}