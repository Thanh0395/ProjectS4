import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Tooltip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material';
import { ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { deleleListLesson } from '../../../services/api/lessonApi';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { deleteCategory, fetchListCategory } from '../../../services/api/categoryApi';
import env from '../../../environment.json'

function LessonAdmin(props) {
    const navigate = useNavigate();
    const handleAddCoure = () => { navigate('create'); }
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
            const updatedLessons = listCategory.filter(lesson => !selectedRows.includes(lesson));
            setListCategory(updatedLessons);
            //Api cal
            const listOfIds = selectedRows.map(item => item.id);
            const result = await deleleListLesson(listOfIds);
            setVariant('success');
            setErrorMessage(result);
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
    const [listCategory, setListCategory] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchListCategory();
                const data = await response.data;
                if (response.status === 200) {
                    await setListCategory(data);
                } else setListCategory([]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const onDeleteClick = (e, row) => {
        setErrorMessage('');
        setOpen(true);
        setSelectedItem(row)
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCategory(selectedItem.categoryId);
            if (response.status === 200) {
                const updateList = listCategory.filter(item => item.categoryId !== selectedItem.categoryId);
                setListCategory(updateList);
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
        }
    };
    const urlMedia = env.urls.media;
    const columns = [
        { field: 'categoryId', headerName: 'ID', width: 100 },
        {
            field: 'featureImage', headerName: 'Image', width: 200, renderCell: (params) => {
                return (
                    <div className='p-1'>
                        <img alt='' src={`${urlMedia}${params.row.featureImage}`} style={{ width: '100px' }} ></img>
                    </div>
                )
            }
        },
        { field: 'categoryName', headerName: 'Category', width: 200 },
        { field: 'countLesson', headerName: 'Number of Course', width: 200 },
        {
            field: 'actions', headerName: 'Actions', width: 180, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <>
                        <Link to={`update/${params.row.categoryId}`} style={{ padding: "8px" }}>
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
    const getRowId = (row) => row.categoryId;
    const getAllWidth = () => {
        let totalWidth = 0;
        columns.forEach((col)=>{
            totalWidth += col.width || 0;
        })
        console.log(totalWidth)
        return `${totalWidth}px`;
    };
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
            <h2 className="fw-bold mb-2 text-uppercase">List category</h2>
            <button style={{ 'color': 'white' }} onClick={handleAddCoure} className="btn btn-primary">
                <AddIcon /> Add category
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
                        &emsp;Here is list! {listCategory.length} items
                        {/* <Col className='col-md-2 d-flex justify-content-end' onClick={onClickDelList}>
                            <span>{selectedRows ? selectedRows.length : 0} selected&emsp;</span>
                            <Tooltip title="Delete">
                                <DeleteOutline className="delete-row" style={{ color: 'red' }} />
                            </Tooltip>
                        </Col> */}
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <DataGrid
                                style={{width:getAllWidth()}}
                                rows={listCategory}
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
                                        const selectedRows = listCategory.filter((row) =>
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