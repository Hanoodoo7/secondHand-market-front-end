import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as itemService from "../../services/itemService"; 
import Loader from "../Loading/loader";


const ItemForm = ({ handleAddItem, handleUpdateItem }) => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const initialState = {
    title: "",
    description: "",
    category: "Other",
    price: "",
    condition: "Used",
    status: "Available",
    images: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleImageUpload = async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "dbtxztzci");
    data.append("cloud_name", "dbtxztzci");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbtxztzci/images/upload`,
        { method: "POST", body: data }
      );
      const uploaded = await res.json();
      setFormData({ ...formData, images: uploaded.secure_url });
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      if (itemId) {
        await handleUpdateItem(itemId, formData);
      } else {
        await handleAddItem(formData);
      }
      navigate("/items");
    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;
      setFetching(true);
      try {
        const itemData = await itemService.show(itemId);
        setFormData(itemData);
      } catch (error) {
        console.error("Failed to fetch item", error);
      } finally {
        setFetching(false);
      }
    };
    fetchItem();
    return () => setFormData(initialState);
  }, [itemId]);

  if (fetching) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h1>{itemId ? "Edit Item" : "Create New Item"}</h1>
       <form className="vintage-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title-input">Title</label>
          <input
            name="title"
            id="title-input"
            className="vintage-input"
            placeholder="Enter item title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description-input">Description</label>
          <textarea
            name="description"
            id="description-input"
            className="vintage-textarea"
            placeholder="Describe the item"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-input">Category</label>
          <select
            name="category"
            id="category-input"
            className="vintage-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture & Home">Furniture & Home</option>
            <option value="Wearables">Wearables</option>
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
          <label htmlFor="price-input">Price</label>
          <input
            type="number"
            step="0.01"
            id="price-input"
            className="vintage-input"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition-input">Condition</label>
          <select
            name="condition"
            id="condition-input"
            className="vintage-select"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="Used">Used</option>
            <option value="Used Once">Used Once</option>
            <option value="Never Used">Never Used</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image-upload">Image</label>
          <div className="file-upload">
            <label className="file-upload-label" htmlFor="image-upload">
              {formData.images ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {uploading && <p className="upload-status">Uploading image...</p>}
            {formData.images && (
              <div className="image-preview">
                <img src={formData.images} alt="Uploaded preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status-input">Status</label>
          <select
            name="status"
            id="status-input"
            className="vintage-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

       <div className="form-actions">
          <button
            className="vintage-button"
            type="submit"
            disabled={uploading || loading}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Loader />
                <span>Processing...</span>
              </div>
            ) : itemId ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ItemForm;