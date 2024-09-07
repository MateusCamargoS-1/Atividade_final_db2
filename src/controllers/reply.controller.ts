import { Request, Response } from 'express';
import ReplyService from '../services/reply.service';

const replyService = new ReplyService();

class ReplyController {
  public async addReply(req: Request, res: Response) {
    try {
      const userToken = req.headers.authorization;

      const { tweetId, content } = req.body;

      if (!userToken) {
        return res.status(401).json({ success: false, msg: 'Token é necessário' });
      }

      const replyData = { userToken, tweetId, content };
      const reply = await replyService.addReply(replyData);

      return res.status(201).json({
        success: true,
        msg: 'Resposta adicionada com sucesso',
        data: reply,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'Error Database' });
    }
  }

  public async listReplies(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      const replies = await replyService.listReplies(tweetId);

      return res.status(200).json({
        success: true,
        msg: 'Lista de respostas',
        data: replies,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'Error Database' });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const reply = await replyService.getReplyById(id);

      if (reply) {
        return res.status(200).json({
          success: true,
          msg: 'Resposta encontrada',
          data: reply,
        });
      }

      return res.status(404).json({
        success: false,
        msg: 'Resposta não encontrada',
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'Error Database' });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const reply = await replyService.updateReply(id, content);

      if (reply) {
        return res.status(200).json({
          success: true,
          msg: 'Resposta atualizada com sucesso',
          data: reply,
        });
      }

      return res.status(404).json({
        success: false,
        msg: 'Resposta não encontrada',
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'Error Database' });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const success = await replyService.deleteReply(id);

      if (success) {
        return res.status(200).json({
          success: true,
          msg: 'Resposta deletada com sucesso',
        });
      }

      return res.status(404).json({
        success: false,
        msg: 'Resposta não encontrada',
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'Error Database' });
    }
  }
}

export default ReplyController;
