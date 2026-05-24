import { useEffect, useState } from "react";

// The CEO ("chatterbox") status card shows the SHA of whatever's currently
// deployed for the bot. We pull it live from the repo's default branch at load
// time, so as new commits land (and ship via chatterbox's own CD), the card
// stays in sync without a redeploy of this site.
//
// `application/vnd.github.sha` returns the bare commit SHA as plain text — far
// lighter than the full commit JSON. The fallback below is shown before the
// request resolves and if it fails (GitHub's unauthenticated API allows only
// 60 requests/hour per IP, and an offline/rate-limited load shouldn't blank the
// card); keep it pointed at a real recent commit.
const REPO = "rmmorrison/chatterbox";
const BRANCH = "main";
const FALLBACK_SHA = "6560161";

export function useLatestSha() {
  const [sha, setSha] = useState(FALLBACK_SHA);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${REPO}/commits/${BRANCH}`, {
      headers: { Accept: "application/vnd.github.sha" },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((full) => {
        const short = full.trim().slice(0, 7);
        if (short) setSha(short);
      })
      .catch(() => {
        /* keep the fallback SHA */
      });

    return () => controller.abort();
  }, []);

  return sha;
}
