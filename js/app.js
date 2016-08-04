// NOTE: If login button is clicked use AJAX to submit POST request
$("#loginBtn").click(function () {
    $.ajax({
        type: "POST",
        url: "controls/actions.php?action=login",
        data: "email=" + $("#loginEmail").val() + "&password=" + $("#loginPassword").val(),
        success: function (result) {

            if (result == "login") {

                window.location.assign("?page=loggedIn");

            } else {

                $("#loginAlert").html(result).slideDown().delay(2200).slideUp();

            }

        }
    });
});


// NOTE: Switch between password visible and not visible
$('#signUpCheckbox').click(function () {
    if ($(this).prop("checked") === true) {
        $('#signUpPassword').attr("type", "text");
    } else if ($(this).prop("checked") === false) {
        $('#signUpPassword').attr("type", "password");
    }
});


// NOTE: If signup button is clicked use AJAX to submit POST request
$("#signUpBtn").click(function () {
    $.ajax({
        type: "POST",
        url: "controls/actions.php?action=signup",
        data: "email=" + $("#signUpEmail").val() + "&password=" + $("#signUpPassword").val(),
        success: function (result) {

            if (result == "signup") {

                window.location.assign("?page=loggedIn");

            } else {

                $("#signupAlert").html(result).fadeIn().delay(2200).fadeOut();

            }

        }
    });
});


// NOTE: Activate the datepicker function from jQuery
$(".datepicker").each(function () {
    $(this).datepicker({
        inline: true,
        minDate: 0
    });
});


/* NOTE: When the goal input field is activated drop down the options for how to present your goal and update with goal in real time
When the user exits the goal input, if it is empty hide the drop down options otherwise leave them displayed */
$("#countdownGoal").focus(function () {
    $("#goalDescription").slideDown();
    $("#countdownGoal").keyup(function () {
        $(".cdgoal").html($("#countdownGoal").val());
    });
    $("#countdownGoal").blur(function () {
        if (!$("#countdownGoal").val()) {
            $("#goalDescription").slideUp();
        }
    });
});


//NOTE: Change text on edit countdown Modal
$("#profileEditCountdownGoal").focus(function () {
    $("#profileEditGoalDescription").slideDown();
    $("#profileEditCountdownGoal").keyup(function () {
        $(".cdgoal").html($("#profileEditCountdownGoal").val());
    });
    $("#profileEditCountdownGoal").blur(function () {
        if (!$("#profileEditCountdownGoal").val()) {
            $("#profileEditGoalDescription").slideUp();
        }
    });
});


// NOTE: Set Make Primary Countdown Checkbox value to True if checked
$('.makePrimaryCD').click(function () {
    if ($(this).prop("checked") === true) {
        $(this).attr("value", "1");
    } else {
        $(this).attr("value", "0");
    }
});


// NOTE: Set Make Public Countdown Checkbox value to True if checked
$('.makePublicCD').click(function () {
    if ($(this).prop("checked") === true) {
        $(this).attr("value", "1");
    } else {
        $(this).attr("value", "0");
    }
});


