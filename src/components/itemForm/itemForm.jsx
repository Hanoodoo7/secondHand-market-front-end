    import { useState } from "react";

    const ItemsForm = () => {
    // State to store all the form input values
    const [formData, setFormData] = useState({
        title: "",            
        description: "",      
        category: "cars",     
        price: "",            
        condition: "ok",      
        status: "available",  
        image: ""             
     });

      // This is used to show a message when the image is being uploaded
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
      // Send the image to Cloudinary
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbtxztzci/image/upload`, {
        method: "POST",
        body: data
      });

      const uploaded = await res.json();

      // Save the image URL into our formData
      setFormData({ ...formData, image: uploaded.secure_url });
    } catch (error) {
      console.error("Image upload failed", error);
        }
    }

    setUploading(false);
};

// Stop the page from reloading
  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Here is the form data:", formData);
  };
