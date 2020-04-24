import React from 'react';
import './HomepageBackground.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import { LinearGradient } from 'expo-linear-gradient';



const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vh',
    backgroundColor: 'gradientBackground',

  },
  gradient: {
    background: 'radial-gradient(closest-side, white, black)',
  },
}));

export default function HomepageBackground() {
  const styles = useStyles();

  return (
    <div className={styles.header}>
      <div className={styles.gradient}>

      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div1"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div2"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div3"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div4"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div5"></div>
        </Box>
      </Box>
      </div>
    </div>
  );
}
