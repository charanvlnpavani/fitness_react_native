import { assets } from "./assets";

interface Comment {
  id: string;
  text: string;
  user?: {
    avatar: string;
    name: string;
    premium?: boolean;
    premiumLogo?: string;
  };
}

export const initialComments: Comment[] = [
  {
    id: "1",
    text: "Nice work! 👏",
    user: {
      name: "Alex",
      avatar: assets.avatars.alex,
      premium: false,
    },
  },
  {
    id: "2",
    text: "Hell",
    user: {
      name: "Jane Smith",
      avatar: assets.avatars.janeSmith,
      premium: true,
      premiumLogo: assets.logos.premium,
    },
  },
];
