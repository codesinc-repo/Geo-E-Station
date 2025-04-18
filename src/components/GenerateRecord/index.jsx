import React, { useState, useRef } from "react";
import { 
  FaTimes, 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaUpload 
} from "react-icons/fa";
import icon from "../../assests/img/icon.png";

const GenerateRecordModal = ({ show, handleClose, onGenerate }) => {
  // Form state
  const [form, setForm] = useState({
    qualification: "",
    clientFirstName: "",
    clientLastName: "",
    agentName: "",
    agentLastName: "",
    comments: "",
    agentMobile: "",
    agentPosition: "",
    agencyName: "",
    corporateColor: "#4caf50",
    language: "Spanish"
  });

  const [errors, setErrors] = useState({});
  const [toggleStates, setToggleStates] = useState({
    agentData: true,
    price: true,
    address: true,
    market: true,
    characteristics: true,
    interior: true,
    map: true,
    companyInfo: true,
    mail: true
  });

  const [coverImage, setCoverImage] = useState(null);
  const [agentImage, setAgentImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coverInputRef = useRef(null);
  const agentInputRef = useRef(null);
  const companyInputRef = useRef(null);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleToggle = (key) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }
    if (!form.clientFirstName.trim()) {
      newErrors.clientFirstName = "Client first name is required";
    }
    if (!form.agentName.trim()) {
      newErrors.agentName = "Agent name is required";
    }
    if (!form.agentMobile.trim()) {
      newErrors.agentMobile = "Mobile is required";
    } else if (!/^\+?\d{10,15}$/.test(form.agentMobile)) {
      newErrors.agentMobile = "Enter a valid mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      const recordData = {
        ...form,
        toggleStates,
        coverImage,
        agentImage,
        companyLogo,
        date: new Date().toLocaleDateString()
      };

      onGenerate(recordData);
      setIsSubmitting(false);
      handleClose();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050
      }}
    >
      <div 
        className="modal-content bg-white" 
        style={{
          width: "95%",
          maxWidth: "550px",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px"
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="m-0" style={{ color: "#444", fontWeight: "500" }}>Generate record</h4>
            <p className="m-0 text-muted">Center - C. Cervantes</p>
          </div>
          <button 
            onClick={handleClose} 
            className="btn border-0" 
            style={{ color: "#666", fontSize: "1.5rem" }}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Qualification & Language */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Qualification</label>
              <input 
                type="text" 
                className={`form-control ${errors.qualification ? 'border-danger' : ''}`}
                name="qualification"
                value={form.qualification}
                onChange={handleInputChange}
              />
              {errors.qualification && (
                <small className="text-danger">{errors.qualification}</small>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Language</label>
              <select
                className="form-control"
                name="language"
                value={form.language}
                onChange={handleInputChange}
              >
                <option value="Spanish">Spanish</option>
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
          
          {/* Client Info */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Client first name</label>
              <input 
                type="text" 
                className={`form-control ${errors.clientFirstName ? 'border-danger' : ''}`}
                name="clientFirstName"
                value={form.clientFirstName}
                onChange={handleInputChange}
              />
              {errors.clientFirstName && (
                <small className="text-danger">{errors.clientFirstName}</small>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Client last name</label>
              <input 
                type="text" 
                className="form-control"
                name="clientLastName"
                value={form.clientLastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          {/* Data Toggles */}
          <div className="mb-4">
            <label className="form-label">Data to be displayed on the list</label>
            <div className="border rounded p-2">
              {[
                { key: "agentData", label: "Agent data" },
                { key: "price", label: "Price" },
                { key: "address", label: "Address" },
                { key: "market", label: "Time on the housing market" },
                { key: "characteristics", label: "Characteristics of the area" },
                { key: "interior", label: "Interior" },
                { key: "map", label: "Map" },
                { key: "companyInfo", label: "Company information" }
              ].map((item) => (
                <div key={item.key} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span>{item.label}</span>
                  <div 
                    className="toggle-switch"
                    style={{ position: "relative", display: "inline-block", width: "40px", height: "20px" }}
                  >
                    <input
                      type="checkbox"
                      checked={toggleStates[item.key]}
                      onChange={() => handleToggle(item.key)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: toggleStates[item.key] ? "#4caf50" : "#ccc",
                        transition: "0.4s",
                        borderRadius: "20px"
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          height: "16px",
                          width: "16px",
                          left: toggleStates[item.key] ? "22px" : "2px",
                          bottom: "2px",
                          backgroundColor: "white",
                          transition: "0.4s",
                          borderRadius: "50%"
                        }}
                      ></span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Comments */}
          <div className="mb-4">
            <label className="form-label">Add comments ({form.comments.length} / 2000)</label>
            <div className="border rounded">
              <div className="p-1 border-bottom d-flex">
                <button type="button" className="btn btn-sm">Normal</button>
                <button type="button" className="btn btn-sm"><FaBold /></button>
                <button type="button" className="btn btn-sm"><FaItalic /></button>
                <button type="button" className="btn btn-sm"><FaUnderline /></button>
                <button type="button" className="btn btn-sm"><FaAlignLeft /></button>
                <button type="button" className="btn btn-sm"><FaAlignCenter /></button>
                <button type="button" className="btn btn-sm"><FaAlignRight /></button>
              </div>
              <textarea 
                className="form-control border-0" 
                rows="5" 
                name="comments"
                value={form.comments}
                onChange={handleInputChange}
                maxLength={2000}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="form-check mt-1">
              <input className="form-check-input" type="checkbox" id="saveAsTemplate" />
              <label className="form-check-label" htmlFor="saveAsTemplate">Save as template</label>
            </div>
          </div>
          
          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="form-label">Add a custom cover</label>
            <div 
              className="border rounded p-3 text-center"
              style={{ 
                backgroundColor: "#f9f9f9",
                cursor: "pointer"
              }}
              onClick={() => coverInputRef.current.click()}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "5px",
                    marginBottom: "10px"
                  }}
                />
              ) : (
                <>
                  <FaUpload style={{ fontSize: "2rem", color: "#4caf50", marginBottom: "10px" }} />
                  <p className="text-muted mb-2">Click to upload or drag and drop files here</p>
                </>
              )}
              <input 
                ref={coverInputRef}
                type="file" 
                style={{ display: "none" }} 
                onChange={(e) => handleImageUpload(e, setCoverImage)}
                accept="image/*"
              />
              <button 
                type="button"
                className="btn mt-2" 
                style={{ backgroundColor: "#4caf50", color: "white" }}
                onClick={(e) => {
                  e.stopPropagation();
                  coverInputRef.current.click();
                }}
              >
                {coverImage ? "CHANGE IMAGE" : "BROWSE FILE"}
              </button>
            </div>
            <div className="form-check mt-1">
              <input className="form-check-input" type="checkbox" id="saveAsCoverTemplate" />
              <label className="form-check-label" htmlFor="saveAsCoverTemplate">Save as template</label>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="mb-4">
            <h5>Contact</h5>
            <p className="text-muted">Edit your report and customize it completely</p>
            
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div 
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      backgroundColor: "#f0f0f0", 
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={() => agentInputRef.current.click()}
                  >
                    {agentImage ? (
                      <img 
                        src={agentImage} 
                        alt="Agent preview" 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover" 
                        }} 
                      />
                    ) : (
                      <img 
                        src={icon} 
                        alt="Default agent" 
                        style={{ 
                          width: "77px", 
                          borderRadius: "50%" 
                        }} 
                      />
                    )}
                  </div>
                  <input 
                    ref={agentInputRef}
                    type="file" 
                    style={{ display: "none" }} 
                    onChange={(e) => handleImageUpload(e, setAgentImage)}
                    accept="image/*"
                  />
                  <button 
                    className="btn btn-link text-muted p-0 mt-1"
                    onClick={() => agentInputRef.current.click()}
                  >
                    Click to upload image
                  </button>
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-3">
                  <label className="form-label">Name of agent</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.agentName ? 'border-danger' : ''}`}
                    name="agentName"
                    value={form.agentName}
                    onChange={handleInputChange}
                    placeholder="Alex"
                  />
                  {errors.agentName && (
                    <small className="text-danger">{errors.agentName}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Agent last name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="agentLastName"
                    value={form.agentLastName}
                    onChange={handleInputChange}
                    placeholder="Enter..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input 
                type="text" 
                className={`form-control ${errors.agentMobile ? 'border-danger' : ''}`}
                name="agentMobile"
                value={form.agentMobile}
                onChange={handleInputChange}
                placeholder="+34666777766"
              />
              {errors.agentMobile && (
                <small className="text-danger">{errors.agentMobile}</small>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Position in the agency</label>
              <input 
                type="text" 
                className="form-control"
                name="agentPosition"
                value={form.agentPosition}
                onChange={handleInputChange}
                placeholder="Finca..."
              />
            </div>
            
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div 
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      backgroundColor: "#f0f0f0", 
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={() => companyInputRef.current.click()}
                  >
                    {companyLogo ? (
                      <img 
                        src={companyLogo} 
                        alt="Company logo preview" 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover" 
                        }} 
                      />
                    ) : (
                      <img 
                        src={icon} 
                        alt="Default company logo" 
                        style={{ 
                          width: "77px", 
                          borderRadius: "50%" 
                        }} 
                      />
                    )}
                  </div>
                  <input 
                    ref={companyInputRef}
                    type="file" 
                    style={{ display: "none" }} 
                    onChange={(e) => handleImageUpload(e, setCompanyLogo)}
                    accept="image/*"
                  />
                  <button 
                    className="btn btn-link text-muted p-0 mt-1"
                    onClick={() => companyInputRef.current.click()}
                  >
                    Click to upload logo
                  </button>
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-3">
                  <label className="form-label">Name of the agency</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="agencyName"
                    value={form.agencyName}
                    onChange={handleInputChange}
                    placeholder="Real Estates"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Corporate color</label>
                  <input 
                    type="color"
                    className="form-control form-control-color"
                    name="corporateColor"
                    value={form.corporateColor}
                    onChange={handleInputChange}
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
              </div>
            </div>
            
            <div 
              className="btn text-white w-100 mb-3"
              style={{ 
                backgroundColor: "#4caf50", 
                border: "none", 
                borderRadius: "4px",
                padding: "10px",
                fontSize: "16px"
              }}
            >
              Choose the corporate value you wish to display in the report
            </div>
            
            <div className="d-flex align-items-center">
              <div 
                className="toggle-switch me-2"
                style={{ position: "relative", display: "inline-block", width: "40px", height: "20px" }}
              >
                <input
                  type="checkbox"
                  checked={toggleStates.mail}
                  onChange={() => handleToggle("mail")}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: toggleStates.mail ? "#4caf50" : "#ccc",
                    transition: "0.4s",
                    borderRadius: "20px"
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: toggleStates.mail ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      transition: "0.4s",
                      borderRadius: "50%"
                    }}
                  ></span>
                </span>
              </div>
              <span>Mail</span>
            </div>
          </div>
          
          <div className="text-end mt-4">
            <button 
              type="submit"
              className="btn px-4" 
              style={{ backgroundColor: "#4caf50", border: "none", color: "white" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateRecordModal;