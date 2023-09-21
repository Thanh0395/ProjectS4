import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Tooltip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material';
import { VisibilityOutlined, ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
function LessonAdmin(props) {
    // message delete box
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const handleClose = () => {
        setOpen(false);
    };
    // end message delete box

    const [selectedRows, setSelectedRows] = useState([]);
    const onDeleteClick = (e, row) => {
        setOpen(true);
        setSelectedItem(row)
    };
    const handleConfirmDelete = () => {
        console.log(selectedItem);
        setOpen(false);
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age', width: 90 },
        {
            field: 'actions', headerName: 'Actions', width: 180, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <>
                        <Button size='small' >
                            <Link to={`detail/${params.row.id}`}>
                                <Tooltip followCursor={true} title="Detail">
                                    <VisibilityOutlined style={{ color: 'green' }} />
                                </Tooltip>
                            </Link>
                        </Button>
                        <Button size='small' >
                            <Link to={`update/${params.row.id}`}>
                                <Tooltip followCursor={true} title="Update">
                                    <ModeEditOutlineOutlined style={{ color: 'blue' }} />
                                </Tooltip>
                            </Link>
                        </Button>
                        <Button
                            onClick={(e) => onDeleteClick(e, params.row)}
                            size='small'
                        >
                            <Tooltip followCursor={true} title="Delete">
                                <DeleteOutline style={{ color: 'red' }} />
                            </Tooltip>
                        </Button>
                    </>
                );
            }
        }
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    return (
        <>
            {/* message delete box */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
            {/* end message delete box */}

            <div className='container'>
                <div className='d-flex justify-content-end'>
                    <span>{selectedRows.length} selected&emsp;</span>
                    <Tooltip title="Delete">
                        <DeleteOutline className="delete-row" style={{ color: 'red' }} />
                    </Tooltip>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            hideFooterSelectedRowCount={true}
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={
                                (ids) => {
                                    const selectedIDs = new Set(ids);
                                    const selectedRows = rows.filter((row) =>
                                        selectedIDs.has(row.id),
                                    );
                                    setSelectedRows(selectedRows);
                                }
                            }
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            checkboxSelection
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            sx={{
                                '.MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 'bold',
                                },
                                '.MuiTablePagination-selectLabel': {
                                    margin: 0,
                                },
                                '.MuiTablePagination-displayedRows': {
                                    margin: 0,
                                },
                                '.MuiDataGrid-cell:focus-within': {
                                    outline: 'none',
                                },
                                '&.MuiDataGrid-root': {
                                    borderColor: 'ActiveBorder',
                                    borderStyle: 'solid',
                                    borderRadius: '10px',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}

export default LessonAdmin;