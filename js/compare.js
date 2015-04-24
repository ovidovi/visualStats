
$.ajax({
  url: "https://spreadsheets.google.com/feeds/list/1h8HSu-XcJaIzzuj_QIxFsewDE4-T5vmsIKtfOAahZtw/od6/public/values?alt=json"
 // context: document.body
}).done(function(data) {
 	var jsonData = data.feed.entry;

	for(var i in jsonData){
		var batterName = jsonData[i].gsx$player.$t;
		var batterAb = jsonData[i].gsx$ab.$t;
		var batterH = jsonData[i].gsx$hr.$t;
		var batterBa = jsonData[i].gsx$avg.$t;
		var batterObp = jsonData[i].gsx$obp.$t;
		var batterSlg = jsonData[i].gsx$slg.$t;

		//generate graph
		genGraph(i,batterBa,batterSlg,batterObp,batterName, batterAb, batterH);
	}

});

var w = 200,
	h = 200;

//Data
//Iterate through values


function genGraph(chartNum, ba, slg, obp, name, ab, hits){
	var d = [
			  [
				{axis:"BA",value:ba},
				{axis:"SLG",value:slg},
				{axis:"OBP",value:obp}
			  ]
			];

	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 1.2,
	  levels: 6,
	  ExtraWidthX: 300
	}

	$('#body').append('<div id="chart' + chartNum + '"" class="chart"></div>');

	//Render Radar Chart
	RadarChart.draw("#chart" + chartNum, d, mycfg);


	var svg = d3.select("#chart" + chartNum)
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", -50)
		.attr("y", 20)
		.attr("font-size", "18px")
		.attr("font-weight", "bold")
		.attr("fill", "#ee542a")
		.text(name);

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", -50)
		.attr("y", 40)
		.attr("font-size", "18px")
		.attr("fill", "#f59220")
		.text("AB " + ab);
}



////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////


/*
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
	 */