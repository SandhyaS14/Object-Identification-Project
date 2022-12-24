img = "";
status = "";
objects = [];
function preload() {
    img = loadImage("office.jpeg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status != "") {
        objectslength = objects.length;
        for(i=0; i < objectslength; i++) {
            percent = floor(objects[i].confidence * 100);
            r = Math.random()*255;
            g = Math.random()*255;
            b = Math.random()*255;
            stroke(r, g, b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            document.getElementById("status").innerHTML = "Out of 4 objects, 1 objects were identified."
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    document.getElementById("status").innerHTML = "Detecting Objects";
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.log("Error");
        console.log(error);
        document.getElementById("status").innerHTML = "Error";
    }
    else {
        console.log(results);
        objects = results;
    }
}