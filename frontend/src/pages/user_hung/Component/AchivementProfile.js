import React from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const AchievementProfile = ({ achievements }) => {

    const getIconByTitle = (title) => {
        switch (title) {
            case 'Fresher':
                return <StarIcon />;
              case 'Junior':
                return <WorkIcon />;
              case 'Senior':
                return <BusinessCenterIcon />;
              case 'Farmer Bronze':
                return <MonetizationOnIcon />;
              case 'Farmer Silver':
                return <EmojiObjectsIcon />;
              case 'Spendthrift Bronze':
                return <AccountBalanceWalletIcon />;
              case 'Spendthrift Silver':
                return <AccountBalanceWalletIcon />;
              case 'Farmer Gold':
                return <EmojiObjectsIcon />;
          // Add cases for other titles as needed
          default:
            return null; // Return a default icon or null if no match found
        }
      };
  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Your Achievements
      </Typography>
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item key={achievement.achievementId} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                {getIconByTitle(achievement.title)} {achievement.title}
                </Typography>
                <Typography variant="body1">Score: {achievement.score}</Typography>
                <Typography variant="body1">
                  Process: {achievement.process}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={achievement.process}
                />
                <Typography variant="body1">
                  Received Badge: {achievement.receivedBadge ? 'Done' : 'Incomplete'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AchievementProfile;
