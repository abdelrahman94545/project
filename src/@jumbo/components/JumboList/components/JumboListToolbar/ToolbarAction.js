import React from 'react';
import Stack from "@mui/material/Stack";
import useJumboList from "@jumbo/components/JumboList/hooks/useJumboList";
import Div from "@jumbo/shared/Div";
import TablePagination from "@mui/material/TablePagination";

import { useSelector, useDispatch } from 'react-redux';

const ToolbarAction = ({page , paginationChangeFun ,action, actionTail, hidePagination, hideItemsPerPage}) => {
    const {
        activePage, itemsPerPage, totalCount,
        isLoading, setActivePage, setItemsPerPage, itemsPerPageOptions,
        data,
    } = useJumboList();

    const paginationCount = Math.ceil(totalCount / itemsPerPage);

    const contactsCount = useSelector(state => state.Contacts.contactsCount)
    

    return (
        <Stack direction={"row"} alignItems={"center"}>
            {
                action &&
                <Div sx={{padding: 1}}>
                    {action}
                </Div>
            }
            {
                // !hidePagination && Number.isInteger(paginationCount) && !(data?.length <= 0 && isLoading) &&
                <TablePagination
                    component="div"
                    count={contactsCount ? contactsCount : 0}
                    page={page}
                    onPageChange={
                        (event, nextPageNumber) => {
                            console.log("event =", event);
                            console.log("nextPageNumber =", nextPageNumber);
                            // setActivePage(nextPageNumber);
                            paginationChangeFun(nextPageNumber)
                        }
                    }
                    rowsPerPage={10}
                    rowsPerPageOptions={[]}
                    // onRowsPerPageChange={(event) => setItemsPerPage(event.target.value)}
                    // rowsPerPageOptions={hideItemsPerPage ? [] : itemsPerPageOptions}

                    // count={totalCount}
                    // page={activePage}
                    // onPageChange={
                    //     (event, nextPageNumber) => {
                    //         setActivePage(nextPageNumber);
                    //     }
                    // }
                    // rowsPerPage={itemsPerPage}
                    // onRowsPerPageChange={(event) => setItemsPerPage(event.target.value)}
                    // rowsPerPageOptions={hideItemsPerPage ? [] : itemsPerPageOptions}
                />
            }
            {
                actionTail &&
                <Div sx={{padding: 1}}>
                    {actionTail}
                </Div>
            }
        </Stack>
    );
};

export default ToolbarAction;
