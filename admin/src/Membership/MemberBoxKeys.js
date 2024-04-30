import React from "react";
import { Link } from "react-router-dom";
import CollectionTable from "../Components/CollectionTable";
import DateTimeShow from "../Components/DateTimeShow";
import TextInput from "../Components/TextInput";
import Collection from "../Models/Collection";
import Key from "../Models/Key";
import { confirmModal } from "../message";

const Row = (collection) => (props) => {
    const { item } = props;

    const deleteKey = () => {
        return confirmModal(item.deleteConfirmMessage())
            .then(() => item.del())
            .then(
                () => collection.fetch(),
                () => null,
            );
    };

    return (
        <tr>
            <td>
                <Link to={"/membership/keys/" + item.id}>{item.tagid}</Link>
            </td>
            <td>{item.description}</td>
            <td>
                <DateTimeShow date={item.created_at} />
            </td>
            <td>
                <a onClick={deleteKey} className="removebutton">
                    <i className="uk-icon-trash" />
                </a>
            </td>
        </tr>
    );
};

class MemberBoxKeys extends React.Component {
    constructor(props) {
        super(props);
        const { member_id } = props.match.params;
        this.collection = new Collection({
            type: Key,
            url: `/membership/member/${member_id}/keys`,
            idListName: "keys",
            pageSize: 0,
        });
        this.key = new Key({ member_id });
        this.state = { saveEnabled: false };
    }

    componentDidMount() {
        const key = this.key;
        this.unsubscribe = key.subscribe(() =>
            this.setState({ saveEnabled: key.canSave() }),
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    createKey() {
        this.key.save().then(() => {
            this.key.reset({ member_id: this.props.match.params.member_id });
            this.collection.fetch();
        });
    }

    render() {
        const columns = [
            { title: "RFID", sort: "tagid" },
            { title: "Kommentar" },
            { title: "Skapad", sort: "created_at" },
            { title: "" },
        ];

        const { member_id } = this.props.match.params;
        const { saveEnabled } = this.state;

        return (
            <div>
                <div className="uk-margin-top uk-form uk-form-stacked">
                    <div className="meep">
                        <form
                            className="uk-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.createKey();
                                return false;
                            }}
                        >
                            <div className="uk-grid">
                                <div className="uk-width-1-1">
                                    <TextInput model={this.key} tabIndex="1" name="tagid" title="RFID" placeholder="Use an RFID reader to read the unique number on the key" />
                                    <TextInput model={this.key} tabIndex="2" name="description" title="Comment" placeholder="It is optional to insert a comment of the key" />

                                    <div className="uk-form-row uk-margin-top">
                                        <div className="uk-form-controls">
                                            <button className="uk-button uk-button-success uk-float-right" disabled={!saveEnabled}><i className="uk-icon-save"/> Create key</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="uk-margin-top">
                    <CollectionTable emptyMessage="No keys for the member" rowComponent={Row(this.collection, member_id)} collection={this.collection} columns={columns} />
                </div>
            </div>
        );
    }
}

export default MemberBoxKeys;
