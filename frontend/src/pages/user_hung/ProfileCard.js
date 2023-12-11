import React, { useState, useEffect } from "react";
import { Avatar, Container, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { Diamond } from "@mui/icons-material"; // Import the Star icon from Material-UI

import { ProfileDataByUserId } from "../../services/api/AuthApi";

const ProfileCard = ({ userId }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        ProfileDataByUserId(userId)
            .then(rs => setUser(rs.user))
            .catch(err => console.log("Err fetch api profile data:", err));
    }, [userId]);

    return (
        <div style={{ marginTop: 50 }}>
            <Container maxWidth="lg">
                {user && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <div>
                                <div style={{ marginBottom: "20px" }}>
                                    <Avatar alt={user.userName} src="https://bootdey.com/img/Content/avatar/avatar1.png" sx={{ width: 150, height: 150 }} />
                                </div>
                                <div>
                                    <h3>{user.userName}</h3>
                                    <p>{user.email}</p>
                                    <Typography variant="body1"><Diamond /> Gem: {user.gemAmount}</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="account-fn" label="First Name" defaultValue="Daniel" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="account-ln" label="Last Name" defaultValue="Adams" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="account-email" label="E-mail Address" defaultValue="daniel.adams@example.com" fullWidth disabled />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="account-phone" label="Phone Number" defaultValue="+7 (805) 348 95 72" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="account-pass" label="New Password" type="password" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="account-confirm-pass" label="Confirm Password" type="password" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Subscribe me to Newsletter" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary">
                                            Update Profile
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </div>
    );
};

export default ProfileCard;
