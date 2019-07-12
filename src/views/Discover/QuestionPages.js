import React, { Component } from 'react'
import './questionpages.css'
import {
    updateIdentities,
} from './QuestionFunctions'
import Firebase from 'firebase'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';


const arrayMoveMutate = (array, from, to) => {
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
	array = array.slice();
	arrayMoveMutate(array, from, to);
	return array;
};

const SortableItem = SortableElement(({ value }) => <li className="sortable-element">{value}</li>);

const SortableList = SortableContainer(({ verbs }) => {
    return (
        <ul>
            {verbs.map((value, index) => (
                <SortableItem key={`verb-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class SortableComponent extends Component {
    state = {
        verbs: this.props.verbs,
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        let self = this;
        this.setState(({ verbs }) => ({
            verbs: arrayMove(verbs, oldIndex, newIndex),
        }));
        Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.email).update({ finalVerbs: self.state.verbs })
    };
    render() {
        return <SortableList verbs={this.state.verbs} onSortEnd={this.onSortEnd} />;
    }
}


function sameArray(arr1, arr2) {
    for(let i = 0; i < 9; i++) {
        if (arr2.includes(arr1[i])) {
            return false
        }
    }
    return true
}

class RankVerbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            verbs: []
        };
    }

    componentDidMount() {
        let self = this;
        Firebase.auth().onAuthStateChanged(function (user) {
            Firebase.firestore().collection("users").doc(user.email).get().then(function (doc) {
                if (doc.data().finalVerbs && sameArray(doc.data().finalVerbs, doc.data().verbs)) {
                    self.setState({
                        isLoaded: true,
                        verbs: doc.data().finalVerbs
                    })
                } else {
                    self.setState({
                        isLoaded: true,
                        verbs: doc.data().verbs
                    });
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
        })
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <img src={require("../../media/loadingIcon.gif")} style={{ width: 100, height: 100 }} alt={"loading-icon"}/>
        } else {
            return (
                <div className="centered-div">
                    <h3 className="section-title">Stack rank your top impact verbs</h3>
                    {this.state && this.state.verbs &&
                        <SortableComponent verbs={this.state.verbs} />
                    }
                </div>
            )
        }
    }
}

const Identities = () => (
    <div className="centered-div">
        <h3 className="section-title">Select your top 3 identities</h3>
        <select onChange={updateIdentities} id="firstIdentity" name="firstIdentity" data-name="firstIdentity" required="" className="identity-dropdown w-select">
            <option value="">Select one...</option>
            <option value="Achiever">Achiever</option>
            <option value="Coach">Coach</option>
            <option value="Communicator">Communicator</option>
            <option value="Creator">Creator</option>
            <option value="Doer">Doer</option>
            <option value="Leader">Leader</option>
            <option value="Optimizer">Optimizer</option>
            <option value="Planner">Planner</option>
            <option value="Analyst">Analyst</option>
            <option value="Researcher">Researcher</option>
        </select>
        <select onChange={updateIdentities} id="secondIdentity" name="Second-Identity" data-name="Second Identity" required="" className="identity-dropdown w-select">
            <option value="">Select one...</option>
            <option value="Achiever">Achiever</option>
            <option value="Coach">Coach</option>
            <option value="Communicator">Communicator</option>
            <option value="Creator">Creator</option>
            <option value="Doer">Doer</option><option value="Leader">Leader</option>
            <option value="Optimizer">Optimizer</option><option value="Planner">Planner</option>
            <option value="Analyst">Analyst</option>
            <option value="Researcher">Researcher</option>
        </select>
        <select onChange={updateIdentities} id="thirdIdentity" name="thirdIdentity" data-name="thirdIdentity" required="" className="identity-dropdown w-select">
            <option value="">Select one...</option>
            <option value="Achiever">Achiever</option>
            <option value="Coach">Coach</option>
            <option value="Communicator">Communicator</option>
            <option value="Creator">Creator</option>
            <option value="Doer">Doer</option>
            <option value="Leader">Leader</option>
            <option value="Optimizer">Optimizer</option>
            <option value="Planner">Planner</option>
            <option value="Analyst">Analyst</option>
            <option value="Researcher">Researcher</option>
        </select>
        <p className="paragraph">An <strong>Achiever </strong>is someone who is successful in their studies or their work, usually as a result of their efforts.
                        <br />
            A <strong>Coach </strong>is someone who trains others to perform in a particular arena of life or sport.
                        <br />
            A <strong>Communicator </strong>is someone who is able to convey or exchange information, news, or ideas, especially one who is eloquent or skilled.
                        <br />
            A <strong>Creator </strong>is someone who brings something into existence.
                        <br />
            A <strong>Doer </strong>is someone who acts rather than merely talking or thinking.
                        <br />
            A <strong>Leader </strong>is someone who leads or commands a group, organization, or country.
                        <br />
            An <strong>Optimizer </strong>is someone who makes as perfect, effective, or functional as possible.
                        <br />
            A <strong>Planner </strong>is someone who plans things.
                        <br />
            An <strong>Analyst</strong> is someone who is an expert at analyzing and managing quantitative data.
                        <br />
            A <strong>Researcher </strong>is someone whose job involves discovering or verifying information for use in a book, program, etc.
        </p>
    </div>
)

const SelectVerbs = () => (
    <div className="centered-div">
        <h3 className="section-title">Select impact verbs for each of your top Identities!</h3>
    </div>

)

const FinalStory = () => (
    <div className="centered-div" style={{ maxWidth: 600 }}>
        <h3 style={{ fontSize: 24, textAlign: "center" }}>
            Congratulations, you have completed
            <br />
            Discover My Identity!
        </h3>
        <div>
            <div id="identity-list" className="div-block-23">
                <div className="list-element list-title">Your top identities are:</div>
            </div>
            <div id="impact-verb-list">
                <div className="list-element list-title">Your top impact verbs are:</div>
            </div>
        </div>
    </div>
)

export {
    Identities,
    SelectVerbs,
    RankVerbs,
    FinalStory,
} 
