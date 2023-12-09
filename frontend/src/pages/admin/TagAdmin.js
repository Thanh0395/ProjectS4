import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Tooltip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, TextField } from '@mui/material';
import { ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Col, Stack } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';
import { addTag, deleteTag, fetchListTag, updateTag } from '../../services/api/tagApi';

function TagAdmin(props) {
    //modal box
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleSubmitModal = async (e) => {
        e.preventDefault();
        if (e.target.elements.tagName.value === '') return;
        setErrorMessage('');
        try {
            if (isUpdate) {
                const response = await updateTag(selectedItem.tagId, selectedItem.tagName);
                if (response.status === 200) {
                    setListTag((prevList) =>
                        prevList.map((tag) =>
                            tag.tagId === selectedItem.tagId ? { ...tag, tagName:selectedItem.tagName } : tag
                        )
                    );
                    setVariant('success');
                    setErrorMessage('Update successfully');
                } else if (response.status === 422) {
                    setVariant('danger');
                    setErrorMessage('Some category had that name');
                } else {
                    setVariant('danger');
                    setErrorMessage(response.data);
                }
            }
            else {
                const response = await addTag(selectedItem.tagName);
                if (response.status === 200) {
                    setListTag((prevList) => [...prevList, response.data]);
                    setVariant('success');
                    setErrorMessage('Add successfully');
                } else if (response.status === 422) {
                    setVariant('danger');
                    setErrorMessage('Some category had that name');
                } else {
                    setVariant('danger');
                    setErrorMessage(response.data);
                }
            }
        } catch (error) {
            setVariant('danger');
            setErrorMessage('Fail update: ', error);
        } finally {
            handleCloseModal();
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // smooth scrolling animation
            });
        }
    }
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

    const onConfirmDelList = async () => {
        try {
            const updatedLessons = listTag.filter(lesson => !selectedRows.includes(lesson));
            setListTag(updatedLessons);
            //Api cal
            const listOfIds = selectedRows.map(item => item.id);
            // const result = await deleleListLesson(listOfIds);
            setVariant('success');
            // setErrorMessage(result);
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
    const [listTag, setListTag] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchListTag();
                const data = await response.data;
                if (response.status === 200) {
                    await setListTag(data);
                } else setListTag([]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddTag = () => {
        setSelectedItem(null);
        setIsUpdate(Boolean(false));
        handleShowModal();
    }

    const onUpdateClick = (e, row) => {
        setIsUpdate(Boolean(true));
        handleShowModal();
        const item = row;
        setSelectedItem(item);
    };
    const onDeleteClick = (e, row) => {
        setErrorMessage('');
        setOpen(true);
        setSelectedItem(row)
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await deleteTag(selectedItem.tagId);
            if (response.status === 200) {
                const updateList = listTag.filter(item => item.tagId !== selectedItem.tagId);
                setListTag(updateList);
                setVariant('success');
                setErrorMessage(response.data);
            } else {
                setVariant('danger');
                setErrorMessage(response.data);
            }
        } catch (error) {
            setVariant('danger');
            setErrorMessage(error.response.data);
        } finally {
            setOpen(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // smooth scrolling animation
            });
        }
    };
    const columns = [
        { field: 'tagId', headerName: 'ID', width: 70 },
        { field: 'tagName', headerName: 'Tag', width: 200 },
        { field: 'countLesson', headerName: 'Number of Course', width: 140 },
        {
            field: 'actions', headerName: 'Actions', width: 180, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <>
                        <Link style={{ padding: "8px" }} onClick={(e) => onUpdateClick(e, params.row)}>
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

    const getRowId = (row) => row.tagId;
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
                        Are you sure you want to delete id: {selectedItem ? selectedItem.tagId : ''}?
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
                        Are you sure you want to delete {selectedRows ? selectedRows.length : 0} lessons?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelList}>Cancel</Button>
                    <Button onClick={onConfirmDelList} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
            {/* end message delete box */}
            <h2 className="fw-bold mb-2 text-uppercase">List tag</h2>
            <button style={{ 'color': 'white' }} onClick={handleAddTag} className="btn btn-primary">
                <AddIcon /> Add tag
            </button>
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
                <div className='container'>
                    <div className='row'>
                        <Col className="col-md-8 m-1" >Here is list! {listTag.length} items</Col>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <DataGrid
                                rows={listTag}
                                columns={columns}
                                hideFooterSelectedRowCount={true}
                                showColumnVerticalBorder={true}
                                showCellVerticalBorder={true}
                                getRowId={getRowId}
                                disableRowSelectionOnClick
                                // checkboxSelection
                                autoHeight
                                onRowSelectionModelChange={
                                    (ids) => {
                                        const selectedIDs = new Set(ids);
                                        const selectedRows = listTag.filter((row) =>
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
                            <Modal centered show={showModal} onHide={handleCloseModal} size='sm'>
                                <form onSubmit={(e) => handleSubmitModal(e)}>
                                    <Modal.Header closeButton>
                                        {isUpdate ? <Modal.Title>Update Tag</Modal.Title> : <Modal.Title>Add Tag</Modal.Title>}
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Stack direction="row" >
                                            {isUpdate ? <Button disabled>ID: {selectedItem.tagId}</Button> : <></>}
                                            <TextField
                                                required
                                                name='tagName'
                                                error={isInvalid}
                                                helperText={isInvalid ? "Name is required" : ""}
                                                onChange={(event) => {
                                                    const updatetag = { ...selectedItem, tagName: event.target.value };
                                                    setSelectedItem(updatetag);
                                                    if (event.target.value === '') setIsInvalid(true);
                                                    else setIsInvalid(false);
                                                }}
                                                id="outlined-required"
                                                label="Tag Name"
                                                defaultValue={isUpdate ? selectedItem.tagName : ''}
                                            />
                                        </Stack>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                        <Button type='submit' variant="contained" >
                                            Save Change
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </div>

                </div >
            )
            }
        </>
    );
}

export default TagAdmin;