import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ImageLightbox Component
 * Displays an image in a lightbox-style popover.
 *
 * Props:
 * - open (bool): Controls the visibility of the lightbox.
 * - onClose (func): Function to handle closing the lightbox.
 * - imageSrc (string): URL of the image to display.
 * - altText (string): Alternative text for the image.
 */
const ImageLightbox = ({ open, onClose, imageSrc, altText = 'Image' }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="image-lightbox-title"
      PaperProps={{
        style: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          boxShadow: 'none',
        },
      }}
    >
      {/* Dialog Title with Close Button */}
      <DialogTitle
        id="image-lightbox-title"
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Dialog Content with the Image */}
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x600.png?text=Image+Not+Found';
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type checking
ImageLightbox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  altText: PropTypes.string,
};

export default ImageLightbox;
