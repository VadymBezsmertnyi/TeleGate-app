import PATHS from "../paths.constants";

export const buildAuthUrl = (backendUrl: string): string => {
  const loginUrl = `${backendUrl}${PATHS.api.auth.telegram.login}`;
  return loginUrl;
};
