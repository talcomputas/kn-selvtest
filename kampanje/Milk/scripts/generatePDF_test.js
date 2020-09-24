// You'll need to make your image into a Data URL
// Use http://dataurl.net/#dataurlmaker

/**
 * Prints a line of non-ASCII text as a series of images.
 * All doc.text methods can be replaced with this method.
 * Works like doc.text but requires a fontsize (default is 10).
 *
 * Add function to jsPDF instance (do not overwrite doc.text):
 *      var doc = new jsPDF();
 *      doc.alttext = nonASCIItext;
 *
 * @param {Number} x         Horizontal placement
 * @param {Number} y         Vertical placement
 * @param {String} ch_string Non-ASCII string to add as an image
 * @param {Number} fontsize  Similar sizing as doc.setFontSize()
 */
function nonASCIItext(x, y, ch_string, fontsize,color) {
    var foreground = color;
    if (ch_string === null) return;
    // Test if there is non-ASCII characters in string
    var hasNonASCII = false,
        defaultFontSize = 10;
    for (var i=0; i<ch_string.length; i++) {
        if (ch_string.charCodeAt(i) > 128) {
            hasNonASCII = true;
        }
    }

    // If all chars are "ASCII" then use built-in doc.text function
    if (hasNonASCII === false) {
        if (fontsize) this.setFontSize(fontsize);
        this.text(x, y, ch_string);
        return;
    }

    /**
     * Create temp canvas and ctx once and store on doc object
     */
        // Canvas & ctx settings
        var background = "#fff",
            font = "bold 150px PMingLiU",
            width = '150';  // Height default is 150

        this.charCanvas = document.createElement('canvas');
        this.charCanvas.width = width;
        this.charCtx = this.charCanvas.getContext('2d');
        this.charCtx.font = font;
        this.charCtx.clear = function () {
            // Clear content using background color
            this.fillStyle = background;
            this.fillRect(0,0,width,width);
            this.fillStyle = foreground;
        };
  

    // Convenience and iter tracking vars for loop
    var ctx = this.charCtx,
        xi = x,
        width = this.charCanvas.width,
        scale = (fontsize || defaultFontSize) / 450;

    // Make image for each character and add to document
    for (var i=0; i<ch_string.length; i++) {
        ctx.clear();
        ctx.fillText(ch_string.charAt(i), 0, 120);  // Draw character
        this.addImage(
            this.charCanvas.toDataURL("image/jpeg", 1.0),  // 1.0 highest quality,
            'JPEG',
            xi, y-width*scale*.9,  // Offset
            width*scale, width*scale  // Sizing
        );
        xi = xi + ctx.measureText(ch_string.charAt(i)).width*scale*1.1;  // 1.1 for a little extra space
    }
};

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

var printGeneratedPDF_test = function() {

    var doc = new jsPDF();
    doc.alttext = nonASCIItext;
    doc.setFontSize(20);
    doc.setFont('Arial');
    doc.setTextColor(11,64,109);
    doc.text(88, 25, getString("Answers").toUpperCase());
    doc.setDrawColor(200);
    doc.line(18, 35, 193, 35);

    var j = 0;

    for(var i=0; i < finalAnswerArray.length; i++) {
        doc.setTextColor(100);
        
        var questionXML = $XML.find("kntest").find('opgave').eq(i);
        if(!(i % 8)) {
            if(i!==0) {
                doc.addPage();
            }
            doc.setFontSize(13); 
            doc.setFontStyle('bold');
            doc.text(30, 45, getString("Questions").toUpperCase());
            doc.text(160, 45, getString("Answer").toUpperCase());
            doc.setFontStyle('normal');
            doc.setFontSize(12); 
            j=0;
        }

        var question =  splitter(questionXML.find("overskrift").eq(0).text(), 60);
        var slider = questionXML.find("slider").eq(0);
        var correctAnswer = "";
        var options = questionXML.find("option");
        var answerGiven = "";

        if(slider.length) {
            answerGiven = finalAnswerArray[i][0];
            correctAnswer = slider.attr("correctAnswer");
        } else {
            for(var k=0; k < options.length ; k++){
                if(options.eq(k).attr("score") > 0) {
                    correctAnswer = options.eq(k).text();
                    break;
                }
            }
            answerGiven = options.eq(finalAnswerArray[i][0]).text();
        }

        var linesize = 27;
        doc.setDrawColor(200);
        doc.line(18, 51 + j*linesize, 193, 51 + j*linesize);

        if(correctAnswer == answerGiven) {
            doc.alttext(20, 65 + j*linesize,"✔",18,"#089a00");
        }
        else {
            doc.alttext(20, 65 + j*linesize,"✖",18,"#c93f2b");
        }
        
        doc.text(30, (60 + j*linesize), question) 
        doc.setTextColor(34, 116, 185);

        if(correctAnswer == answerGiven) {
            doc.setTextColor(8, 154, 43);
            doc.text(160, (60 + j*linesize), answerGiven);
        }
        else {
            doc.setTextColor(201, 63, 43);
            doc.text(160, (60 + j*linesize), splitter(getString("YouAnswered")+": "+ answerGiven,20) );
            doc.setTextColor(34, 116, 185);
            doc.text(160, (71 + j*linesize), splitter(getString("RightAnswer")+": " + correctAnswer,20));
        }
        j++;
    }

    doc.save("testResult.pdf");
}