$(document).ready(function() {
    fillDropdown();

});



function doTheBar(x, y, h) {
    console.log('In do the bar');

    var trace1 = {
        y: y,
        x: x,
        type: 'bar',
        orientation: 'h',
        text: h,
        marker: {
            color: 'rgb(240,0,0)',
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Sample Values vs. OTU Ids',
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
            color: x,
            colorscale: 'Jet',
            size: y
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Sample Values vs. OTU Ids',
        showlegend: false,
        height: 600,
        width: 1200
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
            otu_labels = samples["otu_labels"];
            // otu_ids.sort(function(a, b) { return b - a });
            $(`#sample-metadata`).empty();
            doTheGauge(wf);
            doTheBubble(otu_ids, sample_values, otu_labels);
            Object.entries(metadata).forEach(function([key, value]) {
                let info = `<p>${key}: ${value} </p>`;
                $(`#sample-metadata`).append(info);

            });

            //https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript
            let plotData = samples["otu_ids"].map(function(e, i) {
                return [e, samples["sample_values"][i]]; //creates a list of list
            });
            let plotData_Sorted = plotData.sort((a, b) => b[1] - a[1]);
            x = plotData_Sorted.map(x => x[1]).slice(0, 10).reverse() //[1] corresponds to the sample_value
            y = plotData_Sorted.map(x => "OTU " + x[0]).slice(0, 10).reverse() //[0] corresponds to the OTU ID (the OTU is neccessary to append)

            doTheBar(x, y, h = [])

        }

    })
}