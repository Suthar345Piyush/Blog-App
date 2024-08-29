import React, {useCallback} from 'react'
import {Button , Input , RTE , Select} from  '../index'
import { Form } from 'react-hook-form'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-redux'
import appwriteServices from '../../appwrite/config'


function PostForm({post}) {
  // form ko contineusly moniter krna hoto watch capabilities ka use hoga.
  const  {register, handleSubmit , setValue , getValues , watch , control} = useForm({
    defaultValue: {
      title: post?.title || "",
      slug: post?.slug || "",
      content : post?.content || "",
      status: post?.status || "active",


    },
  });
  
  const navigate = useNavigate();
  const userData = useSelector((status) => status.auth.userData);

  const submit = async(data) => {
  
    if(post){
      const file = data.image[0] ? await appwriteServices.uploadFiles(data.image[0]) : null;

      if(file){
        appwriteServices.deleteFile(post.featuredImage);
      }

      const dbPost  = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if(dbPost){
        navigate(`/post/${dbPost.$id}`);
      }
    }  else {
      const file =  data.image[0] ? await appwriteServices.uploadFiles(data.image[0]) : null;

      if(file){
        const fileId = file.$id; // yaha pe sab $id hota hain
        data.featuredImage = fileId;
        const dbPost = await appwriteServices.createPost({...data, userId: userData.$id});

        if(dbPost){
          navigate(`post/${dbPost.id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string')
      return value 
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");

      return "";
    
    }, []);

    React.useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name === "title"){
          setValue("slug" , slugTransform(value.title), {shouldValidate: true});
        }
      });

      return() => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    })

  return (
    <div>post form </div>
  )
  }

export default PostForm
