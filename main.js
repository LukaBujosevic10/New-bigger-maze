'use strict'
$(document).ready(function() {

  function loadinMenu() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, 300, 450);
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.rotate(90*Math.PI/180);
    ctx.fillText("MEGA MAZE", 200, -150);
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Loading Level...", 200, -100);
    ctx.fillStyle = "white";
    ctx.rotate(270*Math.PI/180);
    setTimeout(makeMaze, 3000);


  }

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  var brojac = 0;
  var nbr = 0;
  let player = {
             position: {x: 30, y: 25},
             color: "red",
           }
  let poz_x;
  let poz_y;
  let ostatak_x;
  let ostatak_y;
  let poz_x_de;
  let border = true;
  let poz_y_de;
  let bri = 0;
  let brk = 0;
  let element;
  let level = 0;
  let o_nivo;
  let v;
  function makeMaze() {
    o_nivo = niz[level];
    canvas.width = 2000;
    canvas.height = 2000;
    for (var i = 0; i < o_nivo.length*15; i= i+15) {
      for (var k = 0; k < o_nivo[0].length*15; k=k+15) {
        element = o_nivo[i/15][k/15];
        switch (element) {
          case 0:
            ctx.fillStyle = "white";
            break;
          case 1:
            ctx.fillStyle = "black";
            break;
          case 2:
            ctx.fillStyle = "green";
            break;
        }
        ctx.fillRect(k, i, k+15, i+15);

      }
    }
    console.log("canvas unloaded");
    makingPlayer();
    if (window.DeviceOrientationEvent) {
            //window.addEventListener("deviceorientation", deviceOrientationListener);
            $(document).on("deviceorientation", deviceOrientationListener)
          } else {
            alert("Sorry, your browser doesn't support Device Orientation");
          }
    $(document).on('keydown', tastatura);
  }


  function makingPlayer() {
    ctx.beginPath();
  ctx.fillStyle = player.color;
  ctx.arc(player.position.x, player.position.y, 6, 0,  2* Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fill();

  }



function tastatura() {
  v = 3;
  izracunavanje();
  if (event.keyCode == 39) {
      desno();
  }
  if (event.keyCode == 37) {
     levo();
  }
  if (event.keyCode == 40) {
    dole();
  }
  if (event.keyCode == 38) {
    gore();
 }
}
function chPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.position.x - 7, player.position.y-7, 14,14);
  player.color = "red";
}
function promena_pozicije(smer) {
  if (smer == "d") {
    chPlayer();
    player.position.y+= v;
      makingPlayer();
    if (player.position.y > 225 && player.position.y+225 <= o_nivo.length*15) {
      $(canvas).css('top', '-=' + v);
    }

  }else if (smer == "g") {
    chPlayer();
    player.position.y-=v;
    makingPlayer();
    if (player.position.y > 210 && $(canvas).css('top') !== '0px' && player.position.y < o_nivo.length*15 - 225) {
      $(canvas).css('top', '+=' + v);
    }
  }else if(smer == "de"){
    chPlayer();
    player.position.x+=v;
    makingPlayer();
    if (player.position.x > 150 && player.position.x < o_nivo[0].length*15-135) {
      $(canvas).css('left', '-=' + v);
    }
  }else if (smer == 'l') {
    chPlayer();
    player.position.x-=v;
    makingPlayer();
    if (player.position.x > 140 && player.position.x < o_nivo[0].length*15-150) {
      $(canvas).css('left', '+=' + v);
    }
  }
}
function izracunavanje() {
   poz_x =  Math.floor((player.position.x-6)/15);
   poz_x_de = Math.floor((player.position.x+6)/15);
   poz_y = Math.floor((player.position.y-6)/15);
   poz_y_de = Math.floor((player.position.y+6)/15);
   ostatak_x = (player.position.x-4)%15;
   ostatak_y = (player.position.y-4)%15;
}
function levo(){
  if (o_nivo[poz_y][Math.floor((player.position.x - 7 - v)/15)] == 1 || o_nivo[poz_y_de][Math.floor((player.position.x - 7-v)/15)] == 1) {
    let str = Math.floor(((player.position.x - 7)-v)/15);
    for (var i = v; i > 0; i--) {

      if (str !== Math.floor(((player.position.x - 7)- i)/15)) {
       chPlayer();
        player.position.x-=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor(((player.position.x - 7) - i)/15)
      }
    }
  }else{promena_pozicije("l");}
  provera_specijalnih_polja();
}
function desno() {
  if (o_nivo[poz_y][Math.floor((player.position.x + 6+v)/15)] == 1 || o_nivo[poz_y_de][Math.floor((player.position.x + 6+v)/15)] == 1) {
    let str = Math.floor((player.position.x + 6+v)/15);
    for (var i = v; i > 0; i--) {
      if (str !== Math.floor((player.position.x + 6+i)/15)) {
            chPlayer();
        player.position.x+=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor((player.position.x + 6+i)/15)
      }
    }
  }else{promena_pozicije("de");}
  provera_specijalnih_polja();
}
function gore() {
  if (o_nivo[Math.floor(((player.position.y-7)-v)/15)][poz_x] == 1 || o_nivo[Math.floor(((player.position.y-7)-v)/15)][poz_x_de] == 1) {
    let str = Math.floor(((player.position.y - 7)-v)/15);
    for (var i = v; i > 0; i--) {
      if (str !== Math.floor(((player.position.y - 7)- i)/15)) {
       chPlayer();
        player.position.y-=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor(((player.position.y - 7) - i)/15)
      }
    }
  }else {
    promena_pozicije("g");
  }
  provera_specijalnih_polja();
}
function dole() {
  if (o_nivo[Math.floor((player.position.y+6+v)/15)][poz_x] == 1 || o_nivo[Math.floor((player.position.y+6+v)/15)][poz_x_de] == 1) {
    let str = Math.floor((player.position.y + 6+v)/15);
    for (var i = v; i > 0; i--) {
      if (str !== Math.floor((player.position.y + 6+i)/15)) {
            chPlayer();
        player.position.y+=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor((player.position.y + 6+i)/15)
      }
    }
  }else {
    promena_pozicije("d")
  }
  provera_specijalnih_polja();
}


