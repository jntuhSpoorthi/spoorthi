import React from "react";

function Map() {
  return (
    <div className="m-4 md:m-8 xl:mx-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.2426073169943!2d78.39280109852373!3d17.49398315032653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f321b928db%3A0x94f5ae26c63fcdce!2sECE%20Department%2C%20JNTU!5e0!3m2!1sen!2sin!4v1741880289085!5m2!1sen!2sin"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[30rem] rounded-md map"
      ></iframe>
    </div>
  );
}

export default Map;
