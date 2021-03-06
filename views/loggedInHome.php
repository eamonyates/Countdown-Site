<div class="alert" id="countdownPublicAlert"></div>

<div class="content" id="countdownContainer">
    <div class="container" id="countdown">
        <div class="row" id="timerBig">
            <div class="col-md-3 grey">
                <span class="years"></span>
                <br />Years
            </div>
            <div class="col-md-3 grey">
                <span class="months"></span>
                <br />Months
            </div>
            <div class="col-md-3 grey">
                <span class="weeks"></span>
                <br />Weeks
            </div>
            <div class="col-md-3 grey">
                <span class="days"></span>
                <br />Days
            </div>
        </div>
        <div class="row" id="timerSmall">
            <div class="col-md-12">
                <h2 class="display-1"><span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span></h2>
            </div>
        </div>
        <div class="row" id="timerDescription">
            <div class="col-md-12">
                <h2>left until <span id="countdownGoalDisplay"></span></h2>
            </div>
        </div>
    </div>

    <div class="container-fluid" id="underTimer">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-md-12" id="countdownProgress">
                        <h3>Your Countdown Progress</h3>
                        <p class="lead progressText" id="progressText"></p>
                        <progress id="progressBar" class="progress progressBar" value="75" max="100"></progress>
                        <a id="makePublicLink">Inspire others and make your countdown public...</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid" id="newCountdownBtnContainer">
        <div class="row">
            <div class="col-md-12" id="addCountdownContainer">
                <a class="btn btn-lg btn-primary" id="addCountdown" data-toggle="modal" data-target="#addCountdownModal">Add A New Countdown</a>
            </div>
        </div>
    </div>

    <div class="container-fluid" id="otherCountdownsOuterContainer">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-md-12" id="otherCountdowns">
                        <h2>Your other countdowns</h2>
                        <div id="otherCountdownsContainer"></div>
                        <a href="?page=profile" id="allCountdowns">All your countdowns...</a>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!-- NOTE: Add Countdown Modal -->
    <div class="modal fade" id="addCountdownModal" tabindex="-1" role="dialog" aria-labelledby="addCountdownLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="countdownModalLabel">Add A New Countdown</h4>
                </div>
                <div class="modal-body">

                    <div class="alert alert-danger" id="countdownAlert"></div>
                    <div class="alert alert-success" id="countdownAddedAlert"></div>

                    <form>

                        <div class="form-group row">
                            <label for="countdownGoal" class="col-sm-2 form-control-label">Your Goal</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="countdownGoal" placeholder="The goal of your countdown...">
                            </div>
                        </div>

                        <div class="form-group row" id="goalDescription">
                            <label class="col-sm-2">Which do you prefer?</label>
                            <div class="col-sm-10">
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="goalRadios" id="yourGoalRadio" value="yourGoal" checked> left until your <span class="cdgoal"></span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="goalRadios" id="theGoalRadio" value="theGoal"> left until the <span class="cdgoal"></span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="goalRadios" id="goalRadio" value="goal"> left until <span class="cdgoal"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="loggedInDatepicker" class="col-sm-2 form-control-label">End Date</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control datepicker" id="loggedInDatepicker" placeholder="Choose a date...">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="timepicker" class="col-sm-2 form-control-label">End Time</label>
                            <div class="col-sm-10">
                                <select class="c-select" id="endTimeHours">
                                    <option disabled selected>Hours</option>
                                    <?php for ($hours = 0; $hours <= 23; $hours++) { 
                                        $paddedHours = sprintf("%02d", $hours);
                                        ?>

                                        <option value="<?php echo $paddedHours; ?>">
                                            <?php echo $paddedHours; ?>
                                        </option>

                                        <?php } ?>
                                </select>

                                <select class="c-select" id="endTimeMinutes">
                                    <option disabled selected>Minutes</option>
                                    <?php for ($minutes = 0; $minutes <= 59; $minutes++) { 
                                        $paddedMinutes = sprintf("%02d", $minutes);
                                        ?>
                                        <option value="<?php echo $paddedMinutes; ?>">
                                            <?php echo $paddedMinutes; ?>
                                        </option>
                                        <?php } ?>
                                </select>

                                <select class="c-select" id="endTimeTZ">
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
                                        <input type="checkbox" class="makePrimaryCD" id="makePrimaryCD" value="0"> Make this my primary countdown
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" class="makePublicCD" id="makePublicCD" value="0"> Share this countdown with everyone
                                    </label>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" id="test" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-warning" id="addCountdownBtn">Add Countdown</button>
                </div>
            </div>
        </div>
    </div>

</div>