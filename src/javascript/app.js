// Declare D3 for all window
var d3 = require('d3');
window.d3= d3;

// Require Data Controller
var Data = require('./data');

// Run Aplication
Data.initQuery(true);

function toggleActiveChart(){
  var links = document.getElementsByClassName('nav_item');
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function(e){
      var time = e.target.dataset.time;
      if (time == "_72h") {
        console.log("newQuery_72h")
        d3.selectAll(".dot")
          .transition().duration(750)
          .style("opacity","0")
          .on("end",function(){
            d3.selectAll(".svg_chart").remove();
            // d3.selectAll(".svg_symbology").remove();
          });
        Data._3dQuery(false);
      }
      if (time == "_24h") {
        console.log("newQuery_24h")
        d3.selectAll(".dot")
          .transition().duration(750)
          .style("opacity","0")
          .on("end",function(){
            d3.selectAll(".svg_chart").remove();
            // d3.selectAll(".svg_symbology").remove();
          });
        Data._3dQuery(false);
      }
    }
  }
}

// function removeClassFrom(itemsClass,className){
//   var items = document.getElementsByClassName(itemsClass);
//   for (var i = 0; i < items.length; i++) {
//     console.log(items[i].classList.indexOf(className))
//     var index = items[i].classList.indexOf(className);
//     if (index > -1) {
//       items[i].classList.splice(index,1)
//     }
//   }
// }

toggleActiveChart()