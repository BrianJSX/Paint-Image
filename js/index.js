var canvas;
var ctx;
var drawing = false;
var dot = false;
var pX = (pY = 0);
var cX = (cY = 0);
var width = 5;
var color = "black";

function init(id) {
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener(
    "mousemove",
    function (e) {
      locatePointer("move", e);
    },
    false
  );

  canvas.addEventListener(
    "mousedown",
    function (e) {
      locatePointer("click", e);
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function (e) {
      locatePointer("up", e);
    },
    false
  );
  // Mouse leaving canvas
  canvas.addEventListener(
    "mouseout",
    function (e) {
      locatePointer("out", e);
    },
    false
  );

  canvas.addEventListener(
    "mouseover",
    function (e) {
      if (e.shiftKey) {
        locatePointer("click", e);
      }
    },
    false
  );
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function locatePointer(a, e) {
  if (a == "click") {
    pX = cX;
    pY = cY;

    cX = e.clientX - canvas.getBoundingClientRect().left;
    cY = e.clientY - canvas.getBoundingClientRect().top;

    drawing = true;
    dot = true;
    if (dot) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(cX, cY, width, width);
      ctx.closePath();
      dot = false;
    }
  } else if (a == "up" || a == "out") {
    drawing = false;
  } else if (a == "move") {
    if (drawing) {
      pX = cX;
      pY = cY;
      cX = e.clientX - canvas.getBoundingClientRect().left;
      cY = e.clientY - canvas.getBoundingClientRect().top;
      draw();
    }
  }
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(pX, pY);
  ctx.lineTo(cX, cY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.closePath();
}

function lineColor(c) {
  switch (c) {
    case 0:
      color = "white";
      break;
    case 1:
      color = "black";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "green";
      break;
    case 4:
      color = "red";
      break;
    case 5:
      color = "yellow";
      break;
    case 6:
      color = "orange";
      break;
    case 7:
      color = "pink";
      break;
    case 8:
      color = "brown";
      break;
    case 9:
      color = "white";
      break;
    default:
      color = "white";
      return;
  }
  return;
}

function downloadCanvas() {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = "canvas-image.png";
    a.click();
    document.body.removeChild(a);
  }
}
init("board");
