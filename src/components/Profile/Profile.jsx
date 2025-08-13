import { useEffect, useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);



  if (loading) return <main>Loading profile...</main>;


  const { user, items } = profileData;

  return (
    <main className="profile-container">
      <section className="user-info">
        <h1>{user.username}'s Profile</h1>
        <p>Email: {user.email}</p>
        <p>Items Listed: {items.length}</p>
      </section>

      <section className="user-items">
        <h2>Listed Items</h2>
        {items.length === 0 ? (
          <p>No Items Listed</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item._id} className="item-card">
                {item.images && item.images[0] && (
                  <img src={item.images[0]} alt={item.title} />
                )}
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <p>{item.price} BDH</p>
                <p>{item.condition}</p>
                <p>{item.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Profile;
