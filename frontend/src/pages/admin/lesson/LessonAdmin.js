import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Tooltip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material';
import { VisibilityOutlined, ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deletePost, fetchListLesson } from '../../../services/api/lessonApi';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from 'react-bootstrap';
function LessonAdmin(props) {
    // message delete box
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const handleClose = () => {
        setOpen(false);
    };
    // end message delete box
    const [errorMessage, setErrorMessage] = useState(null);
    const [variant, setVariant] = useState('info');
    const [loading, setLoading] = useState(true);
    const [listLesson, setListLesson] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchListLesson();
                // const data = await response.json();
                await setListLesson(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const onDeleteClick = (e, row) => {
        setOpen(true);
        setSelectedItem(row)
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await deletePost(selectedItem.id);
            const updateList = listLesson.filter(item => item.id !== selectedItem.id);
            setListLesson(updateList);
            setErrorMessage(response);
        } catch (error) {
            setVariant('danger');
            setErrorMessage('Not allow to delete, this is not your post');
        } finally {
            setOpen(false);
        }
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'content', headerName: 'Content', width: 130 },
        { field: 'categoryName', headerName: 'Category', width: 130 },
        { field: 'authorName', headerName: 'Author', width: 130 },
        {
            field: 'creatatedAt', headerName: 'Created Date', width: 160, valueFormatter: (params) => {
                // Format the date using Intl.DateTimeFormat
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }).format(new Date(params.value));

                return formattedDate;
            },
        },
        {
            field: 'actions', headerName: 'Actions', width: 180, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <>
                        <Link to={`detail/${params.row.id}`} style={{ padding: "8px" }}>
                            <Tooltip followCursor={true} title="Detail">
                                <VisibilityOutlined style={{ color: 'green' }} />
                            </Tooltip>
                        </Link>

                        <Link to={`update/${params.row.id}`} style={{ padding: "8px" }}>
                            <Tooltip followCursor={true} title="Update">
                                <ModeEditOutlineOutlined style={{ color: 'blue' }} />
                            </Tooltip>
                        </Link>

                        <Link style={{ padding: "8px" }} onClick={(e) => onDeleteClick(e, params.row)}>
                            <Tooltip followCursor={true} title="Delete" >
                                <DeleteOutline style={{ color: 'red' }} />
                            </Tooltip>
                        </Link>
                    </>
                );
            }
        }
    ];

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];
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
                        Are you sure you want to delete id: {selectedItem ? selectedItem.id : ''}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
            {/* end message delete box */}
            <h2 className="fw-bold mb-2 text-uppercase">List course</h2>
            <p className="m-1">Here is list!</p>
            {errorMessage && (
                <Alert variant={variant} dismissible>
                    {errorMessage}
                </Alert>
            )}
            {loading ? (
                <div className="loading-spinner">
                    <CircularProgress />
                </div>
            ) : (
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
                                rows={listLesson}
                                columns={columns}
                                hideFooterSelectedRowCount={true}
                                disableRowSelectionOnClick
                                checkboxSelection
                                onRowSelectionModelChange={
                                    (ids) => {
                                        const selectedIDs = new Set(ids);
                                        const selectedRows = listLesson.filter((row) =>
                                            selectedIDs.has(row.id),
                                        );
                                        setSelectedRows(selectedRows);
                                    }
                                }
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 20 },
                                    },
                                }}
                                pageSizeOptions={[10, 20, 50, 100]}
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
            )}

        </>
    );
}

export default LessonAdmin;