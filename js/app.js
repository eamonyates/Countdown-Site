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


// NOTE: If Add Countdown button is clicked, validate form and use AJAX to submit POST request
$("#addCountdownBtn").click(function() {
    
    var errorMsg = "";
    
    if (!$("#countdownGoal").val()) {
        errorMsg = "Please enter a goal for your countdown";
    } else if (!$("#datepicker").val() || !$("#endTimeHours").val() || !$("#endTimeMinutes").val() || !$("#endTimeTZ").val()) {
        errorMsg = "Please enter an end date and time for your countdown";
    } else {

        $.ajax({
            type: "POST",
            url: "controls/actions.php?action=addCountdown",
            data: "countdownGoal=" + $("#countdownGoal").val() + "&goalDesc=" + $('input[name="goalRadios"]:checked').val() + "&endDateTime=" + $("#datepicker").val() + " " + $("#endTimeHours").val() + ":" + $("#endTimeMinutes").val() + ":00 " + $("#endTimeTZ").val(),
            success: function(result) {

                alert(result);
                
                if (result == "addCountdown") {

                    //window.location.assign("?page=loggedIn");

                } 
            } 
        });
    }
    
    if (errorMsg != "") {
        $("#countdownAlert").html(errorMsg).fadeIn().delay(2500).fadeOut();
    }
    
});