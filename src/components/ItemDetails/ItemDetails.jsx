import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react'
import * as itemService from '../../services/itemService'
import CommentForm from '../CommentForm/CommentForm'

const ItemDetails = (props) => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await itemService.show(itemId);
        setItem(itemData);
      } catch (err) {
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [itemId]);

  const handleAddComment = async (formData) => {
    try {
      const newComment = await itemService.createComment(formData, itemId);
      setItem(prevItem => ({
        ...prevItem,
        comments: [...prevItem.comments, newComment]
      }));
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteItem(itemId);
      navigate('/');
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  if (loading) return <main>Loading...</main>;
  if (!item) return <main>Item not found</main>;

  return (
    <main>
      <header>
        <span>{item.category?.toUpperCase()}</span>
        <h1>
          {item.title} - {item.price}BDH
        </h1>
        
        <div>
          <span>
            Posted by {item.seller?.username} on {new Date(item.createdAt).toLocaleDateString()}
          </span>
          <span>
            {item.condition} - {item.status}
          </span>
        </div>
        
        <p>{item.description}</p>
        
        {item.image && (
          <div>
            <img src={item.image} alt={item.title} />
          </div>
        )}

        {item.seller?._id === user?._id && (
          <div>
            <Link to={`/items/${itemId}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </header>

      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        
        {item.comments?.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul>
            {item.comments?.map((comment) => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                {comment.author?.username && (
                  <span>- {comment.author.username}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default ItemDetails;