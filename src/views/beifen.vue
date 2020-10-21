<template>
  <h1>
    Draw
    <button @click="getList">test</button>
  </h1>
</template>
<script>
// import * as d3 from "d3";
//
// window.d3 = d3;
const d3 = require("d3")


export default {
  data() {
    return {
      // res: this.$store.state.response.data,
      nodelist: this.$store.state.response.data.nodeList,
      linklist: this.$store.state.response.data.linkList,
      identMap: new Map(),
      circle: {},
      text: undefined,
      edges_line: {},
      edges_text: {},
      svg: {}
    }
  },
  // created() {
  //   window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  // },
  // destroyed() {
  //   window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  // },
  methods: {
    // beforeunloadFn(e) {
    //   this.getList();
    //   console.log(e);
    // },
    getList() {
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
      // identMap = new Map()
      for (var key in iMap) {
        this.identMap.set(key, iMap[key])
      }
      const _this = this;
      this.drawAtlas(_this);
    },
    drawAtlas(_this) {
      this;
      nodelist;

      var nodelist = _this.nodelist;
      var linklist = _this.linklist;
      var identMap = _this.identMap;
      // var circle = _this.circle;
      var circle = _this.circle;
      var text = _this.text;
      var edges_line = _this.edges_line;
      var edges_text = _this.edges_text;
      var svg = _this.svg;
      debugger

      // var tick = _this.$options.methods.tick;


      var bit = 2;
      var width = 500;
      var height = 500;

      d3.select("svg").remove();

      var tick = function tick() {
        // circle = x{};
        // circle = JSON.parse(JSON.stringify(_this.circle))
        // delete circle.__ob__;
        // delete circle[0].__ob__;
        // var c = circle;
        circle.attr("transform", transform1);//圆圈
        text.attr("transform", transform2);//顶点文字

        edges_line.attr('d', function (d) {
          var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
          return path;
        });

        edges_text.attr('transform', function (d, i) {
          if (d.target.x < d.source.x) {
            bbox = this.getBBox();
            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
          } else {
            return 'rotate(0)';
          }``
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
      }
      var transform1 =  function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      }
      var transform2 = function(d) {
        return "translate(" + (d.x) + "," + d.y + ")";
      }
      // var tick = _this.tick();
      var force = d3.layout.force()//layout将json格式转化为力学图可用的格式
          .nodes(nodelist)//设定节点数组
          .links(linklist)//设定连线数组
          .size([width, height])//作用域的大小
          .linkDistance(180)//连接线长度
          .charge(-1500)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
          // .on("tick", tick)
          // function(circle) {
          //   circle.attr("transform", function (d) {
          //     return "translate(" + d.x + "," + d.y + ")";
          //   });//圆圈
          //   text.attr("transform", function(d){
          //     return "translate(" + (d.x) + "," + d.y + ")";
          //   });//顶点文字
          //
          //   edges_line.attr('d', function (d) {
          //     var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
          //     return path;
          //   });
          //
          //   // this.edges_text.attr('transform', function (d, i) {
          //   edges_text.attr('transform', function (d) {
          //     if (d.target.x < d.source.x) {
          //       bbox = this.getBBox();
          //       rx = bbox.x + bbox.width / 2;
          //       ry = bbox.y + bbox.height / 2;
          //       return 'rotate(180 ' + rx + ' ' + ry + ')';
          //     } else {
          //       return 'rotate(0)';
          //     }
          //   });
          //
          //   // 动态调整画布大小，可以显示出全部node
          //
          //   //  计算左上角的点与右下角的点
          //   var max = {x: 0, y: 0},
          //       min = {x: 0, y: 0}
          //
          //   circle.attr("id", function (node) {
          //     if (node.px > max.x) {
          //       max.x = node.px
          //     }
          //     if (node.py > max.y) {
          //       max.y = node.py
          //     }
          //     if (node.px < min.x) {
          //       min.x = node.px
          //     }
          //     if (node.py < min.y) {
          //       min.y = node.py
          //     }
          //   })
          //
          //   max.x += 100;
          //   max.y += 100;
          //   min.x -= 100;
          //   min.y -= 100;
          //
          //   //  改进SVG的视图区域
          //   var width = max.x - min.x,
          //       height = max.y - min.y;
          //   //  设置大小
          //   svg.attr('width', width)
          //   svg.attr('height', height)
          //   //  设置可见区域
          //   svg.attr('viewBox', min.x + ',' + min.y + ',' + width + ',' + height)
          // })//指时间间隔，隔一段时间刷新一次画面

          //设置连接线的坐标,使用椭圆弧路径段双向编码
          //               linkArc(d)
          //       {
          //         return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
          //       }
          //     ,

          //设置圆圈和文字的坐标
          //       transform1(d)
          //       {
          //         return "translate(" + d.x + "," + d.y + ")";
          //       }
          //     ,
          //
          //       transform2(d)
          //       {
          //         return "translate(" + (d.x) + "," + d.y + ")";
          //       }
          //     ,
          //     }
          //   }

          .start();//开始转换

      svg = d3.select("#app")
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
            // document.getElementById("inCount").innerText = "输入次数：" + node.inCount;
            // document.getElementById("outCount").innerText = "输出次数：" + node.outCount;
            // document.getElementById("inValue").innerText = "输入额度：" + node.inValue;
            // document.getElementById("outValue").innerText = "输出额度：" + node.outValue;
            // document.getElementById("value").innerText = "余额：" + node.value;
          })
          .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动

//圆圈的提示文字
      circle.append("svg:title")
          .text(function (node) {
            return node.name;
          });

      text = svg.append("g").selectAll("text")
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
            //直接显示文字
            /*.text(function(d) {
          return d.name; */
          });
      this.nodelist = nodelist;
      this.linklist = linklist;
      this.identMap = identMap;
      this.circle = circle;
      this.text = text;
      this.edges_line = edges_line;
      this.edges_text = edges_text;
      this.svg = svg;



