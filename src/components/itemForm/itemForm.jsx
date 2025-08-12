    import { useState } from "react";

    const itemForm = () => {
    // State to store all the form input values
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
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbtxztzci/image/upload`, {
        method: "POST",
        body: data
      });

      const uploaded = await res.json();

      setFormData({ ...formData, image: uploaded.secure_url });
    } catch (error) {
      console.error("Image upload failed", error);
        }
    }

    setUploading(false);


  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Here is the form data:", formData);
  };


return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Enter item title"
        value={formData.title}
        onChange={handleChange}
        required
      />

    <textarea
        name="description"
        placeholder="Describe the item"
        value={formData.description}
        onChange={handleChange}
        required
      />


    <select name="category" value={formData.category} onChange={handleChange}>
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

    <input
        type="number"
        name="price"
        placeholder="Enter price"
        value={formData.price}
        onChange={handleChange}
        required
      />

    <select name="condition" value={formData.condition} onChange={handleChange}>
        <option value="Used">Used </option>
        <option value="Used-Once">Used Once</option>
        <option value="Never-Used">Never Used</option>
      </select>


    <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p>Uploading image...</p>}
      {formData.image && (
        <img
          src={formData.image}
          alt="Uploaded Preview"
          width="100"
        />
      )}
    
    <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Available">Available</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </select>
    

    <button type="submit" disabled={uploading}>
        Submit
      </button>

      </form>
      );
};
    
  export default itemForm;

