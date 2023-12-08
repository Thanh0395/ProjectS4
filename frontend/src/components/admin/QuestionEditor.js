// import React from 'react';
// import { Table } from 'react-bootstrap';


// function QuestionEditor(props) {
//     const initData = [
//         { q_id: 10, question: "Question 01", answerA: "19", answerB: "60", answerC: "24", answerD: "40", answerCorrect: "A" },
//         { q_id: 12, question: "Question 02", answerA: "as", answerB: "ms", answerC: "hp", answerD: "mp", answerCorrect: "C" },
//         { q_id: 13, question: "Question 03", answerA: "22", answerB: "12", answerC: "13", answerD: "14", answerCorrect: "B" },
//         { q_id: 14, question: "Question 04", answerA: "45", answerB: "54", answerC: "11", answerD: "23", answerCorrect: "A" },
//         { q_id: 15, question: "Question 05", answerA: "AA", answerB: "BB", answerC: "CC", answerD: "DD", answerCorrect: "D" },
//         { q_id: 16, question: "Question 06", answerA: "A", answerB: "B", answerC: "C", answerD: "D", answerCorrect: "C" },
//     ]
//     const [rows, setRows] = React.useState(initData);

//     // Function to handle updates to an object
//     const handleUpdateObject = (index, updatedObject) => {
//         const updatedRows = [...rows];
//         updatedRows[index] = updatedObject;
//         setRows(updatedRows);
//         console.log(rows);
//     };
//     // Function to add a new object to the list
//     const handleAddObject = () => {
//         const newObject = { q_id: Date.now(), question: "", answerA: "", answerB: "", answerC: "", answerD: "", answerCorrect: "" };
//         setRows([...rows, newObject]);

//     };
//     // Function to delete an object by index
//     const handleDeleteObject = (index) => {
//         const updatedRows = [...rows];
//         updatedRows.splice(index, 1);
//         setRows(updatedRows);
//     };
//     const handleEnterKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//         }
//     };
//     return (
//         <div>
//             <button type='button' onClick={handleAddObject}>Add Question</button>
//             <Table striped>
//                 <thead>
//                     <tr>
//                         <th>Question</th>
//                         <th>Answer A</th>
//                         <th>Answer B</th>
//                         <th>Answer C</th>
//                         <th>Answer D</th>
//                         <th>Correct</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rows.map((object, index) => (
//                         <tr key={object.q_id}>
//                             <td className='cell'>

//                                 <input className='cell'
//                                     required
//                                     type="text"
//                                     value={object.question}
//                                     onChange={(e) => {
//                                         const updatedObject = { ...object, question: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                     onKeyPress={(e) => handleEnterKeyPress(e, index)}
//                                 />

