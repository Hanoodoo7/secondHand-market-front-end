const ItemList = (props) =>{

  return (
  <>
  <h1>Items List</h1>
  {props.items.map((item)=>(
  <Link key={item._id} to={`/item/${item._id}`} >
    <article>
      <header>
    <h2>{item.title}</h2>
    <p>
      {item.seller.username}
      Date posted: {new Date(item.createdAt).toLocaleDateString()}
    </p>
    <p>{item.price}</p>
    </header>
    <p>{item.category}</p>
    <p>{item.description}</p>
    <p>{item.condition}</p>
    <p>{item.status}</p>
    </article>
  </Link>
  ))}
  </>

  )

}
export default ItemList