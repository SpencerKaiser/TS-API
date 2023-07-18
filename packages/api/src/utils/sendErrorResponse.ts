import { ApiError } from '@PACKAGE/shared';
import { Response } from 'express';

type ReturnErrorResponseProps = ApiError & {
  res: Response;
  status: number;
  context?: any[] | Record<string, any>;
  headers?: Record<string, string>;
};

export const sendErrorResponse = ({
  status,
  res,
  message,
  context,
  headers,
}: ReturnErrorResponseProps) => {
  if (message || context) {
    res
      .status(status)
      .set(headers ?? {})
      .send({ message, context });
    return;
  }

  res.sendStatus(status);
};
