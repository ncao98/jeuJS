class Bullet {
    constructor(sprite) {
        this.x = sprite.x;
        this.y = sprite.y;
        this.width = 10;
        this.height = 5;
        this.angle = sprite.angle;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    move(type) {
        if (type == "sprite") {
            this.x -= 10 * Math.cos(this.angle);
            this.y -= 10 * Math.sin(this.angle);
        } else if (type == "enemy") {
            this.x += 10 * Math.cos(this.angle);
            this.y -= 10 * Math.sin(this.angle);
        }
    }
}