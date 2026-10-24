const {test}=require('node:test');
const assert=require('node:assert/strict');
const model=require('../assets/design-model.js');
test('匯入極端數值時限制在可操作範圍，忽略未知設定',()=>{
  const result=model.normalize({bodySize:999,pageWidth:-1,gap:Infinity,tracking:-100,unexpected:'value'});
  assert.equal(result.bodySize,22);assert.equal(result.pageWidth,900);assert.equal(result.gap,1);assert.equal(result.tracking,-.02);assert.equal(Object.hasOwn(result,'unexpected'),false);
});
test('拒絕任意 CSS 與非允許字型，維持有效預設',()=>{
  const result=model.normalize({accent:'red; background:url(https://example.invalid)',headingFont:'url(test)',motion:'false'});
  assert.equal(result.accent,model.defaults.accent);assert.equal(result.headingFont,'serif');assert.equal(result.motion,true);
});
test('完整設定可匯出再匯入，所有色票範本都保有可讀對比',()=>{
  const original=model.normalize({...model.presets.paper,headingScale:1.25,bodyFont:'serif',motion:false});
  assert.deepEqual(model.normalize(JSON.parse(JSON.stringify(original))),original);
  for(const preset of Object.values(model.presets)){
    assert.ok(model.contrast(preset.text,preset.background)>=4.5);
    assert.ok(model.contrast(preset.text,preset.surface)>=4.5);
    assert.ok(model.contrast(model.ink(preset.primary),preset.primary)>=4.5);
  }
});
test('匯入數值符合控制項步長，任意按鈕底色都使用足夠對比的文字',()=>{
  const result=model.normalize({bodySize:19.4,pageWidth:1152,gap:1.03});
  assert.equal(result.bodySize,19);assert.equal(result.pageWidth,1152);assert.equal(result.gap,1.05);
  for(const color of ['#777777','#757575','#ffffff','#000000','#2244aa'])assert.ok(model.contrast(model.ink(color),color)>=4.5);
});
