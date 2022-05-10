function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)

    document.getElementById("status").innerHTML="status Detecting object";
}

function draw(){
    image(video,0,0,380,380);
    if(status !="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status  object detected😄";
            document.getElementById("numobj").innerHTML="number of objects decteted are "+objects.length; 
            percent=floor(objects[i].confidence*100);
            fill(r,g,b);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
        }
  
    }


}

function modelLoaded(){
    console.log("Model loaded");
    status=true;
    

}


function gotResult(error,results){
    if(error){
        console.log(error);
}
    else{
        console.log(results);
        objects=results;
    }
}
function start()