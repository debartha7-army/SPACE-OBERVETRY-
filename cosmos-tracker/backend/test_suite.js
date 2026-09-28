// Comprehensive Automated API & MVC Verification Test Suite for Cosmos Tracker (/api/v1)
import assert from 'assert';

const BASE_URL = 'http://127.0.0.1:5000';
const API_V1 = `${BASE_URL}/api/v1`;

const runTests = async () => {
  console.log('\n======================================================');
  console.log('🌌 COSMOS TRACKER - AUTOMATED API V1 VERIFICATION SUITE');
  console.log('======================================================\n');

  let testsPassed = 0;
  let testsFailed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      testsPassed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      testsFailed++;
    }
  };

  let userToken = null;
  let adminToken = null;
  let createdEventId = null;
  let createdNovaId = null;

  // 1. Health & NASA endpoints
  await test('GET /health returns 200 and healthy status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
  });

  await test('GET /api/v1/nasa/apod returns NASA Astronomy Picture of the Day', async () => {
    const res = await fetch(`${API_V1}/nasa/apod`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.title);
  });

  await test('GET /api/v1/nasa/sky-of-the-month returns observational targets', async () => {
    const res = await fetch(`${API_V1}/nasa/sky-of-the-month`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.highlightTarget);
    assert.ok(json.data.nakedEyePlanets.length >= 2);
  });

  // 2. Auth & Bcrypt Hashing
  const testEmail = `v1_test_${Date.now()}@universe.org`;
  const testPassword = 'CosmicPassword2026!';

  await test('POST /api/v1/auth/register hashes password with bcrypt and returns JWT', async () => {
    const res = await fetch(`${API_V1}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'V1 Voyager',
        email: testEmail,
        password: testPassword
      })
    });

    assert.strictEqual(res.status, 201);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.user.email, testEmail);
    assert.strictEqual(json.data.user.password_hash, undefined);
    assert.ok(json.data.token);
    userToken = json.data.token;
  });

  await test('POST /api/v1/auth/login logs in user with bcrypt compare', async () => {
    const res = await fetch(`${API_V1}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.token);
  });

  await test('POST /api/v1/auth/login authenticates pre-seeded Administrator', async () => {
    const res = await fetch(`${API_V1}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@cosmostracker.org', password: 'CosmosAdmin2026!' })
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.data.user.role, 'admin');
    adminToken = json.data.token;
  });

  await test('POST /api/v1/auth/login authenticates Debartha Ghosh with Admin role', async () => {
    const res = await fetch(`${API_V1}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'debarthaghosh262@gmail.com', password: 'AnyPassword2026!' })
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.user.name, 'Debartha Ghosh');
    assert.strictEqual(json.data.user.role, 'admin');
    assert.ok(json.data.token);
  });

  await test('POST /api/v1/auth/login seamlessly auto-registers unseeded email', async () => {
    const freshEmail = `explorer_${Date.now()}@milkyway.org`;
    const res = await fetch(`${API_V1}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: freshEmail, password: 'StargazerPass123!' })
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.user.email, freshEmail);
    assert.ok(json.data.token);
  });

  // 3. Celestial Events with Pagination & Reminders
  await test('GET /api/v1/celestial-events returns paginated data', async () => {
    const res = await fetch(`${API_V1}/celestial-events?page=1&limit=3`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data));
    assert.strictEqual(json.data.length, 3);
    assert.strictEqual(json.pagination.page, 1);
    assert.strictEqual(json.pagination.limit, 3);
  });

  await test('Admin POST /api/v1/celestial-events creates event with validation', async () => {
    const res = await fetch(`${API_V1}/celestial-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        title: 'Lunar Occultation of Mars',
        type: 'transit',
        event_date: '2026-11-15',
        visibility_region: 'North America',
        description: 'The Moon passes in front of Mars.'
      })
    });
    assert.strictEqual(res.status, 201);
    const json = await res.json();
    createdEventId = json.data.id;
  });

  await test('User POST /api/v1/celestial-events/reminders/toggle sets in-app reminder', async () => {
    const res = await fetch(`${API_V1}/celestial-events/reminders/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ eventId: createdEventId })
    });
    assert.strictEqual(res.status, 201);
    const json = await res.json();
    assert.strictEqual(json.reminded, true);
  });

  // 4. Novae & Variables table testing
  await test('GET /api/v1/novae-variables returns variable star catalog', async () => {
    const res = await fetch(`${API_V1}/novae-variables`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.length >= 4);
    assert.ok(json.data.some(n => n.name.includes('Coronae')));
  });

  await test('Admin POST /api/v1/novae-variables creates nova entry', async () => {
    const res = await fetch(`${API_V1}/novae-variables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        name: 'Nova Delphini 2013 (V339 Del)',
        kind: 'Classical Nova',
        period: 'Single Outburst',
        last_outburst: '2013-08-14',
        description: 'Reached magnitude 4.3 in constellation Delphinus.'
      })
    });
    assert.strictEqual(res.status, 201);
    const json = await res.json();
    createdNovaId = json.data.id;
  });

  await test('Admin DELETE /api/v1/novae-variables/:id deletes nova entry', async () => {
    const res = await fetch(`${API_V1}/novae-variables/${createdNovaId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
  });

  // 5. Favorites / Watchlist
  await test('POST /api/v1/favorites/toggle adds celestial event to user watchlist', async () => {
    const res = await fetch(`${API_V1}/favorites/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        item_type: 'celestial_events',
        item_id: createdEventId,
        item_title: 'Lunar Occultation of Mars'
      })
    });
    assert.strictEqual(res.status, 201);
    const json = await res.json();
    assert.strictEqual(json.favorited, true);
  });

  await test('GET /api/v1/favorites retrieves watchlist items for user', async () => {
    const res = await fetch(`${API_V1}/favorites`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.data.length, 1);
  });

  // Cleanup created event
  await test('Admin DELETE /api/v1/celestial-events/:id cleans up test event', async () => {
    const res = await fetch(`${API_V1}/celestial-events/${createdEventId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
  });

  // 6. Top Universities Daily Papers & Social Media Dispatches (7 AM Pipeline)
  await test('GET /api/v1/dispatches/status returns active scheduled 7:00 AM pipeline', async () => {
    const res = await fetch(`${API_V1}/dispatches/status`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.status.includes('ACTIVE') || json.data.status.includes('SYNC'), true);
    assert.strictEqual(json.data.scheduleRule, 'Daily at 07:00 AM (0 7 * * *)');
    assert.ok(json.data.paperCount >= 8);
    assert.ok(json.data.socialCount >= 8);
  });

  await test('GET /api/v1/dispatches/papers returns top university research papers', async () => {
    const res = await fetch(`${API_V1}/dispatches/papers?institution=Harvard`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.length >= 1);
    assert.ok(json.data[0].institution.includes('Harvard'));
    assert.ok(json.data[0].pdf_url.endsWith('.pdf'));
  });

  await test('GET /api/v1/dispatches/social returns YouTube, X, Reddit social feeds', async () => {
    const res = await fetch(`${API_V1}/dispatches/social?platform=youtube`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.length >= 1);
    assert.strictEqual(json.data[0].platform, 'youtube');
  });

  await test('POST /api/v1/dispatches/sync executes 7:00 AM automated ingest pipeline', async () => {
    const res = await fetch(`${API_V1}/dispatches/sync`, { method: 'POST' });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.newPaper.title.includes('7:00 AM'));
  });

  console.log('\n======================================================');
  console.log(`📊 TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log('======================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};

runTests();
