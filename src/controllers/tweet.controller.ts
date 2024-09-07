import { Request, Response } from 'express';
import TweetService from '../services/tweet.service';

const tweetService = new TweetService();

class TweetController {
    public async create(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ success: false, msg: 'Token é preciso' });
            }

            const { content } = req.body;

            const tweetData = { token, content };
            const tweet = await tweetService.createTweet(tweetData);

            return res.status(201).json({
                success: true,
                msg: 'Tweet criado com sucesso',
                data: tweet,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const tweets = await tweetService.listTweets();
            return res.status(200).json({
                success: true,
                msg: 'Lista de tweets',
                data: tweets,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const tweet = await tweetService.getTweetById(id);

            if (tweet) {
                return res.status(200).json({
                    success: true,
                    msg: 'Tweet encontrado',
                    data: tweet,
                });
            }

            return res.status(404).json({
                success: false,
                msg: 'Tweet não encontrado',
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const tweet = await tweetService.updateTweet(id, content);

            if (tweet) {
                return res.status(200).json({
                    success: true,
                    msg: 'Tweet atualizado com sucesso',
                    data: tweet,
                });
            }

            return res.status(404).json({
                success: false,
                msg: 'Tweet não encontrado',
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const success = await tweetService.deleteTweet(id);

            if (success) {
                return res.status(200).json({
                    success: true,
                    msg: 'Tweet deletado com sucesso',
                });
            }

            return res.status(404).json({
                success: false,
                msg: 'Tweet não encontrado',
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }
}

export default TweetController;
