const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const controls = document.querySelector('.controls');

let size = 0;
let path = '';

// resize canvas
function canvasSize(size) {
  canvas.width = size;
  canvas.height = size;
}

// draw image on canvas
function drawImg(path) {
  const image = new Image();
  image.src = path;
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
}

// get json from local folder and draw json on canvas
function getJSON(path, size) {
  fetch(path)
    .then(res => res.json())
    .then(data => { 
     drawJSON(data, size);
    });
}

// conversion hex to rgba 
function hexToRGBA(hex) {
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return [r, g, b, 255];
}

// conversion 2-d array to flat array
function formatData(data) {
  if (data.length === 4) {
    return data.flat().map(hexToRGBA).flat();
  } else {
    return data.flat().flat();
  } 
}

// draw json on canvas
function drawJSON(data, size) {
  const flatData = formatData(data);
  const imgData = new ImageData(Uint8ClampedArray.from(flatData), size, size);
  ctx.putImageData(imgData, 0, 0);  
}

// draw image or json on canvas
function drawOnCanvas(event) {
  if(!event.target.classList.contains('control')) return;
  path = event.target.dataset.path;
  size = event.target.dataset.size;
  canvasSize(size);
  
  if(event.target.dataset.type === 'json') {
    getJSON(path, size);
  } else {
    drawImg(path);
  }
}

controls.addEventListener('click', drawOnCanvas);
