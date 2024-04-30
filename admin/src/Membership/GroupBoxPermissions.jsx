import React from "react";
import Select from "react-select";
import * as _ from "underscore";
import CollectionTable from "../Components/CollectionTable";
import Collection from "../Models/Collection";
import Permission from "../Models/Permission";
import { get } from "../gateway";

const Row = (collection) => (props) => {
    const { item } = props;
    return (
        <tr>
            <td>{item.permission}</td>
            <td>
                <a
                    onClick={() => collection.remove(item)}
                    className="removebutton"
                >
                    <i className="uk-icon-trash" />
                </a>
            </td>
        </tr>
    );
};

class GroupBoxPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.collection = new Collection({
            type: Permission,
            url: `/membership/group/${props.match.params.group_id}/permissions`,
            idListName: "permissions",
            pageSize: 0,
        });
        this.state = {
            showOptions: [],
            selectedOption: null,
        };
        this.options = [];

        get({ url: "/membership/permission" }).then((data) => {
            this.options = data.data;
            this.setState({ showOptions: this.filterOptions() });
        });
    }

    componentDidMount() {
        this.unsubscribe = this.collection.subscribe(() =>
            this.setState({ showOptions: this.filterOptions() }),
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    filterOptions() {
        const existing = new Set(
            (this.collection.items || []).map((i) => i.id),
        );
        return this.options.filter(
            (permission) => !existing.has(permission.permission_id),
        );
    }

    selectOption(permission) {
        this.setState({ selectedOption: permission });

        if (_.isEmpty(permission)) {
            return;
        }

        this.collection
            .add(new Permission(permission))
            .then(this.setState({ selectedOption: null }));
    }

    render() {
        const columns = [
            {title: "Permissions"},
        ];
        
        const {showOptions, selectedOption} = this.state;
        
        return (
            <div>
                <div className="uk-margin-top uk-form uk-form-stacked">
                    <label className="uk-form-label" htmlFor="group">
                        Add permisisons
                    </label>
                    <div className="uk-form-controls">
                        <Select
                            name="group"
                            className="uk-select"
                            tabIndex={1}
                            options={showOptions}
                            value={selectedOption}
                            getOptionValue={(p) => p.permission_id}
                            getOptionLabel={(p) => p.permission}
                            onChange={(permission) =>
                                this.selectOption(permission)
                            }
                            isDisabled={!showOptions.length}
                        />
                    </div>
                </div>
                <div className="uk-margin-top">
                    <CollectionTable emptyMessage="The group has no permissions" rowComponent={Row(this.collection)} collection={this.collection} columns={columns} />
                </div>
            </div>
        );
    }
}

export default GroupBoxPermissions;
