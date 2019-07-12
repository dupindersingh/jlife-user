import Firebase from 'firebase';

// const socket = openSocket("http://192.168.1.107:3000");
// import admin from 'firebase-admin';

export const createFirstCollection = () => {
    Firebase.firestore().collection("users").doc("dupinder").set({
        "name": "Dupinder",
        "age": 24,
        "gender": "M"
    })
};

export const ViewFirstCollection = () => {
    Firebase.firestore().collection("users").get().then((users) => {
        // users.forEach((u) => {
        //     console.log(u, "user..");
        // });
        for (let i in users) {
            console.log(users, "users data...", users[i], "per person....");
        }
    })
};

export const viewFirstCollectionDocDupinder = () => {
    (Firebase.firestore().collection("users").doc("dupinder").get().then((doc) => {
        console.log(doc.data(), "document dupinder data")
    }))
};

/**
 * School - collection, documents relation....
 */


export const schoolCollection = () => {
    Firebase.firestore().collection("school").doc("rooms").collection("washroom").doc("girls").set({
        "value": 20
    });
    Firebase.firestore().doc("school/rooms/washroom/boys").set({
        "value": 30
    });
};

export const indexing = () => {
    Firebase.firestore().collection("cities").doc("Chandigarh").set({
        name: "Chandigarh",
        population: 1200000
    });
    Firebase.firestore().collection("cities").doc("Pune").set({
        name: "Pune",
        population: 2500000
    });
    Firebase.firestore().collection("cities").doc("Mohali").set({
        name: "Mohali",
        population: 1500000
    });
    Firebase.firestore().collection("cities").doc("Ludhiana").set({
        name: "Ludhiana",
        population: 4000000
    });
    Firebase.firestore().collection("cities").doc("Patiala").set({
        name: "Patiala",
        population: 3500000
    });
    console.log(Firebase.firestore().collection("cities").where("population", "<", 1500000).orderBy("population", "desc"), "cities where pop >= 1500000 desc order");
    const chd = Firebase.firestore().collection("cities").where("name", "==", "Chandigarh");
    console.log(chd, "chd.... printing....");

};

/**
 * updating a document...
 */

export const updateDoc = () => {
    Firebase.firestore().doc("cities/Chandigarh").update({
        "population": 1300000
    });
    console.log("updating array... elements");
    // Firebase.firestore().doc("companies/Iapp Technologies").update({
    //     admins: admin.firestore.FieldValue.arrayUnion("xyz")
    // })
};

export const printCollection = () => {
    const users = Firebase.firestore().collection("users").get();
    users.then((data) => {
        data.forEach((d) => {
            console.log(d, "printinf collection list..");
            Firebase.firestore().doc("users/" + d.id).get().then((doc) => {
                if (doc) {
                    console.log(doc.data().company);
                    console.log("doc exist")
                } else {
                    console.log("doc not exist")
                }
            });
        })
    })
};

/**
 * working on snapshots for realtime updates.....(simple just listing the snapshot..)
 */
export const getRealTimeUpdate = () => {
    const users = Firebase.firestore().collection("users");
    users.onSnapshot((snap) => {
        console.log(snap, "snap");
    }, (error) => {
        console.log(error, "error while updating snapshots.....")
    })
};

/**
 * working on snapshots for realtime updates.....
 **/

export const getRealTimeUpdate2 = () => {
    Firebase.firestore().collection("users").onSnapshot((snap) => {
        snap.docChanges().forEach(change => {
            console.log(change, "change......")
            if (change.type === "added") {
                console.log(change.doc.data(), "data added")
            }
            if (change.type === "modified") {
                console.log(change.doc.data(), "data modified")
            }
            if (change.type === "removed") {
                console.log(change.doc.data(), "data removed")
            }
        })
    })
};

const docs = [
    "dupinder.s@iapptechnologies.com",
    // "chris@aloa.co",
    // "greg@danieladvisors.com",
    // "greg@gojourneylife.com",
    // "jamesberry4@comcast.net",
    // "jonathan@gojourneylife.com",
    // "jonathan@kairosgarage.com",
    // "jonathanwsloan@gmail.com",
    // "lk_matthews@yahoo.com",
    // "lovelightandhealing@gmail.com",
    // "msfarol05@hotmail.com",
    // "rebekah@danieladvisors.com",
    // "scaldwellgvc@gmail.com",
    // "sddyck@icloud.com"
];

