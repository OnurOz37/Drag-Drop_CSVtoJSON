var options = {input: false};
var dropzone = new FileDrop("dropCSV", options);
var jsonzone = document.getElementById("jsonoutput");
var cbHeaders = document.getElementById("hasHeaders");

dropzone.event('send', function(files){
    files.each(function(file){
        file.readData(
            createJSON,
            function(e){
                alert('Error')
            },
            'text'
        )
    })
});

function createJSON(str){
    dropzone.el.value=str;
    var config = {
        header:cbHeaders.checked
    };
    var jsonObject = Papa.parse(str, config).data;
    var jsonString = JSON.stringify(jsonObject);
    var jsonStringFormatted = jsonString.replace(/{/g,"\n\t{").replace("]", "\n]");
    jsonzone.value = jsonString; 
}

cbHeaders.addEventListener("click", function(){
    if (dropzone.el.value.length>0){
        createJSON(dropzone.el.value);
    }

}, false);