// src/auth/authConfig.ts
import { UserManagerSettings } from 'oidc-client-ts';

export const authConfig: UserManagerSettings = {
    authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_H1UTyevos",
  client_id: "7h090vcf4jphvnjupcm6mqtei9",
  redirect_uri: "http://localhost:5173/callback",
  post_logout_redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "openid email phone",
  metadata: {
    issuer: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_H1UTyevos",
    authorization_endpoint: "https://eu-west-3h1utyevos.auth.eu-west-3.amazoncognito.com/oauth2/authorize",
    token_endpoint: "https://eu-west-3h1utyevos.auth.eu-west-3.amazoncognito.com/oauth2/token",
    userinfo_endpoint: "https://eu-west-3h1utyevos.auth.eu-west-3.amazoncognito.com/oauth2/userInfo",
    end_session_endpoint: "https://eu-west-3h1utyevos.auth.eu-west-3.amazoncognito.com/logout",
    jwks_uri: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_H1UTyevos/.well-known/jwks.json"
  }
};