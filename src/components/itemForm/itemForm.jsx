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
};

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
        <option value="cars">Cars</option>
        <option value="books">Books</option>
        <option value="sports equipment">Sports Equipment</option>
      </select>

      </form>
)

  export default itemForm;

