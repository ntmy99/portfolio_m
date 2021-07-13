var chartDom4 = document.getElementById('master_scale');
var myChart4 = echarts.init(chartDom4);
var option4;

option4 = {
    title: {
    text: 'The Master Scale',
    textStyle: {color:'#ffffff'}
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
        axisLabel: {color: '#ffffff'}
    },
    yAxis: {
        type: 'value',
        axisLabel: {color: '#ffffff'}

    },
    series: [
        {
            z: -1, 
            data: [4, 5.36, 7.18, 9.62, 12.89, 17.28, 23.15,31.02, 41.56, 55.69, 74.62, 99.99],
            type: 'line',
            itemStyle: {color: '#777779'} ,
            areaStyle: {}
        },
        {   
            z: -1,
            data: [0.01, 4.01, 5.37, 7.19, 9.63, 12.9, 17.29, 23.16, 31.03, 41.57, 55.7, 74.63],
            type: 'line',
            itemStyle: {color: '#777779'} ,
            areaStyle: {
                color: '#292929', // color of the background
                opacity: 1, // <--- to make the master scale looks exactly like in the excel chart, make it transparent
            },
        }
    ]
}

option4 && myChart4.setOption(option4);
