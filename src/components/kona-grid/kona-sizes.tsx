import { KonaSpecialTags } from "./kona-special-tags";

const sizes = [
  "width:2560..",
  "width:2560",
  "width:2560.",
  "width:1920..",
  "width:1920",
  "width:1920.",
  "height:1440..",
  "height:1440",
  "height:1440.",
  "height:1080..",
  "height:1080",
  "height:1080.",
];

export const KonaSizes = () => <KonaSpecialTags tags={sizes} title="Sizes" />;