const docsData = [
    {
        "company": "Aloa",
        "email": "chris@aloa.co",
        "firstName": "Chris",
        "lastName": "Raroque",
        "role": "user"
    },
    {
        "company": "Iapp Technologies",
        "createdAt": 1561983415736,
        "d1": "complete",
        "email": "dupinder.s@iapptechnologies.com",
        "finalVerbs": [
            "Advise",
            "Aide",
            "Contact",
            "Guide",
            "Influence",
            "Contact",
            "Eliminate",
            "Form",
            "Form"
        ],
        "firstName": "Dupinder",
        "identities": [
            "Coach",
            "Leader",
            "Communicator"
        ],
        "lastName": "Singh",
        "role": "admin",
        "verbs": [
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One...",
            "Select One..."
        ]
    },
    {
        "company": "me",
        "email": "greg@danieladvisors.com",
        "firstName": "gReg",
        "identities": [
            "Creator",
            "Communicator",
            "Achiever"
        ],
        "lastName": "Sloan",
        "role": "user"
    },
    {
        "company": "JourneyLIFE",
        "createdAt": 1562698857283,
        "d1": "complete",
        "d2": "complete",
        "email": "greg@gojourneylife.com",
        "enneagram": {
            "description": "This is who you call when you have an idea but aren’t sure how you’re going to make it work",
            "overview": "Type 3 leaders are over-achievers who set up their team members for accomplishable successes around a common organizational goal.",
            "strengths": [
                "Entrepreneurial",
                "Optimistic",
                "Self-reliant",
                "Results-driven",
                "Energetic"
            ],
            "struggles": [
                "Excessively competitive",
                "Creates own reality",
                "Personal relationships are not priorities",
                "Impatient with displays of emotion",
                "Hasty"
            ],
            "type": "Achiever",
            "typeNumber": 3
        },
        "enneagramType": 3,
        "finalPurpose": "My purpose is to help others define their purpose!",
        "finalVerbs": [
            "Expose",
            "Craft",
            "Entertain",
            "Create",
            "Influence",
            "Contact",
            "Encourage'",
            "Coach",
            "Educate"
        ],
        "firstName": "Greg",
        "identities": [
            "Creator",
            "Communicator",
            "Coach"
        ],
        "lastName": "Sloan",
        "types": [
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "verbs": [
            "Craft",
            "Entertain",
            "Create",
            "Influence",
            "Expose",
            "Contact",
            "Encourage'",
            "Coach",
            "Educate"
        ]
    },
    {
        "company": "",
        "d1": "complete",
        "email": "jamesberry4@comcast.net",
        "finalVerbs": [
            "",
            "Motivate",
            "Strengthen",
            "Succeed",
            "Grow",
            "Prepare",
            "Perform",
            "Process",
            "Coach",
            "Enable"
        ],
        "firstName": "James",
        "identities": [
            "Leader",
            "Doer",
            "Achiever"
        ],
        "lastName": "Berry",
        "role": "user",
        "verbs": [
            "Perform",
            "Succeed",
            "Grow",
            "Strengthen",
            "Process",
            "Prepare",
            "Motivate",
            "Enable",
            "Coach"
        ]
    },
    {
        "adultDecision": "going to GSMST",
        "adversity": "overworking myself",
        "birthTown": "ATL",
        "birthYear": "1999",
        "cause": "young founders",
        "causeReason": "it's both harder and easier than they know ",
        "childLove": "Legos",
        "childhoodDreamCareer": "robotics engineer",
        "college": "Vandy",
        "company": "JourneyLIFE",
        "d1": "complete",
        "d2": "complete",
        "d3strengths": "complete",
        "dadInspiration": "working hard",
        "dadLesson": "real option pricing",
        "email": "jonathan@gojourneylife.com",
        "enneagram": {
            "description": "This is who you call when you have an idea but aren’t sure how you’re going to make it work",
            "overview": "Type 3 leaders are over-achievers who set up their team members for accomplishable successes around a common organizational goal.",
            "strengths": [
                "Entrepreneurial",
                "Optimistic",
                "Self-reliant",
                "Results-driven",
                "Energetic"
            ],
            "struggles": [
                "Excessively competitive",
                "Creates own reality",
                "Personal relationships are not priorities",
                "Impatient with displays of emotion",
                "Hasty"
            ],
            "type": "Achiever",
            "typeNumber": 3
        },
        "enneagramType": 3,
        "familyDynamics": "Average",
        "familyHealth": "Healthy",
        "familyWealth": "Upper Middle Class",
        "feedback": "Fun",
        "feedbackScore": "7",
        "final": "MyWhy! is to foster an entrepreneurial society!",
        "finalPurpose": "My purpose is to foster an entrepreneurial society!",
        "finalVerbs": [
            "Calculate",
            "Eliminate",
            "Fashion",
            "Coordinate",
            "Recommend",
            "merge",
            "Plan",
            "Control",
            "Control"
        ],
        "firstJob": "Entrepreneur",
        "firstName": "Jonathan",
        "identities": [
            "Planner",
            "Optimizer",
            "Analyst"
        ],
        "improvement": "fitness",
        "industry": "Technology",
        "joy": "Working",
        "lastName": "Sloan",
        "major": "Eng Science",
        "momInspiration": "loving well",
        "momLesson": "importance of family",
        "mywhyDraft": "My purpose is to Delegate others to talent 3!",
        "parentsLesson": "own your potential",
        "passions": [
            "entrepreneurship",
            "building products",
            "travel"
        ],
        "purposeDraft": "My purpose is to Plan others to talewnt2 !",
        "role": "user",
        "strengths": [
            "futuristic",
            "competitive",
            "driven",
            "yada",
            "yada"
        ],
        "talents": [
            "talent 1",
            "talewnt2 ",
            "talent 3"
        ],
        "teaching": "entrepreneurship",
        "types": [
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "verbs": [
            "Coordinate",
            "Plan",
            "Recommend",
            "Eliminate",
            "Fashion",
            "merge",
            "Calculate",
            "Control",
            "Control"
        ]
    },
    {
        "company": "Kairos",
        "d1": "complete",
        "email": "jonathan@kairosgarage.com",
        "enneagramType": 4,
        "finalVerbs": [
            "Optimize",
            "Automate",
            "Automate",
            "Encourage'",
            "Organize",
            "Assign",
            "Evaluate",
            "Consult",
            "Educate"
        ],
        "firstName": "Jon",
        "identities": [
            "Optimizer",
            "Planner",
            "Coach"
        ],
        "lastName": "sloan",
        "role": "user",
        "types": [
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0
        ],
        "verbs": [
            "Centralize",
            "Fashion",
            "Form",
            "Coordinate",
            "Arrange",
            "Assign",
            "Guide",
            "Advise",
            "Educate"
        ]
    },
    {
        "company": "",
        "createdAt": 1561748342889,
        "email": "jonathanwsloan@gmail.com",
        "firstName": "jonathan",
        "lastName": "sloan",
        "role": "user"
    },
    {
        "adultDecision": "to be a christian",
        "adversity": "When brother had cancer",
        "birthTown-2": "Norcross",
        "birthYear": "1999",
        "cause": "kids in third world countries interested in sports",
        "causeReason": "they were not privileged like I was growing up, but they have the same passion as me",
        "childLove": "sports",
        "childhoodDreamCareer": "baseball player",
        "college": "Presbyterian",
        "company": "",
        "d2": "complete",
        "email": "lk_matthews@yahoo.com",
        "familyDynamics": "Very Close",
        "familyHealth": "Healthy",
        "familyWealth": "Upper Middle Class",
        "feedback": "",
        "feedbackScore": "6",
        "finalMywhy": "MyWhy! is to help others understand what God sees in them and wants out of them!",
        "finalVerbs": [
            "",
            "Earn",
            "Grow",
            "Improve",
            "Outperform",
            "Enhance",
            "Further",
            "Calculate",
            "Capitalize",
            "Compute"
        ],
        "firstJob": "",
        "firstName": "Luke",
        "identities": [
            "Achiever",
            "Analyst",
            "Optimizer"
        ],
        "improvement": "People skills",
        "industry": "",
        "lastName": "Matthews",
        "major": "",
        "mywhyDraft": "MyWhy! is to Improve others to God!",
        "passions": [
            "Baseball",
            "School",
            "God"
        ],
        "role": "user",
        "talents": [
            "Sports",
            "School",
            "Math"
        ],
        "teaching": "sports",
        "verbs": [
            "Earn",
            "Grow",
            "Outperform",
            "Improve",
            "Enhance",
            "Further",
            "Calculate",
            "Capitalize",
            "Compute"
        ]
    },
    {
        "company": "",
        "email": "lovelightandhealing@gmail.com",
        "finalVerbs": [
            "",
            "Counsel",
            "Reach",
            "Inspire",
            "Boost",
            "Guide",
            "Grow",
            "Conceptualize",
            "Craft",
            "Innovate"
        ],
        "firstName": "Lisa",
        "identities": [
            "Coach",
            "Creator",
            "Achiever"
        ],
        "lastName": "Tozer",
        "role": "user",
        "verbs": [
            "Grow",
            "Reach",
            "Boost",
            "Counsel",
            "Guide",
            "Inspire",
            "Conceptualize",
            "Craft",
            "Innovate"
        ]
    },
    {
        "company": "",
        "email": "msfarol05@hotmail.com",
        "firstName": "Sarah",
        "lastName": "Farol",
        "role": "user"
    },
    {
        "adultDecision": "deciding to move to Korea",
        "adversity": "finishing college",
        "birthTown-2": "Atlanta",
        "birthYear": "1996",
        "cause": "women",
        "causeReason": "there are so many trials women go through and feel like they cannot express to anyone in their lives.",
        "childLove": "music",
        "childhoodDreamCareer": "artist manager",
        "college": "Georgia State University",
        "company": "Daniel Advisors",
        "dadInspiration": "being an understanding parents looking out for kids hopes and dreams",
        "dadLesson": "how to identify what's important in life",
        "email": "rebekah@danieladvisors.com",
        "familyDynamics": "Very Close",
        "familyHealth": "Healthy",
        "familyWealth": "Upper Middle Class",
        "finalMywhy": "MyWhy! is to aide others in becoming great global citizens.",
        "finalVerbs": [
            "",
            "Aide",
            "Recommend",
            "Execute",
            "Serve",
            "Educate",
            "Maintain",
            "Counsel",
            "Schedule",
            "Process"
        ],
        "firstJob": "client service coordinator",
        "firstName": "Rebekah",
        "identities": [
            "Coach",
            "Doer",
            "Planner"
        ],
        "improvement": "my faith",
        "industry": "finance",
        "lastName": "Sloan",
        "major": "Asian Studies",
        "momInspiration": "taking care of her kids needs",
        "momLesson": "every child is different",
        "mywhyDraft": "MyWhy! is to Aide others to being a world citizen!",
        "parentsLesson": "marriage is hard",
        "passions": [
            "my family",
            "being a world citizen",
            ""
        ],
        "role": "user",
        "talents": [
            "serving people",
            "serving businesses",
            "appreciating music"
        ],
        "teaching": "",
        "verbs": [
            "Aide",
            "Counsel",
            "Educate",
            "Execute",
            "Process",
            "Maintain",
            "Recommend",
            "Serve",
            "Schedule"
        ]
    },
    {
        "company": "Global Vision Concepts",
        "d1": "complete",
        "email": "scaldwellgvc@gmail.com",
        "finalVerbs": [
            "",
            "Succeed",
            "Grow",
            "Earn",
            "Consult",
            "Mentor",
            "Facilitate",
            "Train",
            "Implement",
            "Collaborate"
        ],
        "firstName": "Sydney",
        "identities": [
            "Achiever",
            "Coach",
            "Doer"
        ],
        "lastName": "Caldwell",
        "role": "user",
        "verbs": [
            "Succeed",
            "Grow",
            "Earn",
            "Consult",
            "Mentor",
            "Train",
            "Facilitate",
            "Implement",
            "Collaborate"
        ]
    },
    {
        "adultDecision": "starting a clothing store",
        "adversity": "hostile takeover of my business",
        "birthTown-2": "Hanna",
        "birthYear": "1967",
        "cause": "homeless",
        "causeReason": "many struggle with mental capacity to change",
        "childLove": "Sports",
        "childhoodDreamCareer": "entrepreneur",
        "college": "RDC",
        "company": "Dyko",
        "d1": "complete",
        "d2": "complete",
        "dadInspiration": "his curiosity",
        "dadLesson": "to probleem solve",
        "email": "sddyck@icloud.com",
        "familyDynamics": "Average",
        "familyHealth": "Average",
        "familyWealth": "Middle Class",
        "finalVerbs": [
            "",
            "Design",
            "Inspire",
            "Outperform",
            "Achieve",
            "Grow",
            "Influence",
            "Translate",
            "Conceptualize",
            "Innovate"
        ],
        "firstJob": "Relationship Manager",
        "firstName": "sheldon",
        "identities": [
            "Achiever",
            "Communicator",
            "Creator"
        ],
        "improvement": "networking",
        "industry": "Finance",
        "lastName": "dyck",
        "major": "Business",
        "momInspiration": "reading",
        "momLesson": "the power of story",
        "mywhyDraft": "MyWhy! is to Inspire others to innovation!",
        "parentsLesson": "not to settle",
        "passions": [
            "investing",
            "alternative energy",
            "technology"
        ],
        "role": "user",
        "talents": [
            "pattern recognition",
            "story telling",
            "resilience"
        ],
        "teaching": "innovation",
        "verbs": [
            "Achieve",
            "Outperform",
            "Grow",
            "Influence",
            "Inspire",
            "Translate",
            "Conceptualize",
            "Design",
            "Innovate"
        ]
    }
];
const companies = ["GivingPoint",
    "Iapp Technologies",
    "JourneyLIFE",
    "Kairos Garage"]

const companiesData = [
    {
        "typeform": {
            "workspaceID": "2YkkhW"
        }
    },
    {
        "admins": [
            "dupinder.s@iapptechnologies.com",
            "hardeep.s@iaaptechnologies"
        ],
        "employees": [
            {
                "Name": "komal",
                "email": "komal.b@iapptechnologies.com",
                "id": 1,
                "permission": "user"
            },
            {
                "Name": "Harsh Singh",
                "email": "harsdeep.s@iapptechnologies.com",
                "id": 2,
                "permission": "user"
            },
            {
                "Name": "Alex",
                "email": "alex.s@iapptechnologies.com",
                "id": 3,
                "permission": "user"
            }
        ],
        "typeform": {
            "workspaceId": 1234
        }
    },
    {
        "admins": [
            "greg@gojourneylife.com"
        ],
        "employees": [
            "jonathan@gojourneylife.com",
            "rebekah@gojourneylife.com",
            "greg@gojourneylife.com"
        ],
        "typeform": {
            "workspaceID": "n5tgUL"
        }
    },
    {}
]

let i = 0, j = 0;
export const getAllUsers = () => {
    alert("called")
    docs.forEach((docs) => {
        console.log(docs, "doc....");
        console.log(docsData[i], "doc data....")
        Firebase.firestore().collection("users").doc(docs).set(docsData[i]);
        i = i + 1;
    });
    console.log("-------------")
    companies.forEach((companies) => {
        console.log(companies, "doc...");
        console.log(companiesData[j], "doc data...")
        Firebase.firestore().doc("companies/" + companies).set(companiesData[j]);
        j = j + 1;
    })
};

export const updateuserRole = () => {
    docs.forEach((doc) => {
        Firebase.firestore().doc("users/"+doc).update({
            role: "admin"
        })
    });
    const users = [
        "chris@aloa.co",
        "greg@danieladvisors.com",
        "greg@gojourneylife.com",
        "jamesberry4@comcast.net",
        "jonathan@gojourneylife.com",
        "jonathan@kairosgarage.com",
        "jonathanwsloan@gmail.com",
        "lk_matthews@yahoo.com",
        "lovelightandhealing@gmail.com",
        "msfarol05@hotmail.com",
        "rebekah@danieladvisors.com",
        "scaldwellgvc@gmail.com",
        "sddyck@icloud.com"];
    users.forEach((doc) => {
        Firebase.firestore().doc("users/"+doc).update({
            role: "user"
        })
    })
};
/***
 *
 * Hardeep, 14:58
 GitHub
 Username: support@gojourneylife.com
 Password: 22%KrsK^YVTe


 check kri detail

 14:58
 ok sir

 Hardeep, 14:58

 Firebase
 Username: support@gojourneylife.com
 Password: $jkX9BJf5dx6
 ***/