// GANSU2 User Portal — public configuration.
// User Pool / App Client ID は公開値（秘密ではない）。
//
// このファイルは GitHub Pages から配る版。SPA と API のオリジンが分かれるため、
// API_BASE に API Gateway のステージ URL を明示する（同一オリジンで Lambda が
// 配っていた版はブラウザ側で window.location から導いていた）。
// API 側の CORS の AllowOrigins に https://gansu2.github.io を入れること。
window.GANSU_PORTAL_CONFIG = {
  REGION: "ap-northeast-1",
  USER_POOL_ID: "ap-northeast-1_L5vKF9DDK",
  APP_CLIENT_ID: "604qu1da8v96uvis6qd6du9ji",
  API_BASE: "https://ixjzcpv6ic.execute-api.ap-northeast-1.amazonaws.com/prod",
};
