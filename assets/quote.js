(function (root) {
  'use strict';
  const defaults = {ratePerMinute:15,minimumCharge:150,minMinutes:1,maxMinutes:600,domainRate:0.3,
    speedRates:{standard:0,rush20:0.2,sameDay50:0.5,superRush100:1}};
  const speeds = {standard:'一般標準件（基本 3–5 工作天，實際交期依各案確認）',rush20:'急件（約 2~3 天工作日，加收 20%）',sameDay50:'當日件（約 8 小時，加收 50%）',superRush100:'特急件（約 5 小時，加收 100%）'};
  function quote(input, config = defaults) {
    const minutes = Number(input.minutes);
    if (String(input.minutes).trim() === '' || !Number.isInteger(minutes) || minutes < config.minMinutes || minutes > config.maxMinutes) {
      return {valid:false,error:`請輸入 ${config.minMinutes}–${config.maxMinutes} 之間的整數分鐘。`};
    }
    const speed = Object.hasOwn(speeds,input.speed) ? input.speed : 'standard';
    const raw = minutes * config.ratePerMinute;
    const base = Math.max(raw,config.minimumCharge);
    const domainRate = input.legalMedical ? config.domainRate : 0;
    const speedRate = config.speedRates[speed];
    const total = Math.round(base * (1 + domainRate + speedRate));
    const formats = `Word / TXT${input.addSrt ? ' / SRT' : ''}`;
    const parts = [raw < config.minimumCharge ? `未滿低消以 NT$ ${config.minimumCharge} 計` : `${minutes} 分鐘 × NT$ ${config.ratePerMinute} / 分`];
    if (domainRate) parts.push('法律醫療專業術語 +30%');
    if (speedRate) parts.push(speeds[speed]);
    parts.push(`交付 ${formats}`);
    if (input.noTimestamp) parts.push('無時間軸排版另議，未計入試算');
    return {valid:true,minutes,total,speed,formats,note:parts.join('；'),
      message:`您好，音律工作室！我想詢問音檔轉譯服務：\n・音檔長度：約 ${minutes} 分鐘\n・專業領域：${input.legalMedical ? '法律／醫療（加收 30%）' : '一般領域'}\n・交付時效：${speeds[speed]}\n・交付格式：${formats}\n・無時間軸排版：${input.noTimestamp ? '需要（費用另議，未含於以下金額）' : '不需要'}\n・預估費用：NT$ ${total.toLocaleString('zh-TW')}\n想進一步提供檔案請您評估與排程，謝謝！`};
  }
  const api = {quote,defaults};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudioQuote = api;
})(typeof window === 'undefined' ? globalThis : window);
