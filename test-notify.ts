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
    revenue: '$1M+ / month',
    message: 'Need CRO work done to full funnel experience.'
  }
};

const res = {
  status: (code: number) => ({
    json: (data: any) => console.log('Response:', code, data)
  })
};

handler(req as any, res as any).catch(console.error);
