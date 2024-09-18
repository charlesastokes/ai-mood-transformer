// GalaxyButton.jsx
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Define the SVG for the galaxy background
const galaxySVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <!-- Radial Gradient for Galaxy Colors -->
    <radialGradient id="galaxyGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color: #1e3c72; stop-opacity: 1" />
      <stop offset="50%" style="stop-color: #2a5298; stop-opacity: 1" />
      <stop offset="100%" style="stop-color: #1e3c72; stop-opacity: 1" />
    </radialGradient>
    <!-- Star Pattern -->
    <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.5" fill="white" />
      <circle cx="50" cy="30" r="0.7" fill="white" />
      <circle cx="80" cy="70" r="0.5" fill="white" />
      <circle cx="130" cy="20" r="0.6" fill="white" />
      <circle cx="170" cy="90" r="0.5" fill="white" />
      <circle cx="220" cy="50" r="0.7" fill="white" />
      <circle cx="260" cy="120" r="0.5" fill="white" />
      <circle cx="300" cy="30" r="0.6" fill="white" />
      <circle cx="350" cy="80" r="0.5" fill="white" />
      <circle cx="390" cy="20" r="0.7" fill="white" />
    </pattern>
  </defs>
  <!-- Background Rectangle with Gradient and Stars -->
  <rect width="400" height="200" fill="url(#galaxyGradient)" />
  <rect width="400" height="200" fill="url(#stars)" />
</svg>
`;

// Encode the SVG for use in CSS
const encodedGalaxySVG = encodeURIComponent(galaxySVG);

// Create a data URI from the encoded SVG
const galaxyDataURI = `data:image/svg+xml;utf8,${encodedGalaxySVG}`;

// Define a styled Button component
const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundImage: `url("${galaxyDataURI}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  padding: '14px 28px',
  fontSize: '1.1rem',
  textTransform: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.7)',
    // Optional: Add a subtle overlay on hover
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(30, 60, 114, 0.2)',
      pointerEvents: 'none',
    },
  },
  '&:active': {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  },
}));

const GalaxyButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default GalaxyButton;
