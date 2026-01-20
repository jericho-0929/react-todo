import React, {useState} from 'react';
import ReactPaginate from "react-paginate";

import Todo from "./Todo";

// Uses react-paginate library by ~adele on npmjs.
// https://www.npmjs.com/package/react-paginate

// TODO: Add function to automatically return to previous page 
// if last entry on second (and above) page is deleted.

function PaginatedItems({itemsPerPage, items, handleToggleSelect, handleToggleStatus}) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        console.log('Offsetting');
    };
    
    return (
        <>
        <table>
            <thead>
              <tr>
                <th> Task Name </th>
                <th> Description </th>
                <th> Status </th>
                <th> Selected </th>
                <th> Date Added: </th>
              </tr>
            </thead>
            <tbody>
                <Todo
                    tasks={currentItems}
                    handleToggleSelect={handleToggleSelect}
                    handleToggleStatus={handleToggleStatus}
                />
            </tbody>
        </table>
        <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='Previous'
            renderOnZeroPageCount={null}
        />
        </>
    )
}

export default PaginatedItems