class Sprite {
    constructor(animation, speed) {
        this.animation = animation;
        this.len = this.animation.length
        this.speed = speed
        this.index = 0;
    }

    show(x, y) {
        let index = floor(this.index) % this.len
        image(this.animation[index], x, y)
    }

    animate() {
        this.index += this.speed;
    }
}