import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function UpdateAchievementTitle({
  achievementId,
  currentScore,
  onTitleUpdated,
}) {
  const [newTitle, setNewTitle] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = async () => {
    const achievementData = {
      achievementId: achievementId,
      title: newTitle,
      score: currentScore,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/project4/nhan/achievements/update`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(achievementData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onTitleUpdated(newTitle);
      setNewTitle("");

    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  return (
    <div>
      <TextField
        label="New Title"
        value={newTitle}
        onChange={handleTitleChange}
      />
      <Button onClick={handleSubmit} color="primary" variant="contained">
        Update Title
      </Button>
    </div>
  );
}

export default UpdateAchievementTitle;
