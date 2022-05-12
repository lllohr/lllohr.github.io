function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

  // 1. Create the buildCharts function.
  function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
  var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
  var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
 var firstSample = samplesArray[0];
  console.log(firstSample); 

  // Object.entries(firstSample).forEach(([key, value]) =>
  //     {console.log(key + ': ' + value);});


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var otu_ids = firstSample.otu_ids;
  var otu_labels = firstSample.otu_labels;
  var sample_values = firstSample.sample_values;

    // // 7. Create the yticks for the bar chart.
    // // Hint: Get the the top 10 otu_ids and map them in descending order  
    // //  so the otu_ids with the most bacteria are last. 


  var sorted_sample_values = sample_values.sort((a,b) =>
  a - b).reverse(); 
  console.log(sorted_sample_values);
 
  var sample_values_slice = sorted_sample_values.slice(0,10).reverse();
  console.log(sample_values_slice);

  var yticks_slice = otu_ids.slice(0,10);
  var yticks = yticks_slice.map(x => 'OTU ' + x ).reverse();
  console.log(yticks)

    // // 8. Create the trace for the bar chart. 
  var trace = {
    x: sample_values_slice,
    y: yticks,
    type: "bar",
    orientation: 'h'
    };

    // // 9. Create the layout for the bar chart. 
  var data = [trace];
  var layout = {
    title: "Top Ten Bacteria Cultures Found"
    // xaxis: {title: "Sample Values" },
    // yaxis: {title: "otu_labels"}
    
  };
    
      // // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", [trace], layout);

  

      // 1. Create the trace for the bubble chart.
      var bubbleData = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Earth'
      },
  };

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      xaxis: {title: "OTU ID" },
      hovermode:'closest',
  };

  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot(
      "bubble",
      [
          bubbleData
      ],
      bubbleLayout
  );

      // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    d3.json("samples.json").then(function(data){
      wfreq = data.metadata.map(person => person.wfreq);
      console.log(wfreq);
  });

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: 'Belly Button Washing Frequency'
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
