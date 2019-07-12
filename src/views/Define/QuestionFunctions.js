import Firebase from 'firebase'

function updateData(input) {
    // Access the current users document
    var docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    var upload = {};
    upload[input.target.id] = input.target.value;
    docRef.update(upload);
}

function updateTalents() {
    let docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    docRef.update({
        talents: [
            document.getElementById('talent1').value,
            document.getElementById('talent2').value,
            document.getElementById('talent3').value
        ]
    })
}

function updatePassions() {
    let docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    docRef.update({
        passions: [
            document.getElementById('passion1').value,
            document.getElementById('passion2').value,
            document.getElementById('passion3').value
        ]
    })
}

function loadExistingData() {
    let inputs = document.querySelectorAll('input,textarea,select');
    //Select existing identities if they exist
    let docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    //confirm document exists
    docRef.get().then(async function (doc) {
        if (doc.exists) {
            var data = doc.data();
            Array.from(inputs).forEach(function (input) {
                //IF input already exists, fill appropriate data entry box
                if (data[input.id] != null && data[input.id].length > 0) {
                    if (input.tagName === "INPUT") {
                        input.placeholder = data[input.id]
                    } else if (input.tagName === "TEXTAREA") {
                        input.placeholder = data[input.id]
                    } else if (input.tagName === "SELECT") {
                        var index = 0;
                        Array.from(input.getElementsByTagName('option')).forEach(function (option) {
                            if (option.value === data[input.id]) {
                                input.selectedIndex = index;
                            }
                            index++;
                        })
                    }
                }
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function loadSelectionButtons() {
    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).get().then(function (doc) {
        if (doc.exists) {
            //add top verbs to buttons
            let impactVerbButtons = document.querySelectorAll('.structure-purpose-button.impact-verb');
            let count = 0;
            Array.from(impactVerbButtons).forEach(function (button) {
                button.innerHTML = doc.data().finalVerbs[count];
                count++;
            });
            //add talents to buttons
            let talentButtons = document.querySelectorAll('.structure-purpose-button.talent');
            count = 0;
            Array.from(talentButtons).forEach(function (button) {
                button.innerHTML = doc.data().talents[count];
                count++
            });
            //add passions to buttons
            var passionButtons = document.querySelectorAll('.structure-purpose-button.passion');
            count = 0;
            Array.from(passionButtons).forEach(function (button) {
                button.innerHTML = doc.data().passions[count];
                count++
            });
            //add story elements to buttons
            document.getElementById('adversity').innerHTML = doc.data().adversity;
            document.getElementById('cause').innerHTML = doc.data().cause;
            document.getElementById('parentsLesson').innerHTML = doc.data().parentsLesson;
            document.getElementById('teaching').innerHTML = doc.data().teaching;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function replaceImpactVerb(verb) {
    verb.persist();
    let user = Firebase.auth().currentUser;
    let docRef = Firebase.firestore().collection("users").doc(user.email);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            //replace impactverb in statement
            document.getElementById('impactVerb').textContent = verb.target.textContent;
            docRef.update({ purposeDraft: document.getElementById('draft').textContent });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function replaceStoryElement(el) {
    el.persist();
    let user = Firebase.auth().currentUser;
    let docRef = Firebase.firestore().collection("users").doc(user.email);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            //replace impactverb in statement
            document.getElementById('ASEComponent').textContent = el.target.textContent;
            docRef.update({ purposeDraft: document.getElementById('draft').textContent });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function loadDraft() {
    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).get().then(async function (doc) {
        document.getElementById('draft').textContent = doc.data().purposeDraft;
    })
}

function loadFinalPurpose() {
    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).get().then(async function (doc) {
        document.getElementById('draft').textContent = doc.data().finalPurpose;
    })
}

export {
    updateData,
    updateTalents,
    updatePassions,
    loadSelectionButtons,
    replaceImpactVerb,
    replaceStoryElement,
    loadDraft,
    loadExistingData,
    loadFinalPurpose
}