import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('Elara captions have ordered, readable cues within the 23-second clip', () => {
  const vtt = readFileSync(new URL('../public/media/elara-captions.en.vtt', import.meta.url), 'utf8');
  assert.ok(vtt.startsWith('WEBVTT\n\n'));
  const cues = vtt.trim().split('\n\n').slice(1);
  assert.equal(cues.length, 7);
  let previousEnd = 0;
  const seconds = timestamp => {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    return minutes * 60 + seconds;
  };
  for (const cue of cues) {
    const [timing, ...lines] = cue.split('\n');
    assert.match(timing, /^\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}\.\d{3}$/);
    const [start, end] = timing.split(' --> ').map(seconds);
    assert.ok(start >= previousEnd && end > start && end <= 23);
    assert.ok(lines.length > 0 && lines.length <= 2);
    for (const line of lines) assert.ok(line.length <= 42 && line.length > 0);
    assert.ok(lines.join('').length / (end - start) <= 20, 'Caption reading speed');
    previousEnd = end;
  }
  assert.match(vtt, /Meet Elara, your AI executive office\./);
});
