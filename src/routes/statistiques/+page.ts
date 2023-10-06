import { redirect } from "@sveltejs/kit";

import { PUBLIC_MATOMO_URL, PUBLIC_MATOMO_ID } from "$env/static/public";

export function load() {
  throw redirect(307, `${PUBLIC_MATOMO_URL}/?idSite=${PUBLIC_MATOMO_ID}`);
}
