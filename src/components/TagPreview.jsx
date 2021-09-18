import React, { useState } from 'react';

import PropTypes from 'prop-types';

TagPreview.propTypes = {
  formData: PropTypes.object.isRequired
};

export default function TagPreview({ formData }) {
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      formData.image = image.raw;
    }
  };

  return (
    <div className="card-wrap">
      <figure className="card" data-tilt>
        <div className="card-content">
          <input id="upload-button" type="file" style={{ display: 'none' }} onChange={handleChange} />
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} className="img-bg" alt="image preview" />
            ) : (
              <img
                src="https://imgr.search.brave.com/k5zthfyqGXl1tTDhQZ-um05Q9V8bZ15tlPJIbfMJFMM/fit/256/256/no/1/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvcHJldmll/dy93aGl0ZS9hZGQt/eHhsLnBuZw"
                className="img-bg"
                alt=""
              />
            )}
          </label>

          <figcaption>
            <h3>{formData.desc}</h3>
            <p>{formData.email}</p>
            <p>{formData.twitter ? `@${formData.twitter}` : ''}</p>
            <p>{formData.instagram ? `@${formData.instagram}` : ''}</p>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
