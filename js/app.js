// NOTE: If login button is clicked use AJAX to submit POST request
$("#loginBtn").click(function() {
    $.ajax({
        type: "POST",
        url: "controls/actions.php?action=login",
        data: "email=" + $("#loginEmail").val()+ "&password=" + $("#loginPassword").val(),
        success: function(result) {
            
            if (result == "login") {
                
                window.location.assign("?page=loggedIn");
                
            } else {
                   
                $("#loginAlert").html(result).slideDown().delay(2200).slideUp();
                
            }
            
        }
    });
});


// NOTE: Switch between password visible and not visible
$('#signUpCheckbox').click(function() {
    if($(this).prop("checked") === true) { 
        $('#signUpPassword').attr("type", "text");
    } else if ($(this).prop("checked") === false) {
        $('#signUpPassword').attr("type", "password");
    }
});


// NOTE: If signup button is clicked use AJAX to submit POST request
$("#signUpBtn").click(function() {
    $.ajax({
        type: "POST",
        url: "controls/actions.php?action=signup",
        data: "email=" + $("#signUpEmail").val()+ "&password=" + $("#signUpPassword").val(),
        success: function(result) {
            
            if (result == "signup") {
                
                window.location.assign("?page=loggedIn");
                
            } else {
                
                $("#signupAlert").html(result).fadeIn().delay(2200).fadeOut();
                
            }
            
        }
    });
});


// NOTE: Activate the datepicker function from jQuery
$("#datepicker").datepicker({
    inline: true,
    minDate: 0
});


/* NOTE: When the goal input field is activated drop down the options for how to present your goal and update with goal in real time
When the user exits the goal input, if it is empty hide the drop down options otherwise leave them displayed */
$("#countdownGoal").focus(function() {
    $("#goalDescription").slideDown();
    $("#countdownGoal").keyup(function() {
        $(".cdgoal").html($("#countdownGoal").val());
    });
    $("#countdownGoal").blur(function() {
        if (!$("#countdownGoal").val()) {
            $("#goalDescription").slideUp();
        }
    });
});


// NOTE: Set Make Primary Countdown Checkbox value to True if checked
$('#makePrimaryCD').click(function() {
    if($(this).prop("checked") === true) { 
        $(this).attr("value", "1");
    } else {
        $(this).attr("value", "0");
    }
});

// NOTE: Set Make Public Countdown Checkbox value to True if checked
$('#makePublicCD').click(function() {
    if($(this).prop("checked") === true) { 
        $(this).attr("value", "1");
    } else {
        $(this).attr("value", "0");
    }
});


// NOTE: If Add Countdown button is clicked, validate form and use AJAX to submit POST request
$("#addCountdownBtn").click(function() {
    
    var errorMsg = "";
    
    if (!$("#countdownGoal").val()) {
        errorMsg = "Please enter a goal for your countdown";
    } else if (!$("#datepicker").val() || !$("#endTimeHours").val() || !$("#endTimeMinutes").val() || !$("#endTimeTZ").val()) {
        errorMsg = "Please enter an end date, time and timezone for your countdown";
    } else {
        
        var countdownGoal = $("#countdownGoal").val();
        var goalDescription = $('input[name="goalRadios"]:checked').val();
        var goalAndDescription = "";
        
        var d = new Date();
        var startDatetime = d.getUTCMonth() + "/" + d.getUTCDate() + "/" + d.getUTCFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds() + " UTC-0000";
        
        var endDatetime = $("#datepicker").val() + " " + $("#endTimeHours").val() + ":" + $("#endTimeMinutes").val() + ":00 " + $("#endTimeTZ").val();
        var encodedEndDateTime = encodeURIComponent(endDatetime);
        
        // NOTE: Apply goal descriptor
        if (goalDescription == "yourGoal") {
            goalAndDescription = "your " + countdownGoal + "!";
        } else if (goalDescription == "theGoal") {
            goalAndDescription = "the " + countdownGoal + "!";
        } else if (goalDescription == "goal") {
            goalAndDescription = countdownGoal + "!";
        }
        
        // NOTE: AJAX request to add countdown to DB
        $.ajax({
            type: "POST",
            url: "controls/actions.php?action=addCountdown",
            data: "countdownGoal=" + goalAndDescription + "&startDateTime=" + startDatetime + "&endDateTime=" + encodedEndDateTime + "&makePrimaryCD=" + $("#makePrimaryCD").val() + "&makePublicCD=" +$("#makePublicCD").val(),
            success: function(result) {
                
                if (result == "addedCountdown") {

                    $("#countdownAddedAlert").html("Added your new countdown successfully").fadeIn().delay(2500).fadeOut();
                    
                    setTimeout( function() { 
                        window.location.assign("?page=loggedIn");
                    }, 2800 );

                } else {
                    
                    $("#countdownAlert").html(result).fadeIn().delay(2500).fadeOut();
                    
                }
            } 
        });
    }
    
    if (errorMsg != "") {
        $("#countdownAlert").html(errorMsg).fadeIn().delay(2500).fadeOut();
    }

});


//NOTE: Function to start countdown using data from DB collected via ajax
function startCountdown() {
        
    $.ajax({                                      
        url: "controls/actions.php?action=countdownInfo",
        data:"",
        dataType:'JSON',
        success: function(result) {
            
            var goal = result[1];
            var startDatetime = result[3];
            var endDatetime = result[4];
            
            initializeClock('countdown', startDatetime, endDatetime);
            $("#countdownGoalDisplay").html(goal);

        }
    });     
};


startCountdown();