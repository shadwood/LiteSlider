var currentImgCounter = 0;
var galleryBodyWidth ;
var wrap;

function gallery() {
    var imgs = document.querySelectorAll(".wrap img");
    var galleryBody = document.getElementsByClassName("gallery-body")[0];
    var galleryBodyWidth = galleryBody.clientWidth;
    wrap = document.getElementsByClassName("wrap")[0];
    imgs.forEach(function(img){
        var imgWidth = img.clientWidth;
        var margin = (galleryBodyWidth - imgWidth) /2;
        img.style.marginLeft=margin+"px";
        img.style.marginRight=margin+"px";
    });

    var rButton = document.getElementById("r-button");
    var lButton = document.getElementById("l-button");


    wrap.style.width = galleryBodyWidth * imgs.length +"px";


    function parseTranslateValue(string){
        var value="";
        string.split("").forEach(function(char){if(parseInt(char)||parseInt(char)===0)value+=char});
        return parseInt(value);
    }

    lButton.onclick=function(){
        wrap.style.transition="transform 1000ms linear 0s ";
        var transformValue = wrap.style.transform;
        var translateValue = transformValue ? parseTranslateValue(transformValue) : 0;
        if (translateValue>0){
            translateValue-=galleryBodyWidth;
            wrap.style.transform = "translateX(-"+translateValue+"px)";
            currentImgCounter--;
        }
        else {
            translateValue = galleryBodyWidth * imgs.length - galleryBodyWidth ;
            wrap.style.transform = "translateX(-"+translateValue+"px)";
            currentImgCounter=imgs.length-1;
        }
    };


    rButton.onclick=function(){
        wrap.style.transition="transform 1000ms linear 0s ";
        var transformValue = wrap.style.transform;
        var translateValue = transformValue ? parseTranslateValue(transformValue) : 0;
        if (translateValue< parseInt(wrap.style.width) - galleryBodyWidth){
            translateValue+=galleryBodyWidth;
            wrap.style.transform = "translateX(-"+translateValue+"px)";
            currentImgCounter++;
        }
        else {
            translateValue = 0;
            wrap.style.transform = "translateX(-"+translateValue+"px)";
            currentImgCounter = 0;
        }
    };

}

function resize() {
    wrap.style.transition="transform 0ms linear 0s ";
    gallery();
    wrap.style.transform = "translateX(-"+ (currentImgCounter * galleryBodyWidth )+"px)";
}

window.onload= gallery;
window.onresize = resize;





