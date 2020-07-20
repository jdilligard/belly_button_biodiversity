var otu_ids_jd = ['OTU 1167', 'OTU 2859', 'OTU 482', 'OTU 41', 'OTU 1189', 'OTU 352', 'OTU 189', 'OTU 2318', 'OTU 1977'];
var sample_values_jd = [152, 132, 120, 80, 70, 50, 50, 47, 47, 38];
var otu_labels_jd = ['Bacteria', 'Firmicutes', 'Clostridia', 'Clostridiales', 'IncertaeSedisXI', 'Anaerococcus', 'Firmicutes', 'Clostridia', 'Clostridiales', 'IncertaeSedisXI'];
var w_freq = [0, 9, 2, 3, 5, 6, 1, 1, 4, 5];
var bioData;
var names;
var metadata;
var samples;

// var promise = d3.json("/StarterCode/samples.json").then(function(data) {
//     console.log(data);
//     names = data["names"];
//     metadata = data["metadata"];
//     samples = data["samples"];
//     console.log(names);
//     return data;

// });


$(document).ready(function() {
    // console.log('Before Do the bar')
    fillDropdown();

    doTheBar(sample_values_jd, otu_ids_jd, otu_labels_jd);
    // console.log('After do the bar')
    // doTheBubble(otu_ids_jd, sample_values_jd, otu_labels_jd);
    // doTheGauge();
});






function doTheBar(x, y, h) {
    console.log('In do the bar');

    // var otu_ids = bioData.otu_ids(0, 9);
    //console.log('in do the bar')
    //  console.log(sample_values);
    var trace1 = {
        y: y,
        x: x,
        type: 'bar',
        orientation: 'h',
        text: h,
        marker: {
            color: 'rgb(142,124,195)'
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Number of Graphs Made this Week',
        font: {
            family: 'Raleway, sans-serif'
        },
        showlegend: false,
        yaxis: {
            tickangle: -45
        },
        xaxis: {
            zeroline: false,
            gridwidth: 2
        },
        bargap: 0.05
    };

    Plotly.newPlot('bar', data, layout);
}

function doTheGauge(wf = 5) {
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wf,
        title: {
            text: "Belly Button Washing Frequency"
        },
        type: "indicator",
        mode: "gauge+number",

        steps: [
            { range: [0, 1], color: "royalblue" },
            { range: [1, 2], color: "Oryel" },
            { range: [2, 3], color: "Oryel" },
            { range: [3, 4], color: "gray" },
            { range: [4, 5], color: "gray" },
            { range: [5, 6], color: "gray" },
            { range: [6, 7], color: "gray" },
            { range: [7, 8], color: "gray" },
            { range: [8, 9], color: "gray" },
            { range: [9, 10], color: "gray" },
        ],
        gauge: {
            axis: { range: [null, 10] },
            bar: { color: "black" },
            steps: [
                { range: [0, 1], color: "red" },
                { range: [1, 2], color: "orange" },
                { range: [2, 3], color: "yellow" },
                { range: [3, 4], color: "yellow" },
                { range: [4, 5], color: "yellow" },
                { range: [5, 6], color: "yellowgreen" },
                { range: [6, 7], color: "yellowgreen" },
                { range: [7, 8], color: "yellowgreen" },
                { range: [8, 9], color: "green" },
                { range: [9, 10], color: "green" },
            ],

        }
    }];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}

function doTheBubble(x, y, h) {

    var trace1 = {
        x: x,
        y: y,
        text: h,
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size: y
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 900,
        width: 900
    };

    Plotly.newPlot('bubble', data, layout);

}

function fillDropdown() {

    console.log('In FillDropdown')
    $.ajax({
        type: 'GET',
        url: "/StarterCode/samples.json",
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            data["names"].forEach(function(id) {
                let option = `<option>${id}</option>`;
                $('#selDataset').append(option);
            });
            fillMetaData(data["names"][0]);

        },
        failure: function(error) {
            console.log(error);
        }
    });


}

function fillMetaData(id) {
    console.log('In fillMetaData')
    $.ajax({
        type: 'GET',
        url: "/StarterCode/samples.json",
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            console.log(data)
            let metadata = data["metadata"].filter(x => x.id == id)[0];
            wf = metadata["wfreq"];
            samples = data["samples"].filter(x => x.id == id)[0];
            otu_ids = samples["otu_ids"];
            sample_values = samples["sample_values"];
            otu_labels = samples["otu_labels"]
                // otu_ids.sort(function(a, b) { return b - a });
            $(`#sample-metadata`).empty();
            doTheGauge(wf);
            doTheBubble(otu_ids, sample_values, otu_labels)
            Object.entries(metadata).forEach(function([key, value]) {
                let info = `<p>${key}: ${value} </p>`;
                $(`#sample-metadata`).append(info);

            });
        }

    })
}