import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

function CreateRewardForm({ apiUrl, onClose, onRewardCreated }) {
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBadgeChange = (event) => {
    setBadge(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (badge) {
      console.log(badge);
      formData.append("badge", badge);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Reward created:", result);
      onClose();
      onRewardCreated(); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating reward:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" align="center" sx={{ m: 2 }}>
        Create New Reward Here
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            label="Insert New Reward Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
        </div>
        <div>
          <input
            required
            accept="image/*"
            type="file"
            onChange={handleBadgeChange}
            style={{ display: "block", margin: "10px 0" }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}

export default CreateRewardForm;
