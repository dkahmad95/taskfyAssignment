import allowedOrigins from './allowedOrigins';

type OriginCallback = (
  origin: string | undefined,
  callback: (error: Error | null, success: boolean) => void,
) => void;

interface CorsOptions {
  origin: OriginCallback;
  credentials: boolean;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
