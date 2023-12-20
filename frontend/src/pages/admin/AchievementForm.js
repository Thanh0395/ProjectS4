import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function AchievementForm({ onAchievementCreated, onCloseModal }) {
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [rewardId, setRewardId] = useState("");
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/project4/nhan/rewards/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRewards(data))
      .catch((error) => console.error("Error fetching rewards:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const achievementData = {
      title,
      score: Number(score), // Ensure score is sent as a number
      rewardId: rewardId ? Number(rewardId) : null, // Convert to number or null
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/project4/nhan/achievements/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(achievementData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle response
      console.log("Achievement created:", await response.json());
    } catch (error) {
      console.error("Error creating achievement:", error);
    }
    onAchievementCreated();
    onCloseModal();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Achievement
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          label="Score"
          fullWidth
          margin="normal"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="reward-select-label">Reward</InputLabel>
          <Select
            required
            labelId="reward-select-label"
            id="reward-select"
            value={rewardId}
            label="Reward"
            onChange={(e) => setRewardId(e.target.value)}
          >
            {rewards.map((reward) => (
              // Assuming each reward has a unique identifier in 'id' field
              <MenuItem key={reward.rewardId} value={reward.rewardId}>
                {reward.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Create
        </Button>
      </form>
    </Container>
  );
}

export default AchievementForm;
