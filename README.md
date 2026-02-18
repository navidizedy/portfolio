# 🚀 My Portfolio — Setup Guide

Built with **Next.js 14**, **Tailwind CSS**, **GSAP**, **Lenis**, **next-intl** (EN/FA), and **next-themes** (Dark/Light).

---

## 📦 1. Create & Install

```bash
# Create the project
npx create-next-app@latest my-portfolio --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

cd my-portfolio

# Install all dependencies
npm install gsap lenis next-themes next-intl lucide-react clsx tailwind-merge

# Install shadcn (optional, for UI primitives)
npx shadcn@latest init
```

---

## 📂 2. File Structure

Copy all the provided files into your project:

```
my-portfolio/
├── app/
│   ├── layout.tsx           ← Root layout (fonts)
│   ├── globals.css          ← Global styles + CSS vars
│   └── [locale]/
│       ├── layout.tsx       ← Locale layout (ThemeProvider + i18n)
│       └── page.tsx         ← Main page (assembles all sections)
├── components/
│   ├── SmoothScroll.tsx     ← Lenis smooth scroll + reveal observer
│   ├── Navbar.tsx           ← Navigation + theme toggle + lang switcher
│   ├── Hero.tsx             ← Hero with typewriter + stats
│   ├── About.tsx            ← About me with photo placeholder
│   ├── Stack.tsx            ← Tech stack with category tabs
│   ├── Experience.tsx       ← Timeline of work history
│   ├── Projects.tsx         ← Project cards list
│   ├── Contact.tsx          ← Contact with copy email
│   └── Footer.tsx           ← Footer with socials
├── messages/
│   ├── en.json              ← English translations
│   └── fa.json              ← Persian (Farsi) translations
├── lib/
│   └── utils.ts             ← cn() helper
├── middleware.ts            ← next-intl locale routing
├── i18n.ts                  ← next-intl config
├── next.config.js           ← Next.js config with next-intl plugin
└── tailwind.config.ts       ← Tailwind + dark mode + fonts
```

---

## ✏️ 3. Customize Your Info

### Personal Details — `messages/en.json` & `messages/fa.json`
- Update `hero.name` with your name
- Update `hero.tagline` with your intro
- Update `contact.email` with your email
- Update job history in `experience.jobs[]`
- Update projects in `projects.items[]`
- Update `footer.name`

### Tech Stack — `components/Stack.tsx`
Edit the `STACK` object to add/remove your technologies.

### Social Links — `components/Footer.tsx`
Edit the `SOCIALS` array with your profile URLs.

### Your Photo — `components/About.tsx`
Replace the placeholder div with:
```tsx
<Image
  src="/your-photo.jpg"
  alt="Your Name"
  fill
  className="object-cover"
/>
```
Put your photo in the `public/` folder.

### Navbar Logo — `components/Navbar.tsx`
Change `JD` to your initials.

---

## 🌍 4. Language Switching

The site supports **English** and **Persian (Farsi)**:
- English URL: `localhost:3000/en`
- Persian URL: `localhost:3000/fa`
- Persian version automatically sets `dir="rtl"` and loads the Vazirmatn font.

---

## 🎨 5. Theme

Dark mode is the default. Click the **☀️/🌙** button in the navbar to toggle.

To change the accent color, edit in `tailwind.config.ts`:
```ts
colors: {
  accent: {
    DEFAULT: "#3B82F6",  // ← Change this
  }
}
```

And in `globals.css`:
```css
--accent-rgb: 59, 130, 246; /* ← Match your color */
```

---

## ▶️ 6. Run

```bash
npm run dev
# → Open http://localhost:3000/en
```

---

## 🚢 7. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

## 📋 Dependencies Summary

| Package | Purpose |
|---|---|
| `next-intl` | English + Persian i18n |
| `next-themes` | Dark / Light mode |
| `lenis` | Smooth scrolling |
| `gsap` | Advanced animations (use as needed) |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Class utilities |

---

Good luck! 🎉
