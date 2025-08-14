import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loading/loader";

const ItemList = (props) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
    condition: "All",
    status: "Available"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialFilters = {
      category: queryParams.get('category') || "All",
      minPrice: queryParams.get('minPrice') || "",
      maxPrice: queryParams.get('maxPrice') || "",
      condition: queryParams.get('condition') || "All",
      status: queryParams.get('status') || "Available"
    };
    setFilters(initialFilters);
    setSearchTerm(queryParams.get('search') || "");
  }, [location.search]);

  const filteredItems = props.item.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      filters.category === "All" || item.category === filters.category;
    
    const itemPrice = parseFloat(item.price);
    const matchesMinPrice = 
      !filters.minPrice || itemPrice >= parseFloat(filters.minPrice);
    const matchesMaxPrice = 
      !filters.maxPrice || itemPrice <= parseFloat(filters.maxPrice);
    
    const matchesCondition = 
      filters.condition === "All" || item.condition === filters.condition;
    
    const matchesStatus = item.status === filters.status;
    
    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesCondition &&
      matchesStatus
    );
  });


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      category: "All",
      minPrice: "",
      maxPrice: "",
      condition: "All",
      status: "Available"
    });
    setSearchTerm("");
  };

   return (
    <>
      <h1>Items List</h1>
      
      <div className="search-filters-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">🔍</button>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Category:</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="All">All Categories</option>
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

          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-range">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
              />
              <span>BDH</span>
            </div>
          </div>

          <div className="filter-group">
            <label>Condition:</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="All">All Conditions</option>
              <option value="Used">Used</option>
              <option value="Used Once">Used Once</option>
              <option value="Never Used">Never Used</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

       {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <Loader />
        </div>
      ) : (
        <div className="item-list-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Link key={item._id} to={`/items/${item._id}`}>
                <article className="item-card">
                <header>
                  <h2>{item.title}</h2>
                  <div className="item-meta">
                    <p>By {item.seller?.username}</p>
                    <p>Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="item-price">{item.price} BDH</p>
                </header>
                <span className="item-category">{item.category}</span>
                          <div className="item-image-list">
                          {item.images ? (
                            <img src={item.images} alt={item.title} />
                          ) : (
                            <img 
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s" 
                              alt="Placeholder"
                              className="placeholder-image"
                            />
                          )}
                        </div>
                <div className="item-meta">
                  <p>Condition: {item.condition}</p>
                  <p className="item-status">Status: {item.status}</p>
                </div>
              </article>
              </Link>
            ))
          ) : (
            <p className="no-items-message">No items match your search criteria.</p>
          )}
        </div>
      )}
    </>
  );
};

export default ItemList;