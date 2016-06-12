    <div class="alert alert-danger" id="loginAlert"></div>

    <section class="content" id="stage">

    <div id="stageCaption">
        <h1 class="display-3">5, 4, 3, 2, 1...</h1>
        <p class="lead">When's your next milestone?</p>
        <button type="button" class="btn btn-success btn-lg" id="startCountdownBtn" data-toggle="modal" data-target="#signUpModal">
            Start Your Countdown Now
        </button>
    </div>

    <!-- Sign Up Modal -->
    <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="signUpLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="signUpModalLabel">Sign Up</h4>
                </div>
                <div class="modal-body">

                    <div class="alert alert-danger" id="signupAlert"></div>
                   
                    <form>
                        <div class="form-group row">
                            <label for="signUpEmail" class="col-sm-2 form-control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="signUpEmail" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="signUpPassword" class="col-sm-2 form-control-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="signUpPassword" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group row">
                           
                            <div class="col-sm-10 col-sm-offset-2">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="signUpCheckbox"> Check password
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" id="signUpBtn">Sign Up</button>
                </div>
            </div>
        </div>
    </div>

</section>