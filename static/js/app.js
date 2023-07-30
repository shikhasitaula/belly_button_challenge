// url containing the data.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//keeps track of what was selected.
let selectOption = d3.select("#selDataset");
// keeps track of what was selected.
let selectDemographic = d3.select("#sample-metadata")
let result;
// Uses the D3 library to read in samples.json form the url
const sample = d3.json(url).then(function(data){
    // prints the belly button data in the console.
    console.log("Belly button samples: ", data)  
    // just grabs name of the from the array.
    let names = data.names;
    // loops through each names in the array 
    // appends the selected name to the div
    for ( let i = 0; i < names.length; i++){
        selectOption.append("option").text(names[i]).property("value", names[i]);
    }
    result = data;

 });

// function to plot the barchart.
 function barChart(sampleValues, otuIds, otuLabels){
    let data = [{
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        marker : {size:8},
        type: "bar",
        orientation: 'h'
    }];

    Plotly.newPlot("bar", data)
 }
// Fixes the marker size.
 function getMarkerSize(sampleValues){
    let size = sampleValues.map(function(data){
        return data / 2;
    })
    return size;
}
// creates the bubble chart.
 function bubblePlot(otuIds, sampleValues, otuLabels){
    let data = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode :'markers',
        marker: {
            color: otuIds, 
            size: getMarkerSize(sampleValues),
            showscale: true,
            colorscale: 'Earth'
        }  
    }];
    Plotly.newPlot('bubble', data)
 };
// appends id, ethnicity, gender , age location, bbtyoe and wfreq 
 function displayMetadata(metadata){
    selectDemographic.selectAll("*").remove();
    selectDemographic.append('span').text(`id : ${metadata.id}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`ethnicity : ${metadata.ethnicity}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`gender : ${metadata.gender}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`age : ${metadata.age}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`location : ${metadata.location}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`bbtype : ${metadata.bbtype}`);
    selectDemographic.append('br');
    selectDemographic.append('span').text(`wfreq : ${metadata.wfreq}`);
 }
// this function runs if the change is made meaning, it runs if different name is clicked.
function onOptionChange(value) {
    let samples = result.samples;
    let metadata = result.metadata;
// uses filter method of the javascrip to return the name selected.
    let selected = samples.filter(function(data){
        return data.id === value;
    })[0]
    // uses filter method to retrun the metadata of the selected name.
    let selectedMetadata = metadata.filter(function(data){
         return data.id === parseInt(value);
    })[0]
   // navigate to the selected sample values and returns top 10 otus' ids, sample value and otu labels.
    let topIds = selected.otu_ids.slice(0, 10)
        .map(function(otu) { return "OTU " + otu });
    let topValues = selected.sample_values.slice(0, 10);
    let otuLabel = selected.otu_labels.slice(0, 10);
    // calls the function to display bar chart, bubble plot and display metadata.
    barChart(topValues.reverse(), topIds, otuLabel );
    bubblePlot( selected.otu_ids, selected.sample_values, otuLabel)
    displayMetadata(selectedMetadata)

}




// Alternative way of getting the selected names.
   // console.log(filtered);
    // let index = result.names.indexOf(value);
    // let selected = samples[index];