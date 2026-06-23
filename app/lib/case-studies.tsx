import type { StaticImageData } from "next/image";

// Importing the respective visual assets for the circular frames
import missionImg from "../../public/images/ourmission.png";
import visionImg from "../../public/images/ourvision.png";

export type CoreValueItem = {
  id: number;
  slug: "mission" | "vision";
  heading: "Mission" | "Vision";
  description: string;
  image: StaticImageData;
};

export const coreValues: CoreValueItem[] = [
  {
    id: 1,
    slug: "mission",
    heading: "Mission",
    description: "Lorem Ipsum is simply dummy text of the printing printing industry. Lorem Ipsum is of the and it.",
    image: missionImg,
  },
  {
    id: 2,
    slug: "vision",
    heading: "Vision",
    description: "Lorem Ipsum is simply dummy text of the printing printing industry. Lorem Ipsum is of the and it.",
    image: visionImg,
  },
];

export const coreValueMap = Object.fromEntries(
  coreValues.map((item) => [item.slug, item])
) as Record<string, CoreValueItem>;