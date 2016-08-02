
  var select = document.getElementById("select");
  var canvas = document.getElementById("canvas");
  var select_ctx = select.getContext("2d");
  var ctx = canvas.getContext("2d");
  var start = document.getElementById("start");
  var msg = document.getElementById("message")
  var txt2 = document.getElementById("txt2")
  var timer = document.getElementById("timer");
  var count = 0;
  var image = new Image();

  var start_time = new Date();
  var hour = 0;
  var min = 0;
  var sec = 0;
  var now = 0;
  var date_time = 0;


  image.src ="img/flower.png"


  start.addEventListener("click", function() {
    ctx.clearRect(0, 0, 500, 500);
    drawcolor5();
    getColor();
    get_first();
    start.style.display="none";
    timer.style.top="-10px";
    timerr = setInterval("disp_timer()", 1000);
  })

  msg.addEventListener("click", function() {
    msg.style.display = "none";
    start.style.display="";
    init();
  })

  function get_first(){
     start_time = new Date();
     hour = 0;
     min = 0;
     sec = 0;
     now = 0;
     date_time = 0;
  }

  function init() {
    ctx.fillStyle = 'rgb(213, 237, 224)';
    ctx.fillRect(0, 0, 500, 500);
    select_ctx.fillStyle = 'rgb(213, 237, 224)';
    select_ctx.fillRect(0, 0, 100, 100);
    timer.innerHTML="";
  }

  function disp_timer() {

    now = new Date();
    date_time = parseInt((now.getTime()-start_time.getTime())/1000);
    hour = parseInt(date_time/3600);
    min = parseInt((date_time/60)%60);
    sec = date_time % 60;

    if(hour < 10) { hour = "0" + hour; }
    if(min < 10) { min = "0" + min; }
    if(sec < 10) { sec = "0" + sec; }
    timer1 = 'Time:  '+hour + ':' + min + ':' + sec;
    timer.innerHTML = timer1;
  }

  function drawcolor5() {
    ctx.beginPath();
    for(i=0; i<5; i++) {
      for(j=0; j<5; j++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
        //var opa = Math.random();
        //ctx.fillStyle = "rgba(255, 150, 0, "+opa+")";
        ctx.fillRect(i*100, j*100, 100,100);
      }
    }
  }
// drawcolor5();

  function getColor() {
    var w = canvas.width;
    var h = canvas.height;
    var imagedata = ctx.getImageData(0, 0, w, h)
    var pixels = imagedata.data;
    blocks = [];
    var now_pixel = 0;
    for(i=0; i<5; i++) {
     now_pixel = i*200000;
      for(j=0; j<5; j++) {
        var colors = {};

        colors['red'] = pixels[now_pixel];
        colors['green'] = pixels[now_pixel+1];
        colors['blue'] = pixels[now_pixel+2];
        colors['alpha'] =  pixels[now_pixel+3];
        blocks.push(colors);
        now_pixel += 400;
      }
      now_pixel = 0;
    }
    // return blocks;
    console.log(blocks);
    change_color();
  }

  function change_color() {
     leng = Math.floor(Math.random() * blocks.length);
     selected_block = blocks[leng];

     blocks.splice(leng, 1);
     red = selected_block['red'];
     green = selected_block['green'];
     blue = selected_block['blue'];
     alpha = selected_block['alpha'];
     select_ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ','+alpha+')';
     select_ctx.fillRect(0, 0, 100, 100);
     console.log(blocks.length);

  }


canvas.onclick = function(e) {
  var rect = e.target.getBoundingClientRect();
  x = e.clientX - Math.floor(rect.left) - 2;
  y = e.clientY - Math.floor(rect.top) - 2;

  var choose_data = ctx.getImageData(x, y, 1, 1);
  var c_red = choose_data.data[0];
  var c_green = choose_data.data[1];
  var c_blue = choose_data.data[2];
  var c_alpha = choose_data.data[3];

  if(blocks.length==0 && c_red==red && c_green==green && c_blue==blue && c_alpha==alpha) {
     ctx.fillStyle = 'rgb(110, 123, 125)';
     check_pos();
     clearInterval(timerr);
     msg.style.display = "block";
     txt2.innerHTML="Your"+timer1+"!";
  }
  else if(c_red==red && c_green==green && c_blue==blue && c_alpha==alpha) {
     ctx.fillStyle = 'rgb(255, 255, 255)';
     check_pos();
     change_color();
    }

}

