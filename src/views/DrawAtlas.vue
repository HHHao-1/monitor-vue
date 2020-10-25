<template>
    <analyse>
        <title-s :page-name="pageName" v-slot:title class="titleSlot"></title-s>
        <div class="analyse-draw">
        </div>
    </analyse>
</template>
<script>
    const d3 = require("d3")
    import Analyse from "@/components/SransDataParams";
    import TitleS from "@/components/TitleS"


    export default {
        components: {
            Analyse,
            TitleS,
        },
        data() {
            let svg;
            let circle;
            let text;
            let edges_line;
            let edges_text;
            let nodelis;
            let linklist;
            let identMap;
            return {
                pageName: '交易关系图谱',
                nodelis,
                linklist,
                identMap,
                circle,
                text,
                edges_line,
                edges_text,
                svg,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                this.$store.commit('getData', JSON.parse(sessionStorage.getItem("response")))

                if (this.$store.state.response != null) {
                    this.nodelist = this.$store.state.response.data.nodeList;
                    this.linklist = this.$store.state.response.data.linkList;

                    for (var i = 0; i < this.linklist.length; i++) {
                        let source = this.linklist[i].source;
                        let target = this.linklist[i].target;
                        for (var j = 0; j < this.nodelist.length; j++) {
                            if (source.name == this.nodelist[j].name) {
                                this.linklist[i].source = this.nodelist[j]
                            }
                            if (target.name == this.nodelist[j].name) {
                                this.linklist[i].target = this.nodelist[j]
                            }
                        }
                    }
                    const iMap = this.$store.state.response.data.identMap;
                    this.identMap = new Map();
                    for (var key in iMap) {
                        this.identMap.set(key, iMap[key])
                    }
                    this.drawAtlas(this);
                }
            },
            drawAtlas() {

                const that = this;

                var bit = this.$children[0].addressBits;
                var width = 0;
                var height = 0;

                d3.select("svg").remove();

                var force = d3.layout.force()//layout将json格式转化为力学图可用的格式
                    .nodes(this.nodelist)//设定节点数组
                    .links(this.linklist)//设定连线数组
                    .size([width, height])//作用域的大小
                    .linkDistance(180)//连接线长度
                    .charge(-1500)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
                    .on("tick", () => {
                        circle.attr("transform", (d) => {
                            return "translate(" + d.x + "," + d.y + ")";
                        });//圆圈
                        text.attr("transform", (d) => {
                            return "translate(" + (d.x) + "," + d.y + ")";
                        });//顶点文字
                        edges_line.attr('d', function (d) {
                            var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                            return path;
                        });
                        edges_text.attr('transform', function (d, i) {
                            if (d.target.x < d.source.x) {
                                var bbox = this.getBBox();
                                var rx = bbox.x + bbox.width / 2;
                                var ry = bbox.y + bbox.height / 2;
                                return 'rotate(180 ' + rx + ' ' + ry + ')';
                            } else {
                                return 'rotate(0)';
                            }
                        });

                        // 动态调整画布大小，可以显示出全部node
                        //  计算左上角的点与右下角的点
                        var max = {x: 0, y: 0},
                            min = {x: 0, y: 0}

                        circle.attr("id", function (node) {
                            if (node.px > max.x) {
                                max.x = node.px
                            }
                            if (node.py > max.y) {
                                max.y = node.py
                            }
                            if (node.px < min.x) {
                                min.x = node.px
                            }
                            if (node.py < min.y) {
                                min.y = node.py
                            }
                        })

                        max.x += 100;
                        max.y += 100;
                        min.x -= 100;
                        min.y -= 100;

                        //  改进SVG的视图区域
                        var width = max.x - min.x,
                            height = max.y - min.y;
                        //  设置大小
                        svg.attr('width', width)
                        svg.attr('height', height)
                        //  设置可见区域
                        svg.attr('viewBox', min.x + ',' + min.y + ',' + width + ',' + height)
                    })
                    .start();//开始转换

                var svg = this.svg;
                svg = d3.select(".analyse-draw")
                    .append("svg")
                    .attr('id', 'svg')
                    .attr("width", width)
                    .attr("height", height);

                //箭头
                var marker = svg.append("marker")
                    .attr("id", "resolved")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10")//坐标系的区域
                    .attr("refX", 26)//箭头坐标
                    .attr("refY", -1)
                    .attr("markerWidth", 12)//标识的大小
                    .attr("markerHeight", 12)
                    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2)//箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
                    .attr('fill', '#000000');//箭头颜色

                var markerIdent = svg.append("marker")
                    .attr("id", "resolvedIdent")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10")//坐标系的区域
                    .attr("refX", 44)//箭头坐标
                    .attr("refY", 0)
                    .attr("markerWidth", 12)//标识的大小
                    .attr("markerHeight", 12)
                    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2)//箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
                    .attr('fill', '#000000');//箭头颜色

                var edges_line = this.edges_line;
                var identMap = this.identMap;

                //设置连接线
                edges_line = svg.selectAll(".edgepath")
                    .data(force.links())
                    .enter()
                    .append("path")
                    .attr({
                        'd': function (d) {
                            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
                        },
                        'class': 'edgepath',
                        'id': function (d, i) {
                            return 'edgepath' + i;
                        }
                    })
                    // .style("stroke", function (d) {
                    .style("stroke", function () {
                        return '#B43232';
                    })
                    .style("pointer-events", "none")
                    .style("stroke-width", 0.5)//线条粗细
                    .attr("marker-end", function (d) {
                        if (identMap.has(d.target.name))
                            return "url(#resolvedIdent)";
                        else
                            return "url(#resolved)";
                    });//根据箭头标记的id号标记箭头

                var edges_text = this.edges_text;
                edges_text = svg.append("g").selectAll(".edgelabel")
                    .data(force.links())
                    .enter()
                    .append("text")
                    .style("pointer-events", "none")
                    .attr({
                        'class': 'edgelabel',
                        'id': function (d, i) {
                            return 'edgepath' + i;
                        },
                        'dx': 80,
                        'dy': 0
                    });

                //设置线条上的文字
                edges_text.append('textPath')
                    .attr('xlink:href', function (d, i) {
                        return '#edgepath' + i
                    })
                    .style("pointer-events", "none")
                    .text(function (d) {
                        return d.value;
                    });

                //圆圈
                var circle = this.circle;
                circle = svg.append("g").selectAll("circle")
                    .data(force.nodes())//表示使用force.nodes数据
                    .enter().append("circle")
                    .style("fill", function (node) {
                        if (node.outCount > node.inCount)
                            return '#FFF1CF';
                        else
                            return '#FEF4F4';
                    })
                    .style('stroke', function (node) {
                        if (node.value > 0)
                            return '#69B076';
                        else
                            return '#4C6CB3';
                    })
                    .attr("r", function (node) {
                        if (identMap.has(node.name))
                            return 40;
                        else
                            return 20;
                    })//设置圆圈半径
                    .on("click", function (node) {
                        //单击时让连接线加粗
                        edges_line.style("stroke-width", function (line) {
                            if (line.source.name == node.name || line.target.name == node.name) {
                                return 4;
                            } else {
                                return 0.5;
                            }
                        });
                        that.$children[0].isShowCounts = !that.$children[0].isShowCounts;
                        that.$children[0].inCount = node.inCount;
                        that.$children[0].outCount = node.outCount;
                        that.$children[0].inValue = node.inValue;
                        that.$children[0].outValue = node.outValue;
                        that.$children[0].value = node.value;
                    })
                    .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动

                //圆圈的提示文字
                circle.append("svg:title")
                    .text(function (node) {
                        return node.name;
                    });

                var text = this.text;
                text = svg.append("g")
                    .selectAll("text")
                    .data(force.nodes())
                    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
                    .enter()
                    .append("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")//在圆圈中加上数据
                    .style('fill', function (node) {
                        if (node.value > 0)
                            return '#EB5381';
                        else
                            return '#94ADDA';
                    }).attr('x', function (d) {
                        var re_en = /[a-zA-Z]+/g;
                        var name = identMap.get(d.name);
                        if (name == "" || name == undefined) {
                            name = d.name;
                            if (bit != "")
                                name = d.name.substr(0, bit);
                        }

                        //如果是全英文，不换行
                        if (name.match(re_en)) {
                            d3.select(this).append('tspan')
                                .attr('x', 0)
                                .attr('y', 2)
                                .text(function () {
                                    return name;
                                });
                        }
                        //如果小于四个字符，不换行
                        else if (name.length <= 4) {
                            d3.select(this).append('tspan')
                                .attr('x', 0)
                                .attr('y', 2)
                                .text(function () {
                                    return name;
                                });
                        } else {
                            var top = name.substring(0, 4);
                            var bot = name.substring(4, name.length);

                            d3.select(this).text(function () {
                                return '';
                            });

                            d3.select(this).append('tspan')
                                .attr('x', 0)
                                .attr('y', -7)
                                .text(function () {
                                    return top;
                                });

                            d3.select(this).append('tspan')
                                .attr('x', 0)
                                .attr('y', 10)
                                .text(function () {
                                    return bot;
                                });
                        }
                    });
            }
        }
    }
</script>
<style lang="scss">

    .analyse-draw {
        svg {
            height: 100%;
            width: 100%;
            z-index: 0;
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%); /* IE 9 */
            -moz-transform: translate(-50%, -50%); /* Firefox */
            -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
            -o-transform: translate(-50%, -50%); /* Opera */
        }

        .link {
            fill: none;
            stroke: #666;
            stroke-width: 1.5px;
        }

        #licensing {
            fill: green;
        }

        .link.licensing {
            stroke: green;
        }

        .link.resolved {
            stroke-dasharray: 0, 2 1;
        }

        circle {
            fill: #ccc;
            stroke: #333;
            stroke-width: 1.5px;
        }

        text {
            font: 12px Microsoft YaHei;
            pointer-events: none;
            text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
        }

        .linetext {
            font-size: 12px;
            font-family: Microsoft YaHei;
        }

    }

</style>