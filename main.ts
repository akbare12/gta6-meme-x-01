// gta6-meme-x-01 entry (Node 22, standard library only).
// The entry is a post on X: this program only copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. The house
// reads the post itself from X (its first picture, the meme, and its text)
// and hands that to the judge. Nothing this program writes is judged.
//
// POST.json holds the post's address, {"url": "https://x.com/<handle>/status/<id>"}.
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast when POST.json is not a real post address yet: the gate refuses
// a placeholder url, so never ship one silently.
const post = JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8'));
if (typeof post.url !== 'string' || !/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/.+\/status\/\d+$/.test(post.url)) {
  console.error('POST.json does not hold a real X post url yet');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