//                             </td>
//                             <td className='cell'>
//                                 <input className='cell'
//                                     type="text"
//                                     value={object.answerA}
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         const updatedObject = { ...object, answerA: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                 />

//                             </td>
//                             <td className='cell'>
//                                 <input className='cell'
//                                     type="text"
//                                     value={object.answerB}
//                                     onChange={(e) => {
//                                         const updatedObject = { ...object, answerB: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                 />

//                             </td>
//                             <td className='cell'>
//                                 <input className='cell'
//                                     type="text"
//                                     value={object.answerC}
//                                     onChange={(e) => {
//                                         const updatedObject = { ...object, answerC: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                 />

//                             </td>
//                             <td className='cell'>
//                                 <input className='cell'
//                                     type="text"
//                                     value={object.answerD}
//                                     onChange={(e) => {
//                                         const updatedObject = { ...object, answerD: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                 />

//                             </td>
//                             <td className='cell'>

//                                 <select className='cell'
//                                     value={object.answerCorrect}
//                                     onChange={(e) => {
//                                         const updatedObject = { ...object, answerCorrect: e.target.value };
//                                         handleUpdateObject(index, updatedObject);
//                                     }}
//                                 >
//                                     <option value="A">A</option>
//                                     <option value="B">B</option>
//                                     <option value="C">C</option>
//                                     <option value="D">D</option>
//                                 </select>

//                             </td>
//                             <td className='cell'>


//                                 <button onClick={() => handleDeleteObject(index)}>Delete</button>

//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export default QuestionEditor;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deleteQuestion, updateAddQuestion } from '../../services/api/lessonApi';

function QuestionEditor(props) {
    const myId = props.postId;
    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;
        const [isAdding, setIsAdding] = useState(false);

        const handleClickAdd = () => {
            setIsAdding(true);
            const questionId = parseInt(new Date().getTime() / 1000);
            setTimeout(() => { setIsAdding(false); }, 1000);
            setRows((oldRows) => [...oldRows, { questionId: questionId, content: '', answerA: '', answerB: '', answerC: '', answerD: '', rightAnswer: 'A', isNew: true }]);
            setIsValid(false);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [questionId]: { mode: GridRowModes.Edit, fieldToFocus: 'content' },
            }));
        };

        return (
            <GridToolbarContainer >
                {!isAdding ?
                    (<button onClick={handleClickAdd} className="btn btn-info">
                        <AddIcon />Add question
                    </button>)
                    :
                    (<button onClick={handleClickAdd} className="btn btn-info" disabled>
                        <AddIcon />Add question
                    </button>)
                }
            </GridToolbarContainer>
        );
    }

    // const initData = [
    //     { id: 10, question: "Question 01", answerA: "19", answerB: "60", answerC: "24", answerD: "40", answerCorrect: "A" },
    //     { id: 12, question: "Question 02", answerA: "as", answerB: "ms", answerC: "hp", answerD: "mp", answerCorrect: "C" },
    //     { id: 13, question: "Question 03", answerA: "22", answerB: "12", answerC: "13", answerD: "14", answerCorrect: "B" },
    //     { id: 14, question: "Question 04", answerA: "45", answerB: "54", answerC: "11", answerD: "23", answerCorrect: "A" },
    //     { id: 15, question: "Question 05", answerA: "AA", answerB: "BB", answerC: "CC", answerD: "DD", answerCorrect: "D" },
    //     { id: 16, question: "Question 06", answerA: "A", answerB: "B", answerC: "C", answerD: "D", answerCorrect: "C" },
    // ]
    const [rows, setRows] = React.useState(props.initQuestions);
    const [deletedQuestionIds, setDeletedQuestionIds] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const showErrorSnackbar = (message) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        if (isValid) {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        } else {
            showErrorSnackbar("Some question field is Invalid!");
        }
    };
    // message delete box
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState();
    const handleClose = () => {
        setOpen(false);
    };
    // end message delete box
    const handleDeleteClick = (id) => () => {
        setOpen(true);
        setDeleteId(id);
    };
    const handleConfirmDelete = () => {
        const updatedRows = rows.filter((row) => row.questionId !== deleteId);
        setRows(updatedRows);
        const deletedIds = [...deletedQuestionIds, deleteId];
        setDeletedQuestionIds(deletedIds)
        props.updateQuestion(updatedRows);
        props.updateDeletedQuestion(deletedIds);
        //api call
        deleteQuestion(myId, deleteId);
        setOpen(false);
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.questionId === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.questionId !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        //call api
        const data = await updateAddQuestion(myId, newRow);
        const newId = data.questionId;
        const updatedRow = { ...newRow, questionId: newId, isNew: false };
        const updatedRows = rows.map((row) => (row.questionId === newRow.questionId ? updatedRow : row));
        setRows(updatedRows);
        props.updateQuestion(updatedRows);
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'content', headerName: 'Question', width: 250, editable: true,
            preProcessEditCellProps: (params: GridEditCellPropsChangeParams) => {
                const hasError = params.props.value.length < 1;
                setIsValid(!hasError);
                if (hasError) showErrorSnackbar("Content Question cannot be empty!");
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'answerA', headerName: 'A', width: 150, editable: true,
            preProcessEditCellProps: (params: GridEditCellPropsChangeParams) => {
                const hasError = params.props.value.length < 1;
                setIsValid(!hasError);
                if (hasError) showErrorSnackbar("Answer A cannot be empty!");
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'answerB', headerName: 'B', width: 150, editable: true,
            preProcessEditCellProps: (params: GridEditCellPropsChangeParams) => {
                const hasError = params.props.value.length < 1;
                setIsValid(!hasError);
                if (hasError) showErrorSnackbar("Answer B cannot be empty!");
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'answerC', headerName: 'C', width: 150, editable: true,
            preProcessEditCellProps: (params: GridEditCellPropsChangeParams) => {
                const hasError = params.props.value.length < 1;
                setIsValid(!hasError);
                if (hasError) showErrorSnackbar("Answer C cannot be empty!");
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'answerD', headerName: 'D', width: 150, editable: true,
            preProcessEditCellProps: (params: GridEditCellPropsChangeParams) => {
                const hasError = params.props.value.length < 1;
                setIsValid(!hasError);
                if (hasError) showErrorSnackbar("Answer D cannot be empty!");
                return { ...params.props, error: hasError };
            },
        },
        { field: 'rightAnswer', headerName: 'Answer', width: 80, editable: true, type: "singleSelect", valueOptions: ["A", "B", "C", "D"] },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon color='primary' />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon color='error' />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const getRowId = (row) => row.questionId;
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                showErrorSnackbar={true}
                getRowId={getRowId}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true}
                autoHeight
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                sx={{
                    '.MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    // '.MuiDataGrid-cell.MuiDataGrid-withBorderColor':{
                    //     display:'none'
                    // },
                }}
            />
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    onClose={closeSnackbar}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
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
                        Are you sure you want to delete a question?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
            {/* end message delete box */}
        </Box>
    );

}

export default QuestionEditor;