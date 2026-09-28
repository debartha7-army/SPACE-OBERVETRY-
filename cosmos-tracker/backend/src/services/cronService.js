import cron from 'node-cron';
import { dispatchModel } from '../models/dispatchModel.js';

export function initCronScheduler() {
  console.log('⏰ [Cosmos Cron Service] Initializing Daily 7:00 AM Observatory Pipeline Scheduler...');

  // Schedule task to run every day at 07:00:00 AM (0 7 * * *)
  const dailyTask = cron.schedule('0 7 * * *', async () => {
    const runTime = new Date().toISOString();
    console.log(`📡 [Cosmos Cron Service] 07:00 AM Triggered! Executing Daily Ingest for Academic Papers & Social Media (${runTime})`);
    try {
      const result = await dispatchModel.performDaily7AMSync();
      console.log(`✅ [Cosmos Cron Service] 07:00 AM Sync completed successfully: ${result.totalPapers} research papers, ${result.totalSocial} social feeds updated.`);
    } catch (err) {
      console.error('❌ [Cosmos Cron Service] Error executing 7:00 AM sync:', err);
    }
  }, {
    scheduled: true,
    timezone: 'UTC' // Standardized UTC / Local
  });

  console.log('🛰️ [Cosmos Cron Service] Daily 7:00 AM cron job registered successfully (Rule: "0 7 * * *").');
  return dailyTask;
}
