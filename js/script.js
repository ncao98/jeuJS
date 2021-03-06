var canvas, ctx, width, height;
var sprite;
var mousepos = { x: 0, y: 0 };
var inputStates = {};

// pour afficher les images liés au sprite et aux ennemis
let assets, imgSprite, imgEnemy;
let score = 0;
let vie = 3;
let niveau = 1;
let aEnemies = [];
let rate = 1;
let aBonus = [];
let etatJeu = "menuPrincipal";

window.onload = init;

function init() {
    loadAssets(startGame);
}

function startGame(assetsLoaded) {
    canvas = document.querySelector("#canvas");

    canvas.width = 0.9 * window.innerWidth;
    canvas.height = 0.5 * window.innerHeight;

    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    assets = assetsLoaded;

    assets.bgm.play();

    listeners();

    imgSprite = assets.imgSprite;
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    sprite = new Sprite(600, 300, 0, 1, 500, imgSprite);

    // création des ennemis
    imgEnemy = assets.imgEnemy;

    setInterval(function () { creerDesBalles(1); }, 5000);

    // animation à 60ips
    requestAnimationFrame(animationLoop);
}

function animationLoop() {
    // 1) On efface l'Ã©cran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (etatJeu) {
        case "menuPrincipal":
            afficherMenuPrincipal();
            break;
        case "jeuEnCours":
            jeuEnCours();
            break;
        case "ecranChangementNiveau":
            afficherEcranChangementNiveau();
            break;
        case "gameOver":
            afficherEcranPerdu();
            break;
    }

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(animationLoop);
}

function afficherMenuPrincipal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.font = "30pt Calibri";

    ctx.fillStyle = "white";
    ctx.fillText("Touject Prohou", canvas.width / 2 - 150, canvas.height / 2);

    ctx.fillText("Cliquez pour démarrer", canvas.width / 2 - 200, canvas.height / 2 + 30);

    ctx.restore();
}

function jeuEnCours() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    afficherInfosJeu();

    if (vie <= 0) {
        etatJeu = "gameOver";
    }

    // 2) On dessine et on déplace le sprite 1
    sprite.draw(ctx);
    sprite.move(mousepos);
    updateSpriteBullets();
    if (inputStates.SPACE) {
        sprite.addBullet(Date.now());
    }

    //créer des ennemis
    updateEnnemis();

    updateBalles();
}

function afficherInfosJeu() {
    ctx.font = "20pt Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, 0, 20);
    ctx.fillText("NIVEAU: " + niveau, 0, 40);
    ctx.fillText("VIE: " + vie, 0, 60);
}

function afficherEcranChangementNiveau() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.font = "30pt Calibri";

    ctx.fillText("NIVEAU SUIVANT", canvas.width / 2 - 150, canvas.height / 2);

    ctx.fillText("Cliquez pour continuer", canvas.width / 2 - 200, canvas.height / 2 + 30);

    ctx.restore();
}

function afficherEcranPerdu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.font = "69pt Times New Roman";

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4F0001";
    ctx.fillText("YOU DIED", canvas.width / 2 - 200, canvas.height / 2);

    ctx.font = "30pt Times New Roman";
    ctx.fillText("Cliquez pour recommencer", canvas.width / 2 - 200, canvas.height / 2 + 50);
    ctx.restore();
}

function updateNiveau() {
    niveau++;
    vie++;
    creerDesEnnemis(niveau * 5);
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function changeCadenceTir(value) {
    sprite.delayMinBetweenBullets = Math.floor(Math.random() * sprite.delayMinBetweenBullets) + value;
}

function creerDesEnnemis(nb) {
    for (let i = 0; i < nb; i++) {
        let x = -50;
        let y = canvas.height / 2;
        let angle = 0;
        let vitesseX = -0.5 + Math.random() * 0.5;
        let vitesseY = -1 + Math.random() * 1;
        let img = imgEnemy;

        let oEnemy = new Enemy(x, y, angle, vitesseX, vitesseY, img);
        aEnemies.push(oEnemy);
    }
}

function updateEnnemis() {
    aEnemies.forEach((b) => {
        b.draw(ctx);
        traiteCollisionsEnnemisAvecBords(b);
        traiteCollisionsJoueurAvecEnnemi(b);
        traiteCollisionsBallesAvecEnnemi(b);
        traiteCollisionsBallesEnnemisAvecJoueur(b);
        b.move();
        b.addBullet(Date.now());
    });
    if (aEnemies.length == 0) {
        etatJeu = "ecranChangementNiveau";
    }
}

function creerDesBalles(nb) {

    let tabCouleurs = ["blue"];

    for (let i = 0; i < nb; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let rayon = 5;
        let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
        let couleur = tabCouleurs[indexCouleur];
        let vx = -0.5 + Math.random() * 0.5;
        let vy = -1 + Math.random() * 1;

        let b = new Balle(x, y, rayon, couleur, vx, vy);

        aBonus.push(b);
    }
}

function updateBalles() {
    // utilisation d'un itérateur 
    aBonus.forEach((b) => {
        b.draw(ctx);
        traiteCollisionsBallesBonusAvecBords(b);
        traiteCollisionsBallesBonusAvecJoueur(b);
        b.move();
    })
}

function updateSpriteBullets() {
    if (vie != 0) { 
        sprite.delayMinBetweenBullets = sprite.delayMinBetweenBullets / rate; 
    } else if (vie <= 0) { 
        sprite.delayMinBetweenBullets = 500;
    }

}