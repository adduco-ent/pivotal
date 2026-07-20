import { config } from 'dotenv';
config();
import { sendEmail } from './api/lib/googleApi.js';

async function test() {
  try {
    console.log("Testing with jarred@...");
    await sendEmail('jarred@pivotaltimes.io', 'jarred@adducoenterprises.com', 'Test from Jarred', 'Works!');
    console.log("Success with jarred@!");
  } catch (e: any) {
    console.error("Jarred Failed:", e.message);
  }

  try {
    console.log("Testing with hello@...");
    await sendEmail('hello@pivotaltimes.io', 'jarred@adducoenterprises.com', 'Test from Hello', 'Works!');
    console.log("Success with hello@!");
  } catch (e: any) {
    console.error("Hello Failed:", e.message);
  }
}

test();
