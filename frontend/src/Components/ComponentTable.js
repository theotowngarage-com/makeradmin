import React from 'react';
import * as _ from "underscore";
import {confirmModal} from "../message";


export default class CollectionTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {sort: {key: null, order: 'up'}, items: [], page: {}, loading: true};
    }
    
    componentDidMount() {
        const {collection} = this.props;
        this.unsubscribe = collection.subscribe(({page, items}) => this.setState({page, items, loading: false}));
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    renderHeading(column, i) {
        const sortState = this.state.sort;
        const {collection} = this.props;
        
        if (column.title) {
            let title;
            if (column.sort) {
                const sortIcon = <i className={"uk-icon-angle-" + sortState.order}/>;
                const onClick = () => {
                    const sort = {key: column.sort, order: sortState.key === column.sort && sortState.order === 'down' ? 'up' : 'down'};
                    this.setState({sort, loading: true});
                    collection.updateSort(sort);
                };
                title = (
                    <a data-sort={column.sort} onClick={onClick}>
                        {column.title} {column.sort === sortState.key ? sortIcon : ''}
                    </a>);
            }
            else {
                title = column.title;
            }
            return <th key={i} className={column.class}>{title}</th>;
        }
        return <th key={i}/>;
    }

    renderPagination() {
        const {collection} = this.props;
        const {page} = this.state;
        
        if (!page.count || page.count <= 1) {
            return "";
        }
        
        return (
            <ul className="uk-pagination">
                {_.range(1, page.count + 1).map(i => {
                    if (i === page.index) {
                        return <li key={i} className="uk-active"><span>{i}</span></li>;
                    }
                    return <li key={i}><a href="#" onClick={() => {
                        this.setState({loading: true});
                        collection.updatePage(i);
                    }}>{i}</a></li>;
                })}
            </ul>
        );
    }
    
    removeItem(item) {
        return confirmModal(item.removeConfirmMessage()).then(() => this.props.collection.removeItem(item), () => null);
    }
    
    render() {
        const {rowComponent, columns} = this.props;
        const {items, loading} = this.state;
        
        const rows = items.map((item, i)  => React.createElement(rowComponent, {item, removeItem: () => this.removeItem(item), key: i}));
        const headers = columns.map((c, i) => this.renderHeading(c, i));
        const pagination = this.renderPagination();
			
        return (
            <div>
                {pagination}
                <div style={{position: "relative", "clear": "both"}}>
                    <table className={"uk-table uk-table-condensed uk-table-striped uk-table-hover" + (loading ? " backboneTableLoading" : "")}>
                        <thead><tr>{headers}</tr></thead>
						<tbody>{rows}</tbody>
					</table>
                    {loading ?
                     <div className="loadingOverlay">
                         <div className="loadingWrapper">
                             <span><i className="uk-icon-refresh uk-icon-spin"/> Hämtar data...</span>
                         </div>
                     </div>  : ''}
				</div>
				{pagination}
			</div>
        );
    }
}


