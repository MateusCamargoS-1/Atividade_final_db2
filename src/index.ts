import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import tweetRoutes from './routes/tweet.routes';
import followerRoutes from './routes/follower.routes';
import likeRoutes from './routes/like.routes';
import replyRoutes from './routes/reply.routes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/users', userRoutes());
app.use('/auth', authRoutes());
app.use('/tweet', tweetRoutes());
app.use('/follower', followerRoutes());
app.use('/likes', likeRoutes());
app.use('/replies', replyRoutes());