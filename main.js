var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
autoSetCanvas(canvas)
var using = false
var eraserEnabled = false
var lastpoint = { x: undefined, y: undefined }
var lineWidth = 5


/***监听mouse***/
listenToUser(canvas)
function listenToUser(canvas) {
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (e) {
            console.log('touch')
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastpoint = { x: x, y: y }
            }
        }
        canvas.ontouchmove = function (e) {
            console.log('move')
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newpoint = { x: x, y: y }
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint

            }
        }
        canvas.ontouchend = function () {
            console.log('end')
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (e) {
            var x = e.clientX
            var y = e.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastpoint = { x: x, y: y }
            }


        }

        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            if (!using) { return }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newpoint = { x: x, y: y }
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint

            }

        }
        canvas.onmouseup = function (e) {
            using = false
        }
    }


}

eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

brush.onclick = function () {
    eraserEnabled = false
    eraser.classList.remove('active')
    brush.classList.add('active')
}
black.onclick = function() {
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function() {
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function() {
    ctx.strokeStyle = 'green'
    ctx.fillStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function() {
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 3
}
thick.onclick = function(){
    lineWidth = 10
}
clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
save.onclick = function(){
    var url = canvas.toDataURL('image/png')
    var a= document.createElement('a')
    a.href = url
    a.download = '我的画板'
    a.target = '_blank'
    a.click()
}
// document.body.ontouchstart = function(e) {
//     e.preventDefault()
// }
/**函数工具**/
function autoSetCanvas(canvas) {
    setcanvasSize()
    window.onresize = function () {
        setcanvasSize()
    }
    function setcanvasSize() {
        var pageHidth = document.documentElement.clientHeight
        var pageWidth = document.documentElement.clientWidth
        canvas.height = pageHidth
        canvas.width = pageWidth
    }
}
function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)//起点
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2)//终点
    ctx.stroke()
    ctx.closePath()
}