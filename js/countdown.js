/////////////////////////////////
// NOTE: Countdown clock below //
/////////////////////////////////

// DEFAULT VALUES:
//var deadline = '08/24/2016 15:30:25 UTC+0100';
//var start = '04/21/2016 08:30:25 UTC-0000'; // NOTE: Only used for working out progress

// TEST:
//var t = Date.parse(deadline) - Date.parse(new Date());
//console.log('deadline:' + deadline);
//console.log('now:' + new Date());
//console.log(t);
//console.log(start);


//NOTE: Function to read the GET variable in the URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24) % 7);
    var weeks = Math.floor(t / (1000 * 60 * 60 * 24 * 7) % 4.34857143); // NOTE: The average gregorian month is 30.44 days. If you divide 30.44 by 7, the number of days in a week, you get 4.34857143 weeks in a month
    
    var months = Math.floor(t / (1000 * 60 * 60 * 24 * 7 * 4.34857143) % 12);
    var years = Math.floor(t / (1000 * 60 * 60 * 24 * 7 * 4.34857143 * 12));

    return {
        'total': t,
        'years': years,
        'months': months,
        'weeks': weeks,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, starttime, endtime) {

    var clock = document.getElementById(id);

    var yearsSpan = clock.querySelector('.years');
    var monthsSpan = clock.querySelector('.months');
    var weeksSpan = clock.querySelector('.weeks');
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var total = Date.parse(endtime) - Date.parse(starttime);
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {

            yearsSpan.innerHTML = ('00');
            monthsSpan.innerHTML = ('00');
            weeksSpan.innerHTML = ('00');
            daysSpan.innerHTML = ('00');
            hoursSpan.innerHTML = ('00');
            minutesSpan.innerHTML = ('00');
            secondsSpan.innerHTML = ('00');

            clearInterval(timeinterval);

        } else {

            yearsSpan.innerHTML = ('0' + t.years).slice(-2);
            monthsSpan.innerHTML = ('0' + t.months).slice(-2);
            weeksSpan.innerHTML = ('0' + t.weeks).slice(-2);
            daysSpan.innerHTML = ('0' + t.days).slice(-2);
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        }

        function percentComplete(total) {

            var complete = Date.parse(new Date()) - Date.parse(starttime);
            var percent = 0;
            
            /*
            function setPercent(percent) {
                document.getElementById('progressText').innerHTML = percent + '%';
                document.getElementById('progressBar').setAttribute('value', percent);
                document.getElementById('progressBar').innerHTML = ('value', percent + '%');

                if (percent > 50) {
                    document.getElementById('progressBar').className += " " + "progress-success";
                } else {
                    document.getElementById('progressBar').className += " " + "progress-warning";
                }

            }
            */
            
            function setPercent(percent) {
                
                if (getUrlVars()["page"] === "profile") {
                
                    var progressText = clock.querySelector('.progressText');
                    var progressBar = clock.querySelector('.progressBar');
                
                } else if (getUrlVars()["page"] === "loggedIn") {
                    
                    var progressText = document.getElementById('countdownProgress').querySelector('.progressText');
                    var progressBar = document.getElementById('countdownProgress').querySelector('.progressBar');
                    
                }
                
                progressText.innerHTML = percent + '%';
                progressBar.setAttribute('value', percent);
                progressBar.innerHTML = ('value', percent + '%');

                if (percent >= 50 && percent < 100) {
                    progressBar.className += " " + "progress-warning";
                } else if (percent < 50) {
                    progressBar.className += " " + "progress-danger";
                } else {
                    progressBar.className += " " + "progress-success";
                }

            }

            if (complete >= total) {

                percent = 100.00;
                setPercent(percent);

            } else {

                percent = parseFloat(Math.round(((complete / total) * 100) * 100) / 100).toFixed(2);
                setPercent(percent);

            }
        }
        
        percentComplete(total);
        
    }

    
    updateClock(); // NOTE: run function once at first to avoid delay
    var timeinterval = setInterval(updateClock, 1000);
}

// INITIALIZATION HANDLED IN APP.js
//initializeClock('countdown', start, deadline);