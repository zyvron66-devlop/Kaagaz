# Kaagaz — PDF Toolkit

Chhota micro-SaaS: Merge PDF, Split PDF, Images → PDF. Sab kuch browser me hota hai
(pdf-lib), koi file server pe upload nahi hoti — isse hosting cost bhi zero rehti hai
aur privacy bhi bikta hua feature ban jaata hai.

## VS Code me chalane ke steps

1. Yeh folder VS Code me kholo.
2. Terminal kholo (`Ctrl + \``) aur run karo:
   ```
   npm install
   npm run dev
   ```
3. Browser me `http://localhost:3000` kholo.

Node.js installed hona chahiye (v18 ya upar) — [nodejs.org](https://nodejs.org) se le lo agar nahi hai.

## Deploy karne ke liye (free)

1. GitHub pe naya repo banao (username personal se alag rakh sakte ho, anonymity ke liye).
2. `git init`, `git add .`, `git commit -m "init"`, `git push`.
3. [vercel.com](https://vercel.com) pe GitHub se connect karo → repo select karo → deploy.
   Free tier me custom domain bhi laga sakte ho.

## Domain (anonymous rehne ke liye)

- Namecheap/other registrar se domain lo, **WHOIS Privacy Protection ON** rakhna — isse
  public WHOIS lookup me tumhara naam/address nahi dikhega.

## Monetization next steps

- **AdSense**: site live hone ke baad, kuch content/pages ke saath apply karo. Approval
  ke baad `index.tsx` me jahan "Ad space" placeholder hai, wahan AdSense ka script daal do.
- **Razorpay Payment Link / UPI QR**: "Pro" version ke liye (batch processing, no ads) —
  personal KYC internally lagta hai (legal requirement har payment gateway ka), lekin
  public page pe kahin naam nahi dikhta.

## Roadmap (baad me add karne layak)

- Compress PDF (image re-encoding se page size chhota karna)
- Dark mode

## Tech

- Next.js 14 (Pages Router) + TypeScript
- Tailwind CSS
- pdf-lib (client-side PDF creation/editing — koi backend nahi chahiye)
