function listeners() {
    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);

    window.addEventListener('mousedown', function (evt) {
        // on passe le temps en parametres, en millisecondes
        setInterval(sprite.addBullet(Date.now()), 100);

        // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
        // ici, mais juste l'évébement click au lieu de mousedown
        // tu ne pourras pas tirer plus vite, il te faudra
        // marteler le bouton.
        // compare en gardant space appuyé avec la cadence de
        // tir à zero.
    });

    window.addEventListener('keydown', function (evt) {
        inputStates.SPACE = true;
    });

    window.addEventListener('keyup', function (evt) {

        inputStates.SPACE = false;
    });
}

function traiteMouseDown(event) {
    switch (etatJeu) {
        case "menuPrincipal":
            etatJeu = "jeuEnCours";
            break;
        case "changementNiveau":
            etatJeu = "jeuEnCours";
            break;
        case "gameOver":
            etatJeu = "menuPrincipal";
            break;
    }
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