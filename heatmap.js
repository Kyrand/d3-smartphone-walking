/* globals d3, $ */
/* global $, _  */
(function(kcharts, $, _) {
    'use strict';

    kcharts.HeatMap = function() {
        var radius = 0.05,
        COLS = ['red', 'green', 'blue'],

        heatmap = function(selection) {
            selection.each(function(data) {
                var cs, chartArea = d3.select(this).select('g.chart-area'),
                hmap = chartArea.selectAll('.heatmap').data(data);
                hmap.enter().append('g').attr('class', 'heatmap').attr('fill', heatmap.colors);
                cs = hmap.selectAll('circle').data(function(d) {
                    return d;
                });
                cs.enter().append('circle');
                cs.exit().remove();
                cs.attr('cx', function(d) {
                    return parseInt(heatmap.x(d.x), 10);
                    })
                    .attr('cy', function(d) {
                        return parseInt(heatmap.y(d.y),10);
                    })
                    .attr('r', radius * parseInt(chartArea.attr('width'), 10))
                ;
            });
        };
 
        heatmap.xScale = function(scale) {
            heatmap.x = scale;
            return heatmap;
        };
        heatmap.yScale = function(scale) {
            heatmap.y = scale;
            return heatmap;
        };
        heatmap.radius = function(r) {
            radius = r;
            return this;
        };
        
        heatmap.colors = function(d, i) {
            return COLS[i%COLS.length];
        };
            
        return heatmap;
    };
}(window.kcharts = window.kcharts || {}, $));
