const {test} = require('node:test');
const assert = require('node:assert/strict');
const {quote} = require('../assets/quote.js');
const base = {minutes:30,speed:'standard',addSrt:true};
test('標準 30 分鐘為 450 元，1 分鐘按低消 150 元計',()=>{
  assert.equal(quote(base).total,450);
  assert.equal(quote({...base,minutes:1}).total,150);
});
test('法律醫療與急件加成相加，30 分鐘為 675 元',()=>{
  assert.equal(quote({...base,legalMedical:true,speed:'rush20'}).total,675);
});
test('空白、負數、小數與超出 600 分鐘不可產生報價',()=>{
  for(const minutes of ['',0,-1,1.5,601,Infinity,'abc']) assert.equal(quote({...base,minutes}).valid,false,String(minutes));
  assert.equal(quote({...base,minutes:600}).total,9000);
});
test('取消 SRT 後，詢價文字與交付格式都不包含 SRT',()=>{
  assert.match(quote(base).message,/Word \/ TXT \/ SRT/);
  assert.doesNotMatch(quote({...base,addSrt:false}).message,/SRT/);
});
test('特殊排版不假裝已計價，清楚標示費用另議',()=>{
  const result=quote({...base,noTimestamp:true});
  assert.equal(result.total,450);
  assert.match(result.message,/費用另議，未含/);
});
