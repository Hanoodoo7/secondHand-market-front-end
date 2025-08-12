    import { useState } from "react";

    const itemForm = () => {
    const [formData, setFormData] = useState({
        title: "",            
        description: "",      
        category: "Other",     
        price: "",            
        condition: "Used",      
        status: "Available",  
        images: ""             
     });

    const [uploading, setUploading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)


    const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
        };

    const handleImageUpload = async (event) => {
    const file = event.target.files[0]; 
    if (!file) return; 

    setUploading(true); 

    const data = new FormData(); 
    data.append("file", file); 
    data.append("upload_preset", "dbtxztzci"); 
    data.append("cloud_name", "dbtxztzci"); 
        


    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbtxztzci/images/upload`, {
        method: "POST",
        body: data
      });

      const uploaded = await res.json();

      setFormData({ ...formData, images: uploaded.secure_url });
    } catch (error) {
      console.error("Images upload failed", error);
        }
    }

    setUploading(false);


  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Here is the form data:", formData);
  };


return (
    <form className="vintage-form" onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edit Item" : "Create New Item"}</h2>
      
  <div className="form-group">
      <input
        name="title" className="vintage-input"
        placeholder="Enter item title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      </div>

  <div className="form-group">
      <textarea
        name="description" className="vintage-textarea"
        placeholder="Describe the item"
        value={formData.description}
        onChange={handleChange}
        required
      />
      </div>

    <div className="form-group">
    <select name="category" className="vintage-select" value={formData.category} onChange={handleChange}>
        <option value="Electronics">Electronics</option>
        <option value="Furniture & Home">Furniture & Home</option>
        <option value="Wearables">wearables</option>
        <option value="Books">Books</option>
        <option value="Sports">Sports</option>
        <option value="Hobbies">Hobbies</option>
        <option value="Spare Parts">Spare Parts</option>
        <option value="Toys">Toys</option>
        <option value="Vehicles">Vehicles</option>
        <option value="Other">Other</option>
      </select>
      </div>

<div className="form-group">
    <input
        type="number"  className="vintage-input"
        name="price"
        placeholder="Enter price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      </div>

    <div className="form-group">
    <select name="condition" className="vintage-select"
    value={formData.condition} onChange={handleChange}>
        <option value="Used">Used </option>
        <option value="Used-Once">Used Once</option>
        <option value="Never-Used">Never Used</option>
      </select>
      </div>

  
    <div className="file-upload">
      <label className="file-upload-label">
        {formData.images ? "Change Image" : "Upload Image"}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{ display: 'none' }}
        />
      </label>
      {uploading && <p className="upload-status">Uploading images...</p>}
      {formData.images && (
        <div className="image-preview">
          <img
            src={formData.images}
            alt="Uploaded Preview"
          />
        </div>
      )}
    </div>
    
    <div className="form-group">
    <select  className="vintage-select" name="status" value={formData.status} onChange={handleChange}>
        <option value="Available">Available</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </select>
      </div>
    
<div className="form-actions">
      <button 
        className="vintage-button" 
        type="button" 
        onClick={() => {
          setIsEditMode(true);
          setFormData({
            title: existingItem.title,
            description: existingItem.description,
            price: existingItem.price
          });
        }}
      >
        Edit Item
      </button>
      
      <button 
        className="vintage-button" 
        type="submit" 
        disabled={uploading}
      >
        {isEditMode ? "Update" : "Submit"}
      </button>
    </div>
  </form>
);
}

  export default itemForm;