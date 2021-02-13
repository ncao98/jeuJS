class Sprite {
    constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, img) {
        this.x = 300;
        this.y = 600;
        this.width = 40;
        this.height = 40
        this.angle = angle;
        this.v = vitesse;
        this.bullets = [];
        // cadenceTir en millisecondes = temps min entre tirs
        this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
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
            b.draw(ctx);
            b.move();
            if ((b.x < 0) || (b.y < 0) || (b.x > width) || (b.y > height))
                this.removeBullet(b)

        }
    }

    move(mousepos) {
        // 2) On dÃ©place la balle 
        this.x = mousepos.x - this.width/2;
        this.y = mousepos.y - this.height/2;
        this.angle = 0;

        if (distance(this.x, this.y, mousepos.x, mousepos.y) >= 10) {
            //ball.v = 0;
            this.x -= this.v * Math.cos(this.angle);
            this.y -= this.v * Math.sin(this.angle);
        }
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