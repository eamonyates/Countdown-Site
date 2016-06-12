// If login button is clicked use AJAX to submit POST request
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


// Switch between password visible and not visible
$('#signUpCheckbox').click(function() {
    if($(this).prop("checked") === true) { 
        $('#signUpPassword').attr("type", "text");
    } else if ($(this).prop("checked") === false) {
        $('#signUpPassword').attr("type", "password");
    }
});


// If signup button is clicked use AJAX to submit POST request
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

$("#datepicker").datepicker({
    inline: true,
    minDate: 0
});

$('.timepicker').wickedpicker();