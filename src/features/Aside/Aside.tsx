import { KonaTagsCloud } from "../KonaTagsCloud";
import { KonaAppliedTags } from "../KonaAppliedTags";
import { KonaSizesTags } from "../KonaSizesTags";
import { KonaRatingsTags } from "../KonaRatingsTags";

export const Aside = () => {
  return (
    <>
      <KonaAppliedTags />
      <KonaSizesTags />
      <KonaRatingsTags />
      <KonaTagsCloud />
    </>
  );
};
