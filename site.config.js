// 上線前在這裡填入正式聯絡方式；不要在此放密碼或 API 金鑰。
window.STUDIO_CONFIG = Object.freeze({
  brand: '音律工作室',
  siteUrl: 'https://listeningand-word.vercel.app',
  lineUrl: 'https://lin.ee/9kHonjI',
  lineId: '@818jzowe',
  design: {}, // 可將設計面板匯出的 settings 物件貼到此處，作為網站預設。
  pricing: { ratePerMinute: 15, minimumCharge: 150, minMinutes: 1, maxMinutes: 600,
    domainRate: 0.30, speedRates: { standard: 0, rush20: 0.20, sameDay50: 0.50, superRush100: 1 } }
});
