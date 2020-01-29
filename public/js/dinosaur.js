class Dinosaur {
    constructor() {
        this.r = 60
        this.x = this.r;
        this.y = height - this.r;
        this.vy = 0;
        this.animationSetup()
        this.animation = new Sprite(animation, 0.2)
        this.jumpAnimation;
        this.isAlive = true
        this.doubleJump = 0;
    }

    restart() {
        this.r = 60
        this.x = this.r;
        this.y = height - this.r;
        this.vy = 0;
        this.isAlive = true
        this.doubleJump = 0;
    }

    animationSetup() {
        let frames = spriterundata.frames;
        for (let i = 0; i < frames.length; i++) {
            let pos = frames[i].position
            let img = spritesheetrun.get(pos.x, pos.y, pos.w, pos.h)
            img.resize(this.r, this.r);
            animation.push(img)
        }
        spritejump
    }

    getR() {
        return this.r
    }

    jump() {
        if (this.y == (height - this.r) || this.doubleJump < 1) {
            this.vy = -25;
            this.doubleJump += 1
            // console.log(this.doubleJump)
        }
    }

    hits(obj) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = obj.x + obj.r * 0.5;
        let y2 = obj.y + obj.r * 0.5;
        return collideCircleCircle(x2, y2, obj.r - 30, x1, y1, this.r, this.r)

    }

    move() {
        if (this.y == (height - this.r)) {
            this.doubleJump = 0;
            // console.log(this.doubleJump)
        }
        this.y += this.vy;
        this.vy += gravity
        this.y = constrain(this.y, 0, height - this.r)
    }

    show() {
        push()
        // rect(this.x, this.y, this.r, this.r);
        if (this.y == (height - this.r)) {
            this.animation.show(this.x, this.y)
            this.animation.animate()
        } else {
            image(spritejump, this.x, this.y, this.r, this.r)
        }

        //fill(255, 50)
        //rect(this.x, this.y, this.r, this.r)
        pop()
    }

    setIsAlive(bool) {
        this.isAlive = bool
    }


    // hits(obj) {

    //     let x1 = this.x + this.r * 0.5;
    //     let y1 = this.y + this.r * 0.5;
    //     let x2 = obj.x + obj.r * 0.5;
    //     let y2 = obj.y + obj.r * 0.5;
    //     return collideCircleCircle(x1, y1, this.r, this.r, x2, y2, obj.r, obj.r)

    // }

    // move() {
    //     this.y += this.vy;
    //     this.vy += gravity
    //     this.y = constrain(this.y, 0, height - this.r)
    // }
}