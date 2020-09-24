var langFile;

$(document).ready(function() {
    function loadXMLDoc(filename,callback){
        if (window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET",filename,true);

        xhttp.onload = callback;
        xhttp.send();
        return xhttp.responseXML;
    }

    function localize(){
        var xmlUrl ="texts/" + testName + "/lang_" + language + ".xml?nocache="+Math.random();

        $.ajaxPrefilter(function( options, originalOptions, jqXHR ) { options.async = true; });

        loadXMLDoc(xmlUrl,function(response) {
            langFile = response.srcElement.responseXML;
            var x = langFile.getElementsByTagName("string");
            for (i=0;i<x.length;i++)  {
                var elems = document.querySelectorAll("[data-translate="+ x[i].getAttribute("id")+"]");

                [].forEach.call(elems, function(elem) {
                    if (elem!=null) elem.innerText = x[i].getAttribute('text');   
                });
            }  
        });
    }
    localize();
});

function getString(id) {
    var x = langFile.getElementsByTagName("string");
    for (i=0;i<x.length;i++)  {
        if(x[i].getAttribute("id") === id) {
            return x[i].getAttribute("text");
        }
    } 
    return "";
}
