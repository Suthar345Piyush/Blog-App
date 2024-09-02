import React, {useEffect, useState}  from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import {Container, PostForm} from '../components';
import appwriteService from '../appwrite/config';



function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if(slug){
      appwriteService.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }
      })
    } else{
      navigate('/')
    }

  }, [slug, navigate]) // slug and navigate are in depandencies array.
  return post ? (<div className='py-8'>
    <Container >
      <PostForm post = {post}></PostForm>
    </Container>
  
  
  </div>) : null
}
export default EditPost
