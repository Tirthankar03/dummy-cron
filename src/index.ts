import { Hono } from 'hono'
import cron from "node-cron";


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


// Create cron job to ping root route every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  try {
    await fetch(`${process.env["PROD_URL"]}/`);
    console.log("Cron job ping successful");
  } catch (error) {
    console.error("Error in cron job ping:", error);
  }
});

export default app
