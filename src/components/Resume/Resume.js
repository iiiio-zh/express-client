import React, { useCallback, useEffect, useState } from 'react';
import axios_instance from "../../axios-instance/axios-instance";

const Resume = (props) => {
  console.log('Resume renders');

  const [educationState, setEducationState] = useState({
    education: null
  });

  const [workState, setWorkState] = useState({
    work: null
  });

  const [skillState, setSkillState] = useState({

    skills: null
  });

  const getEducationByResume = useCallback(async () => {
    const educationResponse = await axios_instance.get(`/education/${props.resume_id}`, {});
    if (educationResponse && educationResponse.data) {
      let education = educationResponse.data.map((edu) => {
        return {
          school: edu.school,
          degree: JSON.parse(edu.details).degree,
          graduated: edu.graduated_date,
          description: edu.description
        }
      });
      setEducationState({...educationState, education: education});
    }
  }, [props.resume_id]);

  const getWorkByResume = useCallback(async () => {
    const workResponse = await axios_instance.get(`/work/${props.resume_id}`, {});
    if (workResponse && workResponse.data) {
      setWorkState({...workState, work: workResponse.data});
    }
  }, [props.resume_id]);

  const getSkillsByResume = useCallback(async () => {
    const skillResponse = await axios_instance.get(`/skills/${props.resume_id}`, {});
    if (skillResponse && skillResponse.data) {
      setSkillState({...skillState, skills: skillResponse.data});
    }
  }, [props.resume_id]);

  useEffect(() => {
    getEducationByResume();
  }, [setEducationState, getEducationByResume]);

  useEffect(() => {
    getWorkByResume();
  }, [setWorkState, getWorkByResume]);

  useEffect(() => {
    getSkillsByResume();
  }, [setSkillState, getSkillsByResume]);


  const getRandomColor = useCallback(() => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);
  
  // let skillmessage = null;
  let education = null;
  if (educationState.education) {
    education = educationState.education.map((education) => {
      return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
        <p>{education.description}</p></div>
    })
  }

  let work = null;
  if (workState.work) {
    work = workState.work.map((work) => {
      return <div key={work.company}><h3>{work.company}</h3>
        <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
        <p>{work.description}</p>
      </div>
    })
  }

  let skills = null;
  if (skillState.skills) {
    skills = skillState.skills.map((skills) => {
      let className = 'bar-expand ' + skills.name.toLowerCase();
      return (
        <li key={skills.name}>
            <span style={{width: skills.level, backgroundColor: getRandomColor()}}
                  className={className}></span><em>{skills.name}</em>
        </li>
      )
    })
  }

  // if (props.data) {
  //   skillmessage = props.data.skillmessage;
  //   education = props.data.education.map(function (education) {
  //     return <div key={education.school}><h3>{education.school}</h3>
  //       <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
  //       <p>{education.description}</p></div>
  //   })
  //   work = props.data.work.map(function (work) {
  //     return <div key={work.company}><h3>{work.company}</h3>
  //       <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
  //       <p>{work.description}</p>
  //     </div>
  //   })
  //
  //   skills = props.data.skills.map((skills) => {
  //     let className = 'bar-expand ' + skills.name.toLowerCase();
  //     return (
  //       <li key={skills.name}>
  //           <span style={{width: skills.level, backgroundColor: getRandomColor()}}
  //                 className={className}></span><em>{skills.name}</em>
  //       </li>
  //     )
  //   })
  // }
  let skillmessage = 'Here are some of my skills!';

  return (
    <section id="resume">

      <div className="row education">
        <div className="three columns header-col">
          <h1><span>Education</span></h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
              {education}
            </div>
          </div>
        </div>
      </div>


      <div className="row work">

        <div className="three columns header-col">
          <h1><span>Work</span></h1>
        </div>

        <div className="nine columns main-col">
          {work}
        </div>
      </div>


      <div className="row skill">

        <div className="three columns header-col">
          <h1><span>Skills</span></h1>
        </div>

        <div className="nine columns main-col">

          <p>{skillmessage}
          </p>

          <div className="bars">
            <ul className="skills">
              {skills}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Resume;
