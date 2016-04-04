var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var tooltipLigth = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

var colors = ['#ffffe5','#fff7bc','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#993404','#662506'];

function colorSelection(num){
  if (num == 0){
    return '#d9f0a3';
  }
   if (num == 1) {
    return '#ffffb2';
  }
  if (num >= 2 && num <= 3) {
    return '#fecc5c';
  }
  if (num >= 4 && num <= 5) {
    return '#fd8d3c';
  }
  if (num >= 6 || num < 7) {
    return '#e31a1c';
  }


}


function init(data, sensors) {
  // console.log(sensors)
  // Thu Mar 10 2016 12:45:46 GMT-0600 (CST)

  var x = d3.time.scale()
    .domain([new Date(data[0].date), new Date()])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0,7])
    .range([0, height]);

  var watsScale = d3.scale.linear()
    .domain([0, 15])
    .range([3,13])

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(d3.time.minutes,30)

  var svg = d3.select('#motion_chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", 20)");

  var chartCont = svg.append("g")
      .attr("class", "chartCont")
      .attr("x", 40)
      
  // chartCont.append("g")
  //     .attr("class", "x axis")
  //     .call(xAxis)

  var rectCont = chartCont.append("g")
      .attr("class", "rectCont")
  rectCont.selectAll(".rect_motion")
    .data(data)
  .enter().append("rect")
    .attr("class", "rect")
    .attr("width", 3)
    .attr("height", 8)
    .attr("x", function(d) {return x(new Date(d.date)) })
    .attr("y", function(d) {return y(d.sensorNum); })
    .attr("fill", function(d) {return colorSelection(d.motion); })
    .attr("fill-opacity", function(d){if (d.motion ==0) {return 0} else{return 1} })
    .on("mouseover", function(d) {    
            tooltipLigth.transition()    
                .duration(200)    
                .style("opacity", .9);    
            tooltipLigth.html( "<b>motion: </b>" + d.motion + "<br/>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            tooltipLigth.transition()    
                .duration(300)    
                .style("opacity", 0); 
        });
  
}


module.exports = {
  init: init,
};
