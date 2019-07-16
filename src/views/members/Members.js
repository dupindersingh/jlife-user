import React from 'react'
import {Page,} from '../../styles/layout'
import Firebase from 'firebase/app'
import AddTeamToManager from "../../components/dashboard/dialogBox/add-team-to-manager";

let thi = null;

class Managers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            isLoading: true,
            error: null,
            auth: null,

            members: [],
            membersPageLoading: true,
            membersError: false,
            membersMessage: "",

            openDialogBox: false,
            addTeams: [],

            addTheseTeams: [],

            selectedManager: null
        }
    }

    closeAssignTeamToManagerDialogBox() {
        thi.setState({
            openDialogBox: false,
            members: [],
        });
        document.getElementById("dialogBox").style.display = "none";
        document.getElementById("dialogBox").classList.remove("in");
        thi.getManagers();
    }

    changeAddTeamToManager = (selectedOptions) => {
        if (selectedOptions === null) {
            selectedOptions = []
        }
        thi.setState({
            addTheseTeams: selectedOptions
        })
    };

    submitAddTeamToManager(e) {
        e.preventDefault();
        // update the managers for new teams added
        const newTeamsToAdd = thi.state.addTheseTeams;
        if (newTeamsToAdd.length > 0) {
            newTeamsToAdd.forEach((team) => {
                Firebase.firestore().collection("teams").doc(team.value).update({
                    "member": thi.state.selectedManager.email
                })
            });
            const updateManagerRole = thi.state.addTeams;
            updateManagerRole.forEach((manager) => {
                Firebase.firestore().collection("users").doc(manager.email).update({
                    "role": "user"
                })
            })
            // success adde teams...
        } else {
            // error no teams selected... to add...
        }
        thi.closeAssignTeamToManagerDialogBox();
    }

    getManagers(currentManagerEmail) {
        thi.setState({
            membersPageLoading: true
        });
        const teams = Firebase.firestore().collection("teams").get();
        teams.then((all_teams) => {
            all_teams.forEach((t) => {
                const team = Firebase.firestore().collection("teams").doc(t.id).get();
                team.then((detail) => {
                    if (detail) {
                        const managerTeamDetails = detail.data();
                        if (managerTeamDetails.member !== currentManagerEmail) {
                            const currentMember = Firebase.firestore().doc("users/" + managerTeamDetails.member).get();
                            currentMember.then((currentMemberDocData) => {
                                if (currentMemberDocData) {
                                    let members = thi.state.members;
                                    const managerDetails = currentMemberDocData.data();
                                    Object.assign(managerDetails, {
                                        "teamDetails": {
                                            "employee": managerTeamDetails.employee,
                                            "member": managerTeamDetails.member,
                                            "teamName": managerTeamDetails.teamName
                                        }
                                    });
                                    members.push(managerDetails);
                                    thi.setState({
                                        members,
                                        membersPageLoading: false,
                                        membersError: false,
                                        membersMessage: ""
                                    })
                                }
                            })
                                .catch(error => {
                                    thi.setState({
                                        members: [],
                                        membersPageLoading: false,
                                        membersError: true,
                                        membersMessage: error.message
                                    })
                                })
                        }
                    }
                })

            })
        })
    }

    componentDidMount() {
        thi = this;
        this.unsubscribe = Firebase.auth()
            .onAuthStateChanged(this.handleAuth, this.handleError);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    handleAuth = auth => {
        const person = Firebase.firestore().collection("users").doc(auth.email).get();
        person.then((personDetails) => {
            if (personDetails) {
                let details = personDetails.data();
                Object.assign(details, auth);
                this.setState({
                    isLoading: false,
                    auth: details,
                    error: null,
                });
                if (details.role !== "manager") {
                    thi.props.history.push("/menu");
                }
                thi.getManagers(auth.email);
            } else {
                this.setState({
                    isLoading: false,
                    auth,
                    error: null,
                });
                thi.getManagers(auth.email);
            }
        });
    };

    handleError = error => {
        this.setState({
            isLoading: false,
            auth: null,
            error,
        })
    };

    openDialogBox(e, manager) {
        const managers = thi.state.members;
        let selectedManagerTeams = [];
        let addTeams = [];
        managers.forEach((m) => {
            if (m.email === manager.email) {
                selectedManagerTeams.push(m.teamDetails.teamName);
            } else {
                addTeams.push({
                    "label": m.teamDetails.teamName,
                    "value": m.teamDetails.teamName,
                    "email": m.teamDetails.member
                });
            }
        });
        thi.setState({
            openDialogBox: true,
            addTeams,
            addTheseTeams: [],
            selectedManager: manager
        });
        document.getElementById("dialogBox").style.display = "block";
        document.getElementById("dialogBox").classList.add("in");
    }


    render() {
        const {members, auth, isLoading, error} = this.state;
        return (
            <Page>
                {
                    (isLoading || this.state.membersPageLoading) ?
                        <img src={require("../../media/loadingIcon.gif")} alt={"loading-icon"}
                             style={{width: 100, height: 100}}/>
                        :
                        auth ? <div>
                                <div className="title-header">
                                    <h1 className="welcometext">Managers List</h1>
                                </div>
                                <div>
                                    {/*<button id="addManager" className="submit-button"*/}
                                    {/*        onClick={this.openAddManagerDialogBox.bind(this)}>Add Manager +*/}
                                    {/*</button>*/}
                                </div>
                                <table className="zui-table">
                                    <thead>
                                    <tr>
                                        <th>Member Name</th>
                                        <th>Email Address</th>
                                        <th>Team Name</th>
                                        <th>Total Employee</th>
                                        <th>Add Team</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        !this.state.membersPageLoading && !this.state.membersError && this.state.members.length > 0 &&
                                        this.state.members.map((member) => {
                                            return <tr>
                                                <td>
                                                    {member.firstName + " " + member.lastName}
                                                </td>
                                                <td>
                                                    {member.email}
                                                </td>
                                                <td>
                                                    {member.teamDetails.teamName}
                                                </td>
                                                <td>
                                                    {member.teamDetails.employee.length}
                                                </td>
                                                <td>
                                                    <button style={{cursor: "pointer"}}
                                                            onClick={(e) => this.openDialogBox(e, member)} type="button"
                                                            className="btn submit-btn">Add Team
                                                    </button>
                                                </td>
                                            </tr>

                                        })
                                    }
                                    {
                                        !this.state.membersPageLoading && !this.state.membersError && this.state.members.length === 0 &&
                                        <tr>
                                            <td></td>
                                            <td>No members found!!</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                    {
                                        !this.state.membersPageLoading && this.state.membersError &&
                                        <tr>
                                            <td></td>
                                            <td>{this.state.membersMessage}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }

                                    </tbody>
                                </table>
                                <AddTeamToManager
                                    addTeams={this.state.addTeams}

                                    addTheseTeams={this.state.addTheseTeams}
                                    changeAddTeamToManager={this.changeAddTeamToManager}

                                    submitAddTeamToManager={this.submitAddTeamToManager}

                                    closeAssignTeamToManagerDialogBox={this.closeAssignTeamToManagerDialogBox}
                                />
                                {
                                    this.state.openDialogBox &&
                                    <div className="modal-backdrop fade show"></div>
                                }
                            </div>
                            :

                            null
                }
            </Page>
        )
    }
}

export default Managers