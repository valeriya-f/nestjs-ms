export default () => ({
  api_gateway: {
    jwt_secret: process.env.JWT_SECRET,
    port: parseInt(process.env.API_GATEWAY_PORT, 10) || 3000,
  },
});