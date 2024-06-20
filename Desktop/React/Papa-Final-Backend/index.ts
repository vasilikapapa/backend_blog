import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { createBlogPostController, deleteBlogPostController, editBlogPostController, getBlogPostController, getSingleBlogPostController } from './controllers/blogPostController'


dotenv.config()

console.log(process.env.PORT)
const app: Express = express()
const port = process.env.PORT

app.use(bodyParser())
app.use(cors())

app.get('/blog-posts', getBlogPostController)
app.get('/blog-post', getSingleBlogPostController)
app.post('/create-blog-post', createBlogPostController)
app.post('/edit-blog-post', editBlogPostController)
app.delete('/delete-blog-post', deleteBlogPostController)



mongoose.connect(process.env.CONNECTION_STRING!).then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}).catch( e => [
    console.log('Connection Failed!!!')
])
