img =  "";
Status="";
objects = [];

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function draw()
{
    image(img, 0, 0, 640, 420);
    if(Status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#40E0D0");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+10, objects[i].y+10);
            noFill()
            stroke("#40E0D0");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!")
    Status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, result)
{
    if (error)
    {
        console.log(error)
    }
    console.log(results);
    objects = results;
}