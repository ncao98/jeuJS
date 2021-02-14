function traiteCollisionsJoueurAvecBords() {
    if (sprite.x > canvas.width - sprite.width) {
        //console.log("COLLISION A DROITE");
        // truc à savoir, pour ne pas que l'objet donne l'impression
        // d'aller plus loin que le bord de l'écran, on le remet au point de
        // contact
        sprite.x = canvas.width - sprite.width;
    } else if (sprite.x < 0) {
        //console.log("COLLISION A GAUCHE");
        sprite.x = 0; // point de contact
    }

    if (sprite.y < 0) {
        sprite.y = 0;
    } else if (sprite.y + sprite.height > canvas.height) {
        sprite.y = canvas.height - sprite.height;
    }
}

function traiteCollisionsEnnemisAvecBords(e) {
    if (e.x > canvas.width - e.width) {
        //si l'ennemi passe derrière, il disparaît de la liste
        let position = aEnemies.indexOf(e);
        aEnemies.splice(position, 1);
        // console.log(aEnemies);
    } else if (e.x < 0) {
        //console.log("COLLISION A GAUCHE");
        e.x = 0; // point de contact
        e.vitesseX = -e.vitesseX;
    }

    if (e.y < 0) {
        e.y = 0;
        e.vitesseY = -e.vitesseY;
    } else if (e.y + e.height > canvas.height) {
        e.y = canvas.height - e.height;
        e.vitesseY = -e.vitesseY;
    }
}

// Fonctions génériques de collision cercle-cercle, rectangle-rectangle et cercle-rectangle
// pour les curieux, polygone-polygone convexes existe aussi voir algorithme SAT
// (Separation Axis Theorem)
// Collisions between rectangle and circle
// Collisions between aligned rectangles
function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
    // overlap and the rectangles intersect
}

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function traiteCollisionsJoueurAvecEnnemi(b) {
    if (rectsOverlap(sprite.x, sprite.y, sprite.width, sprite.height, b.x, b.y, b.width, b.height)) {
        let position = aEnemies.indexOf(b);
        aEnemies.splice(position, 1);
        vie--;
        console.log("Vie :" + vie);
    }
}

function traiteCollisionsBallesAvecEnnemi(e) {
    sprite.bullets.forEach((b) => {
        if (rectsOverlap(b.x, b.y, b.width, b.height, e.x, e.y, e.width, e.height)) {
            let positionBullet = sprite.bullets.indexOf(b);
            sprite.bullets.splice(positionBullet, 1);

            let positionEnemy = aEnemies.indexOf(e);
            aEnemies.splice(positionEnemy, 1);
            score++;
            console.log("Score : " + score);
        }
    })
}

function traiteCollisionsBallesEnnemisAvecJoueur(e) {
    e.bullets.forEach((eb) => {
        if (rectsOverlap(sprite.x, sprite.y, sprite.width, sprite.height, eb.x, eb.y, eb.width, eb.height)) {
            let positionBullet = e.bullets.indexOf(eb);
            e.bullets.splice(positionBullet, 1);

            vie--;
            console.log("Vie : " + vie);
        }
    });
}