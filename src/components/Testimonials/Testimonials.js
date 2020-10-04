import React from 'react';

const Testimonials = (props) => {

  if (props.data) {
    var testimonials = props.data.testimonials.map(function (testimonials) {
      return <li key={testimonials.user}>
        <blockquote>
          <p>{testimonials.text}</p>
          <cite>{testimonials.user}</cite>
        </blockquote>
      </li>
    })
  } else {
    return <div></div>;
  }

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">

          <div className="two columns header-col">
            <h1><span>Client Testimonials</span></h1>
          </div>

          <div className="ten columns flex-container">
            <ul className="slides">
              {testimonials}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;