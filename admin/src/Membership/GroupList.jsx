import React from "react";
import { Link } from "react-router-dom";
import CollectionTable from "../Components/CollectionTable";
import SearchBox from "../Components/SearchBox";
import Collection from "../Models/Collection";
import CollectionNavigation from "../Models/CollectionNavigation";
import Group from "../Models/Group";

const Row = (props) => {
    const { item, deleteItem } = props;

    return (
        <tr>
            <td>
                <Link to={"/membership/groups/" + item.id}>{item.title}</Link>
            </td>
            <td>
                <Link to={"/membership/groups/" + item.id}>{item.name}</Link>
            </td>
            <td>{item.num_members}</td>
            <td>
                <a onClick={() => deleteItem(item)} className="removebutton">
                    <i className="uk-icon-trash" />
                </a>
            </td>
        </tr>
    );
};

class GroupList extends CollectionNavigation {
    constructor(props) {
        super(props);
        const { search, page } = this.state;

        this.collection = new Collection({
            type: Group,
            search: search,
            page: page,
        });
    }

    render() {
        const columns = [
            {title: "Title", sort: "title"},
            {title: "Name", sort: "name"},
            {title: "Number of members"},
            {title: ""},
        ];

        return (
            <div>
                <h2>Groups</h2>

                <p className="uk-float-left">On this page you see a list of all groups.</p>
                <Link to="/membership/groups/add" className="uk-button uk-button-primary uk-float-right"><i className="uk-icon-plus-circle"/> Create new group</Link>

                <SearchBox
                    handleChange={this.onSearch}
                    value={this.state.search}
                />
                <CollectionTable
                    rowComponent={Row}
                    collection={this.collection}
                    columns={columns}
                    onPageNav={this.onPageNav}
                />
            </div>
        );
    }
}

export default GroupList;
