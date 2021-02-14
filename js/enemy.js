class Enemy {
    constructor(x, y, angle, vitesseX, vitesseY, img) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 48
        this.angle = angle;
        this.vitesseX = vitesseX;
        this.vitesseY = vitesseY;
        this.bullets = [];
        // cadenceTir en millisecondes = temps min entre tirs
        this.delayMinBetweenBullets = Math.floor(Math.random() * 2000) + 1000;
        this.img = img;
    }

    draw(ctx) {
        if (!this.img) return;
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        // ctx.beginPath();
        // ctx.rect(0, 0, this.width, this.height);
        // ctx.stroke();
        ctx.restore();

        this.drawBullets(ctx);
    }

    drawBullets(ctx) {
        for (let i = 0; i < this.bullets.length; i++) {
            let b = this.bullets[i];
            setInterval(this.drawAndMove(ctx, b), Math.floor(Math.random() * 2000) + 1000);
            if ((b.x < 0) || (b.y < 0) || (b.x > width) || (b.y > height))
                this.removeBullet(b)

        }
    }
    drawAndMove(ctx, b) {
        b.draw(ctx);
        b.move("enemy");
    }
    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }

    addBullet(time) {
        // si le temps écoulé depuis le dernier tir est > temps max alors on tire
        var tempEcoule = 0;

        if (this.lastBulletTime !== undefined) {
            tempEcoule = time - this.lastBulletTime;
            //console.log("temps écoulé = " + tempEcoule);
        }

        if ((this.lastBulletTime === undefined) || (tempEcoule > this.delayMinBetweenBullets)) {
            this.bullets.push(new Bullet(this));
            // on mémorise le dernier temps.
            this.lastBulletTime = time;
        }
    }

    removeBullet(bullet) {
        let position = this.bullets.indexOf(bullet);
        this.bullets.splice(position, 1);
    }
}