import config from 'config';
import JWT from 'jsonwebtoken';

export const signJwt = (
  payload: JWT.JwtPayload,
  keyName: 'accessTokenPrivateKey',
  options?: JWT.SignOptions
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');

  return JWT.sign(payload, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
    issuer: 'stashlist.com',
    audience: 'stashlist.com',
    expiresIn: '4h',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey'
): T | null => {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii'
  );
  try {
    const decoded = JWT.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: 'stashlist.com',
      audience: 'stashlist.com',
    });
    return decoded as T;
  } catch (error) {
    return null;
  }
};
