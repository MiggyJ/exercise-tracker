import React, { useState } from 'react';
import format from 'date-fns/format'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseLine from '@material-ui/core/CssBaseline'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Template
import Topbar from './components/Template/Topbar'
import Sidebar from './components/Template/Sidebar'
import About from './components/Template/About'

// Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#820000'
    },
    secondary: {
      main: '#D9D6D1'
    },
    error: {
      main: '#E10000'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#ccc'
        }
      }
    },
    MuiTableCell: {
      stickyHeader: {
        backgroundColor: '#fff'
      }
    }
  }
})

// Context
import { GlobalProvider } from './context/GlobalState'

// Pages
import Home from './pages/Home'
import Instruction from './pages/Instruction'
import History from './pages/History'
import Profile from './pages/Profile'

const App = () => {
  const [drawer, openDrawer] = useState(false)
  const [about, openAbout] = useState(false)
  const [date, setDate] = useState(format(new Date(), 'EEEE, MMMM dd, uuuu | hh:mm bb'))


  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <GlobalProvider>
            {/* Templates */}
            <Topbar setDate={setDate} date={date} openDrawer={openDrawer} openAbout={openAbout} />
            <Sidebar drawer={drawer} openDrawer={openDrawer}  />
            <About about={about} openAbout={openAbout} />
            
            {/* Routes */}
            <Switch>
              <Route path='/instruction/:id' component={Instruction} />
              <Route path='/history' component={History} />
              <Route path='/profile' component={Profile} />
              <Route path='/'>
                <Home date={date} />
              </Route>
            </Switch>
          </GlobalProvider>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App

