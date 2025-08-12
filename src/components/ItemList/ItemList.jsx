const ItemList = (props) =>{

  return (
  <div className="item-list-container">
  <h1>Items List</h1>
  {props.item.map((item)=>(
  <Link key={item._id} to={`/items/${item._id}`} >
    <article className="item-card">
      <header>
    <h2>{item.title}</h2>
    <div className="item-meta"></div>
     <div className="item-meta">
        <p>By {item.seller.username}</p>
        <p>Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
     <p className="item-price">{item.price} BDH</p>
            </header>
            <span className="item-category">{item.category}</span>
            <p className="item-description">{item.description}</p>
            <div className="item-meta">
              <p>Condition: {item.condition}</p>
              <p className="item-status">Status: {item.status}</p>
            </div>
    </article>
  </Link>
  ))}
  </div>

  )

}
export default ItemList