export const PRICING = Object.freeze({
  rate: 15,
  minimum: 150,
  professional: 0.3,
  speeds: Object.freeze({ standard: 0, rush: 0.2, sameDay: 0.5, express: 1 }),
  labels: Object.freeze({ standard: '一般件（預估 3–5 工作天）', rush: '急件（預估 2–3 工作天）', sameDay: '當日件（預估約 8 小時）', express: '特急件（預估約 5 小時）' })
});

export function calculateQuote({ minutes, seconds = 0, professional = false, speed = 'standard' }) {
  const min = Number(minutes);
  const sec = Number(seconds);
  if (!Number.isInteger(min) || !Number.isInteger(sec) || min < 0 || sec < 0 || sec > 59 || min > 600 || min * 60 + sec <= 0 || min * 60 + sec > 36000) {
    throw new RangeError('請填入 1 秒至 600 分鐘的音檔長度，秒數須介於 0–59。超過 600 分鐘請直接 LINE 詢價。');
  }
  if (!Object.hasOwn(PRICING.speeds, speed)) throw new RangeError('請選擇交件時效。');
  const billableMinutes = Math.ceil((min * 60 + sec) / 60);
  const base = Math.max(billableMinutes * PRICING.rate, PRICING.minimum);
  const professionalFee = professional ? base * PRICING.professional : 0;
  const speedFee = base * PRICING.speeds[speed];
  const total = Math.round(base * (1 + (professional ? PRICING.professional : 0) + PRICING.speeds[speed]));
  return { billableMinutes, base, professionalFee, speedFee, total, speed, professional, minutes: min, seconds: sec };
}

export function enquiryText(quote) {
  return `您好，我想委託單人華語音檔轉繁體中文 SRT。\n音檔長度：${quote.minutes} 分 ${quote.seconds} 秒（計費 ${quote.billableMinutes} 分鐘）\n內容：${quote.professional ? '法律／醫療專業內容' : '一般內容'}\n希望時效：${PRICING.labels[quote.speed]}\n網站預估費用：NT$${quote.total.toLocaleString('zh-TW')}（以試聽後正式報價為準）\n音檔連結：\n希望交件日期：\n用途／專有名詞參考：`;
}
