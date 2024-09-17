// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function App() {
  useEffect(() => {
    document.title = 'AI Mood Transformer';
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const itemIdCounter = useRef(0);

  // Initialize Palette Items with Unique IDs
  const initialPaletteItems = ['😀', '😃', '😄', '😁', '😆', '😅'].map(
    (emoji) => ({
      id: itemIdCounter.current++,
      emoji,
    })
  );

  const [paletteItems, setPaletteItems] = useState(initialPaletteItems);
  const [currentEmotions, setCurrentEmotions] = useState([]); // Left field
  const [desiredEmotions, setDesiredEmotions] = useState([]); // Right field

  const handleDragStart = (e, item, from) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ item, from })
    );
    // Do not remove item from source during drag start
  };

  const handleDrop = (e, to) => {
    e.preventDefault();
    const { item, from } = JSON.parse(
      e.dataTransfer.getData('application/json')
    );

    if (from === to) return;

    // Remove item from the source
    if (from === 'currentEmotions') {
      setCurrentEmotions((prev) => prev.filter((i) => i.id !== item.id));
    } else if (from === 'desiredEmotions') {
      setDesiredEmotions((prev) => prev.filter((i) => i.id !== item.id));
    } else if (from === 'palette') {
      setPaletteItems((prev) => prev.filter((i) => i.id !== item.id));
    }

    // Add item to the destination
    if (to === 'currentEmotions') {
      setCurrentEmotions((prev) => [...prev, item]);
    } else if (to === 'desiredEmotions') {
      setDesiredEmotions((prev) => [...prev, item]);
    } else if (to === 'palette') {
      setPaletteItems((prev) => [...prev, item]);
    }
  };

  const handleGoClick = () => {
    console.log(
      'Emotions I Currently Feel:',
      currentEmotions.map((item) => item.emoji)
    );
    console.log(
      'Emotions I Want to Feel:',
      desiredEmotions.map((item) => item.emoji)
    );
  };

  const paletteStyles = {
    position: 'relative',
    width: '300px',
    height: '200px',
    background: `
      /* Colorful Galaxies */
      radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.5), transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.5), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.5), transparent 50%),
      radial-gradient(circle at 60% 40%, rgba(255, 165, 0, 0.5), transparent 50%),
      radial-gradient(circle at 30% 60%, rgba(0, 128, 0, 0.5), transparent 50%),
      /* Deep Space Background */
      radial-gradient(circle at 50% 50%, #483D8B, #000000)
    `,
    borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
    mb: 4,
    mx: 'auto', // Center horizontally
    overflow: 'hidden',
    /* Create Transparent Thumb Hole */
    maskImage: `
      radial-gradient(
        circle at 15% 70%,
        transparent 0px,
        transparent 25px,
        black 26px,
        black 100%
      )
    `,
    maskSize: '100% 100%',
    maskPosition: '0 0',
    maskRepeat: 'no-repeat',
  };

  const itemStyles = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    cursor: 'grab',
  };

  const positions = [
    { top: '30%', left: '30%' },
    { top: '20%', left: '60%' },
    { top: '50%', left: '70%' },
    { top: '70%', left: '50%' },
    { top: '60%', left: '20%' },
    { top: '40%', left: '45%' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h3" align="center" gutterBottom>
        AI Mood Transformer
      </Typography>

      {/* Palette Box */}
      <Box
        sx={paletteStyles}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'palette')}
      >
        {/* Stars Overlay */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(2px 2px at 20% 30%, white, transparent),
              radial-gradient(1.5px 1.5px at 50% 60%, white, transparent),
              radial-gradient(2px 2px at 70% 40%, white, transparent),
              radial-gradient(1px 1px at 80% 80%, white, transparent),
              radial-gradient(1.5px 1.5px at 40% 80%, white, transparent)
            `,
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Emoji Items */}
        {paletteItems.map((item, index) => (
          <Paper
            key={item.id}
            sx={{
              ...itemStyles,
              position: 'absolute',
              top: positions[index].top,
              left: positions[index].left,
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, item, 'palette')}
          >
            {item.emoji}
          </Paper>
        ))}
      </Box>

      {/* Main Content */}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Emotions I Currently Feel (Left Field) */}
        <Grid item xs={12} sm={5} md={4}>
          <Box
            sx={{
              border: '2px dashed grey',
              borderRadius: '8px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'currentEmotions')}
          >
            <Typography variant="h6">Emotions I Currently Feel</Typography>
            <Box
              sx={{
                mt: 2,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {currentEmotions.map((item) => (
                <Paper
                  key={item.id}
                  sx={itemStyles}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, item, 'currentEmotions')
                  }
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

        {/* Emotions I Want to Feel (Right Field) */}
        <Grid item xs={12} sm={5} md={4}>
          <Box
            sx={{
              border: '2px dashed grey',
              borderRadius: '8px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'desiredEmotions')}
          >
            <Typography variant="h6">Emotions I Want to Feel</Typography>
            <Box
              sx={{
                mt: 2,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {desiredEmotions.map((item) => (
                <Paper
                  key={item.id}
                  sx={itemStyles}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, item, 'desiredEmotions')
                  }
                >
                  {item.emoji}
                </Paper>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* GO! Button */}
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={handleGoClick}
        >
          GO!
        </Button>
      </Box>
    </Box>
  );
}

export default App;
