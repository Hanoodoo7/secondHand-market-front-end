const ItemList = (props) =>{

  return (
  <div className="item-list-container">
  <h1>Items List</h1>
  {props.Item.map((Item)=>(
  <Link key={Item._id} to={`/item/${Item._id}`} >
    <article className="item-card">
      <header>
    <h2>{Item.title}</h2>
    <div className="item-meta"></div>
     <div className="item-meta">
        <p>By {Item.seller.username}</p>
        <p>Posted: {new Date(Item.createdAt).toLocaleDateString()}</p>
      </div>
     <p className="item-price">{Item.price} BDH</p>
            </header>
            <span className="item-category">{Item.category}</span>
            <p className="item-description">{Item.description}</p>
            <div className="item-meta">
              <p>Condition: {Item.condition}</p>
              <p className="item-status">Status: {Item.status}</p>
            </div>
    </article>
  </Link>
  ))}
  </div>

  )

}
export default ItemList