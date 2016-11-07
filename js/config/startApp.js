
//Loading application steps
//1. Open the app splash screen
var percentageLoading = 0;
var count = 0;
var maxCount = 40;
var maxPercentage = 90;
var rangeRandom = 5;
var timeInterval = 50;

//2. Loading the progress message (initial step) show progress bar and message , hide retry button 
document.getElementById('lblMessageLoadingOnloadjs').innerText = 'Please wait while we are connecting you to Learning Breeze Cloud...';
document.getElementById('lblMessageLoadingOnloadjs').style.color = 'black';
document.getElementById('btnReloadPage').style.display = 'none';

//add mathjax
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS-MML_SVG";
document.getElementsByTagName("head")[0].appendChild(s);

document.getElementById('splashContent').style.display = 'block';

// create progress circle
drawProgressCircle(0, false);

//3. Check whether the internet connection is available
var loadingJsPage = setInterval(function () {

    var isOnline = navigator.onLine;

    if (!isOnline) {
        //3.1 if not available, inform the message "We couldn't connect you to Learning Breeze Cloud due to unavailable internet connection. Please verify whether your device connecting to the internet and reopen app again."
        document.getElementById('lblMessageLoadingOnloadjs').innerHTML = "We couldn't connect you to Learning Breeze Cloud due to unavailable internet connection.<br /> Please verify whether your device connecting to the internet and reopen app again.";
        document.getElementById('lblMessageLoadingOnloadjs').style.color = 'red';

        //3.2 offer user to reload app. and get back to first step, hide progress bar and display retry button
        document.getElementById('btnReloadPage').style.display = 'block';

        clearInterval(loadingJsPage);

    }
    else {

        //otherwise, continue loading progress and message (later step) , stop random when percentage more than 90        
        if (percentageLoading < maxPercentage) {
            //percentageLoading = percentageLoading + Math.floor(Math.random() * rangeRandom);
            percentageLoading = percentageLoading + 1;
        }
        else {
            count = count + 1;
            if (count > maxCount) {
                console.debug('clearInterval');
                // stop loop
                clearInterval(loadingJsPage);

                // display message 
                document.getElementById('lblMessageLoadingOnloadjs').innerHTML = "We apologize for unable to connect you to Learning Breeze Cloud, please check your internet connection and try again.";
                document.getElementById('lblMessageLoadingOnloadjs').style.color = 'red';

                // display button for reload page
                document.getElementById('btnReloadPage').style.display = 'block';
            }
        }

        if (document.getElementById('progressradial')) {
            drawProgressCircle(percentageLoading, false);
        }

    }


}, timeInterval);

// reload page
function reloadPage() {

    //clear message
    document.getElementById('lblMessageLoadingOnloadjs').innerHTML = "";

    // hide reload button
    document.getElementById('btnReloadPage').style.display = 'none';

    //reload
    location.reload();
};

function drawProgressCircle(percent, isFinish) {

    if (isFinish) {
        var blockWait = 2000 / (percent - percentageLoading);

        var count = 1;
        for (var i = percentageLoading + 1; i <= percent; i++) {
            (function (i) {
                setTimeout(function () {
                    document.getElementById('pnlProgressCirCleTextLoadJs').innerHTML = i;
                    document.getElementById('progressradial').className = 'progress-radial progress-' + i;
                }, blockWait + count)
            })(i);
            
            count = count + 20;
        }
    }
    else {
        document.getElementById('progressradial').className = 'progress-radial progress-' + percent;
        document.getElementById('pnlProgressCirCleTextLoadJs').innerHTML = percent;
    }
};





