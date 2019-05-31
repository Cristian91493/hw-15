function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url =`/metadata/${sample}`
  var paneldiv=d3.select('#sample-metadata')
  paneldiv.html("")
  var tbody=paneldiv.append('tbody')
  d3.json(url).then(function(data){
    Object.entries(data).forEach(([key,value])=>{
      var row=tbody.append('tr')
      row.append('td').text(`${key}: ${value}`)})
    })
  }
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    //var paneldiv = d3.select(‘#sample-metadata’)
    // Use `.html(“”) to clear any existing metadata
    //paneldiv.html(‘’);
 
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
 
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  pieUrl=`/samples/${sample}`
    // @TODO: Build a Bubble Chart using the sample data
    
      d3.json(pieUrl).then(function(response) {
    
        console.log(response);

        var ids = response.otu_ids
        var values = response.sample_values
        var labels = response.otu_labels

        var trace1 = {
          
          x: ids,
          y: values,
          mode: 'markers',
          text: labels,
          marker:{
            size: values,
            color: ids
          }
        };
        var bubbledata = [trace1]
    
        
    
        Plotly.newPlot("bubble", bubbledata);

        // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var topValues = values.slice(0,10)
    var topIds = ids.slice(0,10)
    var topLabels=labels.slice(0,10)
    var trace2={
      values: topValues,
      labels: topIds,
      hovertext: topLabels,
      hoverinfo: "label+text+value+percent",
      type: "pie"
    }
    var piedata=[trace2]

    Plotly.newPlot('pie',piedata)

      });
  }
    
    buildCharts();
    
 
 
 function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#selDataset');
 
  // Use the list of sample names to populate the select options
  d3.json('/names').then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append('option')
        .text(sample)
        .property('value', sample);
    });
 
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
 }
 
 function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
 }
 
 // Initialize the dashboard
 init();