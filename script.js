function getGallery(selector) {

    var currentImgCounter = 0;
    var galleryBodyWidth;
    var wrap;

    function gallery() {
        var imgs = document.querySelectorAll("#"+selector +" .wrap img");
        var galleryBody = document.querySelector("#"+selector +" .gallery-body");
        var galleryBodyWidth = galleryBody.clientWidth;
        wrap = document.querySelector("#"+selector +" .wrap");
        imgs.forEach(function (img) {
            var imgWidth = img.clientWidth;
            var margin = (galleryBodyWidth - imgWidth) / 2;
            img.style.marginLeft = margin + "px";
            img.style.marginRight = margin + "px";
        });

        var rButton = document.querySelector("#" + selector + " .r-button");
        var lButton = document.querySelector("#" + selector + " .l-button");


        wrap.style.width = galleryBodyWidth * imgs.length + "px";


        function parseTranslateValue(string) {
            var value = "";
            string.split("").forEach(function (char) {
                if (parseInt(char) || parseInt(char) === 0) value += char
            });
            return parseInt(value);
        }

        lButton.onclick = function () {
            wrap.style.transition = "transform 1000ms linear 0s ";
            var transformValue = wrap.style.transform;
            var translateValue = transformValue ? parseTranslateValue(transformValue) : 0;
            if (translateValue > 0) {
                translateValue -= galleryBodyWidth;
                wrap.style.transform = "translateX(-" + translateValue + "px)";
                currentImgCounter--;
            } else {
                translateValue = galleryBodyWidth * imgs.length - galleryBodyWidth;
                wrap.style.transform = "translateX(-" + translateValue + "px)";
                currentImgCounter = imgs.length - 1;
            }
        };


        rButton.onclick = function () {
            wrap.style.transition = "transform 1000ms linear 0s ";
            var transformValue = wrap.style.transform;
            var translateValue = transformValue ? parseTranslateValue(transformValue) : 0;
            if (translateValue < parseInt(wrap.style.width) - galleryBodyWidth) {
                translateValue += galleryBodyWidth;
                wrap.style.transform = "translateX(-" + translateValue + "px)";
                currentImgCounter++;
            } else {
                translateValue = 0;
                wrap.style.transform = "translateX(-" + translateValue + "px)";
                currentImgCounter = 0;
            }
        };
        return {'currentImgCounter' : currentImgCounter, 'galleryBodyWidth' : galleryBodyWidth}
    }

    function resize() {
        wrap.style.transition = "transform 0ms linear 0s ";
        let gal = gallery();
        wrap.style.transform = "translateX(-" + (gal.currentImgCounter * gal.galleryBodyWidth) + "px)";
    }

    window.addEventListener("load", gallery);
    window.addEventListener("resize", resize);

}

getGallery("gallery");

/*getGallery("gallery2");*/
