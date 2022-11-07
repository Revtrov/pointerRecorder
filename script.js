let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let lastPos = [0, 0]
let slope = (p1, p2) => {
    return (p2[1] - p1[1]) / (p2[0] - p1[0])
}
let quadDraw = (img, pos) => {
    ctx.drawImage(img, pos[0], pos[1], 128, 128)
    ctx.drawImage(img, canvas.width - pos[0], pos[1], 128, 128)
    ctx.drawImage(img, pos[0], canvas.height - pos[1], 128, 128)
    ctx.drawImage(img, canvas.width - pos[0], canvas.height - pos[1], 128, 128)
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
    let currentPoints = [event.clientX - 64, event.clientY - 64]
        // ctx.beginPath();
        // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.fill()
    let dist = Math.sqrt(((lastPos[0] - [currentPoints[0], currentPoints[1]][0]) ** 2) + ((lastPos[1] - [currentPoints[0], currentPoints[1]][1]) ** 2))
    splitLine(dist, lastPos, [currentPoints[0], currentPoints[1]], img)
    lastPos = [currentPoints[0], currentPoints[1]]
})