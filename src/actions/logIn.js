import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

const logInEmail = () => {
    ReactGA.event({
        category: 'User',
        action: 'Log in',
    });

    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    const loginButton = document.getElementById('loginButton');
    const loginError = document.getElementById('loginError');
    let isEmailExist = false;
    // code to check only users are loggedin not admins...
    Firebase.firestore().collection("users").where("isAdmin", "==", false)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            } else {
                snapshot.forEach(doc => {
                    const document = Firebase.firestore().collection("users").doc(doc.id).get();
                    document.then((doc) => {
                        if (doc) {
                            if (doc.data().email === email) {
                                isEmailExist = true;
                                return Firebase.auth().signInWithEmailAndPassword(email, password)
                                    .then(async function (user) {
                                        if (!user.displayName) {
                                            const userDoc = await Firebase.firestore().collection("users").doc(user.email).get();
                                            user.updateProfile({
                                                displayName: (userDoc.data().firstName + " " + userDoc.data().lastName)
                                            })
                                        }

                                    })
                                    .then(function () {
                                        window.location.replace('./menu');
                                    })
                                    .catch(function (error) {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                        console.log('Error code: ' + errorCode);
                                        console.log('Error message: ' + errorMessage);
                                        if (!!loginButton && !!loginError) {
                                            loginButton.style.display = 'block';
                                            loginError.innerText = errorMessage;
                                            loginError.style.display = 'block';
                                        }
                                    });
                            }
                        }
                    })
                })

            }
        })
        .then(() => {
            window.setTimeout(() => {
                if (!isEmailExist) {
                    var errorMessage = "Email doesn't exist";
                    if (!!loginButton && !!loginError) {
                        loginButton.style.display = 'block';
                        loginError.innerText = errorMessage;
                        loginError.style.display = 'block';
                    }
                }
            }, 4000)
        })
};

export default logInEmail

