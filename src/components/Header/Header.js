import React, { useCallback, useEffect, useState } from 'react';
import ParticlesBg from "particles-bg";
import axios_instance from "../../axios-instance/axios-instance";

const Header = (props) => {
  console.log('Header renders');
  let name = 'Express backend demo';
  const [headerState, setHeaderState] = useState({
    project: null,
    github: null,
    description: null,
    city: null,
    networks: null
  });

  const getResumeData = useCallback(async () => {
    const response = await axios_instance.get(`/user_profiles/${props.user_id}`, {});
    if (response && response.data[0]) {
      let user_profile_data =  response.data[0];
      setHeaderState({...headerState, ...user_profile_data});
    }

  }, []);

  useEffect(() => {
    getResumeData();
  }, [setHeaderState, getResumeData]);

  // if (props.data) {
  //   var project = props.data.project;
  //   var github = props.data.github;
  //   // var name = props.data.name;
  //   var description = props.data.description;
  //   var city = props.data.address.city;
  //   var networks = props.data.social.map(function (network) {
  //     return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
  //   })
  // } else {
  //   return <div></div>;
  // }

  return (
    <header id="home">
      <ParticlesBg type="polygon" bg={true}/>
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

        <ul id="nav" className="nav">
          <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
          <li><a className="smoothscroll" href="#about">About</a></li>
          <li><a className="smoothscroll" href="#resume">Resume</a></li>
          <li><a className="smoothscroll" href="#portfolio">Works</a></li>
          <li><a className="smoothscroll" href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="row banner">

        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h3>{headerState.description}</h3>
          <hr/>
          <ul className="social">
            <a href={headerState.project} className="button btn project-btn"><i className="fa fa-book"></i>Project</a>
            <a href={headerState.github} className="button btn github-btn"><i className="fa fa-github"></i>Github</a>
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>

    </header>
  );
}


export default Header;
