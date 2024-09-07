import db from '../database/prisma.connection';
import followerType from '../types/followerType';

class FollowerService {
    public async toggleFollow(followerData: followerType) {
        const { followerToken, followerId, action } = followerData;

        const follower = await db.users.findFirst({
            where: { token: followerToken },
        });

        if (!follower) {
            throw new Error('Token inválido ou usuário não encontrado');
        }

        if (action === 'follow') {
            if (follower.id === followerId) {
                throw new Error('Você não pode seguir a si mesmo');
            }

            const followee = await db.users.findUnique({
                where: { id: followerId },
            });

            if (!followee) {
                throw new Error('Usuário para seguir não encontrado');
            }

            const alreadyFollowing = await db.followers.findFirst({
                where: {
                    userId: follower.id,
                    followerId: followee.id,
                },
            });

            if (alreadyFollowing) {
                throw new Error('Você já está seguindo este usuário');
            }

            const follow = await db.followers.create({
                data: {
                    userId: follower.id,
                    followerId: followee.id,
                },
            });

            return follow;
        } else if (action === 'unfollow') {
            const followRelation = await db.followers.findFirst({
                where: {
                    userId: follower.id,
                    followerId: followerId,
                },
            });

            if (!followRelation) {
                throw new Error('Você não está seguindo este usuário');
            }

            await db.followers.delete({
                where: {
                    id: followRelation.id,
                },
            });

            return { message: 'Você deixou de seguir o usuário' };
        } else {
            throw new Error('Ação inválida');
        }
    }

    public async listFollowers(userId: string) {
        const followers = await db.followers.findMany({
            where: { followerId: userId },
            include: { user: true },
        });

        return followers;
    }
}

export default FollowerService;
