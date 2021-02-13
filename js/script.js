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

    listeners();

    imgSprite = assets.imgSprite;
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    sprite = new Sprite(600, 300, 0, 1, 100, imgSprite);

    // création des ennemis
    imgEnemy = assets.imgEnemy;
    creerDesEnnemis(3);

    // animation à 60ips
    requestAnimationFrame(animationLoop);
}

function animationLoop() {
    // 1) On efface l'Ã©cran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2) On dessine et on déplace le sprite 1
    sprite.draw(ctx);
    sprite.move(mousepos);

    if (inputStates.SPACE) {
        sprite.addBullet(Date.now());
    }

    updateEnnemis();

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(animationLoop);

}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function changeCadenceTir(value) {
    sprite.delayMinBetweenBullets = value;
}

function creerDesEnnemis(nb) {
    for (let i = 0; i < nb; i++) {
        let x = 0;
        let y = canvas.height / 2;
        let angle = 0;
        let vitesseX = -niveau + Math.random() * niveau;
        let vitesseY = -niveau + Math.random() * niveau;
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
        b.move();
    });
}