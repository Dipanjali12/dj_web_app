song = ""
leftwX = 0;
leftwY = 0;
rightwX = 0;
rightwY = 0;
scoreLw = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 600);
    fill("red");
    stroke("red");
    if (scoreLw > 0.2) {
        circle(leftwX, leftwY, 20);
        inNumberLeftY = Number(leftwY);
        removeDecimal = Math.floor(inNumberLeftY);
        volume = removeDecimal / 600;
        document.getElementById("volume").innerHTML = "volume= " + volume;
        song.setVolume(volume);
    }
   
}


function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        scoreLw = result[0].pose.keypoints[9].score;
        leftwX = result[0].pose.leftWrist.x;
        leftwY = result[0].pose.leftWrist.y;
        rightwX = result[0].pose.rightWrist.x;
        rightwY = result[0].pose.rightWrist.y;


    }
}

function name() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function modelLoaded() {
    console.log("model is loaded");
}