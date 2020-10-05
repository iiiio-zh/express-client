import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Portfolio from './components/Portfolio/Portfolio';

import './App.css';
import axios_instance from "./axios-instance/axios-instance";

const App = () => {
  let user_id = 1;
  console.log('App Renders');
  const [appState, setAppState] = useState({
    foo: 'bar',
    resumeData: {},
    resume_id: null,
  });

  ReactGA.initialize('UA-110570651-1');
  ReactGA.pageview(window.location.pathname);

  // const getResumeData = useCallback(() => {
  //   $.ajax({
  //     url: './resumeData.json',
  //     dataType: 'json',
  //     cache: false,
  //     success: function (data) {
  //       setAppState({...appState, resumeData: data});
  //     },
  //     error: function (xhr, status, err) {
  //       console.log(err);
  //       alert(err);
  //     }
  //   });
  // }, []);
  //
  // useEffect(() => {
  //   getResumeData();
  // }, [setAppState, getResumeData]);

  const getResume = useCallback(async () => {
    const resumeResponse = await axios_instance.get(`/resumes/${user_id}`, {});
    if (resumeResponse && resumeResponse.data[0]) {
      let resume_id =  resumeResponse.data[0].id;
      if (resume_id) {
        setAppState({...appState, resume_id: resume_id});
      }
    }
  }, []);

  useEffect(() => {
    getResume();
  }, [setAppState, getResume]);

  return (
    <div className="App">
      <Header user_id={user_id}/>
      <About user_id={user_id}/>
      <Resume resume_id={appState.resume_id}/>
      <Portfolio user_id={user_id}/>
      <Contact user_id={user_id}/>
      <Footer user_id={user_id}/>
    </div>
  );
}

export default App;
