import React, { useCallback, useEffect, useState } from 'react';
import axios_instance from "../../axios-instance/axios-instance";

const Portfolio = (props) => {
  const [folioState, setFolioState] = useState({
    projects: null
  });

  const getProjectsByUser = useCallback(async () => {
    const projectResponse = await axios_instance.get(`/projects/${props.user_id}`, {});
    console.log(projectResponse);
    if (projectResponse && projectResponse.data) {
      setFolioState({...folioState, projects: projectResponse.data});
    }
  }, [props.user_id]);

  useEffect(() => {
    getProjectsByUser();
  }, [setFolioState, getProjectsByUser]);

  let projects = null;
  if (folioState.projects) {
    projects = folioState.projects.map((project) => {
      var projectImage = 'images/portfolio/' + project.image_path;

      return (
        <div key={project.title} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={project.url} title={project.title}>
              <img alt={project.title} src={projectImage}/>
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{project.title}</h5>
                  <p>{project.category}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      )
    })

  }

  /*if (props.data) {
    var projects = props.data.projects.map(function (projects) {
      var projectImage = 'images/portfolio/' + projects.image;

      return (
        <div key={projects.title} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
              <img alt={projects.title} src={projectImage}/>
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{projects.title}</h5>
                  <p>{projects.category}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      )
    })
  } else {
    return <div></div>;
  }*/

  return (
    <section id="portfolio">

      <div className="row">

        <div className="twelve columns collapsed">

          <h1>Check Out Some of My Works.</h1>

          <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
            {projects}
          </div>
        </div>
      </div>
    </section>
  );
}


export default Portfolio;
