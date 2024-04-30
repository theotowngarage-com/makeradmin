import React from "react";
import { Link } from "react-router-dom";
import CollectionTable from "../Components/CollectionTable";
import DateTimeShow from "../Components/DateTimeShow";
import Collection from "../Models/Collection";
import CollectionNavigation from "../Models/CollectionNavigation";
import Message from "../Models/Message";

const Row = (props) => {
    const { item } = props;

    return (
        <tr>
            <td>
                <DateTimeShow date={item.created_at} />
            </td>
            <td>{Message.statusText(item)}</td>
            <td>{item.recipient}</td>
            <td>
                <Link to={"/messages/" + item.id}>{item.subject}</Link>
            </td>
        </tr>
    );
};

class MemberBoxMessages extends CollectionNavigation {
    constructor(props) {
        super(props);
        const { search, page } = this.state;
        this.collection = new Collection({
            type: Message,
            url:
                "/messages/member/" +
                props.match.params.member_id +
                "/messages",
            search,
            page,
        });
    }

    render() {
        const columns = [
            {title: "Created at", sort: "created_at"},
            {title: "Status", sort: "status"},
            {title: "Recipient", sort: "recipient"},
            {title: "Subject", sort: "subject"},
        ];

        return (
            <div className="uk-margin-top">
                <CollectionTable rowComponent={Row} collection={this.collection} columns={columns} />
                <Link to={"/membership/members/" + this.props.match.params.member_id + "/messages/new"} className="uk-button uk-button-primary"><i className="uk-icon-envelope" /> Send message</Link>
            </div>
        );
    }
}

export default MemberBoxMessages;
