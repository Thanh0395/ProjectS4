import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Alert,
  Modal,
  Box,
} from "@mui/material";
import AchievementForm from "./AchievementForm";
import UpdateAchievementTitle from "./UpdateAchievementTitle";

function AchievementAdmin(props) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const refreshAchievements = () => {
    setUpdateCount((prevCount) => prevCount + 1);
  };

  const handleDelete = (achievementId) => {
    fetch(
      `http://localhost:8080/api/project4/nhan/achievements/delete/${achievementId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        setAchievements((prevAchievements) =>
          prevAchievements.filter(
            (achievement) => achievement.achievementId !== achievementId
          )
        );
        setAlertMessage(null); // Resetting alert message on successful deletion
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setAlertMessage(error.message); // Setting alert message for errors
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/project4/nhan/achievements/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAchievements(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [updateCount]);

  const handleTitleUpdated = (achievementId, newTitle) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.achievementId === achievementId
          ? { ...achievement, title: newTitle }
          : achievement
      )
    );
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div>
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
      <Typography variant="h4" align="center" sx={{ m: 2 }}>
        Achievement Management
      </Typography>
      <Button
        align="center"
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
      >
        Create New Achievement
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-achievement-modal"
        aria-describedby="modal-to-create-achievement"
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
          <AchievementForm
            onAchievementCreated={refreshAchievements}
            onCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table aria-label="achievements table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement.achievementId}>
                <TableCell>{achievement.achievementId}</TableCell>

                <TableCell>
                  {achievement.title}
                  <UpdateAchievementTitle
                    achievementId={achievement.achievementId}
                    currentScore={achievement.score}
                    onTitleUpdated={(newTitle) =>
                      handleTitleUpdated(achievement.achievementId, newTitle)
                    }
                  />
                </TableCell>
                <TableCell>{achievement.score}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(achievement.achievementId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AchievementAdmin;
