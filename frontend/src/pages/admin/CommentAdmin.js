import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Tooltip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Chip } from '@mui/material';
import { CheckCircle, Cancel, DeleteOutline } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Col } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import env from '../../environment.json'
import { changeStatusComment, changeStatusListComment, deleteComment, deleteListComment, fetchListCommentDashboard } from '../../services/api/commentApi';
function CommentAdmin(props) {
    // message delete box
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const handleClose = () => {
        setOpen(false);
    };

    const [openDelList, setOpenDelList] = useState(false);
    const handleCloseDelList = () => {
        setOpenDelList(false);
    }
    const [actionList, setActionList] = useState();
    const onClickDelList = (action) => {
        if (selectedRows.length === 0) return;
        setActionList(action);
        setOpenDelList(true);
    }
    const handleChangeStatus = async (status, row) => {
        try {
            const feedbackId = row.feedbackId;
            if (status !== row.status) {
                setErrorMessage("")
                await changeStatusComment(status, feedbackId);
                setListComment(prevList => prevList.map(item => {
                    if (item.feedbackId === feedbackId) {
                        return { ...item, status: status };
                    }
                    return item;
                }));
                setVariant("success");
                setErrorMessage(`Change status to ${status} successsfully!`);
            }
        } catch (error) {
            setVariant("danger");
            setErrorMessage(`Change status to ${status} fail!`);
        }
    }
    const onConfirmDelList = async () => {
        try {
            setErrorMessage('');
            if (actionList === 'delete') {
                //Api cal
                const listOfIds = selectedRows.map(item => item.feedbackId);
                const result = await deleteListComment(listOfIds);
                if (result.status === 200) {
                    const updatedDatas = listComment.filter(comment => !selectedRows.includes(comment));
                    setListComment(updatedDatas);
                    setVariant('success');
                    setErrorMessage(result.data);
                } else {
                    setVariant('danger');
                    setErrorMessage(result.data);
                }
            } else {
                const listOfIds = selectedRows.map(item => item.feedbackId);
                const result = await changeStatusListComment(actionList, listOfIds);
                if (result.status === 200) {
                    setListComment(prevList => prevList.map(item => {
                        const resultItem = selectedRows.find(result => result.feedbackId === item.feedbackId);
                        if (resultItem) {
                            return { ...item, status: actionList };
                        }
                        return item;
                    }));
                    setVariant('success');
                    setErrorMessage(result.data);
                } else {
                    setVariant('danger');
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setVariant('danger');
            setErrorMessage('Not allow to delete, this is not your post');
        } finally {
            setOpenDelList(false);
        }
    }

    // end message delete box
    const [errorMessage, setErrorMessage] = useState(null);
    const [variant, setVariant] = useState('info');
    const [loading, setLoading] = useState(true);
    const [listComment, setListComment] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchListCommentDashboard();
                // const data = await response.json();
                if (response) {
                    await setListComment(response);
                } else setListComment([]);
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
            setErrorMessage('');
            const response = await deleteComment(selectedItem.feedbackId);
            if (response.status === 200) {
                const updateList = listComment.filter(item => item.feedbackId !== selectedItem.feedbackId);
                setListComment(updateList);
                setErrorMessage(response.data);
                setVariant('success')
                setErrorMessage('Delete comment successfully !');
            } else {
                setVariant('danger')
                setErrorMessage(response.data);
            }
        } catch (error) {
            setVariant('danger');
            setErrorMessage('Not allow to delete');
        } finally {
            setOpen(false);
        }
    };
    const urlMedia = env.urls.media;
    const columns = [
        { field: 'feedbackId', headerName: 'ID', width: 60 },
        { field: 'content', headerName: 'Content', width: 350 },
        {
            field: 'avatar', headerName: 'Avatar', width: 80, renderCell: (params) => {
                return (
                    <div className='p-1'>
                        <img alt='' src={`${urlMedia}${params.row.avatar}`} style={{ width: '35px', borderRadius: '50%' }} ></img>
                    </div>
                )
            }
        },
        { field: 'userName', headerName: 'Name', width: 150 },
        {
            field: 'status', headerName: 'Status', width: 120, renderCell: (params) => {
                return (
                    <div className='p-1'>
                        {params.row.status === 'approved' ? (
                            <Chip label="Approved" color="success" />
                        ) : params.row.status === 'cancel' ? (
                            <Chip label="Cancel" color="error" />
                        ) : (
                            <Chip label="Pending" color="info" />
                        )}
                    </div>
                )
            }
        },
        {
            field: 'creatatedAt', headerName: 'Created Date', width: 130, valueFormatter: (params) => {
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
            field: 'updatedAt', headerName: 'Updated Date', width: 130, valueFormatter: (params) => {
                if (!params.value) return 'N/A';
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
                        <button onClick={() => handleChangeStatus('approved', params.row)} style={{ padding: "8px" }}>
                            <Tooltip followCursor={true} title="Approved">
                                <CheckCircle style={{ color: 'green' }} />
                            </Tooltip>
                        </button>

                        <button onClick={() => handleChangeStatus('cancel', params.row)} style={{ padding: "8px" }}>
                            <Tooltip followCursor={true} title="Cancel">
                                <Cancel style={{ color: 'red' }} />
                            </Tooltip>
                        </button>

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
    const getRowId = (row) => row.feedbackId;
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
                        Are you sure you want to delete id: {selectedItem ? selectedItem.feedbackId : ''}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelList}
                onClose={handleCloseDelList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to {actionList}: {selectedRows ? selectedRows.length : 0} comments?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelList}>Cancel</Button>
                    <Button onClick={onConfirmDelList} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
            {/* end message delete box */}
            <h2 className="fw-bold mb-2 text-uppercase">List comment</h2>

            {errorMessage && (
                <Alert className='mt-2' variant={variant} dismissible>
                    {errorMessage}
                </Alert>
            )}
            {loading ? (
                <div className="loading-spinner">
                    <CircularProgress />
                </div>
            ) : (
                <div className=''>
                    <div className='row'>
                        <Col className="col-md-8 m-1" >Here is list! {listComment.length} items</Col>
                        <Col className='col-md-3 d-flex justify-content-end' >
                            <span>{selectedRows ? selectedRows.length : 0} selected&emsp;</span>
                            <Tooltip title="Approved">
                                <CheckCircle style={{ color: 'green' }} onClick={() => onClickDelList('approved')} />
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <Cancel style={{ color: 'red' }} onClick={() => onClickDelList('cancel')} />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <DeleteOutline className="delete-row" style={{ color: 'red' }} onClick={() => onClickDelList('delete')} />
                            </Tooltip>
                        </Col>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <DataGrid
                                rows={listComment}
                                columns={columns}
                                hideFooterSelectedRowCount={true}
                                showColumnVerticalBorder={true}
                                showCellVerticalBorder={true}
                                disableRowSelectionOnClick
                                checkboxSelection
                                getRowId={getRowId}
                                autoHeight
                                onRowSelectionModelChange={
                                    (ids) => {
                                        const selectedIDs = new Set(ids);
                                        const selectedRows = listComment.filter((row) =>
                                            selectedIDs.has(row.feedbackId),
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

export default CommentAdmin;