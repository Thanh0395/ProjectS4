import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CreateRewardForm from "./CreateRewardForm";
import env from '../../environment.json'


function RewardAdmin(props) {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const apiUrlCreate = "http://localhost:8080/api/project4/nhan/rewards/create";
  const urlMedia = env.urls.media;


  const handleRewardCreated = () => {
    fetchRewards(); 
    window.location.reload(); 
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = () => {
    fetch(
      `http://localhost:8080/api/project4/nhan/rewards/delete/${selectedRewardId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchRewards();
      })
      .catch((error) => {
        console.error("Error deleting reward:", error);
      })
      .finally(() => setOpenDialog(false));
  };

  const handleOpenDialog = (rewardId) => {
    setSelectedRewardId(rewardId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchRewards(); 
  }, []);

  const fetchRewards = () => {
    fetch("http://localhost:8080/api/project4/nhan/rewards/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedRewards = data.sort((a, b) => a.rewardId - b.rewardId);
        setRewards(sortedRewards);
        console.log(sortedRewards);
      })
      .catch((error) => {
        console.error("Error fetching rewards:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleFileChange =  (event, rewardId) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch(
      `http://localhost:8080/api/project4/nhan/rewards/update/${rewardId}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then(() => {
        // Fetch the updated rewards list to reflect the change in the UI
        fetchRewards();
        window.location.reload(); 
  

      })
      .catch((error) => {
        console.error("Error updating badge:", error);
      });
  };

  if (loading) {
    return <Typography>Loading rewards...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }
  return (
    <Paper sx={{ maxWidth: 800, margin: "auto", overflow: "hidden" }}>
      <Typography variant="h4" align="center" sx={{ m: 2 }}>
        Rewards
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateModal}
      >
        Create New Reward
      </Button>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="create-reward-modal"
        aria-describedby="create-reward-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CreateRewardForm
            apiUrl={apiUrlCreate}
            onClose={handleCloseCreateModal}
            onRewardCreated={handleRewardCreated} 
          />
        </Box>
      </Modal>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="rewards table">
          <TableHead>
            <TableRow>
              <TableCell>Reward ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Badge</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewards.map((reward) => (
              <TableRow key={reward.rewardId} hover>
                <TableCell>{reward.rewardId}</TableCell>
                <TableCell>{reward.title || "N/A"}</TableCell>
                <TableCell
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={`${urlMedia}${reward.badge}`}
                    alt="Badge"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`file-upload-${reward.rewardId}`}
                    onChange={(e) => handleFileChange(e, reward.rewardId)}
                  />
                  <label htmlFor={`file-upload-${reward.rewardId}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Change Badge Image
                    </Button>
                  </label>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(reward.rewardId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Reward"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this reward?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default RewardAdmin;
