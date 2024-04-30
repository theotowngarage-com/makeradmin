import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";
import Member from "../Models/Member";
import { NavItem } from "../nav";

class MemberBox extends React.Component {
    constructor(props) {
        super(props);
        const { member_id } = props.match.params;
        this.member = Member.get(member_id);
        this.state = { member_id, firstname: "", lastname: "" };
    }

    getChildContext() {
        return { member: this.member };
    }

    componentDidMount() {
        const member = this.member;
        this.unsubscribe = member.subscribe(() =>
            this.setState({
                member_number: member.member_number,
                firstname: member.firstname,
                lastname: member.lastname,
            }),
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { member_id } = this.props.match.params;
        const { member_number, firstname, lastname } = this.state;

        return (
            <div>
                <h2>
                    Medlem #{member_number}: {firstname} {lastname}
                </h2>

                <ul className="uk-tab">
                    <NavItem to={"/membership/members/" + member_id + "/key-handout"}>Key handout</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/member-data"}>Tasks</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/groups"}>Groups</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/keys"}>Keys</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/permissions"}>Permissions</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/orders"}>Orders</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/messages"}>Messages</NavItem>
                    <NavItem to={"/membership/members/" + member_id + "/spans"}>Spans</NavItem>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

MemberBox.childContextTypes = {
    member: PropTypes.instanceOf(Member),
};

export default withRouter(MemberBox);
