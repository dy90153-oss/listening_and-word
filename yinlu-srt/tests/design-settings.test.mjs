import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS,normalize,parseSettings,serialize,contrast,onColor} from '../assets/design-settings.mjs';
test('design settings survive export/import without changing defaults',()=>{
 const settings={...DEFAULTS,accent:'#18594f',heroScale:1.15,depth:false,displayFont:'serif'};
 assert.deepEqual(parseSettings(serialize(settings)),settings);
 assert.deepEqual(normalize({}),DEFAULTS);
});
test('import only accepts known typed controls and bounds extreme numeric values',()=>{
 const settings=normalize(JSON.parse('{"heroScale":100,"gap":-9,"accent":"url(javascript:bad)","bodyFont":"<style>","motion":"false","__proto__":{"polluted":true}}'));
 assert.equal(settings.heroScale,1.3);assert.equal(settings.gap,.7);
 assert.equal(settings.accent,DEFAULTS.accent);assert.equal(settings.bodyFont,'sans');
 assert.equal(settings.motion,true);assert.equal({}.polluted,undefined);
 assert.equal(normalize({speed:NaN}).speed,1);
});
test('malformed and incompatible settings are rejected',()=>{
 for(const value of ['no json','null','{"version":2,"settings":{}}','{"version":1,"settings":[]}', 'x'.repeat(20001)])assert.throws(()=>parseSettings(value));
});
test('contrast uses relative luminance and selects readable button text',()=>{
 assert.equal(contrast('#000000','#ffffff'),21);
 assert.equal(contrast('#ffffff','#ffffff'),1);
 assert.equal(onColor('#124d76'),'#ffffff');assert.equal(onColor('#ffffff'),'#102333');
});
