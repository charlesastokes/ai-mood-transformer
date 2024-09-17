// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function App() {
  useEffect(() => {
    document.title = 'AI Mood Transformer';
  }, []);

  const [leftItems, setLeftItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [rightItems, setRightItems] = useState(['Item A', 'Item B']);

  const handleDragStart = (e, item, from) => {
    e.dataTransfer.setData('text/plain', item);
    e.dataTransfer.setData('from', from);
  };

  const handleDrop = (e, to) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    const from = e.dataTransfer.getData('from');

    if (from === to) return;

    if (from === 'left') {
      setLeftItems((prev) => prev.filter((i) => i !== item));
      setRightItems((prev) => [...prev, item]);
    } else if (from === 'right') {
      setRightItems((prev) => prev.filter((i) => i !== item));
      setLeftItems((prev) => [...prev, item]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h3" align="center" gutterBottom>
        AI Mood Transformer
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ height: '70vh' }}
      >
        {/* Left Field */}
        <Grid item xs={4}>
          <Box
            sx={{
              border: '2px dashed grey',
              borderRadius: '8px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'left')}
          >
            <Typography variant="h6">Left Field Title</Typography>
            <Box sx={{ mt: 2, width: '100%', flexGrow: 1 }}>
              {leftItems.map((item) => (
                <Paper
                  key={item}
                  sx={{ p: 1, mb: 1 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'left')}
                >
                  {item}
                </Paper>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Arrow in the Middle */}
        <Grid item xs={2} container direction="column" alignItems="center">
          <Typography variant="h6" align="center">
            Arrow Title
          </Typography>
          <ArrowForwardIcon style={{ fontSize: 100 }} />
        </Grid>

        {/* Right Field */}
        <Grid item xs={4}>
          <Box
            sx={{
              border: '2px dashed grey',
              borderRadius: '8px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'right')}
          >
            <Typography variant="h6">Right Field Title</Typography>
            <Box sx={{ mt: 2, width: '100%', flexGrow: 1 }}>
              {rightItems.map((item) => (
                <Paper
                  key={item}
                  sx={{ p: 1, mb: 1 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'right')}
                >
                  {item}
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
