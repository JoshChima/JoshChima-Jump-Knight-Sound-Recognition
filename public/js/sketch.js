var dinosaur;
var gravity = 2;

let animation = [];
let spriterundata;
let spritejump;
let spritesheetrun;
let spikeImg
let spikes = []
var soundclassifier;
var c;
var d = 100;

var score = 0;
var livingPoint = 0.5

function newCanvas() {
    c = createCanvas(window.innerWidth, 500);
    c.parent('jumbo-canvas')
}

function preload() {
    const options = {
        probabilityThreshold: 0.90
    };
    soundclassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    spriterundata = loadJSON('assets/knight.json');
    spikeImg = loadImage('assets/spike.png');
    spritesheetrun = loadImage('assets/NES Knight Free Version/Run PNG/NES PNG Knight_Run_EAST_strip4.png')
    spritejump = loadImage('assets/NES Knight Free Version/Jump PNG/NES PNG Knight_Jump_EAST.png')
}

function restart() {
    document.getElementById('EndGame').style.visibility = "hidden";
    dinosaur.restart()
    spikes = []
    score = 0
    loop();
}

function modelReady() {
    // classify sound
    soundclassifier.classify(gotCommand);
}

function setup() {
    newCanvas()
    frameRate(20)
    spikeImg = spikeImg.get(5, 6, 21, 24)
    spritejump = spritejump.get(3, 0, 10, 24)
    dinosaur = new Dinosaur();
}

function gotCommand(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result[0].label, result[0].confidence);
    if (result[0].label == 'up') {
        dinosaur.jump()
    }
}

function draw() {
    background(220)
    for (let s of spikes) {
        s.move();
        s.show();
        if (dinosaur.hits(s)) {
            dinosaur.setIsAlive(false)
            console.log('game over')
            document.getElementById('EndGame').style.visibility = "visible";
            noLoop();
        }
        let ds = int(dist(s.x, s.y, width, s.y));
        if (ds > width+s.r) {
            spikes.shift()
        }

    }
    // image(spikeImg, 0,0, 50,50)

    dinosaur.show()
    dinosaur.move()
    if (spikes.length > 0) {
        // let x1 = spikes[spikes.length - 1].x;
        // let y1 = spikes[spikes.length - 1].y;
        // let x2 = width;
        // let y2 = spikes[spikes.length - 1].y;
        d = int(dist(spikes[spikes.length - 1].x, spikes[spikes.length - 1].y, width, spikes[spikes.length - 1].y));

        // push()
        // line(x1, y1, x2, y2);
        // ellipse(x1, y1, 7, 7);
        // pop()

        // push();
        // translate((x1 + x2) / 2, (y1 + y2) / 2);
        // rotate(atan2(y2 - y1, x2 - x1));
        // text(nfc(d, 1), 0, -5);
        // pop();
    }
    // && (_.range(50, 200).includes(d)) == false
    if (random(1) < 0.05 && d > 20 && d < 200) {
        spikes.push(new Spike()); 
    }
    if (d > 200) {
        d = 100
    }
    score += livingPoint
    document.getElementById('Board').innerHTML = `Score: ${score}`
}

