// Helper to build axios config with optional signal and auth token
const buildConfig = (signal, token) => {
  const cfg = {};
  if (signal) cfg.signal = signal;
  if (token) cfg.headers = { Authorization: `Bearer ${token}` };
  return cfg;
};
export default buildConfig;