// NOTE: If Add Countdown button is clicked, validate form and use AJAX to submit POST request
$("#addCountdownBtn").click(function () {

    var errorMsg = "";

    if (!$("#countdownGoal").val()) {
        errorMsg = "Please enter a goal for your countdown";
    } else if (!$("#loggedInDatepicker").val() || !$("#endTimeHours").val() || !$("#endTimeMinutes").val() || !$("#endTimeTZ").val()) {
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
            data: "countdownGoal=" + goalAndDescription + "&startDateTime=" + startDatetime + "&endDateTime=" + encodedEndDateTime + "&makePrimaryCD=" + $("#makePrimaryCD").val() + "&makePublicCD=" + $("#makePublicCD").val(),
            success: function (result) {

                if (result === "addedCountdown") {

                    $("#countdownAddedAlert").html("Added your new countdown successfully").fadeIn().delay(2500).fadeOut();

                    setTimeout(function () {
                        window.location.assign("?page=loggedIn");
                    }, 2800);

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


//NOTE: Make Countdown Public From LoggedIn page
$("#makePublicLink").click(function () {
    $.ajax({
        type: "POST",
        url: "controls/actions.php?action=makePublic",
        data: "",
        success: function (result) {

            if (result === "countdownNowPublic") {

                $("#countdownPublicAlert").addClass("alert-success").html("Your countdown is now public").fadeIn().delay(2500).fadeOut();

            } else {

                $("#countdownPublicAlert").addClass("alert-danger").html(result).fadeIn().delay(2500).fadeOut();

            }

        }
    });
});


//NOTE: Function to start countdown using data from DB collected via ajax
function startCountdown() {

    $.ajax({
        url: "controls/actions.php?action=countdownInfo",
        data: "",
        dataType: 'JSON',
        success: function (result) {

            var goal = result[1];
            var startDatetime = result[3];
            var endDatetime = result[4];



            initializeClock('countdownContainer', startDatetime, endDatetime);
            $("#countdownGoalDisplay").html(goal);

        }
    });
};


function profileGetCountdowns() {

    //TODO: Logged in page other countdowns section needs updating
    //TODO: Have modal carry the current info for the right countdown when editing them...
    
    return $.ajax({
        url: "controls/actions.php?action=fetchCountdowns",
        data: '',
        dataType: 'JSON',
        success: function (result) {

            if (result.length === 0) {

                $('#profileCountdownsError').html("You currently have no countdowns to show, why don't you add a new one now?");

            } else {

                for (i = 0; i < result.length; i++) {

                    var goal = result[i]['goal'];
                    var profileCountdownId = result[i]['id'];

                    //NOTE: This creates the striped layout
                    if (i === 0 || i % 2 === 0) {
                        $("#profileCountdowns").append('<div class="container individualCountdown striped" id="countdownContainer' + i + '" data-countdown="' + profileCountdownId + '"></div>');
                    } else {
                        $("#profileCountdowns").append('<div class="container individualCountdown" id="countdownContainer' + i + '" data-countdown="' + profileCountdownId + '"></div>');
                    }

                    //NOTE: Add all countdowns
                    $("#countdownContainer" + i).append('<div class="row"><div class="col-xs-12"><p id="profileCountdownTime"><span class="years"></span> years | <span class="months"></span> months | <span class="weeks"></span> weeks | <span class="days"></span> days - <span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span></p></div><div class="col-xs-12"><h6>Left until ' + goal + '</h6><p>Your Countdown Progress is <span class="progressText"></span></p><progress class="progress progressBar profileProgressBar" value="75" max="100"></progress></div><div class="col-xs-12 profileCountdownBtns profileCountdownBtnsDelete"><button class="btn btn-info-outline profileEditCountdown" data-edit-id="' + profileCountdownId + '" data-toggle="modal" data-target="#profileEditCountdownModal">edit...</button><button class="btn btn-danger profileDeleteCountdown" data-delete-id="' + profileCountdownId + '">delete</button></div></div>');

                }

                //NOTE: Initializes all countdowns
                for (i = 0; i < result.length; i++) {

                    var startDatetime = result[i]['startdatetime'];
                    var endDatetime = result[i]['enddatetime'];

                    initializeClock('countdownContainer' + i, startDatetime, endDatetime);

                }

                //NOTE: Function to delete countdown
                $(".profileDeleteCountdown").click(function () {

                    var containerId = $(this).data("id");

                    $.ajax({
                        type: "POST",
                        url: "controls/actions.php?action=deleteCountdown",
                        data: "countdownId=" + $(this).data("deleteId"),
                        success: function (resultDelete) {

                            if (resultDelete === "countdownDeleted") {

                                $("#profileCountdownAlert").addClass("alert-success").html("Your countdown has been successfully deleted").fadeIn().delay(2500).fadeOut();

                                $('*[data-countdown="' + containerId + '"]').fadeOut();

                            } else {

                                $("#profileCountdownAlert").addClass("alert-danger").html("We couldn't delete your countdown right now, please try again later").fadeIn().delay(2500).fadeOut();

                            }

                        }
                    });
                });


                //NOTE: Function to edit countdown
                $(".profileEditCountdown").click(function () {

                    profileEditCountdownId = $(this).data("editId");

                    $(".exitEditCountdownModal").click(function () {
                        location.reload();
                    });

                    $("#editCountdownBtn").click(function () {

                        errorMsg = "";

                        if (!$("#profileEditCountdownGoal").val()) {
                            errorMsg = "Please enter a goal for your countdown";
                        } else if (!$("#profileEditDatepicker").val() || !$("#profileEditEndTimeHours").val() || !$("#profileEditEndTimeMinutes").val() || !$("#profileEditEndTimeTZ").val()) {
                            errorMsg = "Please enter an end date, time and timezone for your countdown";
                        } else {

                            var countdownGoal = $("#profileEditCountdownGoal").val();
                            var goalDescription = $('input[name="profileEditGoalRadios"]:checked').val();
                            var goalAndDescription = "";

                            var d = new Date();
                            var startDatetime = d.getUTCMonth() + "/" + d.getUTCDate() + "/" + d.getUTCFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds() + " UTC-0000";

                            console.log(startDatetime);

                            var endDatetime = $("#profileEditDatepicker").val() + " " + $("#profileEditEndTimeHours").val() + ":" + $("#profileEditEndTimeMinutes").val() + ":00 " + $("#profileEditEndTimeTZ").val();
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
                                url: "controls/actions.php?action=editCountdown",
                                data: "countdownId=" + profileEditCountdownId + "&countdownGoal=" + goalAndDescription + "&startDateTime=" + startDatetime + "&endDateTime=" + encodedEndDateTime + "&makePrimaryCD=" + $("#profileEditMakePrimaryCD").val() + "&makePublicCD=" + $("#profileEditMakePublicCD").val(),
                                success: function (result) {

                                    if (result === "countdownEdited") {

                                        $("#profileEditCountdownEditedAlert").html("Your countdown has been updated successfully").fadeIn().delay(2500).fadeOut();

                                        setTimeout(function () {
                                            location.reload();
                                        }, 2800);

                                    } else {

                                        $("#profileEditCountdownAlert").html(result).fadeIn().delay(2500).fadeOut();

                                    }

                                }
                            });

                        }

                        if (errorMsg != "") {
                            $("#profileEditCountdownAlert").html(errorMsg).fadeIn().delay(2500).fadeOut();
                        }

                    });

                });

            }

        }

    });
}


function profileGetInfo() {

    return $.ajax({
        url: "controls/actions.php?action=fetchPersonalInfo",
        data: '',
        dataType: 'JSON',
        success: function (personalInfo) {

            $("#infoFirstName").html(personalInfo[0]['firstName']);
            $("#infoLastName").html(personalInfo[0]['lastName']);
            $("#infoEmail").html(personalInfo[0]['email']);

            //NOTE: Update Edit Info on profile page
            $('#editPersonalInfo').click(function () {

                if ($(this).val() === "edit") {

                    $("#infoFirstName").html('<input type="text" class="form-control" id="infoFirstNameEditable" placeholder="Firstname..." value="' + personalInfo[0]['firstName'] + '">');

                    $("#infoLastName").html('<input type="text" class="form-control" id="infoLastNameEditable" placeholder="Lastname..." value="' + personalInfo[0]['lastName'] + '">');

                    $("#infoEmail").html('<input type="text" class="form-control" id="infoEmailEditable" placeholder="Email..." value="' + personalInfo[0]['email'] + '">');

                    $("#editPersonalInfo").attr("value", "save").html("save...");

                } else if ($("#editPersonalInfo").val() === "save") {

                    $("#editPersonalInfo").attr("value", "edit").html("edit info...");

                    $.ajax({
                        type: "POST",
                        url: "controls/actions.php?action=updatePersonalInfo",
                        data: "firstName=" + $("#infoFirstNameEditable").val() + "&lastName=" + $("#infoLastNameEditable").val() + "&email=" + $("#infoEmailEditable").val(),
                        success: function (updateResult) {

                            if (updateResult === "infoUpdated") {

                                $("#profileCountdownAlert").addClass("alert-success").html("Your information has been successfully updated").fadeIn().delay(2500).fadeOut();    
                                
                            } else {
                                
                                $("#profileCountdownAlert").addClass("alert-danger").html("We couldn't edit your information right now, please try again later").fadeIn().delay(2500).fadeOut();
                                
                            }

                        }

                    });

                    $("#infoFirstName").html($("#infoFirstNameEditable").val());
                    $("#infoLastName").html($("#infoLastNameEditable").val());
                    $("#infoEmail").html($("#infoEmailEditable").val());

                }

            });

        }
    });

}




//NOTE: Function to run when the profile page is selected
function checkPage() {

    var profileEditCountdownId;
    var errorMsg;

    if (getUrlVars()["page"] === "loggedIn") {

        startCountdown();

    } else if (getUrlVars()["page"] === "profile") {

        $.when(profileGetInfo(), profileGetCountdowns()).done();

    } else if (getUrlVars()["page"] === "inspiration") {

        $.ajax({
            url: "controls/actions.php?action=fetchPublicCountdowns",
            data: '',
            dataType: 'JSON',
            success: function (result) {

                //WORK IN PROGRESS
                for (i = 0; i < result.length; i++) {

                    var goal = result[i]['goal'];
                    var profileCountdownId = result[i]['id'];

                    //NOTE: This creates the striped layout
                    if (i === 0 || i % 2 === 0) {
                        $("#publicCountdowns").append('<div class="container individualCountdown striped" id="publicCountdownContainer' + i + '" data-countdown="' + profileCountdownId + '"></div>');
                    } else {
                        $("#publicCountdowns").append('<div class="container individualCountdown" id="publicCountdownContainer' + i + '" data-countdown="' + profileCountdownId + '"></div>');
                    }

                    //NOTE: Add all countdowns
                    $("#publicCountdownContainer" + i).append('<div class="row"><div class="col-xs-12"><p id="publicCountdownTime"><span class="years"></span> years | <span class="months"></span> months | <span class="weeks"></span> weeks | <span class="days"></span> days - <span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span></p></div><div class="col-xs-12"><h6>Left until ' + goal + '</h6><p>Your Countdown Progress is <span class="progressText"></span></p><progress class="progress progressBar profileProgressBar" value="75" max="100"></progress></div></div>');

                }

                //NOTE: Initializes all countdowns
                for (i = 0; i < result.length; i++) {

                    var startDatetime = result[i]['startdatetime'];
                    var endDatetime = result[i]['enddatetime'];

                    initializeClock('publicCountdownContainer' + i, startDatetime, endDatetime);

                }

            }

        });

    }

}


checkPage();