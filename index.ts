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
    renderer : StatsWheelRenderer 

    constructor(data1 : Record<string, number> , data2 : Record<string, number>) {
        this.renderer = new StatsWheelRenderer(data1, data2)
        this.initCanvas()
        this.render()
    }

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }
    
    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
        this.renderer.draw(this.context)
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

const transformDataToPoints = (r : number, data1 : Record<string, number> , data2 : Record<string, number>) => {
    const points1 : Array<Point> = []
    const points2 : Array<Point> = []
    const deg = 360 / Object.keys(data1).length
    Object.keys(data1).forEach((key : string, i : number) => {
        const max : number =  Math.max(data1[key], data2[key])
        const r1 = r * data1[key] / max 
        const angle = deg * i
        const r2  = r *  data2[key] / max 
        points1.push(new Point(r1, angle))
        points2.push(new Point(r2, angle))
    })
    return [points1, points2]
}

class StatWheel {
    shape : Shape 
    constructor(private points : Array<Point>, private opacity : number, private color : string) {
        this.shape = new Shape(this.points) 
    }

    draw(context : CanvasRenderingContext2D) {
        context.fillStyle = this.color 
        context.globalAlpha = this.opacity
        this.shape.draw(context)
    }
}

class StatsWheelRenderer {

    stats1 : StatWheel
    stats2 : StatWheel 


    constructor(data1 : Record<string, number>, data2 : Record<string, number>) {

        const [points1, points2] = transformDataToPoints(Math.min(w, h) / rFactor, data1, data2)
        this.stats1 = new StatWheel(points1, opacity1, color1)
        this.stats2 = new StatWheel(points2, opacity2, color2)
    }

    draw(context : CanvasRenderingContext2D) {
        this.stats1.draw(context)
        this.stats2.draw(context)
    }
}