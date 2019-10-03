
import React from 'react';

import _ from 'lodash';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.countItems) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.countItems !== prevProps.countItems) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        let countItems = this.props.countItems;
        let pager = this.state.pager;
        let pageSize = parseInt(this.props.pageSize);
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(countItems, page, pageSize);
        this.setState({ pager: pager });
        this.props.onChangePage(pager.startIndex, pager.endIndex + 1);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = _.range(startPage, endPage + 1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : null} onClick={() => this.setPage(1)}>
                    <a href="#" title="First">
                        First
                    </a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : null} onClick={() => this.setPage(pager.currentPage - 1)}>
                    <a href="#" title="Previous">
                        Prev
                    </a>
                </li>
                {pager.pages.map((page, index) =>
                    <li className={pager.currentPage === page ? 'active' : null} name={page} key={index} onClick={() => this.setPage(page)}>
                        <a href="#">
                            {page}
                        </a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : null} onClick={() => this.setPage(pager.currentPage + 1)}>
                    <a href="#" title="Next">
                        Next
                    </a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : null} onClick={() => this.setPage(pager.totalPages)}>
                    <a href="#" title="Last">
                        Last
                    </a>
                </li>
            </ul>
        );
    }
}

export default Pagination;