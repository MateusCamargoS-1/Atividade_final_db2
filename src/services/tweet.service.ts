import db from '../database/prisma.connection';
import tweetType from '../types/tweetType';

class TweetService {
    public async createTweet(tweetData: tweetType) {
        const { token, content } = tweetData;

        if (!content) {
            throw new Error('O conteúdo não pode estar vazio.');
        }

        const user = await db.users.findFirst({
            where: { token }
        });

        if (!user) {
            throw new Error('Você precisa estar logado para tweetar');
        }

        const tweet = await db.tweets.create({
            data: {
                content,
                userId: user.id,
                tweetType: 'Tweet',
            },
        });

        return tweet;
    }

    public async listTweets() {
        return db.tweets.findMany({
            include: { user: true }
        });
    }

    public async getTweetById(id: string) {
        return db.tweets.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    public async updateTweet(id: string, content: string) {
        if (!content) {
            throw new Error('O conteúdo não pode estar vazio.');
        }

        return db.tweets.update({
            where: { id },
            data: { content }
        });
    }

    public async deleteTweet(id: string) {
        try {
            await db.tweets.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default TweetService;
