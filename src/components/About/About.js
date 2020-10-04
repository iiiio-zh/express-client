import React, { useCallback, useEffect, useState } from 'react';
import axios_instance from "../../axios-instance/axios-instance";

const About = (props) => {
  console.log('About renders');
  const [aboutState, setAboutState] = useState({
    username: null,
    bio: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    contact: null,
    email: null,
  });

  const [resumeDownloadState, setResumeDownloadState] = useState({
    resumeDownload: null,
  });

  const getDataFromUser = useCallback(async () => {
    const userResponse = await axios_instance.get(`/users/${props.user_id}`, {});
    if (userResponse && userResponse.data[0]) {
      let user_data =  userResponse.data[0];
      let address_info = JSON.parse(user_data.address);
      let user_info = {
        username: user_data.username,
        contact: user_data.contact,
        email: user_data.email
      };
      setAboutState({...aboutState, ...user_info, ...address_info.address});
    }
  }, []);

  const getDownloadLink = useCallback(async () => {
    const userProfileResponse = await axios_instance.get(`/user_profiles/${props.user_id}`, {});
    if (userProfileResponse && userProfileResponse.data[0]) {
      let userProfileData =  userProfileResponse.data[0];
      let resumeDownloadLink = userProfileData.resume_download_link;
      setResumeDownloadState({...resumeDownloadState, resumeDownload: resumeDownloadLink});
    }
  }, []);

  useEffect(() => {
    getDataFromUser();
  }, [setAboutState, getDataFromUser]);

  useEffect(() => {
    getDownloadLink();
  }, [setResumeDownloadState, getDownloadLink]);

  // if (props.data) {
  //   var name = props.data.name;
  //   // var profilepic = "images/" + props.data.image;
  //   var bio = props.data.bio;
  //   var street = props.data.address.street;
  //   var city = props.data.address.city;
  //   var state = props.data.address.state;
  //   var zip = props.data.address.zip;
  //   var phone = props.data.phone;
  //   var email = props.data.email;
  //   var resumeDownload = props.data.resumedownload;
  // } else {
  //   return <div></div>;
  // }
  let profilepic = 'images/profilepic.jpg';

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img className="profile-pic" src={profilepic} alt="Nordic Giant Profile Pic"/>
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{aboutState.bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{aboutState.username}</span><br/>
                <span>{aboutState.street}<br/>
                  {aboutState.city} {aboutState.state}, {aboutState.zip}
                   </span><br/>
                <span>{aboutState.contact}</span><br/>
                <span>{aboutState.email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a href={resumeDownloadState.resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default About;