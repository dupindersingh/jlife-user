import React from 'react'
import Firebase from 'firebase/app'
import signUp from '../../actions/signUp'
import {Page,} from '../../styles/layout'
import './signup.css'
import ReactGA from "react-ga";

let thi = this;

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            confirmResult: {},
            code: "",
            email: "",
            phoneNumber: ""
        }
    }

    componentDidMount() {
        window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier("recaptcha",
            {
                // type: 'image', // another option is 'audio'
                size: 'invisible', // other options are 'normal' or 'compact'
                // badge: 'bottomleft' // 'bottomright' or 'inline' applies to invisible.
                'callback': function (response) {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log("captacha solved");
                    thi.phoneLogin();
                },
                'expired-callback': function () {
                    console.log("expired captacha !! Please solve again")
                }
            })
    }

    phoneLogin(e) {
        // e.preventDefault();
        const thi = this;
        const phoneNumber = thi.state.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        const signupButton = document.getElementById('signupButton');
        const signupError = document.getElementById('signupError');
        // check if this phone number already exist in database.
        // if yes than error "already registered" else move further...

        Firebase.firestore().collection("users").where("phoneNumber", "==", phoneNumber).get()
            .then(snapshot => {
                console.log("loading ...... true", snapshot, "snapshot....");
                console.log("loading..... false", snapshot, "snapshot....");
                if (snapshot.empty) {
                    document.getElementById("dialogBox").style.display = "block";
                    document.getElementById("dialogBox").classList.add("in");
                    thi.setState({
                        showDialog: true,
                        code: "",
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        company: ""
                    });
                    Firebase
                        .auth()
                        .signInWithPhoneNumber(phoneNumber, appVerifier)
                        .then(confirmResult => {
                            thi.setState({
                                confirmResult,
                            });
                            console.log(confirmResult, "confirm esul...");
                        })
                        .catch(error => {
                            window.recaptchaVerifier.render().then(widgetId => {
                                window.recaptchaVerifier.reset(widgetId);
                            });
                            if (error.message !== "An internal error has occurred.") {
                                thi.setState({
                                    showDialog: false,
                                    confirmResult: thi.state.confirmResult,
                                    code: "",
                                    email: "",
                                    password: "",
                                    firstName: "",
                                    lastName: "",
                                    company: ""
                                });
                                document.getElementById("dialogBox").style.display = "none";
                                document.getElementById("dialogBox").classList.remove("in");
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.log('Error code: ' + errorCode);
                                console.log('Error message: ' + errorMessage);
                                if (!!signupButton && !!signupError) {
                                    signupButton.style.display = 'block';
                                    signupError.innerText = errorMessage;
                                    signupError.style.display = 'block';
                                }
                            }
                        })
                } else {

                    snapshot.forEach(doc => {
                        // console.log(doc.id, 'role==user', doc.data());
                        const document = Firebase.firestore().collection("users").doc(doc.id).get();
                        document.then((doc) => {
                            if (doc) {
                                console.log(doc.data(), "daaaata od doc");
                            }
                        })
                    });
                    window.recaptchaVerifier.render().then(widgetId => {
                        window.recaptchaVerifier.reset(widgetId);
                    });
                    document.getElementById("dialogBox").style.display = "none";
                    document.getElementById("dialogBox").classList.remove("in");
                    thi.setState({
                        showDialog: false,
                        confirmResult: thi.state.confirmResult,
                        code: "",
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        company: ""
                    });
                    var errorMessage = "This PhoneNumber is already registered!!";
                    if (!!signupButton && !!signupError) {
                        signupButton.style.display = 'block';
                        signupError.innerText = errorMessage;
                        signupError.style.display = 'block';
                    }
                }
            })
    }

    onCodeChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    submitVerificationCode(e) {
        e.preventDefault();
        // document.getElementsByName("code")[0].setCustomValidity("");
        // document.getElementsByName("email")[0].setCustomValidity("");
        if (e.target.checkValidity()) {
            const thi = this;
            console.log(this.state.code, "code", this.state.email, "email..");
            const signupButton = document.getElementById('signupButton');
            const signupError = document.getElementById('signupError');

            if (!!thi.state.email) {
                ReactGA.event({
                    category: 'User',
                    action: 'Sign Up',
                });

                let email = thi.state.email;
                let password = thi.state.password;
                let firstName = thi.state.firstName;
                let lastName = thi.state.lastName;
                let company = thi.state.company;
                email = email.toLowerCase();
                return Firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function () {
                        Firebase.auth().currentUser.updateProfile({
                            displayName: firstName + " " + lastName
                        })
                    })
                    .then(async function () {
                        if (!!thi.state.code) {
                            // start registering the user..
                            // Add a new document in collection "users"
                            let member = "", employee = [];
                            email = email.toLowerCase();
                            Firebase.firestore().collection("users").doc(email).set({
                                email: email,
                                firstName,
                                lastName,
                                company,
                                phoneNumber: thi.state.phoneNumber,
                                verification_code: thi.state.code,
                                isAdmin: false,
                                role: "user"
                            });
                            const team = Firebase.firestore().collection("teams").doc("team1").get();
                            team.then((detail) => {
                                if (detail) {
                                    member = detail.data().member;
                                    employee = detail.data().employee;
                                    employee.push({
                                        email: email,
                                        firstName,
                                        lastName,
                                        company,
                                        phoneNumber: thi.state.phoneNumber,
                                        verification_code: thi.state.code,
                                        isAdmin: false,
                                        role: "user"
                                    });
                                } else {
                                    window.recaptchaVerifier.render().then(widgetId => {
                                        window.recaptchaVerifier.reset(widgetId);
                                    });
                                    document.getElementById("dialogBox").style.display = "none";
                                    document.getElementById("dialogBox").classList.remove("in");
                                    thi.setState({
                                        showDialog: false,
                                        confirmResult: thi.state.confirmResult,
                                        code: "",
                                        email: "",
                                        password: "",
                                        firstName: "",
                                        lastName: "",
                                        company: ""
                                    });
                                    var errorCode = "no document found.";
                                    var errorMessage = "no document found.";
                                    console.log('Error code: ' + errorCode);
                                    console.log('Error message: ' + errorMessage);
                                    if (!!signupButton && !!signupError) {
                                        signupButton.style.display = 'block';
                                        signupError.innerText = errorMessage;
                                        signupError.style.display = 'block';
                                    }
                                    return
                                }
                            }).then(() => {
                                console.log(member, "member", employee, "emplooye....");
                                Firebase.firestore().collection("teams").doc("team1").update({
                                    member,
                                    employee
                                })
                                    .then(function () {
                                        console.log("Document successfully written!");
                                        window.location.replace('./menu');
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                        window.recaptchaVerifier.render().then(widgetId => {
                                            window.recaptchaVerifier.reset(widgetId);
                                        });
                                        document.getElementById("dialogBox").style.display = "none";
                                        document.getElementById("dialogBox").classList.remove("in");
                                        thi.setState({
                                            showDialog: false,
                                            confirmResult: thi.state.confirmResult,
                                            code: "",
                                            email: "",
                                            password: "",
                                            firstName: "",
                                            lastName: "",
                                            company: ""
                                        });
                                        var errorMessage = "error writing document";
                                        if (!!signupButton && !!signupError) {
                                            signupButton.style.display = 'block';
                                            signupError.innerText = errorMessage;
                                            signupError.style.display = 'block';
                                        }
                                    });
                            })
                                .catch(function (error) {
                                    window.recaptchaVerifier.render().then(widgetId => {
                                        window.recaptchaVerifier.reset(widgetId);
                                    });
                                    document.getElementById("dialogBox").style.display = "none";
                                    document.getElementById("dialogBox").classList.remove("in");
                                    thi.setState({
                                        showDialog: false,
                                        confirmResult: thi.state.confirmResult,
                                        code: "",
                                        email: "",
                                        password: "",
                                        firstName: "",
                                        lastName: "",
                                        company: ""
                                    });
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    console.log('Error code: ' + errorCode);
                                    console.log('Error message: ' + errorMessage);
                                    if (!!signupButton && !!signupError) {
                                        signupButton.style.display = 'block';
                                        signupError.innerText = errorMessage;
                                        signupError.style.display = 'block';
                                    }
                                });

                            // end registering the user...
                        } else {
                            document.getElementById("dialogBox").style.display = "none";
                            document.getElementById("dialogBox").classList.remove("in");
                            thi.setState({
                                showDialog: false,
                                confirmResult: thi.state.confirmResult,
                                code: "",
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                company: ""
                            });
                            window.recaptchaVerifier.render().then(widgetId => {
                                window.recaptchaVerifier.reset(widgetId);
                            });
                            var errorCode = "Wrong entered code...";
                            var errorMessage = "Wrong entered code...";
                            console.log('Error code: ' + errorCode);
                            console.log('Error message: ' + errorMessage);
                            if (!!signupButton && !!signupError) {
                                signupButton.style.display = 'block';
                                signupError.innerText = errorMessage;
                                signupError.style.display = 'block';
                            }
                        }
                    })
                    .catch(function (error) {
                        document.getElementById("dialogBox").style.display = "none";
                        document.getElementById("dialogBox").classList.remove("in");
                        thi.setState({
                            showDialog: false,
                            confirmResult: thi.state.confirmResult,
                            code: "",
                            email: "",
                            password: "",
                            firstName: "",
                            lastName: "",
                            company: ""
                        });
                        window.recaptchaVerifier.render().then(widgetId => {
                            window.recaptchaVerifier.reset(widgetId);
                        });
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('Error code: ' + errorCode);
                        console.log('Error message: ' + errorMessage);
                        document.getElementById('signupButton').style.display = 'block';
                        document.getElementById('signupError').innerText = errorMessage;
                        document.getElementById('signupError').style.display = 'block';

                    });
            } else {
                document.getElementById("dialogBox").style.display = "none";
                document.getElementById("dialogBox").classList.remove("in");
                thi.setState({
                    showDialog: false,
                    confirmResult: thi.state.confirmResult,
                    code: "",
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    company: ""
                });
                window.recaptchaVerifier.render().then(widgetId => {
                    window.recaptchaVerifier.reset(widgetId);
                });
                var errorCode = "Wrong entered email...";
                var errorMessage = "Wrong entered email...";
                console.log('Error code: ' + errorCode);
                console.log('Error message: ' + errorMessage);
                if (!!signupButton && !!signupError) {
                    signupButton.style.display = 'block';
                    signupError.innerText = errorMessage;
                    signupError.style.display = 'block';
                }
            }
        } else {
            const invalidInputs = document.querySelectorAll(".verify-otp-form input:invalid");
            for (let i = 0; i < invalidInputs.length; i++) {
                if (i === 0) {
                    invalidInputs[i].setCustomValidity("Please enter valid six digit OTP code.");
                }
                if (i === 1) {
                    invalidInputs[i].setCustomValidity("Please enter valid Email Address.");
                }
            }
        }

    }

    closeDialog(e) {
        e.preventDefault();
        const signupButton = document.getElementById('signupButton');
        const signupError = document.getElementById('signupError');
        const thi = this;
        var errorCode = "Process closed by user..";
        var errorMessage = "Process closed by user..";
        console.log('Error code: ' + errorCode);
        console.log('Error message: ' + errorMessage);
        if (!!signupButton && !!signupError) {
            signupButton.style.display = 'block';
            signupError.innerText = errorMessage;
            signupError.style.display = 'block';
        }
        document.getElementById("dialogBox").style.display = "none";
        document.getElementById("dialogBox").classList.remove("in");
        thi.setState({
            showDialog: false,
            confirmResult: thi.state.confirmResult,
            code: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            company: ""
        });
        window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaVerifier.reset(widgetId);
        });
    }

    render() {
        return (
            <Page className="signup-page">
                <div>
                    <div className="signup-container">
                        <h1 className="signup-header">Sign Up</h1>
                        <div id="signupForm" className="signup-form">
                            <form id="signupForm" name="signupForm" data-name="signupForm" redirect="/menu"
                                  data-redirect="/menu">
                                <input type="text" className="signup-input" name="firstName-2"
                                       data-name="First Name 2"
                                       placeholder="First Name" id="firstName" required=""/>
                                <input type="text" className="signup-input" name="lastName-2"
                                       data-name="Last Name 2"
                                       placeholder="Last Name" id="lastName" required=""/>
                                <input type="text" className="signup-input" name="Company" data-name="Company"
                                       placeholder="Company"
                                       id="company" required=""/>
                                <input type="email" className="signup-input" name="signup-Email"
                                       data-name="signup Email"
                                       placeholder="Email" id="signupEmail" required=""/>
                                <input type="password" className="signup-input" name="signupPassword"
                                       data-name="signup Password"
                                       placeholder="Password" id="signupPassword" required=""/>
                            </form>
                            <button id="signupButton" className="submit-button" onClick={signUp}>Sign Up</button>
                        </div>

                        <div className="or"><span>OR</span></div>
                        <div id="signupForm" className="signup-form">
                            <div id="signupForm" className="signup-phone"
                                 name="signupForm" data-name="signupForm" redirect="/menu"
                                 data-redirect="/menu">
                                <input type="text" className="signup-input" name="phoneNumber"
                                       data-name="signup Password"
                                       placeholder="PhoneNumber e.g. +919783456734" id="signupPassword"
                                       onChange={this.onCodeChange.bind(this)}/>
                                <button id="recaptcha" type={"button"} className="submit-button"
                                        onClick={this.phoneLogin.bind(this)}
                                        data-toggle="modal"
                                        data-target="#dialogBox"
                                        data-backdrop={false}>Signup
                                </button>
                            </div>
                        </div>


                        <p id="signupError" className="error-message">Error message</p>
                        <a href="./" className="link">Already have an account?</a></div>


                </div>
                <form onSubmit={this.submitVerificationCode.bind(this)} className="verify-otp-form">
                    <div className="modal" id="dialogBox" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"
                                        id="exampleModalCenterTitle"> Please enter the code sent to your phone
                                        number.</h5>
                                </div>
                                <div className="code">
                                    <input type="text" placeholder={"Enter OTP"} pattern="[0-9]{6,6}"
                                           style={{width: "100%"}} name="code"
                                           value={this.state.code}
                                           required={true}
                                           onChange={this.onCodeChange.bind(this)}/><br/>
                                    <input type="text" style={{width: "100%"}} name="firstName"
                                           minLength={3}
                                           maxLength={50}
                                           pattern={"^[^-\\s]([0-9a-zA-Z]+\\s)*[a-zA-Z]{2,}$"}
                                           placeholder={"Enter First Name"}
                                           required={false}
                                           value={this.state.firstName}
                                           onChange={this.onCodeChange.bind(this)}/><br/>
                                    <input type="text" style={{width: "100%"}} name="lastName"
                                           minLength={3}
                                           maxLength={50}
                                           pattern={"^[^-\\s]([0-9a-zA-Z]+\\s)*[a-zA-Z]{2,}$"}
                                           placeholder={"Enter Last Name"}
                                           required={false}
                                           value={this.state.lastName}
                                           onChange={this.onCodeChange.bind(this)}/><br/>
                                    <input type="text" style={{width: "100%"}} name="company"
                                           minLength={3}
                                           maxLength={50}
                                           pattern={"^[^-\\s]([0-9a-zA-Z]+\\s)*[a-zA-Z]{2,}$"}
                                           placeholder={"Enter Company"}
                                           required={false}
                                           value={this.state.company}
                                           onChange={this.onCodeChange.bind(this)}/><br/>
                                    <input type="email" style={{width: "100%"}} name="email"
                                           placeholder={"Enter Emailaddress"}
                                           required={true}
                                           value={this.state.email}
                                           onChange={this.onCodeChange.bind(this)}/>
                                    <input type="password" style={{width: "100%"}} name="password"
                                           placeholder={"Enter Password"}
                                           required={true}
                                           value={this.state.password}
                                           onChange={this.onCodeChange.bind(this)}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={this.closeDialog.bind(this)}>Close
                                    </button>
                                    <button type="submit" className="btn submit-btn">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {
                    this.state.showDialog &&
                    <div className="modal-backdrop fade show"></div>
                }
            </Page>
        )

    }
}