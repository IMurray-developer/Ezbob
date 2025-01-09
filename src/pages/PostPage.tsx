import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../context/interfaces";
import { fetchData } from "../services/apiService";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          setLoading(true);
          const data = await fetchData<Post>(`https://dummyjson.com/posts/${id}`);
          setPost(data);
        } catch (error) {
          setError('Failed to fetch recipe');
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        fetchRecipe();
      }
    }, [id]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!id || !post) return <p>There post was not found</p>
  
    return (
        <div className="post-single">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <p><strong>Views:</strong> {post.views}</p>
          <p><strong>Likes:</strong> {post.reactions.likes}</p>
          <p><strong>Dislikes:</strong> {post.reactions.dislikes}</p>
          <p><strong>User ID:</strong> {post.userId}</p>
        </div>
        <div className="post-tags">
          <strong>Tags:</strong>
          <ul>
            {post.tags.map((tag, index) => (
              <li key={index} className="tag-item">
                <span className="tag-link">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="post-body">{post.body}</p>
        
      </div>
    );
}

export default PostPage