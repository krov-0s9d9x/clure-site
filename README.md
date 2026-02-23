# site-next (Next.js frontend)

Quick scaffold that reads a single `page` document from Sanity.

Setup

1. Install dependencies:

```bash
cd "d:\Рабочий стол\Clure figma\site-next"
npm install
```

2. Set environment variables (replace with your Sanity project values):

On Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = 'yourProjectId'
$env:NEXT_PUBLIC_SANITY_DATASET = 'production'
npm run dev
```

3. The homepage expects a `page` document in Sanity with fields `title` and `body` (HTML).
