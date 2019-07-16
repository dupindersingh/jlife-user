import React from 'react';
import Select from 'react-select';


class AddTeamToManager extends React.Component {
    render() {
        const {
            addTeams,

            addTheseTeams,
            changeAddTeamToManager,

            submitAddTeamToManager,

            closeAssignTeamToManagerDialogBox
        } = this.props;
        console.log(addTeams, "addTeams......");
        return (
            <div>
                <div className="modal" id="dialogBox" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                            <form onSubmit={submitAddTeamToManager.bind(this)} className="add-employee-form">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title"
                                            id="exampleModalCenterTitle">Add Employee</h5>
                                    </div>
                                    <div className="code">
                                        <Select
                                            closeMenuOnSelect={false}
                                            value={addTheseTeams}
                                            onChange={changeAddTeamToManager.bind(this)}
                                            placeholder="Choose Teams To Add"
                                            isSearchable={true}
                                            isMulti={true}
                                            options={addTeams}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                onClick={closeAssignTeamToManagerDialogBox.bind(this)}>Close
                                        </button>
                                        <button type="submit" className="btn submit-btn">Submit</button>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTeamToManager