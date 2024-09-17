// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function App() {
  useEffect(() => {
    document.title = 'AI Mood Transformer';
  }, []);

  const theme = useTheme(); // Correctly use useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const itemIdCounter = useRef(0);

  // Initialize Pallet Items with Unique IDs
  const initialPalletItems = ['😀', '😃', '😄', '😁', '😆', '😅'].map((emoji) => ({
    id: itemIdCounter.current++,
    emoji,
  }));

  const [palletItems, setPalletItems] = useState(initialPalletItems);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  const handleDragStart = (e, item, from) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ item, from })
    );
    // Do not remove item from source during drag start
  };

  const handleDrop = (e, to) => {
    e.preventDefault();
    const { item, from } = JSON.parse(e.dataTransfer.getData('application/json'));

    if (from === to) return;

    // Remove item from the source
    if (from === 'left') {
      setLeftItems((prev) => prev.filter((i) => i.id !== item.id));
    } else if (from === 'right') {
      setRightItems((prev) => prev.filter((i) => i.id !== item.id));
    } else if (from === 'pallet') {
      setPalletItems((prev) => prev.filter((i) => i.id !== item.id));
    }

    // Add item to the destination
    if (to === 'left') {
      setLeftItems((prev) => [...prev, item]);
    } else if (to === 'right') {
      setRightItems((prev) => [...prev, item]);
    } else if (to === 'pallet') {
      setPalletItems((prev) => [...prev, item]);
    }
  };

  const boxStyles = {
    border: '2px dashed grey',
    borderRadius: '8px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 2,
  };

  const itemStyles = {
    width: '50px',
    height: '50px',
    p: 1,
    mb: 1,
    mr: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    cursor: 'grab',
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h3" align="center" gutterBottom>
        AI Mood Transformer
      </Typography>

      {/* Pallet Box */}
      <Box
        sx={{
          ...boxStyles,
          width: '100%',
          mb: 4,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'pallet')}
      >
        <Typography variant="h6">Pallet</Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {palletItems.map((item) => (
            <Paper
              key={item.id}
              sx={itemStyles}
              draggable
              onDragStart={(e) => handleDragStart(e, item, 'pallet')}
            >
              {item.emoji}
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Left Field */}
        <Grid item xs={12} sm={5} md={4}>
          <Box
            sx={{
              ...boxStyles,
              height: '300px',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'left')}
          >
            <Typography variant="h6">Left Field</Typography>
            <Box
              sx={{
                mt: 2,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {leftItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={itemStyles}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'left')}
                >
                  {item.emoji}
                </Paper>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Arrow in the Middle */}
        <Grid
          item
          xs={12}
          sm={2}
          md={2}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {isSmallScreen ? (
            <ArrowDownwardIcon style={{ fontSize: 50 }} />
          ) : (
            <ArrowForwardIcon style={{ fontSize: 50 }} />
          )}
        </Grid>

        {/* Right Field */}
        <Grid item xs={12} sm={5} md={4}>
          <Box
            sx={{
              ...boxStyles,
              height: '300px',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'right')}
          >
            <Typography variant="h6">Right Field</Typography>
            <Box
              sx={{
                mt: 2,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {rightItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={itemStyles}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'right')}
                >
                  {item.emoji}
                </Paper>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
