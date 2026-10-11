/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CI browser suite. */
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { setTimeout: delay } = require('node:timers/promises');
const base = process.env.BASE_URL || 'http://127.0.0.1:3112';

function run(script, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [`tests/${script}.cjs`], {
      stdio: 'inherit', env: { ...process.env, BASE_URL: base, ...extraEnv },
    });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(Error(`${script} exited ${code}`)));
  });
}

(async () => {
  let server;
  try {
    if (!process.env.BASE_URL) {
      server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--port', '3112'], { stdio: 'inherit' });
      let ready = false;
      for (let attempt = 0; attempt < 100; attempt++) {
        try { if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) { ready = true; break; } } catch { /* Starting. */ }
        await delay(100);
      }
      assert.ok(ready, 'Production server failed to start');
    }
    for (const script of ['landing-audit', 'mobile-loading-audit', 'services-audit', 'insights-audit', 'cashflow-preview-audit', 'proof-audit', 'performance-audit']) await run(script);
    for (const engine of (process.env.BROWSER_ENGINES || 'chromium').split(',')) {
      await run('usability-audit', { BROWSER_ENGINE: engine });
      await run('accessibility-audit', { BROWSER_ENGINE: engine });
    }
  } finally { server?.kill('SIGTERM'); }
})().catch(error => { console.error(error); process.exitCode = 1; });
