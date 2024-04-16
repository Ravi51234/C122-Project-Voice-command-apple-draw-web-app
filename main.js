x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = 0;
draw_apple = "";

function  preload(){
  apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 var content = event.results[0][0].transcript;
 console.log(content);

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number);

    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started Drawing Apple";
      draw_apple = "set";
    }
    else{
      document.getElementById("status").innerHTML = "The Speech Has Not Recognised A Number";
    }
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 40, 40);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + " apples drawn";
    speak();
    draw_apple = ""; 
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
