# Overview
## Belly Button Biodiversity Dashboard
In this challenge, I have built an interactive dashboard to explore the Belly button Biodiversity dataset, which catalogs the microbes that colonize the human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.
---

**Steps taken to complete this analysis:**
*  Used the d3 library to read in sample.json from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`
* Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  - First, used the select method in d3 library to select the html component to append the name and metadata" `let   selectOption = d3.select("#selDataset")`". Then, used d3.json to load data from the url and used `then` method to print the belly botton dataset in the console. Next, I retrieved all the names from the dataset, run the for loop and append them to the dropdown. `for ( let i = 0; i < names.length; i++){`
        `selectOption.append("option").text(names[i]).property("value", names[i]);`
    `}` Finally, plotted the bar chart ` Plotly.newPlot("bar", data)` 
* Created a bubble chart:
   - Used `otu_ids` for the x values,  `sample_values` for the y values,  `sample_values` for the marker size,  `otu_ids` for the marker colors, `otu_labels` for the text values
  
* Displayed the sample metadata, i.e., an individual's demographic information with its key-value pair from the metadata JSON object.
* Deployed app to a free static page hosting service.


1. README.md: Provides orientation for this challenge.
2. static/js: Is has the logic for app.js
3. index.html: It has the html file.
4. samples.json: It is the json file for the reference. 