$(document).ready(function() {
    // console.log('Before Do the bar')
    fillDropdown();
    //  doTheBar();
    // console.log('After do the bar')
    // doTheBubble();
    // doTheGauge()
});







function doTheBar() {
    console.log('In do the bar');





    // var otu_ids = bioData.otu_ids(0, 9);
    //console.log('in do the bar')
    //  console.log(sample_values);
    var trace1 = {
        y: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
        x: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
        type: 'bar',
        orientation: 'h',
        text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
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

function doTheGauge() {
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: 450,
        title: { text: "Speed" },
        type: "indicator",
        mode: "gauge+number+delta",
        delta: { reference: 380 },
        gauge: {
            axis: { range: [null, 500] },
            steps: [
                { range: [0, 250], color: "lightgray" },
                { range: [250, 400], color: "gray" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 490
            }
        }
    }];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}

function doTheBubble() {

    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size: [40, 60, 80, 100]
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 600,
        width: 600
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
            let metadata = data["metadata"].filter(x => x.id == id)[0];
            console.log(metadata);

            $(`#sample-metadata`).empty();

            Object.entries(metadata).forEach(function([key, value]) {
                let info = `<p>${key}: ${value} </p>`;
                $(`#sample-metadata`).append(info);

            });
        }

    })
}