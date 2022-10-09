import { Container, CssBaseline } from '@mui/material';
import { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import DataVisualisation from './components/DataVisualisation';
import Main from './components/Main';

function App() {
  return (
    <Fragment>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/data-visualisation" element={<DataVisualisation />} />
        </Routes>
        </Container>
      </Router>
    </Fragment>
  );
}

export default App;
