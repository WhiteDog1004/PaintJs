const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fliiStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

const colors = document.querySelectorAll("#jsColors div");
const nowColor = document.querySelector('#jsNowColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector("#jsMode");
const artDelete = document.querySelector("#jsDelete");
const save = document.querySelector("#jsSave");

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function onMouseDown(){
    painting = true;
}

function handleColorClick(event) {
    const clickColor = event.style.backgroundColor;
    ctx.strokeStyle = clickColor;
    ctx.fillStyle = clickColor;
    nowColor.style.backgroundColor = clickColor;
}

function handleRangeChange(event) {
    const strokeValue = event.target.value;
    ctx.lineWidth = strokeValue;
}
function handleModeClick(event) {
    if(filling) {
        filling = false;
        mode.classList.remove("on");
    } else {
        filling = true;
        mode.classList.add("on");
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleDeleteClick(){
    const saveColor = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = saveColor;
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "dogPaint";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    colors.forEach((el) => {
        el.addEventListener('click', ()=> {
            handleColorClick(el);
        })
    });
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(artDelete){
    artDelete.addEventListener("click", handleDeleteClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}