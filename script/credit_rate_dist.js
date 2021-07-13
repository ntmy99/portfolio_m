var chartDom1 = document.getElementById('credit_rate_dist');
var myChart1 = echarts.init(chartDom1);
var option1;
option1 = {
        title: {
        text: 'Credit Rating Distribution',
        textStyle: {color:'#ffffff'}
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            
            type: 'shadow'        
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
        axisLabel: {color: '#ffffff'},
        nameTextStyle: {color:'#ffffff'}
    },
    yAxis: {
        type: 'value',
        axisLabel: {color: '#ffffff'}
    },
    series: [{
        data: [129, {
            value: 94,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
        {
            value: 227,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
        {
            value: 423,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
        {
            value: 311,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
        {
            value: 551,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
        {
            value: 727,
            itemStyle: {
                color: '#b6c1f5'
            }
        },
            568, 623, 715, 473, 159],
        type: 'bar',
        color: "#29438a"
    }]
};

option1 && myChart1.setOption(option1);