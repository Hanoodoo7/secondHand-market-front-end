import { Link } from "react-router-dom"

const ItemList = (props) =>{

  return (
    <><h1>Items List</h1>
    <br />
  <div className="item-list-container">
  {props.item.map((item)=>(
  <Link key={item._id} to={`/items/${item._id}`} >
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
          
            <div className="item-meta">
              <p>Condition: {item.condition}</p>
              <p className="item-status">Status: {item.status}</p>
            </div>
    </article>
  </Link>
  ))}
  </div>
</>
  )

}
export default ItemList