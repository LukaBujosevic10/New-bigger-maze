'use strict'
$(document).ready(function() {
  //console.log("H velikog je " + niz.length);
  //console.log("W velikog je " + niz[0].length);
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  var brojac = 0;
  var nbr = 0;
  let player = {
             position: {x: 30, y: 25},
             color: "black",
           }
  let top_can;
  let top;
  let poz_x;
  let poz_y;
  let ostatak_x;
  let ostatak_y;
  let poz_x_de;
  let border = true;
  let poz_y_de;
  function makeMaze() {
    /*$(canvas).css('height', niz.length*15);
    $(canvas).css('width', niz[0].length*15);*/
    for (var i = 0; i < niz.length*15; i= i+15) {
      for (var k = 0; k < niz[0].length*15; k=k+15) {
        if (niz[i/15][k/15] == 0) {
          ctx.fillStyle = "white";
        }else if(niz[i/15][k/15] == 1){
          ctx.fillStyle = "black";

        }
        ctx.fillRect(k, i, k+15, i+15);
      }
    }
    makingPlayer();
  }
  function makingPlayer() {
    ctx.beginPath();
  ctx.fillStyle = player.color;
  console.log("crtam na " + player.position.x);
  ctx.arc(player.position.x, player.position.y, 6, 0,  2* Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "green";
  //ctx.arc(player.position.x - 6, player.position.y, 1, 0,  2* Math.PI);
  ctx.fill();

  }
makeMaze();
  window.addEventListener("keydown", tastatura);

function tastatura() {
  izracunavanje();
  top_can = $(canvas).css('top');
//  let ex = top_can.substring(0, top_can.length-2);
  top = parseInt(top_can);
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
  /*console.log("brisem na " + player.position.x);
  ctx.arc(player.position.x, player.position.y, 8, 0,  2* Math.PI);
  ctx.fill();*/
  //ctx.stroke();
  player.color = "red";
}
function promena_pozicije(smer) {
  if (smer == "d") {
    chPlayer();
    player.position.y+= 3;
      makingPlayer();
    if (player.position.y > 225 && top*(-1)+450 <= niz.length*15) {
      $(canvas).css('top', '-=3');
    }

  }else if (smer == "g") {
    chPlayer();
    player.position.y-=3;
    makingPlayer();
    if (player.position.y > 225 && $(canvas).css('top') !== '0px' && player.position.y < niz.length*15 - 225) {
      $(canvas).css('top', '+=3');
    }
  }else if(smer == "de"){
    chPlayer();
    player.position.x+=3;
    console.log(player.position.x-4, ostatak_x);
    makingPlayer();
    if (player.position.x > 150 && player.position.x < niz[0].length*15) {
      $(canvas).css('left', '-=3');
    }
  }else if (smer == 'l') {
    chPlayer();
    player.position.x-=3;
    makingPlayer();
    if (player.position.x > 140) {
      $(canvas).css('left', '+=3');
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
  if (niz[poz_y][Math.floor((player.position.x - 10)/15)] == 1 || niz[poz_y_de][Math.floor((player.position.x - 10)/15)] == 1) {
    let str = Math.floor(((player.position.x - 7)-3)/15);
    for (var i = 3; i > 0; i--) {
      if (str !== Math.floor(((player.position.x - 7)- i)/15)) {
       console.log("I je " + i);
       chPlayer();
        player.position.x-=i;
        makingPlayer();
        break;
      }else{
        str = Math.floor(((player.position.x - 7) - i)/15)
      }
    }
  }else{promena_pozicije("l");}
}
function desno() {
  if (niz[poz_y][Math.floor((player.position.x + 6+3)/15)] == 1 || niz[poz_y_de][Math.floor((player.position.x + 6+3)/15)] == 1) {
    let str = Math.floor((player.position.x + 6+3)/15);
    for (var i = 3; i > 0; i--) {
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
}
function gore() {
  if (niz[Math.floor(((player.position.y-7)-3)/15)][poz_x] == 1 || niz[Math.floor(((player.position.y-7)-3)/15)][poz_x_de] == 1) {
    let str = Math.floor(((player.position.y - 7)-3)/15);
    for (var i = 3; i > 0; i--) {
      if (str !== Math.floor(((player.position.y - 7)- i)/15)) {
       console.log("I je " + i);
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
}
function dole() {
  if (niz[Math.floor((player.position.y+6+3)/15)][poz_x] == 1 || niz[Math.floor((player.position.y+6+3)/15)][poz_x_de] == 1) {
    let str = Math.floor((player.position.y + 6+3)/15);
    for (var i = 3; i > 0; i--) {
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
}



if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", deviceOrientationListener);
      } else {
        alert("Sorry, your browser doesn't support Device Orientation");
      }


function deviceOrientationListener(event) {

  izracunavanje();


if (event.beta > 2) {
  dole();
}
if (event.beta < -2) {
  gore();
}
if (event.gamma > 2) {
  levo();
}
if (event.gamma < -2) {
  desno();
}
}

});
