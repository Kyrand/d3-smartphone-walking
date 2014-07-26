/* global d3, _, kcharts */
"use strict";

var DEFAULT_CHART_WIDTH = 400,
DEFAULT_CHART_HEIGHT = 400;

var getChart = function(_data, xCol, yCol, range){
    range = typeof range !== 'undefined'? range: getMaxRange(_data);

    var data = _data.map(function(d) {
            return d.slice(range[0], range[1]).map(function(d) {
                return {'x': +d[xCol], 'y':+d[yCol]};
            });
    }),

    chart = new kcharts.Simple2D();
    // extentsX = _.zip(data.forEach(function(d){return kcharts.getDataExtent(d, 'x');})),
    // extentsY = _.zip(data.forEach(function(d){return kcharts.getDataExtent(d, 'y');})),
    
    chart
        .data(data)
        .xDomain(kcharts.getDataExtent(_.flatten(data), 'x'))
        .yDomain(kcharts.getDataExtent(_.flatten(data), 'y'))
        .xLabel('acc. ' + xCol)
        .yLabel('acc. ' + yCol)
        .showLinePathFlag(false)
        .showHeatmapFlag(true)
        .width(DEFAULT_CHART_WIDTH)
        .height(DEFAULT_CHART_HEIGHT)
    ;
    return chart;
};

var getMaxRange = function(datas){
    var ls = datas.map(function(d) {
        return d.length;
    }),
    maxRange = d3.min(ls);
    return [0, maxRange];
};

var getTimeString = function(t) {
    var tS = Math.floor(t/1000),
    tMs = t/1000 - tS;
    return ('00' + tS).slice(-2) + ':' + tMs.toFixed(2).slice(2) + 's';
}

var DEFAULT_TAILLENGTH = 700,
DEFAULT_STEPSIZE_MS = 30;
var tripleStepper = function(data, axes, range, tailLength, stepSize) {
    axes = typeof axes !== 'undefined'? axes: [['z','x'], ['z', 'y'], ['x', 'y']];
    range = typeof range !== 'undefined'? range: getMaxRange(data);
    tailLength = typeof tailLength !== 'undefined'? tailLength: DEFAULT_TAILLENGTH;
    stepSize = typeof stepSize !== 'undefined'? stepSize: DEFAULT_STEPSIZE_MS;

    var charts = [];
    axes.forEach(function(axis) {
        var id = axis[0]+axis[1];
        charts.push({id: id, chart: getChart(data, axis[0], axis[1], range)});
        d3.select('#chart_' + id).append('svg:image')
            .attr('xlink:href', 'images/axis_' + id + '.png')
            .attr('width', 100)
            .attr('height', 100)
            .attr('x', DEFAULT_CHART_WIDTH - 100 - 30)
            .attr('y', 50)
        ;
    });
     
    var Stepper = function(stepSize, tailLength) {
        var time = 0;
        this.step = function() {
            charts.forEach(function(d) {
                d3.select("#chart_" + d.id).datum(d.chart.data().map(function(d){
                    return d.slice(d3.max([time-tailLength,0]), time+1);
                })).call(d.chart)
                ;
            });
            time = (range[0] + time + stepSize) % (range[1]);
            d3.select('#timer').html('Time: ' +  getTimeString(time * DEFAULT_STEPSIZE_MS));
        };
    };
    setInterval(new Stepper(4, tailLength).step, stepSize * 4);
    
};

var csvs = function(urls, databall, callback) {
    if(urls.length === 0){
        callback(null, databall);
        return;
    }
        
    var url = urls.shift();
    d3.csv(url, function(error, data) {
        databall.push(data);
        csvs(urls, databall, callback);
    });
};

// d3.csv('data_walking.csv', function(error, data) {
//     tripleStepper(data, [['x', 'y']]);
// });

csvs(['walking_data/1.csv', 'walking_data/2.csv', 'walking_data/3.csv'], [], function(error, data) {
    tripleStepper(data);
});
 
