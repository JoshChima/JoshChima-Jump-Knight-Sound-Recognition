class Spike {
    constructor() {
        this.r = 70;
        this.x = width;
        this.y = height - this.r;
    }

    move() {
        this.x -= 16;
    }

    show() {
        push()
        image(spikeImg, this.x, this.y, this.r-30, this.r)
        // fill(255, 50)
        // strokeWeight(4)
        // stroke(51)
        // rect(this.x, this.y, this.r-30, this.r)
        pop()
    }
}