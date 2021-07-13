
var chartDom3 = document.getElementById('default_dist');
var myChart3 = echarts.init(chartDom3);
var option3;

option3 = {
    
    tooltip: {
        trigger: 'axis',
        axisPointer: {            
            type: 'shadow'        
        }
    },
    title: {
        text: 'Default Distribution',
        textStyle: {color: '#ffffff'}
        },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            name: "Time at Default",
        data: ['1', '2', '3', '4', '5', '6'],
        axisTick: false,
        axisLabel: {color: '#ffffff'},
        nameTextStyle: {color:'#ffffff'} 
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: "Bad Loan",
            axisLabel: {color:'#ffffff'},
            nameTextStyle: {color:'#ffffff'}
                }
    ],
    series: [
        {
            name: "",
            type: 'bar',
            barWidth: '60%',
            data: [165, 87, 31, 24, 15, 1],
            color: "#29438a",
        },    

    ]
};

option3 && myChart3.setOption(option3);
