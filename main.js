//https://teachablemachine.withgoogle.com/models/bO1b28swp/

prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    
});

Camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_url+'"/>';
    });
}

console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bO1b28swp/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is "+prediction_1;
    speak_data2="and the second prediction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);

}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion1").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "best") {
            document.getElementById("emoji1").innerHTML = "&#128077;";
        } 
        if (results[0].label == "amazing") {
            document.getElementById("emoji1").innerHTML = "&#128076;";
        }
        if (results[0].label == "victory") {
            document.getElementById("emoji1").innerHTML = "&#9996;";
        }
        if (results[1].label == "best") {
            document.getElementById("emoji2").innerHTML = "&#128077;";
        } 
        if (results[1].label == "amazing") {
            document.getElementById("emoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "victory") {
            document.getElementById("emoji2").innerHTML = "&#9996;";
        }
        
    }
}