function deviceOrientationListener(event) {

  izracunavanje(event);

odr_br();
if (event.beta > 2) {
  dole();
}
if (event.beta < -2) {
  gore();
}
if (event.gamma > 2) {
  desno();
}
if (event.gamma < -2) {
  levo();
}
}
loadinMenu();
function provera_specijalnih_polja() {
  if (o_nivo[poz_y][poz_x] == 2) {
    levelCompleated();
  }
}
function levelCompleated() {
  $(canvas).css("top", "0px");
  $(canvas).css("left", "0px");
  $(document).off('keydown', tastatura);
  $(document).off("deviceorientation", deviceOrientationListener)
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, 300, 450);
  ctx.font = "40px Comic Sans MS";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.rotate(90*Math.PI/180);
  ctx.fillText("LEVEL COMPLEATED", 220, -150);
  ctx.font = "30px Comic Sans MS";
  ctx.fillText("Congretulations", 200, -100);
  ctx.rotate(270*Math.PI/180);
  player.position.x = 23;
  player.position.y = 23;
  if (level+1 < niz.length) {
    level++;
    setTimeout(loadinMenu, 3000);
  }

function odr_br(smer) {
  let ab_beta = Math.abs(smer.beta);
  let ab_gama = Math.abs(smer.gamma);
  if((ab_beta >= 10 && ab_beta < 20) ||(ab_gama >= 10 && ab_gama < 20)){
    v = 2;
  }else if ((ab_beta >= 20 && ab_beta < 40) ||(ab_gama >= 20 && ab_gama < 40)) {
    v = 3;
  }else if( ab_beta >= 40 || ab_gama >= 40){
    v = 4;
  }else if((ab_beta >= 2 && ab_beta < 10) ||(ab_gama >= 2 && ab_gama < 10)){
    v = 1;
  }else if(ab_beta < 2 || ab_gama < 2){
    v = 0;
  }
}
}
});
