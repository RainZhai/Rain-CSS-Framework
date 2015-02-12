var mobile = window.mobile = {};
mobile.drawLineChart = function(obj) {
    var obj = util.merge({
        elementId: '#lineChart',
        tooltipId: '#tooltip',
        width: 320,
        height: 150,
        data: [],
        multi: false,
        duration: 100,
        delay: 100,
        xTicks: true, //x刻度
        xTickstransX: 10, //x轴线原点x坐标
        xTickstransY: 150, //x轴线原点y坐标
        xTickamt: 6,
        xTicksize: 5,
        xAxis: true, //x轴值
        xAxisfill: "#999",
        activexAxisFill: "#fff",
        xAxisamt: 6,
        xAxissize: -150,
        xflexline: false,
        xAxisformat: d3.time.format('%m月'),
        yTicks: true, //y刻度
        yTickamt: 6,
        yTicksize: 320,
        yAxis: true, //x轴值
        yAxisamt: 5,
        yAxissize: 5,
        radius: 2, //小圆点半径
        stroke: "#359be1", //线条颜色
        strokeWidth: 2,
        fill: "#359be1", //圆点填充颜色
        cycleActive: true, //当前点是否激活
        activeFill: "#fff", //当前圆点颜色
        marginWidth: 50, //折线图两边总间距
        area: false, //是否显示区域
        areafill: "none",
        tipIndex: 0, //提示框索引
        tipXDeviation: 0, //提示框偏差
        tipYDeviation: 0, //提示框偏差
        showcurval: true, //是否显示当前文本值
        showtip: true, //默认是否显示提示框
        showtext: true,
        showIndexCircle: false,
        tipCallback: function() {}
    }, obj);
    var parse = d3.time.format('%Y-%m-%d').parse;
    var data1 = obj.data;
    var data = obj.data.map(function(datum) {
        datum.date = parse(datum.date);
        return datum;
    });
    var width = obj.width || 320,
        height = obj.height || 150,
        margin = {
            top: 30,
            right: 10,
            left: 10
        },
        tooltipId = obj.tooltipId || "#tooltip",
        marginWidth = obj.marginWidth || 100,
        container = d3.select(obj.elementId),
        svg = container.select('svg').attr('width', width).attr('height', height + margin.top),
        xscale = d3.time.scale().range([0, width - marginWidth]).domain([data[0].date, data[data.length - 1].date]),
        yscale = d3.scale.linear().range([height, 22]).domain([0, d3.max(data, function(d) {
            return d.value;
        })]),

        //区域图
        area = d3.svg.area().interpolate('linear').x(function(d) {
            return xscale(d.date) + marginWidth / 2;
        }).y0(height).y1(function(d) {
            return yscale(d.value)
        }),
        //折线
        line = d3.svg.line().x(function(d) {
            return xscale(d.date) + marginWidth / 2;
        }).y(function(d) {
            return yscale(d.value);
        }).tension(0.1).interpolate("linear"),
        startData = data.map(function(datum) {
            return {
                date: datum.date,
                value: 0
            }
        }),
        circleContainer,
        textwrap;
    var o = {
        xscale: null,
        yscale: null,
        data: [],
        setData: function(d) {
            o.data = d;
        },
        getData: function() {
            return o.data;
        },
        init: function() {
            $(obj.elementId).find("g").remove();
            $(obj.elementId).find("path").remove();
            o.setData(data);
            if (obj.xTicks) {
                //x轴网格线
                var xAxisTicks = d3.svg.axis().scale(xscale).ticks(obj.xTickamt).tickSize(obj.xTicksize).tickFormat('');
                svg.append('g').attr('class', 'lineChart-xAxisTicks').attr('transform', 'translate(' + obj.xTickstransX + ',' + obj.xTickstransY + ')').call(xAxisTicks);
            }
            if (obj.xAxis) {
                //x轴下标
                var xAxis = d3.svg.axis().scale(xscale).ticks(obj.xAxisamt).tickSize(obj.xAxissize).tickFormat(obj.xAxisformat);
                svg.append('g').attr('class', 'lineChart-xAxis').attr('transform', 'translate(' + marginWidth / 2 + ',' + (height + 7) + ')').call(xAxis);
            }
            if (obj.yTicks) {
                //y轴网格线
                var yAxisTicks = d3.svg.axis().scale(yscale).ticks(obj.yTickamt).tickSize(obj.yTicksize).tickFormat('').orient('right');
                svg.append('g').attr('class', 'lineChart-yAxisTicks').call(yAxisTicks);
            } 
            o.drawMainChart();
        },
        drawMainChart: function() {
            //从左到右折线动画
            var pathani = svg.append('path').datum(startData).attr("stroke", obj.stroke).attr("stroke-width", obj.strokeWidth).transition().duration(obj.duration / 2)
                .delay(obj.duration / 2)
                .attr("d", function() {
                    return line(data);
                }).attr("stroke-dashoffset", "1000").attr("stroke-dasharray", "1000").attr("fill", "none")
                .each('end', function(d, i) {
                    o.drawEachObjects(data,{
                        fill:obj.fill,
                        stroke:obj.stroke,
                        radius: obj.radius,
                        activeFill: obj.activeFill,
                        showtext: obj.showtext,
                        tipIndex: obj.tipIndex,
                        showIndexCircle: obj.showIndexCircle,
                        callback: function(){
                            o.showTip(tooltipId,data, obj.tipIndex, obj.tipXDeviation, obj.tipYDeviation);
                        }
                    });
                    d3.select(this).attr('class', 'pathAnima');
                });

            if (obj.area) {
                svg.select("defs #graphs_clip_path rect").attr("x", xscale(data[0].date) + marginWidth / 2).attr("y", 0).attr("width", obj.width).attr("height", obj.height);
                var new_lines = svg.append('g').classed("area", true);
                //实现区域从左到右渐渐显示
                new_lines.append("clipPath").attr("class", "clippath").attr("id", "clip_pathtemp").append("rect").attr("x", xscale(data[0].date) + marginWidth / 2).attr("width", 0).attr("y", 0).attr("height", obj.height);
                new_lines.append("path").attr("fill", obj.areafill).style("clip-path", "url(#clip_pathtemp)").attr("d", function() {
                    return area(data);
                });
                var left_to_right_appear_transition = new_lines.transition().duration(1000).ease("linear");
                left_to_right_appear_transition.select(".clippath").remove().select("rect").attr("width", obj.width);
                left_to_right_appear_transition.select("path").each('end', function() {
                });
            }
        },
        drawChart: function(opt){
            var parse = d3.time.format('%Y-%m-%d').parse;
            var data = opt.data.map(function(datum) {
                datum.date = parse(datum.date);
                return datum;
            });
            svg.append('path').datum(startData).attr("stroke", opt.stroke).attr("stroke-width", opt.strokeWidth).transition().duration(obj.duration / 2)
            .delay(obj.duration / 2)
            .attr("d", function() {
                return line(data);
            }).attr("stroke-dashoffset", "1000").attr("stroke-dasharray", "1000").attr("fill", "none")
            .each('end', function(d, i) {
                o.drawEachObjects(data,{
                    fill: opt.fill,
                    stroke: opt.stroke,
                    radius: opt.radius,
                    activeFill: opt.activeFill,
                    showtext: opt.showtext,
                    showIndexCircle: opt.showIndexCircle,
                    tipIndex: opt.tipIndex,
                    callback: function(){
                        o.showTip(opt.tooltipId,data, opt.tipIndex, opt.tipXDeviation, opt.tipYDeviation);
                    }
                });
                d3.select(this).attr('class', 'pathAnima');
            });
            var new_lines = svg.append('g').classed("area", true);
            //实现区域从左到右渐渐显示
            new_lines.append("clipPath").attr("class", "clippath").attr("id", "clip_pathtemp").append("rect").attr("x", xscale(data[0].date) + marginWidth / 2).attr("width", 0).attr("y", 0).attr("height", obj.height);
            new_lines.append("path").attr("fill", opt.areafill).style("clip-path", "url(#clip_pathtemp)").attr("d", function() {
                return area(data);
            });
            var left_to_right_ani = new_lines.transition().duration(1000).ease("linear");
            left_to_right_ani.select(".clippath").remove().select("rect").attr("width", obj.width);
            left_to_right_ani.select("path").each('end', function() {
                
            });
        },
        drawEachObjects: function(data, opt) {
            circleContainer = svg.append('g').attr('class', 'lineChart-circlewrap');
            textwrap = svg.append("g").attr("class", "lineChart-text").attr("transform", "translate(" + marginWidth / 2 + "," + height / 2 + ")");
            data.forEach(function(datum, index) {                
                if(opt.showIndexCircle){
                    if( index=== opt.tipIndex ) o.drawCircle(circleContainer, datum, index,opt);
                    if( index === (data.length-1) ) o.drawCircle(circleContainer, datum, index,opt);
                }else{
                    o.drawCircle(circleContainer, datum, index,opt);
                }
                if( opt.showtext )o.drawText(textwrap, datum, index);
            })
        },
        drawCircle: function(container, datum, index, opt) {
            container.datum(datum).append('circle').attr('class', 'lineChart-circle').attr('r', 0).attr('fill', opt.fill).attr("stroke", opt.stroke)
                .attr('cx', function(d) {
                    return xscale(d.date) + marginWidth / 2
                })
                .attr('cy', function(d) {
                    return yscale(d.value)
                })
                .transition().delay(obj.duration / 20 * index).attr('r', opt.radius).each('end', function(d, i) {
                    //设置默认圆点样式
                    if (obj.cycleActive && index === data.length - 1) {
                        o.setCircleStyle(obj.tipIndex, {
                            "fill": opt.fill
                        }, {
                            "fill": opt.activeFill
                        });
                    }
                    //显示提示框
                    if (obj.showtip && index === data.length - 1) {
                        //o.initTip();
                        opt.callback();
                    }
                });
        },
        drawText: function(container, datum, index) {
                container.datum(datum).append('text')
                    .attr("display", function() {
                        if (index === obj.tipIndex && !obj.showcurval) {
                            return 'none';
                        }
                    })
                    .text(function(d, i) {
                        return d.value;
                    }).attr('fill', obj.xAxisfill).attr("font-size", "10px").attr("text-anchor", "middle").attr("opacity", "0")
                    .attr("y", function(d, i) {
                        return yscale(d.value) - height / 2 - 12;
                    })
                    .attr("x", function(d, i) {
                        return xscale(d.date);
                    })
                    .transition().duration(obj.duration / 2).delay(obj.duration / 10 * index).attr("opacity", "1")
        },
        //初始化气泡
        initTip: function() {
            o.showTip(tooltipId,data, obj.tipIndex, obj.tipXDeviation, obj.tipYDeviation);
            o.setHighlightText(obj.tipIndex, {
                "fill": obj.xAxisfill
            }, {
                "fill": obj.activexAxisFill
            });
        },
        showTip: function(id, data, i, xoffset, yoffset) {
            var tooltipId = id;
            if (i >= data.length) {
                i = data.length - 1;
            }
            if (i < 0) {
                i = 0;
            }
            var p = xoffset,
                q = yoffset; 
            var xPosition = xscale(data[i].date) + p;
            var yPosition = yscale(data[i].value) + q;
            d3.select(tooltipId).classed("hide", false);
            d3.select(tooltipId).select(".j_value").text(data[i].value);
            d3.select(tooltipId).style("opacity", 0)
                .style("left", xPosition + "px")
                .style("top", yPosition+ 60 + "px")
                .style("transform", "scale(0.1,0.1)")
                .transition().duration(obj.duration/3)
                .style("transform", "scale(1,1)")
                .style("top", yPosition + "px")
                .style("opacity", 1);
            obj.tipCallback();
        },
        //对单个小圆点设置样式
        setCircleStyle: function(i, old, css) {
            $(obj.elementId).find("svg").find(".lineChart-circle").css(old);
            $(obj.elementId).find("svg").find(".lineChart-circle").eq(i).css(css);
        },
        //对x轴文本设置样式
        setHighlightText: function(i, old, css) {
            $(obj.elementId).find("svg").find(".lineChart-xAxis").find(".tick").find("text").css(old);
            $(obj.elementId).find("svg").find(".lineChart-xAxis").find(".tick").find("text").eq(i).css(css);
        },
        hideTip: function(data) {
            d3.select(tooltipId).classed("hide", true);
        },
        initText: function() {
            var textwrap = svg.append("g").attr("class", "lineChart-text").attr("transform", "translate(" + marginWidth / 2 + "," + height / 2 + ")");
            //数值  
            textwrap.selectAll("text").data(data1).enter().append("text")
                .text(function(d, i) {
                    if (i === obj.tipIndex && !obj.showcurval) {
                        return '';
                    }
                    return d.value;
                })
                .attr("text-anchor", "middle")
                .attr("x", function(d, i) {
                    return xscale(d.date);
                })
                .attr("font-size", "10px")
                .attr("fill", obj.xAxisfill)
                .attr("y", function(d, i) {
                    return yscale(d.value) + 100;
                });
            //数值  
            textwrap.selectAll("text").data(data1)
                .transition()
                .delay(function(d, i) {
                    return i / data1.length * 1000;
                })
                .duration(obj.duration)
            /*.ease("elastic")*/
            .attr("y", function(d) {
                return yscale(d.value) - height / 2 - 12;
            });

        },
        initFlexline: function() {
            if (obj.xflexline) {
                var dashlinewrap = svg.append("g").attr("class", "lineChart-dash").attr("transform", "translate(" + marginWidth / 2 + "," + height / 2 + ")");
                dashlinewrap.selectAll("line").data(data1).enter().append("line")
                    .attr("x1", function(d, i) {
                        return xscale(d.date);
                    })
                    .attr("x2", function(d, i) {
                        return xscale(d.date);
                    })
                    .attr("y1", function(d, i) {
                        return height / 2;
                    })
                    .attr("y2", function(d, i) {
                        return yscale(d.value) - height / 2;
                    })
                    .attr("stroke-dasharray", "2,1")
                    .attr("stroke", "#4d4c53")
                    .attr("stroke-width", "1px");
            }
        },
        tween: function(b, callback) {
            return function(a) {
                var i = d3.interpolateArray(a, b);
                return function(t) {
                    return callback(i(t))
                }
            }
        },
        getInterpolation: function() {
            var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, data.length + 1));
            return function(t) {
                var interpolatedLine = data.slice(0, interpolate(t));
                return line(interpolatedLine);
            }
        },
        getSmoothInterpolation: function(data) {
            return function(d, i, a) {
                var interpolate = d3.scale.linear().domain([0, 1]).range([1, data.length + 1]);
                return function(t) {
                    var flooredX = Math.floor(interpolate(t));
                    var weight = interpolate(t) - flooredX;
                    var interpolatedLine = data.slice(0, flooredX);
                    log(flooredX, weight, interpolatedLine);
                    if (flooredX > 0 && flooredX < 31) {
                        var weightedLineAverage = yscale(data[flooredX].value) * weight + yscale(data[flooredX - 1].value) * (1 - weight);
                        log(weightedLineAverage);
                        interpolatedLine.push({
                            "x": interpolate(t) - 1,
                            "y": weightedLineAverage
                        });
                    }
                    return line(interpolatedLine);
                }
            }
        }
    };
    o.init();
    //o.initText();
    o.initFlexline();
/*    o.drawChart({
        data: data1,
        stroke: obj.stroke,
        strokeWidth: obj.strokeWidth,
        areafill: obj.areafill,
        fill: obj.fill,
        radius: obj.radius,
        activeFill: obj.activeFill
    });*/
    return o;
}