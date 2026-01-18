import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BakeryListPage from './pages/BakeryListPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d4a574',
    },
    secondary: {
      main: '#8b6f47',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BakeryListPage />
    </ThemeProvider>
  );
}

export default App;
