export default class SqweedChart {
    constructor(container, options, data) {
        this.options = options
        this.data = data
        this.container = document.getElementById(container)
        this.drawChart()
    }

    drawChart() {
        if (typeof this[this.options.type + 'Chart'] === 'function') {
            this[this.options.type + 'Chart']()
        } else {
            this.barChart()
        }
    }

    barChart() {
        const elWidth = 80 / this.data.length
        const maxValue = Math.max(...this.data.map(el => el.value || 0))
        const percent = maxValue / 80
        const elements = this.data.map((el, elIndex) => {
            const elHeight = (el.value || 0) / percent
            const xPos = 10 + elWidth * elIndex
            const yPos = 90 - elHeight
            const textPos = xPos + elWidth / 2
            return `<rect class="chart-bar" x="${xPos}%" y="${yPos}%" width="${elWidth}%" height="${elHeight}%" fill="${el.color || this.getRandomColor()}" />           
            <text class="chart-text" x="${textPos}%" y="95%" text-anchor="middle">${el.name || "item" + elIndex}: ${el.value || 0}</text>`
        }).join('')
        this.container.innerHTML = `<svg class="chart-wrapper">
            ${this.buildYLines(maxValue)}               
            ${elements}
            <style>
                .chart-wrapper {
                    width: 100%;
                    height: 100%;
                    border: ${this.options.border || 'none'};
                    background: ${this.options.background || 'white'};               
                }
                .chart-text {
                    fill: ${this.options.text || 'black'};
                }
                .chart-line {
                    stroke: ${this.options.text || 'black'};
                }
                .chart-bar {
                    animation: render .5s;
                }
                @keyframes render {
                    0% {
                        height: 0%;
                        y: 90%;
                    }
                }
            </style>
        </svg>`
    }

    lineChart() {
        const elWidth = 80 / this.data.length
        const maxValue = Math.max(...this.data.map(el => el.value || 0))
        const percent = maxValue / 80
        const elements = this.data.map((el, elIndex) => {
            const elHeight = (el.value || 0) / percent
            const xPos = 20 + elWidth * elIndex
            const yPos = 90 - elHeight
            switch (elIndex) {
                case 0: return `<text class="chart-text" x="${xPos}%" y="95%" text-anchor="middle">${el.name || "item" + elIndex}: ${el.value || 0}</text>
                <line class="chart-adition-line" x1=${xPos}% y1=${yPos}% x2=${xPos}% y2=90% />
                <line class="chart-main-line" x1=${xPos}% y1=${yPos}%`
                case this.data.length - 1: return ` x2=${xPos}% y2=${yPos}% stroke="black" />
                <text class="chart-text" x="${xPos}%" y="95%" text-anchor="middle">${el.name || "item" + elIndex}: ${el.value || 0}</text>
                <line class="chart-adition-line" x1=${xPos}% y1=${yPos}% x2=${xPos}% y2=90% />`
                default: return ` x2=${xPos}% y2=${yPos}% stroke="black" />
                <text class="chart-text" x="${xPos}%" y="95%" text-anchor="middle">${el.name || "item" + elIndex}: ${el.value || 0}</text>
                <line class="chart-adition-line" x1=${xPos}% y1=${yPos}% x2=${xPos}% y2=90% />
                <line class="chart-main-line" x1=${xPos}% y1=${yPos}%`
            }
        }).join('')
        this.container.innerHTML = `<svg class="chart-wrapper">
            ${this.buildYLines(maxValue)}               
            ${elements}
            <style>
                .chart-wrapper {
                    width: 100%;
                    height: 100%;
                    border: ${this.options.border || 'none'};
                    background: ${this.options.background || 'white'};               
                }
                .chart-text {
                    fill: ${this.options.text || 'black'};
                }
                .chart-line {
                    stroke: ${this.options.text || 'black'};
                }
                .chart-main-line {
                    stroke-width: 4;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                    animation: render 1s;
                }
                .chart-adition-line {
                    stroke: black;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                    animation: render 1s;
                }
                @keyframes render {
                    0% {
                        stroke-dashoffset: 1000;
                    }
                }
            </style>
        </svg>`
    }

    ringChart() {
        const totalValues = this.data.reduce((result, el) => result + (el.value || 0), 0)
        const percent = totalValues / 360
        let offset = 0
        const elements = this.data.map((el, elIndex) => {
            if (el.value) {
                const color = el.color || this.getRandomColor()
                const angle = (el.value) / percent
                const circle = `<circle class="chart-ring" r="57.3" cx="50%" cy="50%"  stroke="${color}" stroke-dasharray="${angle} 360" stroke-dashoffset="-${offset}" />          
                <text class="chart-text" x="${50 + 27 * Math.cos((offset + angle / 2) * Math.PI / 180)}%" y="${50 + 27 * Math.sin((offset + angle / 2) * Math.PI / 180)}%">${el.name || "item" + elIndex}: ${el.value}</text> `
                offset += angle
                return circle
            }
        }).join('')
        this.container.innerHTML = `<svg class="chart-wrapper" viewbox="0 0 200 200">           
            ${elements}          
            <style>
                .chart-wrapper {
                    width: 100%;
                    height: 100%;
                    border: ${this.options.border || 'none'};
                    background: ${this.options.background || 'white'};              
                }
                .chart-text {
                    font-size: 10px; 
                    text-anchor: middle; 
                    fill: ${this.options.text || 'black'};
                }
                .chart-ring {
                    fill: none; 
                    stroke-width: 40;
                    animation: render .5s;
                }
                @keyframes render {
                    0% {
                    stroke-dasharray: 0 360;
                    }
                }
            </style>
        </svg>`
    }

    getRandomColor() {
        return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }

    buildYLines(maxValue) {
        let result =''
        for (let i = 0; i <= 5; i++) {
            result += `<text class="chart-text" x="5%" y="${95 - 20 * i}%">${maxValue * i * 0.25}</text>
            <line class="chart-line" x1="5%" x2="90%" y1="${90 - 20 * i}%" y2="${90 - 20 * i}%" />`
        }
        return result
    }
}