var map = new maptalks.Map('bad_debt_distribution', {
    center: [105.844960, 20.997763],
    zoom: 13.8,
    layerSwitcherControl: {
        'position': 'top-right',
        // title of base layers
        'baseTitle': 'Base Layers',
        // title of layers
        'overlayTitle': 'Layers',
        // layers you don't want to manage with layer switcher
        'excludeLayers': [],
        // css class of container element, maptalks-layer-switcher by default
        'containerClass': 'maptalks-layer-switcher'
    },
    baseLayer: new maptalks.GroupTileLayer('Base TileLayer', [
        new maptalks.TileLayer('Carto dark', {
            'urlTemplate': 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'subdomains': ['a', 'b', 'c', 'd']
        }),
        new maptalks.TileLayer('Carto light', {
            'visible': false,
            'urlTemplate': 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            'subdomains': ['a', 'b', 'c', 'd']
        }),
    ]),
    // maxZoom: 18,
    pitch: 50,
});


const deckglLayer = new maptalks.DeckGLLayer('Point', {});
const deckglLayer2 = new maptalks.DeckGLLayer('Connect1', {});
const deckglLayer3 = new maptalks.DeckGLLayer('Connect2', {});
map.addLayer(deckglLayer);
map.addLayer(deckglLayer2);
map.addLayer(deckglLayer3);
//const COLOR_RANGE = ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"];
// const COLOR_RANGE = ["#0ea1ff","#00f6ff","#10d815","#ebff07","#ff8400","#ff0004"];
const COLOR_RANGE = ['blue', 'orange'];
function updateTooltip({ x, y, object }) {
    let tooltip = document.getElementById('tooltip');

    if (object) {
        tooltip.style.top = `${y}px`;
        tooltip.style.left = `${x}px`;
        tooltip.innerHTML = `
<div><b>Customer: &nbsp;${object[0]}</b></div>
<div><b>Latitude: &nbsp;${object[1]}</b></div>
<div><b>Longtitude: &nbsp;${object[2]}</b></div>
<div><b>Risk Score: &nbsp;${object[3]}</b></div>
`;
    } else {
        tooltip.innerHTML = '';
    }
}

addScatterplotLayer();

function addScatterplotLayer() {
    //
    let max = 0;
    let min = 999999999999;
    for (let i = 0; i < dataGeo.length; i++) {
        const element = dataGeo[i];
        if (max < element[3]) {
            max = element[3]
        }
        if (min > element[3]) {
            min = element[3]
        }
    }
    console.log(min, max);
    //
    const scale = d3.scaleLinear()
        .domain([min, 10000])
        .range(COLOR_RANGE);

    const scatterplotLayer = {
        layerType: 'ScatterplotLayer',
        id: 'heatmap',
        colorRange: COLOR_RANGE,
        data: dataGeo,
        // elevationRange: [0, 1000],
        // elevationScale: 250,
        // extruded: true,
        pickable: true,
        getPosition: d => [d[1], d[2]],
        onHover: updateTooltip,
        // lightSettings: LIGHT_SETTINGS,
        opacity: 1,
        radiusScale: 10,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,
        getColor: function (d) {
            let color = scale(Math.ceil(d[3])).split(",");
            let data = [color[0].split('rgb(')[1].trim() * 1, color[1].trim() * 1, color[2].split(')')[0].trim() * 1];
            return data;
        },

    };


    if (!dataConnect) {
        dataConnect = [];
    }
    const LIGHT_SETTINGS = {
        lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
        ambientRatio: 0.05,
        diffuseRatio: 0.6,
        specularRatio: 0.8,
        lightsStrength: [2.0, 0.0, 0.0, 0.0],
        numberOfLights: 2
    };
    const arcLayer2 = {

        getColor: d => [246, 255, 0],
        getStrokeWidth: 1,
        pickable: true,
        layerType: 'ArcLayer',
        id: 'arc',
        //onHover: updateTooltip2,
        data: dataConnect,
        getSourcePosition: function (d) {
            let data = dataGeo.filter(x => x[0] == d[0])[0];
            return [data[1], data[2]];
        },
        getTargetPosition: function (d) {
            let data = dataGeo.filter(x => x[0] == d[1])[0];
            return [data[1], data[2]];
        },
        getSourceColor: d => [246, 255, 0],
        getTargetColor: d => [246, 255, 0],
        strokeWidth: 10
    };
    const arcLayer3 = {
        layerType: 'LineLayer',
        // id: 'flight-paths',
        // data: d,
        // fp64: false,
        // getSourcePosition: d => d.start,
        // getTargetPosition: d => d.end,
        getColor: d => [246, 255, 0],
        getStrokeWidth: 1,
        pickable: true,
        // layerType: 'ArcLayer',
        id: 'arc',
        //onHover: updateTooltip2,
        data: dataConnect,
        getSourcePosition: function (d) {
            let data = dataGeo.filter(x => x[0] == d[0])[0];
            return [data[1], data[2]];
        },
        getTargetPosition: function (d) {
            let data = dataGeo.filter(x => x[0] == d[1])[0];
            return [data[1], data[2]];
        },
        getSourceColor: d => [246, 255, 0],
        getTargetColor: d => [246, 255, 0],
        strokeWidth: 10

        // layerType: 'PathLayer',
        // id: 'line-layer1',
        // data: [[-73.995914, 40.732847], [-73.9990143, 40.7341472]],
        // pickable: true,
        // widthScale: 1,
        // widthMinPixels: 2,
        // getPath: d => function (d) {

        //     return d;
        //     // debugger
        //     // let data = dataGeo.filter(x => x[0] == d[0])[0];
        //     // let data1 = dataGeo.filter(x => x[0] == d[1])[0];
        //     // return [[data[1], data[2]], [data1[1], data1[2]]];
        // },
        // getWidth: d => 3,
        // opacity: 0.3,
        // // lightSettings: LIGHT_SETTINGS,
        // getColor: d => [246, 255, 0],
    };
    // function updateTooltip2({ x, y, object }) {
    //     let tooltip = document.getElementById('tooltip');

    //     if (object) {
    //         tooltip.style.top = `${y}px`;
    //         tooltip.style.left = `${x}px`;
    //         tooltip.innerHTML = `
    //         <div><b>Connect customer &nbsp;${object[0]} and customer &nbsp;${object[1]}</b></div>
    // `;
    //     } else {
    //         tooltip.innerHTML = '';
    //     }
    // }



    deckglLayer.setProps({
        layers: [scatterplotLayer]
    });
    deckglLayer2.setProps({
        layers: [arcLayer2]
    });

    deckglLayer3.setProps({
        layers: [arcLayer3]
    });
}

$(document).ready(function (e) {

    $("#myRange").change(function () {
        var newval = $(this).val();
        deckglLayer.setProps({
            layers: [{
                layerType: 'ScatterplotLayer',
                id: 'heatmap',
                colorRange: COLOR_RANGE,
                data: dataGeo,
                // elevationRange: [0, 1000],
                // elevationScale: 250,
                // extruded: true,
                pickable: true,
                getPosition: d => [d[1], d[2]],
                onHover: updateTooltip,
                // lightSettings: LIGHT_SETTINGS,
                opacity: 1,
                radiusScale: newval * 1,
                radiusMinPixels: 2,
                radiusMaxPixels: 100,
                getColor: function (d) {
                    let color = scale(Math.ceil(d[3] * 100)).split(",");
                    let data = [color[0].split('rgb(')[1].trim() * 1, color[1].trim() * 1, color[2].split(')')[0].trim() * 1];
                    return data;
                },

            }]
        });
    });

});