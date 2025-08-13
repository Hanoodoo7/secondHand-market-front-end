import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loading/loader";
import * as itemService from "../../services/itemService";

const Profile = ({ user, handleDeleteItem }) => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const allItems = await itemService.index();
        const myItems = allItems.filter(item => item.seller?._id === user?._id);
        setUserItems(myItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <main className="profile-page">
      <h1>{user.username}'s Profile</h1>
      
      <h2>My Items</h2>
      {userItems.length === 0 ? (
        <p>You have no items listed.</p>
      ) : (
        <div className="item-list-container">
          {userItems.map(item => (
            <article key={item._id} className="item-card">
              <header>
                <h2>{item.title}</h2>
                <div className="item-meta">
                  <p>Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="item-price">{item.price} BDH</p>
              </header>
              <span className="item-category">{item.category}</span>
              <div className="item-meta">
                <p>Condition: {item.condition}</p>
                <p className="item-status">Status: {item.status}</p>
              </div>
              <div className="item-actions">
                <Link to={`/items/${item._id}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Profile;
