import db from '../database/prisma.connection';
import replyType from '../types/replyType';

class ReplyService {
  public async addReply(replyData: replyType) {
    const { userToken, tweetId, content } = replyData;

    const user = await db.users.findFirst({
      where: { token: userToken },
    });

    if (!user) {
      throw new Error('Token inválido ou usuário não existe');
    }

    const originalTweet = await db.tweets.findUnique({
      where: { id: tweetId },
    });

    if (!originalTweet) {
      throw new Error('Tweet original não encontrado');
    }

    const reply = await db.replies.create({
      data: {
        userId: user.id,
        tweetId,
        content,
        tweetType: 'Reply',
      },
    });

    return reply;
  }

  public async listReplies(tweetId: string) {
    const tweet = await db.tweets.findUnique({
      where: { id: tweetId },
    });

    if (!tweet) {
      throw new Error('Tweet não encontrado');
    }

    const replies = await db.replies.findMany({
      where: { tweetId },
      include: { user: true },
    });

    return replies;
  }

  public async getReplyById(id: string) {
    return db.replies.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  public async updateReply(id: string, content: string) {
    if (!content) {
      throw new Error('O conteúdo não pode estar vazio.');
    }

    return db.replies.update({
      where: { id },
      data: { content },
    });
  }

  public async deleteReply(id: string) {
    try {
      await db.replies.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default ReplyService;
