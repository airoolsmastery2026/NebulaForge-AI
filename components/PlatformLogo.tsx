import React from 'react';

const defaultProps = {
    className: 'w-10 h-10',
};

const GeminiLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Gemini Logo</title>
        <path d="M6.91996 9.17999L12 2L17.08 9.17999L12 14.82L6.91996 9.17999Z" fill="#2563EB" />
        <path d="M12 14.82L17.08 21.9999L12 17.64L6.91996 21.9999L12 14.82Z" fill="#3B82F6" />
    </svg>
);

const YouTubeLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>YouTube Logo</title>
        <path d="M27.427 3.09C27.102 1.87 26.133 0.903 24.912 0.575C22.722 0 14 0 14 0C14 0 5.278 0 3.088 0.575C1.87 0.903 0.899 1.87 0.574 3.09C0 5.28 0 10 0 10C0 10 0 14.72 0.574 16.91C0.899 18.13 1.87 19.097 3.088 19.425C5.278 20 14 20 14 20C14 20 22.722 20 24.912 19.425C26.133 19.097 27.102 18.13 27.427 16.91C28 14.72 28 10 28 10C28 10 28 5.28 27.427 3.09Z" fill="#FF0000"/>
        <path d="M11.199 14.286V5.714L18.4 10L11.199 14.286Z" fill="white"/>
    </svg>
);

const TikTokLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>TikTok Logo</title>
        <path d="M12.525 0.024H8.082V13.29H12.525C12.525 11.012 14.542 9.012 16.842 9.012V4.545C14.542 4.545 12.525 2.304 12.525 0.024Z" fill="#25F4EE"/>
        <path d="M12.525 0.024H8.082V13.29H12.525C12.525 11.012 14.542 9.012 16.842 9.012V4.545C14.542 4.545 12.525 2.304 12.525 0.024Z" fill="#FE2C55" transform="translate(4 4)"/>
        <path d="M16.842 9.012V13.488C14.542 13.488 12.525 15.512 12.525 17.766H16.968C16.968 15.512 18.985 13.488 21.285 13.488V9.012H16.842Z" fill="#000000"/>
    </svg>
);

const FacebookLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Facebook Logo</title>
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
);

const ClickBankLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>ClickBank Logo</title>
        <rect width="24" height="24" rx="4" fill="#333"/>
        <path d="M8 8v8h8V8H8zm6 6H10v-4h4v4z" fill="white"/>
        <path d="M6 10h1v4H6zm11 0h1v4h-1z" fill="white"/>
    </svg>
);

const AmazonSellerCentralLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Amazon Seller Central Logo</title>
        <path d="M50.48 16.5c-2.45 0-4.03-1.4-4.03-3.61 0-2.34 1.76-3.6 4.03-3.6 2.38 0 3.9 1.2 3.9 3.51 0 2.25-1.58 3.7-3.9 3.7zm0-5.7c-1.35 0-2.2.82-2.2 2.1 0 1.28.85 2.1 2.2 2.1 1.34 0 2.16-.85 2.16-2.12 0-1.25-.82-2.08-2.16-2.08zM57.48 10.82c1.37 0 2.2.85 2.2 2.15 0 1.28-.83 2.1-2.2 2.1s-2.16-.82-2.16-2.1c0-1.3.79-2.15 2.16-2.15zM60.6 19.34c3.48-1.5 5.2-4.4 5.2-7.83 0-4.96-3.46-8.32-8.3-8.32-4.92 0-8.35 3.4-8.35 8.35 0 3.43 1.7 6.3 5.14 7.8l-.34.3a.85.85 0 000 1.2l.4.4c.34.33.87.33 1.2 0l.33-.33z" fill="#FF9900"/>
        <path d="M22.9 20.3a9.3 9.3 0 01-7.8-4.8 1 1 0 011.7-1 7.4 7.4 0 0012.3 0 1 1 0 011.8 1 9.3 9.3 0 01-7.9 4.8h-.1z" fill="#000"/>
    </svg>
);

const ShopeeLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#EE4D2D" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Shopee Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5-7c-1.66 0-3 1.34-3 3h6c0-1.66-1.34-3-3-3z"/>
    </svg>
);

const TelegramLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Telegram Logo</title>
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" fill="#2AABEE"/>
        <path d="m9.4 16.4 6.1-5.8-9-3.7 12-4.4-3.1 11.5-2.6-2.9-3.4 3.3z" fill="#fff"/>
    </svg>
);

const LazadaLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Lazada Logo</title>
        <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" fill="#F36F21"/>
        <path d="M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FFFFFF"/>
    </svg>
);

const TikiLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#1A94FF" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Tiki Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V9.5c0-.83.67-1.5 1.5-1.5h0c.83 0 1.5.67 1.5 1.5V12h-2zm4 4h-2v-2h2v2z"/>
    </svg>
);

const ZaloLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#0068FF" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Zalo Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0068FF"/>
        <path d="m8.5 10.5 3-3 3 3h-6zm3 6-3-3h6l-3 3z" fill="#fff"/>
    </svg>
);

const MomoLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#D82D8B" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Momo Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        <path d="M12 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#fff"/>
    </svg>
);

const VNPayLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>VNPay Logo</title>
        <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" fill="#005BAA"/>
        <path d="M12 6l-6 6 6 6 6-6-6-6zm0 2.828L14.828 12 12 14.828 9.172 12 12 8.828z" fill="#FFFFFF"/>
    </svg>
);

const InstagramLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Instagram Logo</title>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#fff"/>
      <circle cx="16.5" cy="7.5" r="1.25" fill="#fff"/>
    </svg>
);

const XLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X Logo</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const PinterestLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#E60023" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Pinterest Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.29 2.8 7.91 6.64 9.34.05-.22.07-.58.02-1.02-.2-.88-.42-1.78-.42-1.78s-.1-.4-.1-.98c0-.92.54-1.61 1.2-1.61.57 0 .84.42.84.92 0 .56-.36 1.4-.54 2.18-.15.68.34 1.24.98 1.24 1.18 0 2.08-1.26 2.08-3.08 0-1.6-.96-2.78-2.22-2.78-1.5 0-2.36 1.12-2.36 2.48 0 .44.15.94.34 1.24l.1.18c.04.1.05.2.02.3-.04.12-.12.5-.16.64-.04.16-.08.2-.18.12-.6-.3-1-1.2-1-2.2 0-1.8.14-3.32 2.62-3.32 2.4 0 4.1 1.76 4.1 3.82 0 2.4-1.5 4.22-3.56 4.22-.7 0-1.36-.36-1.58-.78l-.34-1.36c-.2-.78-.62-1.54-.9-2.04-.3-.52-.16-1 .18-1.42 1.26-1.5 1.54-2.4 1.54-3.58 0-2.02-1.12-3.44-3.2-3.44-2.44 0-4.1 1.8-4.1 3.96z"/>
    </svg>
);

const ShareASaleLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>ShareASale Logo</title>
        <rect width="24" height="24" rx="4" fill="#0072bc"/>
        <path d="M12 6l-6 6 6 6 6-6-6-6zm0 2.83L14.17 12 12 14.17 9.83 12 12 8.83z" fill="white"/>
    </svg>
);

const ACCESSTRADELogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#ff5a00" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>ACCESSTRADE Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.5.58-.8 1-.5l5 3.08c.42.26.42.84 0 1.1l-5 3.08c-.42.28-1-.02-1-.5z"/>
    </svg>
);

const Digistore24Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#0055A4" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Digistore24 Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5V7.5L16.5 12 10 14.5z"/>
    </svg>
);

const JVZooLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>JVZoo Logo</title>
        <rect width="24" height="24" rx="4" fill="#4CAF50"/>
        <path d="M8 8v8l4-4-4-4zm8 0l-4 4 4 4V8z" fill="white"/>
    </svg>
);

const WarriorPlusLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#D32F2F" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>WarriorPlus Logo</title>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
    </svg>
);

const RakutenLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#BF0000" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Rakuten Logo</title>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.3 0 2.5-.41 3.48-1.11L17.59 18l1.41-1.41-2.12-2.12c.7-1 .11-2.48-1.11-3.48S13.3 8.19 12 8.19zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
    </svg>
);

const SEMrushLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>SEMrush Logo</title>
      <circle cx="12" cy="12" r="12" fill="#FF6500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.183 17.5a5.317 5.317 0 100-10.634 5.317 5.317 0 000 10.634zm0-1.63a3.688 3.688 0 100-7.375 3.688 3.688 0 000 7.375z" fill="#fff"/>
      <path d="M18.8 17.5a5.3 5.3 0 00-4.6-5.3h-.03v1.63h.03a3.69 3.69 0 013.67 3.67v.03a3.69 3.69 0 01-3.67 3.67h-6.6a3.69 3.69 0 01-3.6-3.67v-.03a3.69 3.69 0 013.6-3.67h.03V10.57h-.03a5.31 5.31 0 00-5.27 5.27v.03a5.31 5.31 0 005.27 5.27h6.6a5.31 5.31 0 005.3-5.27v-.03z" fill="#fff"/>
    </svg>
);

const HubSpotLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#FF7A59" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>HubSpot Logo</title>
      <path d="M21.5 10.6a1.1 1.1 0 00-1-1.1H16L12.7 3a1.2 1.2 0 00-2.2 0L7.2 9.5H2.6a1.1 1.1 0 00-1 1.1 1.3 1.3 0 00.3 1L5.2 15 3 18.2a1.2 1.2 0 001 2h4.5l3.4 6.5a1.2 1.2 0 002.2 0L17.6 20h4.5a1.2 1.2 0 001-2L20.8 15l3-3.2a1.3 1.3 0 00.2-.9v-.3z" />
    </svg>
);

const CloudwaysLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Cloudways Logo</title>
      <path d="M19.9 12.6c.1-2.4-1.6-4.5-4-4.8 0-1.2-.5-2.3-1.4-3.2-1-.9-2.2-1.4-3.5-1.4-1.3 0-2.5.5-3.5 1.4-.9.9-1.4 2-1.4 3.2-.2 0-.3.1-.5.1-2.4.1-4.3 2-4.3 4.4 0 2.2 1.7 4.1 3.9 4.4h14.3c2.3-.3 4.1-2.3 4.1-4.6 0-2.4-1.8-4.4-4.1-4.6zm-15.5.9c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c.4 0 .7.1 1 .2l.7.3.2-.7c.3-1.2 1.4-2 2.6-2 .7 0 1.4.3 1.9.8.5.5.8 1.2.8 1.9v.5l.3.1c1.4.2 2.5 1.5 2.5 3s-1.1 2.8-2.5 3H4.4z" fill="#2C3A8B" />
    </svg>
);

const CJLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>CJ Affiliate Logo</title>
      <path d="M11.9 2.1C6.4 2.1 2 6.5 2 12s4.4 9.9 9.9 9.9 9.9-4.4 9.9-9.9S17.4 2.1 11.9 2.1zm2.3 11.8c-.5.4-1.1.6-1.7.6-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8c.6 0 1.2.2 1.7.6L15.3 8c-.7-.6-1.6-1-2.6-1-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4c1 0 1.9-.4 2.6-1l-1.1-1.1z" fill="#00AEEF"/>
      <path d="M22 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#00AEEF" />
    </svg>
);

const GitHubLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>GitHub Logo</title>
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z"/>
    </svg>
);

const DiscordLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#5865F2" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Discord Logo</title>
        <path d="M20.317 4.432a18.06 18.06 0 0 0-4.666-1.474 1.44 1.44 0 0 0-1.145.399 15.61 15.61 0 0 0-4.982 0 1.44 1.44 0 0 0-1.145-.4c-1.631.43-3.213.9-4.666 1.473a1.44 1.44 0 0 0-.965 1.353c-.32 3.843.34 7.55 1.652 10.916a1.44 1.44 0 0 0 1.259.998h.048a1.44 1.44 0 0 0 1.353-.951c.602-1.455 1.13-2.88 1.573-4.275a.72.72 0 0 1 .68-.493h3.582a.72.72 0 0 1 .68.493c.443 1.396.97 2.82 1.573 4.275a1.44 1.44 0 0 0 1.353.951h.048a1.44 1.44 0 0 0 1.26-.998c1.31-3.365 1.973-7.073 1.652-10.916a1.44 1.44 0 0 0-.965-1.353ZM8.44 13.22c-.93 0-1.68-.788-1.68-1.758s.75-1.758 1.68-1.758c.93 0 1.68.788 1.68 1.758s-.75 1.758-1.68 1.758Zm7.12 0c-.93 0-1.68-.788-1.68-1.758s.75-1.758 1.68-1.758c.93 0 1.68.788 1.68 1.758s-.75 1.758-1.68 1.758Z"/>
    </svg>
);

const SpotifyLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Spotify Logo</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.14 14.1c-.2.3-.6.4-.9.2-2.3-1.4-5.2-1.7-8.7-.9-.3 0-.6-.2-.6-.5s.2-.6.5-.6c3.8-.8 7- .5 9.6 1.1.3.2.4.6.2.9zm.8-2.3c-.2.4-.7.5-1.1.3-2.6-1.6-6.5-2.1-9.6-1.2-.4 0-.7-.3-.7-.7s.3-.7.7-.7c3.5-1 7.8-.5 10.7 1.3.4.2.5.7.3 1.1zm.1-2.4C18.2 9.5 13.6 9.3 8.8 10.5c-.5.1-.9-.2-.9-.7s.2-.9.7-.9c5.2-1.3 10.3-1.1 13.1.8.4.3.6.8.3 1.2-.3.4-.8.6-1.2.3z"/>
    </svg>
);

const LinkedInLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>LinkedIn Logo</title>
        <path d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 19H5V8h3v11zM6.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM19 19h-3v-5.5c0-1.3-.02-3-1.82-3-1.83 0-2.12 1.42-2.12 2.9V19h-3V8h3v1.38h.04c.42-.8 1.45-1.63 2.88-1.63 3.08 0 3.65 2.03 3.65 4.67V19z"/>
    </svg>
);

const MicrosoftAzureLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Microsoft Azure Logo</title>
        <path d="m17.5 7.07-5.57 5.56 3.9 3.9c.75.75 1.32 1.22 2.37.52l1.53-1.02c1.06-.7 1.06-1.84 0-2.54l-2.23-2.23zm-11.43.01L12.5 13.5l-4.22 4.23c-.75.75-1.32 1.22-2.37.52l-1.53-1.03c-1.06-.7-1.06-1.84 0-2.54l5.69-5.68zM5.53 7.5l4.24-4.24c.75-.75 1.32-1.22 2.37-.52l1.53 1.03c1.06.7 1.06 1.84 0 2.54L7.5 12.5 5.53 7.5z"/>
    </svg>
);

const CryptoComLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Crypto.com Logo</title>
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.618L18.364 8 12 11.382 5.636 8 12 4.618zM4 8.5v7l8 4.5v-7L4 8.5zm16 7v-7l-8 4.5v7l8-4.5z" fill="#002D72"/>
    </svg>
);
const BinanceLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="#F0B90B" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Binance Logo</title>
        <path d="M16.624 11.998L12 7.373 7.376 12l4.624 4.625 4.624-4.625zM12 0l-4.625 4.625L12 9.25l4.625-4.625L12 0zm0 14.748l-4.625 4.625L12 24l4.625-4.627-4.625-4.625zM4.625 7.373L0 12l4.625 4.625L9.25 12 4.625 7.373zm14.75 0L14.75 12l4.625 4.625L24 12l-4.625-4.627z"/>
    </svg>
);
const BybitLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Bybit Logo</title>
        <circle cx="12" cy="12" r="12" fill="#FFD700"/>
        <path d="M9 7h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H9V7zm2 2v4h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z" fill="#000"/>
    </svg>
);
const Host123Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>123HOST Logo</title>
        <rect width="24" height="24" rx="4" fill="#007BFF"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">123HOST</text>
    </svg>
);

const GoogleDriveLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google Drive Logo</title>
        <path d="M16.32 10.36L8.43 10.36L4.5 17.21L8.4 24L16.29 24L20.22 17.21L16.32 10.36Z" fill="#FFC107"/>
        <path d="M5.87 0L0 10.36L4.5 17.21L10.37 6.85L5.87 0Z" fill="#2196F3"/>
        <path d="M13.71 0L24 0L19.5 6.85L13.71 0Z" fill="#4CAF50"/>
    </svg>
);

const SupabaseLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Supabase Logo</title>
        <path d="M32.001 0C32.001 0 54.401 1.6 64.001 16L32.001 64C32.001 64 0 49.6 0 32C0 14.3269 14.3279 0 32.001 0Z" fill="#3ECF8E"/>
        <path d="M32.0006 10.6667C32.0006 10.6667 46.934 11.7333 53.334 22.4L32.0006 53.3333C32.0006 53.3333 10.6673 42.1333 10.6673 32C10.6673 21.3113 21.312 10.6667 32.0006 10.6667Z" fill="#3ECF8E"/>
        <path d="M32.0006 10.6667C32.0006 10.6667 46.934 11.7333 53.334 22.4L32.0006 53.3333V10.6667Z" fill="#36B27A"/>
    </svg>
);


export const PlatformLogo: React.FC<{ platformId: string; className?: string }> = ({ platformId, className }) => {
    const props = { className: className || defaultProps.className };

    switch (platformId) {
        case 'gemini': return <GeminiLogo {...props} />;
        case 'google': return <GeminiLogo {...props} />;
        case 'youtube': return <YouTubeLogo {...props} />;
        case 'tiktok': return <TikTokLogo {...props} />;
        case 'facebook': return <FacebookLogo {...props} />;
        case 'facebook_token_engine': return <FacebookLogo {...props} />;
        case 'clickbank': return <ClickBankLogo {...props} />;
        case 'amazon': return <AmazonSellerCentralLogo {...props} />;
        case 'shopee': return <ShopeeLogo {...props} />;
        case 'telegram': return <TelegramLogo {...props} />;
        case 'lazada': return <LazadaLogo {...props} />;
        case 'tiki': return <TikiLogo {...props} />;
        case 'zalo': return <ZaloLogo {...props} />;
        case 'momo': return <MomoLogo {...props} />;
        case 'vnpay': return <VNPayLogo {...props} />;
        case 'instagram': return <InstagramLogo {...props} />;
        case 'x_twitter': return <XLogo {...props} />;
        case 'pinterest': return <PinterestLogo {...props} />;
        case 'shareasale': return <ShareASaleLogo {...props} />;
        case 'accesstrade': return <ACCESSTRADELogo {...props} />;
        case 'digistore24': return <Digistore24Logo {...props} />;
        case 'jvzoo': return <JVZooLogo {...props} />;
        case 'warriorplus': return <WarriorPlusLogo {...props} />;
        case 'rakuten': return <RakutenLogo {...props} />;
        case 'semrush': return <SEMrushLogo {...props} />;
        case 'hubspot': return <HubSpotLogo {...props} />;
        case 'cloudways': return <CloudwaysLogo {...props} />;
        case 'cj': return <CJLogo {...props} />;
        case 'github': return <GitHubLogo {...props} />;
        case 'discord': return <DiscordLogo {...props} />;
        case 'spotify': return <SpotifyLogo {...props} />;
        case 'linkedin': return <LinkedInLogo {...props} />;
        case 'microsoft': return <MicrosoftAzureLogo {...props} />;
        case 'crypto_com': return <CryptoComLogo {...props} />;
        case 'binance': return <BinanceLogo {...props} />;
        case 'bybit': return <BybitLogo {...props} />;
        case 'host123': return <Host123Logo {...props} />;
        case 'googledrive': return <GoogleDriveLogo {...props} />;
        case 'supabase': return <SupabaseLogo {...props} />;
        default: return null;
    }
};