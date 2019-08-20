import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header_Section from './components/Header';
import Agenda from './components/Agenda';
import Talk_Agenda from './components/talk_item';
import Footer from './footer';


function App() {
  return (
    <React.Fragment>
      <Header_Section />
      <Agenda />
      <Talk_Agenda/>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
