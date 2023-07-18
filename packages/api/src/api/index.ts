/* istanbul ignore file */
import { Router } from 'express';
// import nocache from 'nocache';
import { enforceRateLimiting } from './settings';
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { env } from '../env';
import { health } from './health';
import { slack } from './slack';

export const api = Router();

// General API route config
// api.use(enforceMaxFileSize, customParsingSettings, nocache());
if (env.nodeEnv !== 'development') api.use(enforceRateLimiting);

// UNPROTECTED ROUTES
api.use('/health', health);

// SELF-PROTECTED ROUTES
api.use(slack);

api.use((_req, res) =>
  sendErrorResponse({ res, status: 404, context: { error: 'API route not found' } }),
); // Generic catch all for bad requests
