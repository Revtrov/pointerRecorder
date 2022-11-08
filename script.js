let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let lastPos = [0, 0]
let slope = (p1, p2) => {
    return (p2[1] - p1[1]) / (p2[0] - p1[0])
}
let quadDraw = (img, pos) => {
     //ctx.drawImage(img, pos[0]-64, pos[1]-64, 128, 128)
     //ctx.drawImage(img, canvas.width - pos[0]-64, pos[1]-64, 128, 128)
     //ctx.drawImage(img, pos[0]-64, canvas.height - pos[1]-64, 128, 128)
     //ctx.drawImage(img, canvas.width - pos[0]-64, canvas.height - pos[1]-64, 128, 128)

    
}
let splitLine = (splits, p1, p2, img) => {
    let lineSlope = slope(p1, p2);
    for (let i = 0; i < splits; i++) {
        quadDraw(img, sectionFunc(p1, p2, lineSlope, i, splits))
    }
}
let sectionFunc = (p1, p2, slope, index, splits) => {
    let x = ((index * p2[0]) + (splits * p1[0])) / (splits + index);
    let y = ((index * p2[1]) + (splits * p1[1])) / (splits + index);
    return [x, y]
}
let img = new Image();
img.src = "1200x675mf.jpg"

document.addEventListener("mousemove", (event) => {
    let currentPoints = [event.clientX, event.clientY]
     ctx.strokeStyle = "blue"
     ctx.lineWidth = "1"
     for(let i = 2000; i >-2000; i--){
     ctx.beginPath();
     ctx.moveTo(lastPos[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, lastPos[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.lineTo(currentPoints[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, currentPoints[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.stroke()   
     ctx.moveTo(canvas.width-lastPos[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, lastPos[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.lineTo(canvas.width-currentPoints[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, currentPoints[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.stroke()
     ctx.moveTo(lastPos[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, canvas.height - lastPos[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.lineTo(currentPoints[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, canvas.height -currentPoints[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.stroke()
     ctx.moveTo(canvas.width - lastPos[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, canvas.height - lastPos[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.lineTo(canvas.width-currentPoints[0]*Math.sqrt(Math.abs(i), Math.E)-1+1, canvas.height -currentPoints[1]*Math.sqrt(Math.abs(i), Math.E)-1+1)
     ctx.stroke()
        
    }
         ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.fill()
    let dist = Math.sqrt(((lastPos[0] - [currentPoints[0], currentPoints[1]][0]) ** 2) + ((lastPos[1] - [currentPoints[0], currentPoints[1]][1]) ** 2))
    splitLine(dist, lastPos, [currentPoints[0], currentPoints[1]], img)
    lastPos = [currentPoints[0], currentPoints[1]]
})
