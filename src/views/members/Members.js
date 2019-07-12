import React from 'react'
import FirebaseAuth from '../misc/FirebaseAuth'
import {Page,} from '../../styles/layout'
import Firebase from 'firebase/app'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            membersPageLoading: true,
            membersError: false,
            membersMessage: ""
        }
    }

    componentDidMount() {
        const thi = this;
        const teams = Firebase.firestore().collection("teams").get();
        teams.then((all_teams) => {
            all_teams.forEach((t) => {
                const team = Firebase.firestore().collection("teams").doc(t.id).get();
                team.then((detail) => {
                    if (detail) {
                        console.log(detail.data(), "detail... data");
                        const member = detail.data().member;
                        console.log(member, "member in teams...");
                        const currentMember = Firebase.firestore().doc("users/" + member).get();
                        currentMember.then((currentMemberDocData) => {
                            if (currentMemberDocData) {
                                console.log(currentMemberDocData.data(), "email data....");
                                let members = thi.state.members;
                                members.push(currentMemberDocData.data());
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
                                    membersMessage: "111"
                                })
                            })
                    }
                })
            })
        })
    }

    render() {
        const {members} = this.state;
        console.log(members, "state members.........................")
        return (
            <Page>
                <FirebaseAuth>
                    {({isLoading, error, auth}) => {
                        if (isLoading || this.state.membersPageLoading) {
                            return <img src={require("../../media/loadingIcon.gif")} alt={"loading-icon"} style={{ width: 100, height: 100 }}/>
                        }
                        else {
                            if (auth) {
                                return <div>
                                    <div className="title-header">
                                        <h1 className="welcometext">Managers List</h1>
                                    </div>
                                    <table className="zui-table">
                                        <thead>
                                        <tr>
                                            <th>Member Name</th>
                                            <th>Email Address</th>
                                            <th>Company</th>
                                            <th>PhoneNumber</th>
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
                                                        {member.company}
                                                    </td>
                                                    <td>
                                                        {member.phoneNumber}
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
                                </div>
                            }

                            return null
                        }
                    }}
                </FirebaseAuth>
            </Page>
        )
    }
}

export default Menu