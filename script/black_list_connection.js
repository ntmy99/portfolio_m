var pointSize = 20;
        var webkitDep = {
            "type": "force",
            "categories": [
                {
                    "name": "No BlackList",
                    "keyword": {},
                    // "base": "1"
                },
                {
                    "name": "BlackList",
                    "keyword": {},
                    // "base": "6"
                }
            ], "nodes": [], "links": []
        };
        //Customer ID,BlackList,Call to ID 1,Call to ID 2,Call to ID 3
        let makecategories = 0;
        for (let i = 0; i < black_list_connection.length; i++) {
            let element = black_list_connection[i];
            if (makecategories === 2) {
                break;
            }
            if (!webkitDep.categories.base && element.BlackList === 0) {
                webkitDep.categories[0].base = element['Customer ID'].toString();
                makecategories++;
            } else if (!webkitDep.categories.base && element.BlackList === 1) {
                webkitDep.categories[1].base = element['Customer ID'].toString();
                makecategories++;
            }
        }
        for (let i = 0; i < black_list_connection.length; i++) {
            let element = black_list_connection[i];
            if (element['Customer ID']) {
                webkitDep.nodes.push({
                    "name": element['Customer ID'].toString(),
                    "category": element.BlackList,
                    "index": i,
                    "value": 1
                });
            }

        }

        for (let i = 0; i < black_list_connection.length; i++) {
            let element = black_list_connection[i];
            if (element['Customer ID']) {
                try {
                    webkitDep.links.push(
                        {
                            "source": i,
                            "target": webkitDep.nodes.findIndex(x => x.name == element['Call to ID 1'].toString()) > -1 ? webkitDep.nodes.findIndex(x => x.name == element['Call to ID 1'].toString()) : 99999
                        });
                } catch (error) {

                }
                try {
                    webkitDep.links.push(
                        {
                            "source": i,
                            "target": webkitDep.nodes.findIndex(x => x.name == element['Call to ID 2'].toString()) > -1 ? webkitDep.nodes.findIndex(x => x.name == element['Call to ID 2'].toString()) : 99999
                        });
                } catch (error) {

                } try {
                    webkitDep.links.push(
                        {
                            "source": i,
                            "target": webkitDep.nodes.findIndex(x => x.name == element['Call to ID 3'].toString()) > -1 ? webkitDep.nodes.findIndex(x => x.name == element['Call to ID 3'].toString()) : 99999
                        });
                } catch (error) {

                }
            }
        }

        var chart = echarts.init(document.getElementById('black_list_connection'));

        chart.setOption({
            legend: {
                data: ['No BlackList', 'BlackList']
            }, tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                layout: 'force',
                draggable: true,
                data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                force: {
                    edgeLength: 10,
                    repulsion: 50,
                    gravity: 0.1
                },
                symbolSize: pointSize,
                edges: webkitDep.links,
                focusNodeAdjacency: false,
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    lineStyle: {
                        width: 1
                    }
                }
            }]
        });