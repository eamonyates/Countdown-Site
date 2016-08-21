//NOTE: Function to start countdown using data from DB collected via ajax
function startCountdown() {

    $.ajax({
        url: "controls/actions.php?action=countdownInfo",
        data: "",
        dataType: 'JSON',
        success: function (result) {

            if (!result) {
                
                var goal = "you add a new countdown";
                
                var d = new Date()
                d.setSeconds(d.getSeconds() + 10);
                
                var startDatetime = new Date();
                var endDatetime = d;
                
            } else {
                
                var goal = result[1];
                var startDatetime = result[3];
                var endDatetime = result[4];

            }
            
            initializeClock('countdownContainer', startDatetime, endDatetime);
            $("#countdownGoalDisplay").html(goal);

        }
    });
};


//NOTE: Function to get countdowns and act upon the data received
function profileGetCountdowns() { 
    
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
                    
                    //NOTE: AJAX request to gather this countdown's info and add it to the value of the input fields
                    
                    $.ajax({
                        type: "POST",
                        url: "controls/actions.php?action=editGrabInfo",
                        data: "countdownId=" + profileEditCountdownId,
                        dataType: "JSON",
                        success: function (resultEditInfo) {
                            
                            console.log(resultEditInfo);
                            console.log(resultEditInfo[0]["enddatetime"]);
                            
                            editCountdownGoal = resultEditInfo[0]["goal"];
                            editEndDateTime = resultEditInfo[0]["enddatetime"];
                            arrayEndDateTime = editEndDateTime.split(" ");
                            arrayEndTime = arrayEndDateTime[1].split(":");
                            
                            if (editCountdownGoal.substr(0,4) === "your") {
                                $("#profileEditCountdownGoal").attr("value", editCountdownGoal.substr(5));
                                $("#profileEditYourGoalRadio").prop("checked", true);
                                
                            } else if (editCountdownGoal.substr(0,3) === "the") {
                                $("#profileEditCountdownGoal").attr("value", editCountdownGoal.substr(4));
                                $("#profileEditTheGoalRadio").prop("checked", true);
                                
                            } else {
                                $("#profileEditCountdownGoal").attr("value", editCountdownGoal);
                                $("#profileEditGoalRadio").prop("checked", true);
                                
                            }
                            
                            $("#profileEditDatepicker").attr("value", arrayEndDateTime[0]);
                            $("#profileEditEndTimeHours option[value='"+arrayEndTime[0]+"']").attr("selected","selected");
                            $("#profileEditEndTimeMinutes option[value='"+arrayEndTime[1]+"']").attr("selected","selected");
                            $("#profileEditEndTimeTZ option[value='"+arrayEndDateTime[2]+"']").attr("selected","selected");
                            $("#profileEditMakePublicCD").prop("checked", true).attr("value", "1");
                            
                        }
                    });
                    

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


//NOTE: Function to get info for your profile
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
        
        $.ajax({
            url: "controls/actions.php?action=fetchOtherCountdownInfo",
            data: '',
            dataType: 'JSON',
            success: function (otherCountdownData) {
                
                //NOTE: Update other countdown info depending on how much is left for each
                
                if (otherCountdownData.length === 0) {
                    
                    $("#otherCountdownsContainer").append('<div class="count"><p>You have no other countdowns yet. Why not add one now?</p></div>');
                    
                } else {
                    
                    for (i = 0; i < otherCountdownData.length; i++) {

                        var otherGoal = otherCountdownData[i]['goal'];
                        var timeLeft = getTimeRemaining(otherCountdownData[i]['enddatetime']);
                        var writtenTimeLeft;

                        if (timeLeft.total < 0) {
                            writtenTimeLeft = "Completed";
                        } else {
                            switch (timeLeft.years) {
                                case 0:
                                    switch (timeLeft.months) {
                                        case 0:
                                            switch (timeLeft.weeks) {
                                                case 0:
                                                    switch (timeLeft.days) {
                                                        case 0:
                                                            writtenTimeLeft = "Only hours left to go";
                                                            break;
                                                        case 1:
                                                            writtenTimeLeft = timeLeft.days + " day to go";
                                                            break;
                                                        default:
                                                            writtenTimeLeft = timeLeft.days + " days to go";
                                                    }
                                                    break;
                                                default:
                                                    switch (timeLeft.days) {
                                                        case 0:
                                                            writtenTimeLeft = timeLeft.weeks + " weeks to go";
                                                            break;
                                                        case 1:
                                                            writtenTimeLeft = timeLeft.weeks + " weeks " + timeLeft.days + " day to go";
                                                            break;
                                                        default:
                                                            writtenTimeLeft = timeLeft.weeks + " weeks " + timeLeft.days + " days to go";
                                                    }     
                                            }
                                            break;
                                        default:
                                            switch (timeLeft.weeks) {
                                                case 0:
                                                    writtenTimeLeft = timeLeft.months + " months to go";
                                                    break;
                                                case 1:
                                                    writtenTimeLeft = timeLeft.months + " months " + timeLeft.weeks + " week to go";
                                                    break;
                                                default:
                                                    writtenTimeLeft = timeLeft.months + " months " + timeLeft.weeks + " weeks to go";
                                            }
                                    }
                                    break;
                                default:
                                    switch (timeLeft.days) {
                                        case 0:
                                            writtenTimeLeft = timeLeft.months + " months to go";
                                            break;
                                        case 1:
                                            writtenTimeLeft = timeLeft.months + " months " + timeLeft.weeks + " week to go";
                                            break;
                                        default:
                                            writtenTimeLeft = timeLeft.months + " months " + timeLeft.weeks + " weeks to go";
                                    }
                            }
                        }

                        $("#otherCountdownsContainer").append('<div class="count" id="otherCountdown'+i+'"><h4>Left until ' + otherGoal + '</h4><p>' + writtenTimeLeft + '</p></div>');

                    }
                }
            }
        });

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