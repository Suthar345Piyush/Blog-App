import conf from "../conf.js";
import { Client, ID , Databases, Storage, Query } from "appwrite";


export class Service{
  client = new Client();
  Databases;
  storage;

  
  constructor()  {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases  = new Databases(this.client);
        this.storage = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug,
          {
            title,
            content,
            featuredImage,
            status,
            userId
          }

      );
      
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      
    }
  }


  async updatePost( slug, {title, content, featuredImage, status}){
    try {
       return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
       );
      
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      
    }
  }

  async deletePost(slug){
    try{
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug 
      )
      return true
      
    } catch(error){
      console.log("Appwrite service :: deletePost ::  error", error);
      return false;

    }
  }

  async  getPost(slug){
    try {
      return await this .databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
      
    } catch (error) {
      console.log("Appwrite service :: getPost ::  error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
      return true
      
    } catch (error) {
       console.log("Appwrite service :: getPosts ::  error", error);
       return false
    }
  }

  // file upload service or methods:

  async  uploadFiles(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
      
    } catch (error) {
       console.log("Appwrite service :: deletePost ::  error", error);
       return false
      
    }
  }

  async deleteFile(fileId){
    try{
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
    }
    catch(error){
       console.log("Appwrite service :: deleteFile ::  error", error);
       return false

    }
  }

  async getFilePreview(fileId){
    try {
      return await this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      )
      
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
      return false
      
    }
  }
}



const service = new Service();
export default service


// new variable se service banayi hain to constructer banega