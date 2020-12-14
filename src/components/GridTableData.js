import React, {useContext} from 'react';
import MUIDataTable from "mui-datatables";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { IconButton } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {useDispatch} from 'react-redux';
import {CreateToDoActionCreator, DeleteToDoActionCreator, RemoveObjectActionCreator} from '../store/redux';

export const GridTableData = ({gridTableData}) => {
    const dispatch = useDispatch();
    function itemAdded() {
        
        enqueueSnackbar('Cart Checkout Success', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
        });
    }
    function removeObj(gridData){
        enqueueSnackbar('Item removed from the cart', {
            variant: 'info',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
        });
        console.log(gridData);
        if (gridData.count === 1){
            dispatch(RemoveObjectActionCreator({id: gridData.id}));

        }
    }
    const { enqueueSnackbar } = useSnackbar();
    const columns = [
        {
            name: "name",
            label: "Item Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "count",
            label: "Quantity",
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <div>
                            <IconButton color="primary" aria-label="add" onClick={() => {dispatch(CreateToDoActionCreator({id: gridTableData[dataIndex].id}))
                            itemAdded()}}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                            {gridTableData[dataIndex].count}
                            <IconButton disabled = {gridTableData[dataIndex].count? false: true} color="secondary" aria-label="remove" onClick={() => {dispatch(DeleteToDoActionCreator({id: gridTableData[dataIndex].id}))
                            removeObj(gridTableData[dataIndex])}}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </div>
                    )
                },
                sort: false,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: false,
            }
        },
        
    ];
    const options = {
        onRowsDelete: (rowsDeleted) => {
            dispatch(DeleteToDoActionCreator(rowsDeleted.data))
            enqueueSnackbar('Item removed from the cart', {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        },
        filterType: 'checkbox',
        filter: false,
        download: false,
        print: false,
        viewColumns: false,
        pagination: false,
        search: false,
    };


    return (
        <div>
            <MUIDataTable
                title={"Shopping Cart"}
                data={gridTableData}
                options={options}
                columns={columns}
            />
        </div>
    )
}
