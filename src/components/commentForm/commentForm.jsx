import { useState } from 'react'
import * as itemService from '../../services/itemService'

const commentForm = ({ handleAddComment, user }) => {
  const [formData, setFormData] = useState({ text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    if (error) setError('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    
    if (!user) {
      setError('You must be logged in to comment')
      return
    }

    if (!formData.text.trim()) {
      setError('Comment cannot be empty')
      return
    }

    setIsSubmitting(true)
    try {
      await handleAddComment(formData)
      setFormData({ text: '' })
    } catch (err) {
      console.error('Error submitting comment:', err)
      setError('Failed to post comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        disabled={isSubmitting}
        placeholder={user ? 'Write your comment...' : 'Log in to comment'}
      />
      {error && <p className="error-message">{error}</p>}
      <button 
        type="submit" 
        disabled={isSubmitting || !user || !formData.text.trim()}
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}

export default commentForm