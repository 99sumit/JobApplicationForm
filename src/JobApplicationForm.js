import React, { useState, useEffect } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      Cpp: false,
      JavaScript: false,
      CSS: false,
      Python: false,
      Java: false,
      
    },
    preferredInterviewTime: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showRelevantExperience, setShowRelevantExperience] = useState(false);
  const [showPortfolioURL, setShowPortfolioURL] = useState(false);
  const [showManagementExperience, setShowManagementExperience] = useState(false);

  useEffect(() => {
    if (formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') {
      setShowRelevantExperience(true);
    } else {
      setShowRelevantExperience(false);
    }

    if (formData.applyingForPosition === 'Designer') {
      setShowPortfolioURL(true);
    } else {
      setShowPortfolioURL(false);
    }

    if (formData.applyingForPosition === 'Manager') {
      setShowManagementExperience(true);
    } else {
      setShowManagementExperience(false);
    }
  }, [formData.applyingForPosition]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (showRelevantExperience && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }
    if (showPortfolioURL && !formData.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (showPortfolioURL && !isValidUrl(formData.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is invalid';
    }
    if (showManagementExperience && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(formData.additionalSkills).includes(true)) {
      errors.additionalSkills = 'Please select at least one skill';
    }
    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (isNaN(Date.parse(formData.preferredInterviewTime))) {
      errors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
    }

    if (Object.keys(errors).length === 0) {
      alert('Form submitted successfully!');
      console.log(formData); 
    } else {
      setFormErrors(errors);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className='main'>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name : </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
      </div>

      <div>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>

      <div>
        <label>Phone Number : </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}
      </div>

      <div>
        <label>Applying for Position : </label>
        <select
          name="applyingForPosition"
          value={formData.applyingForPosition}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {showRelevantExperience && (
        <div>
          <label>Relevant Experience (years) : </label>
          <input
            type="number"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleInputChange}
            required
          />
          {formErrors.relevantExperience && <span className="error">{formErrors.relevantExperience}</span>}
        </div>
      )}

      {showPortfolioURL && (
        <div>
          <label>Portfolio URL : </label>
          <input
            type="text"
            name="portfolioURL"
            value={formData.portfolioURL}
            onChange={handleInputChange}
            required
          />
          {formErrors.portfolioURL && <span className="error">{formErrors.portfolioURL}</span>}
        </div>
      )}

      {showManagementExperience && (
        <div>
          <label>Management  : </label>
          <input
            type="text"
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleInputChange}
            required
          />
          {formErrors.managementExperience && <span className="error">{formErrors.managementExperience}</span>}
        </div>
      )}

      <div>
        <label>Additional Skills : </label>
        <div>
          {Object.keys(formData.additionalSkills).map(skill => (
            <label key={skill}>
              <input
                type="checkbox"
                name={skill}
                checked={formData.additionalSkills[skill]}
                onChange={handleInputChange}
              />
              {skill}
            </label>
          ))}
        </div>
        {formErrors.additionalSkills && <span className="error">{formErrors.additionalSkills}</span>}
      </div>

      <div>
        <label>Preferred Interview Time : </label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={formData.preferredInterviewTime}
          onChange={handleInputChange}
          required
        />
        {formErrors.preferredInterviewTime && <span className="error">{formErrors.preferredInterviewTime}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default JobApplicationForm;
