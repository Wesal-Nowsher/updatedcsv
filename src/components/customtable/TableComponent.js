
import React from 'react';

import Pagination from "./Pagination";

function Increment() {
    return (
        this.setState({
            counter: this.state.counter + 1
        })
    );
}

function query(tableData = "", startIndex = null, endIndex = null) {

    return tableData.length>0 && startIndex >=0 && endIndex >= 0?tableData.slice(startIndex, endIndex):tableData;
}

class TableHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: [],
            sort: {
                column: null,
                direction: 'asc',
            },
        };

        this.onSort = this.onSort.bind(this)
    }

    onSort = (column) => (e) => {

        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'asc';
        const sortedData = this.props.data.sort((a, b) => {

            if (a[column] < b[column]) {
                return -1;
            }
            else if (a[column] > b[column]) {
                return 1;
            }
            else {
                return 0;
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        this.setState({
            data: sortedData,
            sort: {
                column,
                direction,
            }
        });

    };

    setArrow = (column) => {
        let className = 'sort-direction';

        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
        }

        console.log(className);

        return className;
    };

    render() {

        const {head, data} = this.props;

        let header_row = [];

        // head.forEach(function(data) {
        //     header_row.push(<th key={data.key} onClick={this.onSort(data.key)}>{data.label}</th>);
        // });

        head.map(function(data, index) {
           if(index <11){
               header_row.push(<th key={index}>{data}</th>);
           }
        }, this);

        const header = (
            <tr>
                {header_row}
            </tr>
        );

        return (
            <thead>{header}</thead>
        );
    }
}

class TableRow extends React.Component {
    render() {

        const {head, data} = this.props;

        // let table_row = [];

        // data.forEach(function(data, i) {
        //
        //     _.forEach(data, function(value, key) {
        //         table_row.push(<td key={key}>{value}</td>);
        //     });
        // });

        let rows = data.map(function(item,i) {

            // handle the column data within each row

              let cells = head.map(function(colData,i) {

                    if(i<11) {
                        return <td key={i} className={item["blue"]}>{item[head[i]]}</td>;
                    }

              });
              return <tr key={i}>{cells}</tr>;

        });

        return (
            <tbody>{rows}</tbody>
        );
    }
}

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startIndex: null,
            endIndex: null,
            count: 1
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage(startIndex, endIndex) {
        this.setState({ startIndex:  startIndex, endIndex: endIndex});
    }

    render() {
        return (
            <div>
                <div className="scrollbar" id="style-7">
                <table>
                    <TableHeader data={this.props.data} head={this.props.head} />
                    <TableRow data={query(this.props.data, this.state.startIndex, this.state.endIndex)} head={this.props.head} />
                </table>
                </div>
                <Pagination
                    pageSize={this.props.pageSize}
                    countItems={this.props.data.length}
                    onChangePage={this.handleChangePage}
                />
            </div>
        );
    }
}

export default Table;