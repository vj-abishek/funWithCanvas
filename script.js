 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 ctx.strokeStyle='#000'
 ctx.lineJoin = "round"
 ctx.lineCap = "round"
 ctx.lineWidth = 40
 
 let isDarwing = false;
 let lastX = 0;
 let lastY = 0;
 let lastE;
 let  hue=0; 
 const rainbow = document.getElementById('rainbow')
 const blend = document.getElementById('blend');
 const eraser = document.getElementById('eraser');
 const color_form = document.getElementById('color_form');
 const color = document.getElementById('color')

 eraser.addEventListener('click',() => {
     ctx.strokeStyle = "#fff"
     rainbow_color=false;
 })
 let rainbow_color = false;

rainbow.addEventListener('click',() =>  {   
    rainbow_color=true;  
})
const drawToCanvas = (e,val,bool) => {
    lastE=e
    val?ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`:'';
    // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath();
    ctx.moveTo(lastX,lastY)
    ctx.lineTo(e.offsetX?e.offsetX:e.clientX,e.offsetY?e.offsetY:e.clientY)
    ctx.stroke();

    [lastX,lastY] = [e.offsetX?e.offsetX:e.clientX,e.offsetY?e.offsetY:e.clientY]
    bool?hue++:'';
    console.log('Value',hue)
}

 const draw = (e,stroke,bool) => {
    if(!isDarwing) return;
   
    //create a marker here 
    lastE=e  
    drawToCanvas(e,stroke,bool)  
   
   
 }

 blend.addEventListener('change',(e) => {
    if(e.target.checked) 
       {
        ctx.globalCompositeOperation = 'xor'
       }
    else 
    {
        ctx.globalCompositeOperation = 'source-over'
    }
 })


 color_form.addEventListener('submit',e => {
    e.preventDefault();
    ctx.strokeStyle=`${color.value}`
    rainbow_color=false;
    console.log(color.value)
 })

 canvas.addEventListener('mousemove',(e) => {
     rainbow_color?draw(e,true,true):draw(e,false,false);
 })
 canvas.addEventListener('mousedown',(e) => {
     isDarwing = true;
     lastE=e;
     [lastX ,lastY] = [e.offsetX , e.offsetY]
 })
//  Mobile events 
canvas.addEventListener('touchmove',e => {
    rainbow_color?draw(e.touches[0],true,true):draw(e.touches[0],false,false);    
    console.log(e)
})
canvas.addEventListener('touchstart',(e) => {
    isDarwing = true;
    lastE=e.touches[0];
    [lastX ,lastY] = [e.touches[0].clientX , e.touches[0].clientY]
})
 canvas.addEventListener('mouseup',() => {
    isDarwing = false
    lastE=""
 })