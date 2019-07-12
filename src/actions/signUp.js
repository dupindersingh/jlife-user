import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

const signUp = () => {
    ReactGA.event({
        category: 'User',
        action: 'Sign Up',
    });

    document.getElementById('signupButton').style.display = 'none';
    document.getElementById('signupError').style.display = 'none';
    let email = document.getElementById('signupEmail').value.toLowerCase();
    let password = document.getElementById('signupPassword').value;
    return Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            Firebase.auth().currentUser.updateProfile({
                displayName: (document.getElementById("firstName").value + " " + document.getElementById("firstName").value)
            })
        }).then(async function () {
            // Add a new document in collection "users"
            let member = "", employee = [];
            email = email.toLowerCase();
            Firebase.firestore().collection("users").doc(email).set({
                email: email,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                company: document.getElementById('company').value,
                phoneNumber: "",
                verification_code: "",
                role: "user"
            });
            const team = Firebase.firestore().collection("teams").doc("team1").get();
                team.then((detail) => {
                    if (detail) {
                        member = detail.data().member;
                        employee = detail.data().employee;
                        employee.push({
                            email: email,
                            firstName: document.getElementById('firstName').value,
                            lastName: document.getElementById('lastName').value,
                            company: document.getElementById('company').value,
                            phoneNumber: "",
                            verification_code: "",
                            role: "user"
                        });
                    }
                    else {
                        var errorCode = "no document found.";
                        var errorMessage = "no document found.";
                        console.log('Error code: ' + errorCode);
                        console.log('Error message: ' + errorMessage);
                        document.getElementById('signupButton').style.display = 'block';
                        document.getElementById('signupError').innerText = errorMessage;
                        document.getElementById('signupError').style.display = 'block';
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
                        });
                })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('Error code: ' + errorCode);
                        console.log('Error message: ' + errorMessage);
                        document.getElementById('signupButton').style.display = 'block';
                        document.getElementById('signupError').innerText = errorMessage;
                        document.getElementById('signupError').style.display = 'block';
                    });

        })
}

export default signUp
