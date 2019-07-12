import Firebase from 'firebase'
import './questionpages.css'

//add identities to database upon change to any <select> element
function updateIdentities() {
    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).update({
        identities: [document.getElementById('firstIdentity').value,
        document.getElementById('secondIdentity').value,
        document.getElementById('thirdIdentity').value]
    })
}

//Load any existing identities
function selectIdentities() {
    const docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    //confirm document exists
    docRef.get().then(async function (doc) {
        if (doc.exists) {
            if (doc.data().identities) {
                let dropdownIndex = 0;
                Array.from(document.getElementsByTagName('select')).forEach(function (dropdown) {
                    let index = 0;
                    Array.from(dropdown.getElementsByTagName('option')).forEach(function (option) {
                        if (option.value === doc.data().identities[dropdownIndex]) {
                            dropdown.selectedIndex = index;
                        }
                        index++;
                    })
                    dropdownIndex++;
                })
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

//add verbs to database upon change to any <select> element
function addVerbsToDatabase() {
    let verbsToSort = [];
    //Find and upload all selected verbs
    Array.from(document.getElementsByClassName("impact-verb-dropdown")).forEach(function (element) {
        if (element.value.length > 1) {
            let verbToAdd = element.value;
            verbsToSort.push(verbToAdd);
        }
    })
    // Save identities to document
    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).update({
        verbs: verbsToSort
    })
}

//Load any existing identities
function addVerbDropdowns() {
    let docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    //confirm document exists
    docRef.get().then(function (doc) {
        let parent = document.getElementsByClassName("centered-div")[0]
        if (doc.exists && doc.data().identities) {
            Array.from(doc.data().identities).forEach(function (identity) {
                let parentDiv = document.createElement('div')
                parentDiv.id = identity
                parentDiv.className = 'identity-verbs'
                let title = document.createElement('h3')
                title.className = 'identity-title'
                title.innerHTML = identity
                parentDiv.appendChild(title)
                let div = document.createElement('div')
                div.className = 'verb-dropdowns'
                for (let i = 0; i < 3; i++) {
                    let dropdown = document.createElement('select')
                    dropdown.className = 'impact-verb-dropdown w-select'
                    dropdown.onchange = addVerbsToDatabase
                    let defaultOption = document.createElement('option')
                    defaultOption.innerHTML = 'Select One...'
                    dropdown.appendChild(defaultOption)
                    let jldata = Firebase.firestore().collection("jl data").doc("impact-verbs")
                    jldata.get().then(function (verbs) {
                        Array.from(verbs.data()[identity]).forEach(function (impactVerb) {
                            let option = document.createElement('option')
                            option.value = impactVerb
                            option.innerHTML = impactVerb
                            dropdown.appendChild(option)
                        })
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
                    div.appendChild(dropdown)
                }
                parentDiv.appendChild(div)
                parent.appendChild(parentDiv)
            })
        } else {
            let failureMessage = document.createElement('a')
            failureMessage.href = './identities'
            failureMessage.innerHTML = 'Please select identities first'
            parent.appendChild(failureMessage)
            // doc.data() will be undefined in this case
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

//Fill in final identities and impact verbs on final page
function loadChoices() {
    const docRef = Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            //print top identities
            const identityList = document.getElementById("identity-list")
            doc.data().identities.forEach(function (identity) {
                let div = document.createElement('div')
                div.className = 'list-element';
                div.id = identity;
                identityList.appendChild(div);
                div.innerHTML += identity;
            });
            //print top impact verbs
            const verbList = document.getElementById("impact-verb-list")
            const verbs = [doc.data().finalVerbs[0], doc.data().finalVerbs[1], doc.data().finalVerbs[2  ]]
            verbs.forEach(function (verb) {
                const div = document.createElement('div')
                div.className = 'list-element';
                div.id = verb;
                verbList.appendChild(div);
                div.innerHTML += verb;
            });
            docRef.update({ d1: 'complete' });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
} 

export {
    updateIdentities,
    selectIdentities,
    addVerbDropdowns,
    addVerbsToDatabase,
    loadChoices,
}