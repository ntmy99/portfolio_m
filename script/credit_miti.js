var chartDom2 = document.getElementById('credit_miti');
var myChart2 = echarts.init(chartDom2);
var option2;

option2 = {
    title: {
        text: 'Credit Mitigation',
        textStyle: {color:'#ffffff'}
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["01-Jan", "30-Jan", "1-Feb", "11-Feb", "28-Feb", "1-Mar", "11-Mar", "30-Mar", "1-Apr", "11-Apr", "30-Apr", "1-May", "11-May", "30-May", "1-Jun", "11-Jun", "30-Jun", "1-Jul"],
        axisLabel: {color: '#ffffff'}
    },
    yAxis: {
        type: 'value',
        axisLabel: {color: '#ffffff'}
    },
    series: [
               {
            name: 'pp1',
            color: "#36a2eb",
            type: 'line',
            data: [39,	39,	51,	66,	86,	95,	100]										

        },
               {
            name: 'pp2',
            color: "#36a2eb",
            type: 'line',
            data: [26,	26,	18,	18,	18,	24,	13,	13,	9,	9,	9,	6,	6, 6,	4,	4,	4,	0]
        },
               {
            name: 'pp3',
            type: 'line',
            color: "#36a2eb",
            data: [21,	21,	15,	15,	15,	10,	10,	10,	7,	7,	7,	5, 5,	5, 4,	4,	4,	0]
        },
               {
            name: 'pp4',
            color: "#36a2eb",
            type: 'line',
            
            data: [29,	29,	38,	49,	20,	14,	14,	14,	10,	10,	10,	7,	7,
7,	5,	5,	5,	0]
        },
               {
            name: 'pp5',
            type: 'line',
            color: "#36a2eb",
            data: [40,	40,	28,	28,	28,	20,	20,	20,	14,	14,	14,	10,	10, 0,	7,	7,	7,	0]
        },
        {
            name: 'pp6',
            type: 'line',
            color: "#36a2eb",
            data: [23,	23,	16,	16,	16,	21,	11,	11,	8,	8,	8,	6,	6, 6,	4,	4,	4,	0]
        },
        {
            name: 'pp7',
            type: 'line',
            color: "#36a2eb",
            data: [12,	12,	8,	8,	8,	6,	6,	6,	4,	4,	4,	3,	3, 3,	2,	2,	2,	0]
        },
        {
            name: 'pp8',
            type: 'line',
            color: "#36a2eb",
            data: [36,	36,	25,	25,	25,	18,	18,	18,	12,	12,	12,	9,	9, 9,	6,	6,	6,	0]
        },
        {
            name: 'pp9',
            type: 'line',
            color: "#36a2eb",
            data: [24,	24,	17,	17,	17,	12,	12,	12,	15,	8,	8,	6,	6, 6,	4,	4,	4,	0]
        },
        {
            name: 'pp10',
            type: 'line',
            color: "#36a2eb",
            data: [37,	37,	26,	26,	26,	18,	18,	18,	13,	13,	13,	9,	9, 9,	6,	6,	6,	0] 
        }
    ]
};

option2 && myChart2.setOption(option2);
