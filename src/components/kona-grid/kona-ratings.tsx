import { KonaSpecialTags } from "./kona-special-tags";

const ratings = [
  "safe",
  "questionableless",
  "questionable",
  "questionableplus",
  "explicit",
].map((tag) => `rating:${tag}`);

export const KonaRatings = () => (
  <KonaSpecialTags tags={ratings} title="Ratings" />
);
