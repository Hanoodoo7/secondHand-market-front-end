import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react'
import * as itemService from '../../services/itemService'
import CommentForm from '../CommentForm/CommentForm'

const itemDetails = (props) => {

  const { itemId } = useParams()

  const [item, setItem] = useState()
  
  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.show(itemId)
      setItem(itemData)
    }
    fetchItem()
  }, [itemId])

  const handleAddComment = async (formData) => {
    const newComment = await itemService.createComment(formData, itemId)
    console.log(newComment)
    setItem({...item, comments: [...Item.comments, newComment]})
  }

  if (!item) return <main>Loading...</main>

  return (
    <main>
      <header>
        <p>{Item.category.toUpperCase()}</p>
        <h1>{Item.title} - {Item.price}BDH </h1>
        <p>
          {Item.seller.username} posted on {new Date(Item.createdAt).toLocaleDateString()}
        </p>
        <p>
            {/* I'll put the image here later */}
            {Item.condition} - {Item.status}
        </p>
        <p>
          {Item.description}
        </p>
        {/* DELETE BUTTON */}
        {Item.seller._id === props.user._id && (
          <>
        <Link to={`/item/${itemId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteItem(itemId)}>Delete</button>
        </>
        )
        }
      </header>
      <h2>Comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
       {!Item.comments.length && <p>There are no comments.</p>}

        {Item.comments.map((comment) => (
          <p key={comment._id}>{comment.text}</p>
        ))}
    </main>
  )
}

export default itemDetails