function check_pos() {
  // if(x<100 && y<100) ctx.fillRect(0, 0, 100, 100);
  if(x<100 && y<100) {ctx.fillRect(0, 0, 100, 100); ctx.drawImage(image, 15, 15);}
  else if(x>=100 && x<200 && y<100) {ctx.fillRect(100, 0, 100, 100); ctx.drawImage(image, 115, 15);}
  else if(x>=200 && x<300 && y<100) {ctx.fillRect(200, 0, 100, 100); ctx.drawImage(image, 215, 15);}
  else if(x>=300 && x<400 && y<100) {ctx.fillRect(300, 0, 100, 100); ctx.drawImage(image, 315, 15);}
  else if(x>=400 && x<500 && y<100) {ctx.fillRect(400, 0, 100, 100); ctx.drawImage(image, 415, 15);}

  else if(x<100 && y>=100 && y<200) {ctx.fillRect(0, 100, 100, 100); ctx.drawImage(image, 15, 115);}
  else if(x>=100 && x<200 && y>=100 && y<200) {ctx.fillRect(100, 100, 100, 100); ctx.drawImage(image, 115, 115);}
  else if(x>=200 && x<300 && y>=100 && y<200) {ctx.fillRect(200, 100, 100, 100); ctx.drawImage(image, 215, 115);}
  else if(x>=300 && x<400 && y>=100 && y<200) {ctx.fillRect(300, 100, 100, 100); ctx.drawImage(image, 315, 115);}
  else if(x>=400 && x<500 && y>=100 && y<200) {ctx.fillRect(400, 100, 100, 100); ctx.drawImage(image, 415, 115);}

  else if(x<100 && y>=200 && y<300) {ctx.fillRect(0, 200, 100, 100); ctx.drawImage(image, 15, 215);}
  else if(x>=100 && x<200 && y>=200 && y<300) {ctx.fillRect(100, 200, 100, 100); ctx.drawImage(image, 115, 215);}
  else if(x>=200 && x<300 && y>=200 && y<300) {ctx.fillRect(200, 200, 100, 100); ctx.drawImage(image, 215, 215);}
  else if(x>=300 && x<400 && y>=200 && y<300) {ctx.fillRect(300, 200, 100, 100); ctx.drawImage(image, 315, 215);}
  else if(x>=400 && x<500 && y>=200 && y<300) {ctx.fillRect(400, 200, 100, 100); ctx.drawImage(image, 415, 215);}

  else if(x<100 && y>=300 && y<400) {ctx.fillRect(0, 300, 100, 100); ctx.drawImage(image, 15, 315);}
  else if(x>=100 && x<200 && y>=300 && y<400) {ctx.fillRect(100, 300, 100, 100); ctx.drawImage(image, 115, 315);}
  else if(x>=200 && x<300 && y>=300 && y<400) {ctx.fillRect(200, 300, 100, 100); ctx.drawImage(image, 215, 315);}
  else if(x>=300 && x<400 && y>=300 && y<400) {ctx.fillRect(300, 300, 100, 100); ctx.drawImage(image, 315, 315);}
  else if(x>=400 && x<500 && y>=300 && y<400) {ctx.fillRect(400, 300, 100, 100); ctx.drawImage(image, 415, 315);}

  else if(x<100 && y>=400 && y<500) {ctx.fillRect(0, 400, 100, 100); ctx.drawImage(image, 15, 415);}
  else if(x>=100 && x<200 && y>=400 && y<500) {ctx.fillRect(100, 400, 100, 100); ctx.drawImage(image, 115, 415);}
  else if(x>=200 && x<300 && y>=400 && y<500) {ctx.fillRect(200, 400, 100, 100); ctx.drawImage(image, 215, 415);}
  else if(x>=300 && x<400 && y>=400 && y<500) {ctx.fillRect(300, 400, 100, 100); ctx.drawImage(image, 315, 415);}
  else if(x>=400 && x<500 && y>=400 && y<500) {ctx.fillRect(400, 400, 100, 100); ctx.drawImage(image, 415, 415);}


}
