import { Router } from 'express';

export const health = Router();

health.get('', async (req, res) => {
  const db = await req.entityManager.getConnection().isConnected();

  const dependencies: { [id: string]: boolean } = { db };
  const ok = Object.values(dependencies).every((val) => !!val);

  res.status(ok ? 200 : 503).send({
    ok,
    ...Object.assign({}, ...Object.entries(dependencies).map(([key, val]) => ({ [key]: val }))),
  });
});