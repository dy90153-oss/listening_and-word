import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote, enquiryText } from '../assets/quote.mjs';

test('minimum charge and second rounding match the accepted pricing rules', () => {
  assert.equal(calculateQuote({ minutes: 0, seconds: 1 }).total, 150);
  assert.equal(calculateQuote({ minutes: 9, seconds: 59 }).total, 150);
  assert.equal(calculateQuote({ minutes: 10 }).total, 150);
  const q = calculateQuote({ minutes: 10, seconds: 20 });
  assert.equal(q.billableMinutes, 11);
  assert.equal(q.total, 165);
  assert.equal(calculateQuote({ minutes: 30 }).total, 450);
});
test('professional and speed surcharges add, and the final total rounds only once', () => {
  assert.equal(calculateQuote({ minutes: 30, professional: true, speed: 'rush' }).total, 675);
  assert.equal(calculateQuote({ minutes: 30, professional: true, speed: 'sameDay' }).total, 810);
  assert.equal(calculateQuote({ minutes: 30, professional: true, speed: 'express' }).total, 1035);
  const q = calculateQuote({ minutes: 11, professional: true, speed: 'sameDay' });
  assert.equal(q.professionalFee, 49.5);
  assert.equal(q.speedFee, 82.5);
  assert.equal(q.total, 297);
});
test('invalid durations and unsupported speed never return a price', () => {
  for (const args of [{minutes:0}, {minutes:-1}, {minutes:1.5}, {minutes:1,seconds:60}, {minutes:600,seconds:1}, {minutes:Infinity}, {minutes:'abc'}, {minutes:1,speed:'invalid'}]) assert.throws(() => calculateQuote(args), RangeError);
  assert.equal(calculateQuote({minutes:600}).total, 9000);
});
test('enquiry carries the selected terms without inventing a confirmed order', () => {
  const text = enquiryText(calculateQuote({ minutes: 10, seconds: 20, professional: true, speed: 'express' }));
  assert.match(text, /單人華語/);
  assert.match(text, /繁體中文 SRT/);
  assert.match(text, /計費 11 分鐘/);
  assert.match(text, /以試聽後正式報價為準/);
  assert.match(text, /音檔連結：/);
});
