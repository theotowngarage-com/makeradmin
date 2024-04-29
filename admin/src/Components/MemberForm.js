import React from "react";
import { withRouter } from "react-router";
import CountryDropdown from "./CountryDropdown";
import DateTimeShow from "./DateTimeShow";
import TextInput from "./TextInput";

class MemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveDisabled: true,
        };
    }

    componentDidMount() {
        const { member } = this.props;
        this.unsubscribe = member.subscribe(() =>
            this.setState({ saveDisabled: !member.canSave() }),
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { member, onSave, onDelete } = this.props;
        const { saveDisabled } = this.state;

        return (
            <div className="meep">
                <form
                    className="uk-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave();
                        return false;
                    }}
                >
                    <fieldset>
                        <legend>
                            <i className="uk-icon-user" /> Personuppgifter
                        </legend>

                        <TextInput model={member} name="civicregno" title="CPR Number" />
                        <TextInput model={member} name="firstname" title="First name" />
                        <TextInput model={member} name="lastname" title="Last name" />
                        <TextInput model={member} name="email" title="Email" />
                        <TextInput model={member} name="phone" title="Phone number" />
                    </fieldset>

                    <fieldset data-uk-margin>
                        <legend><i className="uk-icon-home"/> Address</legend>

                        <TextInput model={member} name="address_street" title="Address 1" />
                        <TextInput model={member} name="address_extra" title="Address 2" placeholder="" />
                        <TextInput model={member} type="number" name="address_zipcode" title="Post number" />
                        <TextInput model={member} name="address_city" title="City" />

                        <div className="uk-form-row">
                            <label htmlFor="" className="uk-form-label">Country</label>
                            <div className="uk-form-controls">
                                <CountryDropdown
                                    model={member}
                                    name="address_country"
                                />
                            </div>
                        </div>
                    </fieldset>
     
                    {member.id
                     ?
                     <fieldset data-uk-margin>
                         <legend><i className="uk-icon-tag"/> Metadata</legend>
                         
                         <div className="uk-form-row">
                             <label className="uk-form-label">Member page</label>
                             <div className="uk-form-controls">
                                 <i className="uk-icon-calendar"/>
                                 &nbsp;
                                 <DateTimeShow date={member.created_at} />
                             </div>
                         </div>
                         
                         <div className="uk-form-row">
                             <label className="uk-form-label">Last updated</label>
                             <div className="uk-form-controls">
                                 <i className="uk-icon-calendar"/>
                                 &nbsp;
                                 <DateTimeShow date={member.updated_at} />
                             </div>
                         </div>
                     </fieldset>
                     :
                     ""}

                    <div className="uk-form-row">
                        {member.id ? <a className="uk-button uk-button-danger uk-float-left" onClick={onDelete}><i className="uk-icon-trash"/> Remove member</a> : ""}
                        <button className="uk-button uk-button-success uk-float-right" disabled={saveDisabled}><i className="uk-icon-save"/> {member.id ? 'Save' : 'Create'}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(MemberForm);
