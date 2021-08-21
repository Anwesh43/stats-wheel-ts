const w : number = window.innerWidth
const h : number = window.innerHeight 
const rFactor : number = 4.5
const delay : number = 20 
const color1 : string = "green"
const color2 : string = "red"
const opacity1 : number = 0.6 
const opacity2 : number = 0.3 
const backColor : string = "#bdbdbd"

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }
    
    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }
}