// _this.tick = tick;

    },

    // tick() {
    //   // circle;
//       // var circle = this.circle;
//       // var text = this.text;
//       // var edges_line = this.edges_line;
//       // var edges_text = this.edges_text;
//       // var svg = this.svg;
//
//       // var c = JSON.stringify(circle);
//       // circle = JSON.parse(c);
//
//
//       // var transform1 = _this.$options.methods.transform1;
//       // var transform2 = _this.$options.methods.transform2;
//       // var circle = _this.circle;
//       // var text = _this.text;
//       // var circle = this.circle;
//       // var text = this.text;
//
//       circle.attr("transform", this.transform1);//圆圈
//       text.attr("transform", this.transform2);//顶点文字
//
//       edges_line.attr('d', function (d) {
//         var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
//         return path;
//       });
//
//       // this.edges_text.attr('transform', function (d, i) {
//       edges_text.attr('transform', function (d) {
//         if (d.target.x < d.source.x) {
//           bbox = this.getBBox();
//           rx = bbox.x + bbox.width / 2;
//           ry = bbox.y + bbox.height / 2;
//           return 'rotate(180 ' + rx + ' ' + ry + ')';
//         } else {
//           return 'rotate(0)';
//         }
//       });
//
//       // 动态调整画布大小，可以显示出全部node
//
//       //  计算左上角的点与右下角的点
//       var max = {x: 0, y: 0},
//           min = {x: 0, y: 0}
//
//       circle.attr("id", function (node) {
//         if (node.px > max.x) {
//           max.x = node.px
//         }
//         if (node.py > max.y) {
//           max.y = node.py
//         }
//         if (node.px < min.x) {
//           min.x = node.px
//         }
//         if (node.py < min.y) {
//           min.y = node.py
//         }
//       })
//
//       max.x += 100;
//       max.y += 100;
//       min.x -= 100;
//       min.y -= 100;
//
//       //  改进SVG的视图区域
//       var width = max.x - min.x,
//           height = max.y - min.y;
//       //  设置大小
//       svg.attr('width', width)
//       svg.attr('height', height)
//       //  设置可见区域
//       svg.attr('viewBox', min.x + ',' + min.y + ',' + width + ',' + height)
//
//       this.circle = circle;
//       this.text = text;
//       this.edges_line = edges_line;
//       this.edges_text = edges_text;
//       this.svg = svg;
//     }
//     ,
//
// //设置连接线的坐标,使用椭圆弧路径段双向编码
//     linkArc(d) {
//       return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
//     }
//     ,
//
// //设置圆圈和文字的坐标
//     transform1(d) {
//       return "translate(" + d.x + "," + d.y + ")";
//     }
//     ,
//
//     transform2(d) {
//       return "translate(" + (d.x) + "," + d.y + ")";
//     }
//     ,
  }
}
</script>
<style>
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
  font-size: 12px Microsoft YaHei;
}
</style>