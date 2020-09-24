
var printGeneratedPDF = function() {

    var xmlUrl ="static/images/pdf/" + testName + "/level"+ level + "_" + language + ".jpg?nocache="+Math.random();
    getBase64fromImage(xmlUrl, function(imgData) {
        var doc = new jsPDF();
        if(language == "no") {
            doc.addImage(imgData, 'JPG', 0, 0, 210, 300)
            doc.addPage();
        }
        doc.setFontSize(20);
        doc.setFont('Helvetica');
        doc.setTextColor(11,64,109);
        doc.text(82, 25, getString("Answers").toUpperCase());
        doc.setDrawColor(200);
        doc.line(18, 35, 193, 35);
        var j = 0;
    
        for(var i=0; i < finalAnswerArray.length; i++) {
            doc.setTextColor(100);
            if(!(i % 12)) {
                if(i!=0) {
                    doc.addPage();
                }
                doc.setFontSize(13); 
                doc.setFontStyle('bold');
                doc.text(20, 45, getString("Questions").toUpperCase());
                doc.text(150, 45, getString("Answer").toUpperCase());
                doc.setFontStyle('normal');
                doc.setFontSize(12); 
                j=0;
            }
    
            var question =  splitter($XML.find("kntest").find('opgave').eq(i).find("overskrift").eq(0).text(), 60);
    
            var answer =  splitter($XML.find("kntest").find('opgave').eq(i).find("option").eq(finalAnswerArray[i][0]).text(),20);
    
            doc.setDrawColor(200);
            doc.line(18, 51 + j*20, 193, 51 + j*20);
            doc.text(20, (60 + j*20), question) 
            doc.setTextColor(34, 116, 185);
            doc.text(150, (60 + j*20), answer);
            j++;
        }
    
        doc.save("selvtest.pdf");
    });

}

function splitter(str, l){
    var strs = [];
    while(str.length > l){
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

function getBase64fromImage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }