Akash & Pranshi — Wedding Invite
=================================

This is a single-file, mobile-friendly wedding invite.

Files
- `index.html` — the invite (mobile-first, music toggle).
- `music.mp3` — placeholder file. Replace with your MP3 (same filename) to enable background music.

Quick local preview

Python (recommended):

```bash
# from the project folder
python -m http.server 8000
# then open http://localhost:8000 in your phone or browser
```

Deploy to GitHub Pages (recommended for version control)

1. Create a new GitHub repository (empty) named e.g. `wedding-invite`.
2. From your project folder:

```bash
cd C:/Users/akash/Desktop/weddinginvite
git init
git add .
git commit -m "Initial invite"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO>.git
git push -u origin main
```

3. On GitHub: go to Settings → Pages → Source → choose `main` branch and `/ (root)` → Save.
4. After a minute the site will be available at `https://<YOUR_USERNAME>.github.io/<REPO>/`.

Deploy to Netlify (drag-and-drop — easiest)

1. Go to https://app.netlify.com/drop
2. Zip the folder or drag the folder contents (ensure `index.html` is at root).
3. Netlify will publish and provide a URL with HTTPS.

Deploy to Vercel

- Option A (Dashboard): Create a new project and import the repo from GitHub.
- Option B (Vercel CLI):

```bash
npm i -g vercel
vercel login
vercel
```

Other quick options

- Surge (simple CLI): `npm i -g surge` then `surge .`
- Firebase Hosting (Spark): `firebase init hosting` → `firebase deploy` (requires Firebase CLI setup)

Notes

- Replace `music.mp3` with your own audio file (same filename) to enable the music toggle.
- Mobile browsers often block autoplay; the invite starts with music off — users must toggle it.
- If you'd like, I can push this repo to GitHub for you (you'll need to authorize or provide a remote URL).

If you want, I can also:
- Create a Git repo and push it (tell me the GitHub repo URL to use).
- Create a small zip for direct Netlify drag-and-drop deployment.
