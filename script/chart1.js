    $(document).ready(function (e) {
            var chart = echarts.init(document.getElementById('main1'), "dark");
            var data0 = [];
            var data1 = [];
            for (let i = 0; i < chart1a.length; i++) {
                try {
                    const element = chart1a[i];
                    if (element.Type === 0) {
                        data0.push([element.x, element.y, element.Type, element['Loan ID'], element['Loan Amount'], element['APR'], element['PD (annual)']])
                    } else if (element.Type === 1) {
                        data1.push([element.x, element.y, element.Type, element['Loan ID'], element['Loan Amount'], element['APR'], element['PD (annual)']])
                    }
                }
                catch (error) {

                }
                if (data0.length + data1.length > 10000) {
                    break;
                }
            }
            var data3 = [];
            for (let i = 0; i < chart1b.length; i++) {
                try {
                    const element = chart1b[i];
                    data3.push([element.x, element.y]);
                } catch (error) {
                }
            }
            chart.setOption({
                title: {
                    text: 'Risk Pricing Map'
                },


                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',

                brush: {
                    seriesIndex: [0, 1],
                    throttleType: 'debounce',
                    throttleDelay: 1000,
                },
                toolbox: {
                    top: 50,
                    // right: 20,
                    feature: {
                        brush: {
                            type: ['rect', 'polygon','keep', 'clear'],
                            title: {
                                rect: 'Box Select',
                                polygon: 'Lasso Select',
                                keep: "Multiple Select",
                                clear: 'Clear Selections'
                            }
                        },
                    }
                },
                // brush: {
                //     // xAxisIndex: 'all',
                //     // brushLink: 'all'
                // },
                legend: {
                    data: ['Type 0', 'Type 1']
                },
                tooltip: {
                    position: function (p) {
                        return [100, 100];
                    },
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.seriesName !== 'line')
                            return `${params.seriesName} <br/>Loan ID: ${params.value[3]}<br/>Loan Amount:	${params.value[4]}<br/>APR:	${((params.value[5]) * 100).toFixed(2) + '%'}<br/>PD (annual):  ${((params.value[6]) * 100).toFixed(2) + '%'}`;
                    }
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    name: 'Credit Rating',
                    splitNumber: 10
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    name: 'APR',
                },
                series: [{
                    name: 'Type 0',
                    type: 'scatter',
                    symbolSize: 3,
                    data: data0,
                    color: '#305496'
                }, {
                    name: 'Type 1',
                    type: 'scatter',
                    symbolSize: 3,
                    data: data1,
                    color: '#ED7D31'
                }, {
                    name: 'line',
                    data: data3,
                    color: "#8EA9DB",
                    type: 'line',
                    smooth: true
                }]
            });
            chart.on('brushSelected', renderBrushed);
            function renderBrushed(params) {
                var brushComponent = params.batch[0];
                let dataTable = [];
                if (brushComponent.areas && brushComponent.areas.length > 0 && brushComponent.selected && brushComponent.selected.length > 1) {
                    let seriesIndex = brushComponent.selected[0].seriesIndex;
                    for (let i = 0; i < brushComponent.selected.length; i++) {
                        let selected = brushComponent.selected[i];
                        if (selected.seriesIndex === 0) {
                            for (let j = 0; j < selected.dataIndex.length; j++) {
                                const element = data0[selected.dataIndex[j]];
                                dataTable.push({
                                    type: 0,
                                    'id': element[3],
                                    'amount': element[4],
                                    'APR': element[5],
                                    'PD': element[6],
                                });
                            }
                        } else if (selected.seriesIndex === 1) {
                            for (let j = 0; j < selected.dataIndex.length; j++) {
                                const element = data1[selected.dataIndex[j]];
                                dataTable.push({
                                    type: 1,
                                    'id': element[3],
                                    'amount': element[4],
                                    'APR': element[5],
                                    'PD': element[6],
                                });
                            }
                        }
                    }
                    let tableString = [''];
                    dataTable = dataTable.sort((a, b) => a.id - b.id);
                    for (let i = 0; i < dataTable.length; i++) {
                        const element = dataTable[i];
                        tableString.push(`<tr><th>` + element.id + `</th><td>` + element.type + `</td><td>` + element.amount + `</td><td>` + element.APR + `</td><td>` + element.PD + `</td></tr>`);
                    }
                    $('#insite_tr').html(tableString.join(" "));
                    $("#centralModalFluidSuccessDemo").modal();
                }

            }
        });
