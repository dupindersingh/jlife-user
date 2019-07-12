import React from 'react'
import FirebaseAuth from '../misc/FirebaseAuth'
import { Redirect } from 'react-router-dom'
import {
    Page,
} from '../../styles/layout'
import DefineInstructions from "./instructions"
import DefineTitle from "./DefineTitle"
import Error from "../misc/Error"
import {
    StoryOne,
    StoryTwo,
    StoryThree,
    Formative,
    Talents,
    Capabilities,
    Passions,
    Philanthropy,
    BuildPurpose,
    FinalizePurpose,
    FinalPurpose
} from "./QuestionPages"
import Firebase from 'firebase'
import { loadExistingData } from './QuestionFunctions'


function DefinePage({ index }) {
    const key = index;
    return (
        <div>
            {{
                [-1]: <Redirect to="../menu" />,
                0: <DefineInstructions />,
                1: <StoryOne />,
                2: <StoryTwo />,
                3: <StoryThree />,
                4: <Formative />,
                5: <Talents />,
                6: <Capabilities />,
                7: <Passions />,
                8: <Philanthropy />,
                9: <BuildPurpose />,
                10: <FinalizePurpose />,
                11: <FinalPurpose />,
                12: <Redirect to="../menu" />
            }[key]}
        </div>
    );
}

class Buttons extends React.Component {
    render() {
        if (this.props.index === 0) {
            return <div className="nextpage-button" onClick={this.props.incrementIndex}>Begin</div>
        } else if (this.props.index === 11) {
            return <div className="nextpage-button" onClick={this.props.incrementIndex}>Back to Home</div>
        } else {
            return <div>
                <div className="nextpage-button" onClick={this.props.decrementIndex} key={"back"}>Back</div>
                <div className="nextpage-button" onClick={this.props.incrementIndex} key={"contine"}>Continue</div>
            </div>
        }
    }
}


class Define extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        };

        this.incrementIndex = this.incrementIndex.bind(this);
        this.decrementIndex = this.decrementIndex.bind(this)
    }

    incrementIndex() {
        this.setState({
            index: this.state.index + 1
        })
    }

    decrementIndex() {
        this.setState({
            index: this.state.index - 1
        })
    }

    componentDidUpdate() {
        let self = this;
        Firebase.auth().onAuthStateChanged(function (user) {
            loadExistingData()
            if (self.state.index === 5) {
                let docRef = Firebase.firestore().collection("users").doc(user.email);
                //confirm document exists
                docRef.get().then(async function (doc) {
                    if (doc.exists) {
                        if (doc.data().talents) {
                            let index = 0;
                            Array.from(document.getElementsByTagName('input')).forEach(function (input) {
                                input.placeholder = doc.data().talents[index];
                                index++;
                            })
                        }
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            } else if (self.state.index === 7) {
                let docRef = Firebase.firestore().collection("users").doc(user.email);
                //confirm document exists
                docRef.get().then(async function (doc) {
                    if (doc.exists) {
                        if (doc.data().passions) {
                            let index = 0;
                            Array.from(document.getElementsByTagName('input')).forEach(function (input) {
                                input.placeholder = doc.data().passions[index];
                                index++;
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
        })

    }

    render() {
        return (
            <Page>
                <DefineTitle />
                <FirebaseAuth>
                    {({ isLoading, error, auth }) => {
                        if (isLoading) {
                            return <img src={require("../../media/loadingIcon.gif")} style={{ width: 100, height: 100 }} alt={"loading-icon"} />
                        } else if (auth) {
                            return <DefinePage index={this.state.index} />
                        } else {
                            return <Error error={error} />
                        }
                    }}
                </FirebaseAuth>
                <Buttons
                    index={this.state.index}
                    incrementIndex={this.incrementIndex}
                    decrementIndex={this.decrementIndex}
                />
            </Page>
        )
    }
}

export default Define
