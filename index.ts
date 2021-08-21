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

class Point {

    constructor(public r : number, public angle : number) {

    }
}

class Shape {

    constructor(public points : Array<Point>) {

    }

    draw(context : CanvasRenderingContext2D) {
        context.beginPath()
        this.points.forEach((point, index) => {
            const {r, angle} = point 
            const x : number = r * Math.cos(angle * Math.PI / 180)
            const y : number = r * Math.sin(angle * Math.PI / 180)
            if (index == 0) {
                context.moveTo(x, y)
            } else {
                context.lineTo(x, y)
            }
        })
        context.fill()
    }
}

const transformDataToPoints = (data1 : Record<string, number> , data2 : Record<string, number>) => {
    const transformedData1 = {}, transformedData2 = {}
    Object.keys(data1).forEach((key) => {
        const max : number =  Math.max(data1[key], data2[key])
        transformedData1[key] = data1[key] / max 
        transformedData2[key] = data2[key] / max 
    })
    return [transformedData1, transformedData2]
}
