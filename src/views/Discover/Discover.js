import React from 'react'
import FirebaseAuth from '../misc/FirebaseAuth'
import { Redirect } from 'react-router-dom'
import {
    Page,
} from '../../styles/layout'
import DiscoverInstructions from "./instructions"
import DiscoverTitle from "./DiscoverTitle"
import Error from "../misc/Error"
import {
    Identities,
    SelectVerbs,
    RankVerbs,
    FinalStory
} from "./QuestionPages"
import Firebase from 'firebase'
import {
    selectIdentities,
    addVerbDropdowns,
    loadChoices
} from './QuestionFunctions'


function DiscoverPage({ index }) {
    const key = index;
    return (
        <div>
            {{
                [-1]: <Redirect to="../menu" />,
                0: <DiscoverInstructions />,
                1: <Identities />,
                2: <SelectVerbs />,
                3: <RankVerbs />,
                4: <FinalStory />,
                5: <Redirect to="../" />
            }[key]}
        </div>
    );
}

class Buttons extends React.Component {
    render() {
        if (this.props.index === 0) {
            return <div className="nextpage-button" onClick={this.props.incrementIndex}>Begin</div>
        } else if (this.props.index === 4) {
            return <div>
                    <div className="nextpage-button" onClick={this.props.decrementIndex} key={"back"}>Back</div>
                    <div className="nextpage-button" onClick={this.props.incrementIndex}>Back to Home</div>
                </div>
        } else {
            return <div>
                <div className="nextpage-button" onClick={this.props.decrementIndex} key={"back"}>Back</div>
                <div className="nextpage-button" onClick={this.props.incrementIndex} key={"contine"}>Continue</div>
            </div>
        }
    }
}


class Discover extends React.Component {
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
            if (self.state.index === 1) {
                selectIdentities()
            } else if (self.state.index === 2) {
                addVerbDropdowns()
            } else if (self.state.index === 4) {
                loadChoices()
            }
        })
    }

    render() {
        return (
            <Page>
                <DiscoverTitle />
                <FirebaseAuth>
                    {({ isLoading, error, auth }) => {
                        if (isLoading) {
                            return <img src={require("../../media/loadingIcon.gif")} alt={"loading-icon"} style={{ width: 100, height: 100 }}/>
                        } else if (auth) {
                            return <DiscoverPage index={this.state.index} />
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

export default Discover
