const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {runInNewContext}=require('node:vm');
const runtime=readFileSync('assets/theme-runtime.js','utf8');
test('公開版預設保持原生 CSS 排版，不在載入時量測或改寫尺寸',()=>{
 for(const design of [undefined,{},null]){
  let mounts=0;
  runInNewContext(runtime,{window:{STUDIO_CONFIG:{design},StudioTheme:{mount(){mounts++}},addEventListener(){throw Error('Defaults must not wait for measurement')}},document:{getElementById(){throw Error('Defaults must not touch layout')}}});
  assert.equal(mounts,0);
 }
});
test('已發布的自訂主題等待樣式表 load 後才量測，且只掛載一次',()=>{
 let handler,mounts=0;const element={};const design={pageWidth:1200};
 const doc={readyState:'interactive',getElementById(){return element}};
 const context={window:{STUDIO_CONFIG:{design},StudioTheme:{mount(el,value){assert.equal(el,element);assert.equal(value,design);mounts++}},addEventListener(type,fn,options){assert.equal(type,'load');assert.equal(options.once,true);handler=fn}},document:doc};
 runInNewContext(runtime,context);assert.equal(mounts,0);handler();assert.equal(mounts,1);
});
test('樣式尚未提供 max-width 時不寫入 NaN 或零寬容器',()=>{
 const model=require('../assets/design-model.js');const values={};
 const element={tagName:'DIV',type:'',childNodes:[],dataset:{},style:{setProperty(key,value){values[key]=String(value)}},classList:{contains(name){return name==='max-w-6xl'},[Symbol.iterator]:function*(){yield 'max-w-6xl'}},matches(query){return query.includes('.max-w-6xl')},closest(){return null}};
 const preview={dataset:{},removeAttribute(){},querySelectorAll(){return [element]}};
 const doc={documentElement:{dataset:{},style:{setProperty(){}}},dispatchEvent(){}};
 const context={window:{StudioDesign:model,addEventListener(){}},document:doc,CustomEvent:function(){},getComputedStyle(){return {maxWidth:'none',display:'block',fontSize:'16px',lineHeight:'normal',letterSpacing:'normal'}}};
 runInNewContext(readFileSync('assets/theme-engine.js','utf8'),context);
 context.window.StudioTheme.mount(preview,{pageWidth:1152});
 assert.equal(values['--original-width-ratio'],'1');
 assert.ok(Object.values(values).every(value=>!value.includes('NaN')));
});
