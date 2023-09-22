import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  return {
    region: params.slug,
  };
};
