import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function App() {
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
      setLeftItems(leftItems.filter((i) => i !== item));
      setRightItems([...rightItems, item]);
    } else if (from === 'right') {
      setRightItems(rightItems.filter((i) => i !== item));
      setLeftItems([...leftItems, item]);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={4}>
        <Box
          sx={{
            border: '2px dashed grey',
            borderRadius: '8px',
            height: '70vh',
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
      <Grid item xs={2} container direction="column" alignItems="center">
        <Typography variant="h6" align="center">
          Arrow Title
        </Typography>
        <ArrowForwardIcon style={{ fontSize: 100 }} />
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            border: '2px dashed grey',
            borderRadius: '8px',
            height: '70vh',
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
  );
}

export default App;
