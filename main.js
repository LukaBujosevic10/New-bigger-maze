'use strict'
$(document).ready(function() {

  function loadinMenu() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, 300, 450);
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.rotate(90*Math.PI/180);
    ctx.fillText("MEGA MAZE v154", 200, -150);
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
             color: "black",
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
  let v_ld = 1;
  let v_gd = 1;
  let kreci;
  function makeMaze() {
    o_nivo = niz[level];
    canvas.width = 2000;
    canvas.height = 2000;
    kreci = true;
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
            window.addEventListener("deviceorientation", deviceOrientationListener);
            //$(document).on("deviceorientation", deviceOrientationListener)
          } else {
            alert("Sorry, your browser doesn't support Device Orientation");
          }
  //  $(document).on('keydown', tastatura);
  }


  function makingPlayer() {
    ctx.beginPath();
  ctx.fillStyle = player.color;
  ctx.arc(player.position.x, player.position.y, 6, 0,  2* Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fill();

  }

function chPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.position.x - 7, player.position.y-7, 14,14);
  player.color = "black";
}


function promena_pozicije(smer) {
  chPlayer();
  let top = parseInt($(canvas).css('top'));
  if (smer == "d") {
    chPlayer();
     player.position.y+= v_gd;

    /* if (player.position.y > 225 && player.position.y+225 <= o_nivo.length*15) {
       $(canvas).css('top', '-=' + v_gd);
     }*/
     if (player.position.y > 450 && top < 960-450) {
       if (960-450-top > v_gd) {
         $(canvas).css('top', '-=' + v_gd);
       }else {
         player.position.y += 960-450-top;
         $(canvas).css('top', '-=' + 960-450-top);
       }
       makingPlayer();
     }
  }else if (smer == "g") {
    //chPlayer();


    makingPlayer();
    $('#conteiner').html("Pozicija y je " + player.position.y + "</br> duzina lavirinta "+ o_nivo.length*15 + "</br> margina top je" + $(canvas).css("top"));
    if (player.position.y > 210 && $(canvas).css('top') !== '0px' && player.position.y < o_nivo.length*15 - 225) {
      $(canvas).css('top', '+=' + v_gd);
    }
  /*  if (top !== 0 && player.position.y > 250) {
      if (v_gd > top*-1) {

      }else {
        player.position.y-=v_gd;
        $(canvas).css('top', '+=' + v_gd);
      }
    }*/
  }else if(smer == "de"){
    //chPlayer();
    player.position.x+=v_ld;

    makingPlayer();
    if (player.position.x > 150 && player.position.x < o_nivo[0].length*15-135) {
      $(canvas).css('left', '-=' + v_ld);
    }
  }else if (smer == 'l') {
    //chPlayer();
    player.position.x-=v_ld;
    makingPlayer();
    if (player.position.x > 140 && player.position.x < o_nivo[0].length*15-150) {
      $(canvas).css('left', '+=' + v_ld);
    }
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(0,0,15,15);
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
  if (o_nivo[poz_y][Math.floor((player.position.x - 7 - v_ld)/15)] == 1 || o_nivo[poz_y_de][Math.floor((player.position.x - 7-v_ld)/15)] == 1) {
    let str = Math.floor(((player.position.x - 7)-v_ld)/15);
    for (var i = v_ld; i > 0; i--) {

      if (str !== Math.floor(((player.position.x - 7)- i)/15)) {
       chPlayer();
        player.position.x-=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor(((player.position.x - 7) - i)/15);
      }
    }
  }else{promena_pozicije("l");}
  provera_specijalnih_polja();
}
function desno() {
  if (o_nivo[poz_y][Math.floor((player.position.x + 6+v_ld)/15)] == 1 || o_nivo[poz_y_de][Math.floor((player.position.x + 6+v_ld)/15)] == 1) {
    let str = Math.floor((player.position.x + 6+v_ld)/15);
    for (var i = v_ld; i > 0; i--) {
      if (str !== Math.floor((player.position.x + 6+i)/15)) {
            chPlayer();
        player.position.x+=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor((player.position.x + 6+i)/15);
      }
    }
  }else{promena_pozicije("de");}
  provera_specijalnih_polja();
}
function gore() {
  if (o_nivo[Math.floor(((player.position.y-7)-v_gd)/15)][poz_x] == 1 || o_nivo[Math.floor(((player.position.y-7)-v_gd)/15)][poz_x_de] == 1) {
    let str = Math.floor(((player.position.y - 7)-v_gd)/15);
    for (var i = v_gd; i > 0; i--) {
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
  if (o_nivo[Math.floor((player.position.y+6+v_gd)/15)][poz_x] == 1 || o_nivo[Math.floor((player.position.y+6+v_gd)/15)][poz_x_de] == 1) {
    let str = Math.floor((player.position.y + 6+v_gd)/15);
    for (var i = v_gd; i > 0; i--) {
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
  /*ctx.fillStyle = "red";
  ctx.fillRect(0,0,15,15);*/
izracunavanje();
brzina(event);
/*$('#conteiner').html('<p>Idem levo brzinom + '+v_ld+
'</br>Idem dole brzinom '+v_gd+'</p>');*/
if (kreci == true) {
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

}
loadinMenu();
function provera_specijalnih_polja() {
  if (o_nivo[poz_y][poz_x] == 2) {
    levelCompleated();
  }
}
function levelCompleated() {
  kreci = false;
  ctx.fillStyle = "green";
  ctx.fillRect(0,0,15,15);
  $(canvas).css("top", "0px");
  $(canvas).css("left", "0px");
  //$(document).off('keydown', tastatura);
  $(document).off("deviceorientation", deviceOrientationListener);
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
}
function brzina(s) {

  let ab_beta = Math.abs(s.beta);
  let ab_gama = Math.abs(s.gamma);

  if(ab_beta >= 10 && ab_beta < 20){
    v_gd = 2;
  }else if (ab_beta >= 20 && ab_beta < 40) {
    v_gd = 3;
  }else if(ab_beta >= 40){
    v_gd = 6;
  }else if(ab_beta >= 2 && ab_beta < 5){
    v_gd = 1;
  }else if(ab_beta < 2){
    v_gd = 0;
  }

  if(ab_gama >= 10 && ab_gama < 20){
    v_ld = 2;
  }else if (ab_gama >= 20 && ab_gama < 40) {
    v_ld = 3;
  }else if(ab_gama >= 40){
    v_ld = 6;
  }else if(ab_gama >= 2 && ab_gama < 5){
    v_ld = 1;
  }else if(ab_gama < 2){
    v_ld = 0;
  }
}

});
