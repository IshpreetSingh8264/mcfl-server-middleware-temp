// console.log('SAP_USERNAME:', process.env.SAP_USERNAME);
// console.log('SAP_PASSWORD:', process.env.SAP_PASSWORD ? '***' : undefined);

const CONFIG: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;


export default CONFIG;
