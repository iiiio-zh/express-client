import React, { Component, useCallback, useEffect, useState } from 'react';

import axios_instance from '../../axios-instance/axios-instance';

const Contact = (props) => {
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

  const [messageState, setMessageState] = useState({
    contact_message: null,
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

  const getContactMessage = useCallback(async () => {
    const userProfileResponse = await axios_instance.get(`/user_profiles/${props.user_id}`, {});
    if (userProfileResponse && userProfileResponse.data[0]) {
      let userProfileData =  userProfileResponse.data[0];
      let message = userProfileData.contact_message;
      setMessageState({...messageState, contact_message: message});
    }
  }, []);

  useEffect(() => {
    getDataFromUser();
  }, [setAboutState, getDataFromUser]);

  useEffect(() => {
    getContactMessage();
  }, [setMessageState, getContactMessage]);

  // if (props.data) {
  //   var name = props.data.name;
  //   var street = props.data.address.street;
  //   var city = props.data.address.city;
  //   var state = props.data.address.state;
  //   var zip = props.data.address.zip;
  //   var phone = props.data.phone;
  //   var email = props.data.email;
  //   var message = props.data.contactmessage;
  // } else {
  //   return <div></div>;
  // }

  const handleChange = (event) => {
    console.log('sjsjsjsjs');
  };

  return (
    <section id="contact">

      <div className="row section-head">

        <div className="two columns header-col">

          <h1><span>Get In Touch.</span></h1>

        </div>

        <div className="ten columns">

          <p className="lead">{messageState.contact_message}</p>

        </div>

      </div>

      <div className="row">
        <div className="eight columns">

          <form action="" method="post" id="contactForm" name="contactForm">
            <fieldset>

              <div>
                <label htmlFor="contactName">Name <span className="required">*</span></label>
                <input type="text" defaultValue="" size="35" id="contactName" name="contactName"
                       onChange={handleChange}/>
              </div>

              <div>
                <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail"
                       onChange={handleChange}/>
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject"
                       onChange={handleChange}/>
              </div>

              <div>
                <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                <textarea cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
              </div>

              <div>
                <button className="submit">Submit</button>
                <span id="image-loader">
                        <img alt="" src="images/loader.gif"/>
                     </span>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!<br/>
          </div>
        </div>


        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">

            <h4>Address and Phone</h4>
            <p className="address">
              {aboutState.username}<br/>
              {aboutState.street} <br/>
              {aboutState.city}, {aboutState.state} {aboutState.zip}<br/>
              <span>{aboutState.contact}</span>
            </p>
          </div>

          <div className="widget widget_tweets">
            <h4 className="widget-title">Latest Tweets</h4>
            <ul id="twitter">
              <li>
                <span>
                This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                <a href="#">http://t.co/CGIrdxIlI3</a>
                </span>
                <b><a href="#">2 Days Ago</a></b>
              </li>
              <li>
                <span>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi
                <a href="#">http://t.co/CGIrdxIlI3</a>
                </span>
                <b><a href="#">3 Days Ago</a></b>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}


export default Contact;
