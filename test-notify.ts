import { config } from 'dotenv';
config();
import handler from './api/notify.js';

const req = {
  method: 'POST',
  body: {
    name: 'Jay Money',
    email: 'jarred@adducoenterprises.com',
    phone: '8306662700',
    website: 'adducoenterprises.com',
    revenue: '$250k - $1M / month',
    message: 'Testing locally'
  }
} as any;

const res = {
  status: (code: number) => ({
    json: (data: any) => {
      console.log(`Status: ${code}`);
      console.log(JSON.stringify(data, null, 2));
    }
  })
} as any;

handler(req, res).catch(console.error);
