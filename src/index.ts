import { Hono } from 'hono'
import cron from "node-cron";


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono from dummy backend!')
})


// Create cron job to ping root route every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  try {
    const response = await fetch(`${process.env["CRON_URL"]}/`);
    const text = await response.text();
    console.log("Cron job ping successful:", text);
  } catch (error) {
    console.error("Error in cron job ping:", error);
  }
});

export default app
