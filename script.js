import SqweedChart from './SqweedChart.js'

const options = {
    type: 'bar',
    background: 'white',
    text: 'black',
    border: 'none'
}

const chartData = [
    { name: 'one', value: 10, color: 'green' },
    { name: 'two', color: 'rgba(255,0,0,1)' },
    { value: 50, color: 'blue' },
    { name: 'four', value: 25 },
    { value: 22}
]

const chart = new SqweedChart('echart', options, chartData)