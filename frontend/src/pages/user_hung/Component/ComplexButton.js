import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GemPopup from '../../../components/payment/GemPopup';

const images = [
  {
    url: '/ImageHung/button_gem_02.jpg',
    title: 'Buy Gem',
    width: '30%',
  },
  {
    url: '/ImageHung/button_get_course.jpg',
    title: 'Get Course',
    width: '35%',
  },
  {
    url: '/ImageHung/button_ai_chat.jpg',
    title: 'AI-Chat',
    width: '35%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 150,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 70%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ComplexButton() {

  const navigate = useNavigate();
  const handleClick = (titleBtn) => {
    if(titleBtn === "Get Course"){
      navigate("/products");
    }else if(titleBtn === "AI-Chat"){
      navigate("/planning");
    }else{
      setShowGemPopup(!showGemPopup);
    }
  }

  // Gem Popup
  const [showGemPopup, setShowGemPopup] = useState(false);
  const handleCloseGemPopup = () => {
      setShowGemPopup(false);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleClick(image.title)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
              {/* gem Popup */}
              <Modal size='lg' centered show={showGemPopup} onHide={handleCloseGemPopup}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Choose wisely!!
                        </Modal.Title>
                    </Modal.Header>
                    <GemPopup onClose={handleCloseGemPopup} />
                </Modal>
                {/* end gem popup */}
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}