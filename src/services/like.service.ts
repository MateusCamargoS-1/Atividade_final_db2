import db from '../database/prisma.connection';
import likeType from '../types/likeType';

class LikeService {
    public async toggleLike(likeData: likeType) {
        const { userToken, tweetId, action } = likeData;

        const user = await db.users.findFirst({
            where: { token: userToken },
        });

        if (!user) {
            throw new Error('Token inválido ou usuário não encontrado');
        }

        if (action === 'like') {
            const alreadyLiked = await db.likes.findFirst({
                where: {
                    userId: user.id,
                    tweetId: tweetId,
                },
            });

            if (alreadyLiked) {
                throw new Error('Você já curtiu este tweet');
            }

            const like = await db.likes.create({
                data: {
                    userId: user.id,
                    tweetId: tweetId,
                },
            });

            return like;
        } else if (action === 'unlike') {
            const like = await db.likes.findFirst({
                where: {
                    userId: user.id,
                    tweetId: tweetId,
                },
            });

            if (!like) {
                throw new Error('Você não curtiu este tweet');
            }

            await db.likes.delete({
                where: {
                    id: like.id,
                },
            });

            return { message: 'Like removido com sucesso' };
        } else {
            throw new Error('Ação inválida');
        }
    }

    public async listLikes(tweetId: string) {
        const likes = await db.likes.findMany({
            where: { tweetId: tweetId },
            include: { user: true },
        });

        return likes;
    }
}

export default LikeService;
