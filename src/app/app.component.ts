import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as d3 from "d3";
declare var require:any;
var dc = require('dc');
var crossfilter = require('crossfilter2');
const universe = require('universe');
const morley = require('../assets/morley.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ "../../node_modules/dc/dc.min.css",'./app.component.css' ],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements AfterViewInit {
  @ViewChild("testacular") testacular;
  constructor(){
    console.log("constructor ran");
  }

  theUniverse: any = null;
  universeLoaded: boolean = false;

  // Bar charts variables
  countyBarChartScaleX: any;
  countyDomain: number[] = [1,2,3,4,5];
  barChartRenderlet: any = function(chart) {
      chart.selectAll('rect')
          .on("click", function(d) {
              chart.filter(d.data.key).redrawGroup()
          })
          .on("dbclick", function(d) {
              chart.filter(d.data.key).redrawGroup()
          })
  }
  speedAvgValue = 'value.speed.avg'

  ngAfterViewInit(){
    console.log("onInit ran");
    var chart = dc.barChart(this.testacular.nativeElement);
    d3.csv("assets/morley.csv", function(error, experiments) {

        experiments.forEach(function(x) {
            x.Speed = +x.Speed;
        });

        var ndx                 = crossfilter(experiments),
            runDimension        = ndx.dimension(function(d) {return +d.Run;}),
            speedSumGroup       = runDimension.group().reduce(function(p, v) {
                p[v.Expt] = (p[v.Expt] || 0) + v.Speed;
                return p;
            }, function(p, v) {
                p[v.Expt] = (p[v.Expt] || 0) - v.Speed;
                return p;
            }, function() {
                return {};
            });

        function sel_stack(i) {
            return function(d) {
                return d.value[i];
            };
        }

        chart
            .width(768)
            .height(480)
            .x(d3.scale.linear().domain([0,21]))
            .margins({left: 50, top: 10, right: 10, bottom: 20})
            .brushOn(false)
            .clipPadding(10)
            .title(function(d) {
                return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
            })
            .yAxisLabel("This is the Y Axis!")
            .renderType('group')
            .centerBar(true)
            .dimension(runDimension)
            .group(speedSumGroup, "1", sel_stack('1'));

        for(var i = 2; i<6; ++i)
            chart.stack(speedSumGroup, ''+i, sel_stack(i));
        chart.render();

    });

    this.theUniverse = universe(morley);
    this.theUniverse.then((u) => {
      this.countyBarChartScaleX = d3.scale.ordinal().domain(this.countyDomain);       
      this.universeLoaded = true;
    })
  }
}
