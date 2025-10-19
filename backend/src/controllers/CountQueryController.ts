import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { HourlyCount } from '../models/HourlyCount';

export const getCounts = async (req: Request, res: Response) => {
  const { account_id, from, to } = req.query as { account_id?: string, from?: string, to?: string };

  if (!account_id || !from || !to) {
    return res.status(400).send({ 
      error: 'Parámetros faltantes. Requiere: account_id, from (ISO8601), to (ISO8601).' 
    });
  }

  try {
    const counts = await HourlyCount.findAll({
      where: {
        account_id: account_id,
        rounded_hour: {
          [Op.gte]: new Date(from),
          [Op.lt]: new Date(to),
        },
      },
      attributes: [
        'account_id',
        [
          'rounded_hour', 
          'datetime'
        ],
        [
          'message_count', 
          'count_messages'
        ] 
      ],
      order: [['rounded_hour', 'ASC']],
      raw: true,
    });

    return res.json(counts);

  } catch (error) {
    console.error("[Query] Error fetching counts:", error);
    return res.status(500).send({ error: "Internal server error during query." });
  }
};