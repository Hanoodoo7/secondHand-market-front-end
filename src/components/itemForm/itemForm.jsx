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

    }