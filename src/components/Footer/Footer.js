import React, { useCallback, useEffect, useState } from 'react';
import axios_instance from "../../axios-instance/axios-instance";

const Footer = (props) => {
  const [networkState, setNetworkState] = useState({
    social: null
  });

  const getNetworksByUser = useCallback(async () => {
    const socialResponse = await axios_instance.get(`/social_media/${props.user_id}`, {});
    if (socialResponse && socialResponse.data) {
      let social = socialResponse.data.map((network) => {
        return JSON.parse(network.details);
      })
      console.log(social);
      setNetworkState({...networkState, social: social});
    }
  }, [props.user_id]);

  useEffect(() => {
    getNetworksByUser();
  }, [getNetworksByUser, getNetworksByUser]);

  let networks = null;
  if (networkState.social) {
    networks = networkState.social.map(function (network) {
      return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
    })
  }
  // if (props.data) {
  //   networks = props.data.social.map(function (network) {
  //     return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
  //   })
  // } else {
  //   return <div></div>;
  // }

  return (
    <footer>

      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            {networks}
          </ul>

          <ul className="copyright">
            <li>&copy; Copyright 2017 Nordic Giant</li>
            <li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li>
          </ul>

        </div>
        <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home">
          <i className="icon-up-open"></i></a></div>
      </div>
    </footer>
  );
}


export default Footer;
