import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './common/hocs/MainLayout';

import Homepage from './pages/Homepage';
import About from './pages/About';

function App() {
  return (
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route component={Homepage} path='/' exact />
            <Route component={About} path='/about' exact />
          </Switch>
        </MainLayout>
      </BrowserRouter>
  );
}

export default App;
