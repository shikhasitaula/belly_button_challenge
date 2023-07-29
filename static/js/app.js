const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


let selectOption = d3.select("#selDataset");
let result;
const sample = d3.json(url).then(function(data){
    console.log("Belly button samples: ", data)  
    let names = data.names;
    for ( let i = 0; i < names.length; i++){
        selectOption.append("option").text(names[i]).property("value", names[i]);
    }
    result = data;

 });

 function barChart(sample_values, otu_ids){
    let data = [{
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        marker : {size:16},
        type: "bar",
        orientation: 'h'
    }];

    Plotly.newPlot("bar", data)
 }

 function onOptionChange(value) {
    let samples = result.samples;
    // let filtered = samples.filter(function(data){
    //     return data.id === value;
    // })
    // console.log(filtered);
    let index = result.names.indexOf(value);
    let selected = samples[index];
    let topIds = selected.otu_ids.slice(0, 10)
        .map(function(otu) { return "OTU " + otu });
    let topValues = selected.sample_values.slice(0, 10);
    let otuLabel = selected.otu_labels.slice(0, 10);
    barChart(topValues, topIds);

}