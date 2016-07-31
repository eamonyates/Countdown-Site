<div class="alert" id="profileCountdownAlert"></div>

<div class="content">
    <div class="container" id="profileInfo">
        <div class="row" id="personalInfo">
            <div class="col-lg-4">
                <div class="pull-lg-left" id="profilePicture"></div>
            </div>
            <div class="col-lg-8">
                <h2>Personal Info</h2>
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row">First Name</th>
                            <td id="infoFirstName"></td>
                        </tr>
                        <tr>
                            <th scope="row">Last Name</th>
                            <td id="infoLastName"></td>
                        </tr>
                        <tr>
                            <th scope="row">Email Address</th>
                            <td id="infoEmail"></td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-info-outline pull-xs-right" id="editPersonalInfo">edit info...</button> 
                <!-- TODO: Add edit countdown interaction and feed to database -->
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-xs-12"><h1 id="countdownHead">Countdowns</h1></div>
        </div>
    </div>

    <section id="profileCountdowns">
        <div class="container">
            <div class="row">
                <div class="col-xs-12" id="profileCountdownsError"></div>
            </div>
        </div>
    </section>

  
   <!-- NOTE: Edit Countdown Modal -->
    <div class="modal fade" id="profileEditCountdownModal" tabindex="-1" role="dialog" aria-labelledby="addCountdownLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" id="editCountdown-modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="exitEditCountdownModal">&times;</span>
                    </button>
                    <h4 class="modal-title" id="profileEditCountdownModalLabel">Edit Your Countdown</h4>
                </div>
                <div class="modal-body">
                    
                    <div class="alert alert-danger" id="profileEditCountdownAlert"></div>
                    <div class="alert alert-success" id="profileEditCountdownEditedAlert"></div>

                    <form>

                        <div class="form-group row">
                            <label for="profileEditCountdownGoal" class="col-sm-2 form-control-label">Your Goal</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" class="countdownGoal" id="profileEditCountdownGoal" placeholder="The goal of your countdown...">
                            </div>
                        </div>

                        <div class="form-group row" id="profileEditGoalDescription">
                            <label class="col-sm-2">Which do you prefer?</label>
                            <div class="col-sm-10">
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="profileEditGoalRadios" id="profileEditYourGoalRadio" value="yourGoal" checked> left until your <span class="cdgoal"></span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="profileEditGoalRadios" id="profileEditTheGoalRadio" value="theGoal"> left until the <span class="cdgoal"></span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="profileEditGoalRadios" id="profileEditGoalRadio" value="goal"> left until <span class="cdgoal"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="datepicker" class="col-sm-2 form-control-label">End Date</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control datepicker" id="profileEditDatepicker" placeholder="Choose a date...">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="timepicker" class="col-sm-2 form-control-label">End Time</label>
                            <div class="col-sm-10">
                                <select class="c-select" id="profileEditEndTimeHours">
                                    <option disabled selected>Hours</option>
                                    <?php for ($hours = 0; $hours <= 23; $hours++) { 
                                        $paddedHours = sprintf("%02d", $hours);
                                        ?>

                                        <option value="<?php echo $paddedHours; ?>">
                                            <?php echo $paddedHours; ?>
                                        </option>
                                        
                                    <?php } ?>
                                </select>

                                <select class="c-select" id="profileEditEndTimeMinutes">
                                    <option disabled selected>Minutes</option>
                                    <?php for ($minutes = 0; $minutes <= 59; $minutes++) { 
                                        $paddedMinutes = sprintf("%02d", $minutes);
                                        ?>
                                        <option value="<?php echo $paddedMinutes; ?>">
                                            <?php echo $paddedMinutes; ?>
                                        </option>
                                    <?php } ?>
                                </select>

                                <select class="c-select" id="profileEditEndTimeTZ">
                                    <option disabled selected>Select Timezone</option>
                                    <option value="UTC-1200">UTC -12:00</option>
                                    <option value="UTC-1100">UTC -11:00</option>
                                    <option value="UTC-1000">UTC -10:00 (Hawaii)</option>
                                    <option value="UTC-0930">UTC -09:30</option>
                                    <option value="UTC-0900">UTC -09:00</option>
                                    <option value="UTC-0800">UTC -08:00 (Los Angeles)</option>
                                    <option value="UTC-0700">UTC -07:00</option>
                                    <option value="UTC-0600">UTC -06:00 (Chicago)</option>
                                    <option value="UTC-0500">UTC -05:00 (New York)</option>
                                    <option value="UTC-0400">UTC -04:00</option>
                                    <option value="UTC-0330">UTC -03:30</option>
                                    <option value="UTC-0300">UTC -03:00 (Rio)</option>
                                    <option value="UTC-0200">UTC -02:00</option>
                                    <option value="UTC-0100">UTC -01:00</option>
                                    <option value="UTC-0000">UTC +00:00 (London)</option>
                                    <option value="UTC+0100">UTC +01:00 (London - BST)</option>
                                    <option value="UTC+0200">UTC +02:00</option>
                                    <option value="UTC+0300">UTC +03:00 (Moscow)</option>
                                    <option value="UTC+0330">UTC +03:30</option>
                                    <option value="UTC+0400">UTC +04:00</option>
                                    <option value="UTC+0430">UTC +04:30</option>
                                    <option value="UTC+0500">UTC +05:00</option>
                                    <option value="UTC+0530">UTC +05:30 (New Delhi)</option>
                                    <option value="UTC+0545">UTC +05:45</option>
                                    <option value="UTC+0600">UTC +06:00</option>
                                    <option value="UTC+0630">UTC +06:30</option>
                                    <option value="UTC+0700">UTC +07:00</option>
                                    <option value="UTC+0800">UTC +08:00 (Shanghai)</option>
                                    <option value="UTC+0830">UTC +08:30</option>
                                    <option value="UTC+0845">UTC +08:45</option>
                                    <option value="UTC+0900">UTC +09:00 (Tokyo)</option>
                                    <option value="UTC+0930">UTC +09:30</option>
                                    <option value="UTC+1000">UTC +10:00 (Sydney)</option>
                                    <option value="UTC+1030">UTC +10:30</option>
                                    <option value="UTC+1100">UTC +11:00</option>
                                    <option value="UTC+1200">UTC +12:00 (New Zealand)</option>
                                    <option value="UTC+1245">UTC +12:45</option>
                                    <option value="UTC+1300">UTC +13:00</option>
                                    <option value="UTC+1400">UTC +14:00</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <div class="col-sm-10 col-sm-offset-2">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" class="makePrimaryCD" id="profileEditMakePrimaryCD" value="0"> Make this my primary countdown
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" class="makePublicCD" id="profileEditMakePublicCD" value="0"> Share this countdown with everyone
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" id="test" class="btn btn-secondary exitEditCountdownModal" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info" id="editCountdownBtn">Update Countdown</button>
                </div>
            </div>
        </div>
    </div>
   
    <div class="spacer"></div>

</div>