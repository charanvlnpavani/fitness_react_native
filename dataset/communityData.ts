interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
}

interface CommunityData {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  createdAt: string;
  premium: boolean;
  follow: boolean;
  updatedAt: string;
  likes: number;
  comments: Comment[];
  media: Media[];
}

interface Media {
  id: string;
  url: string;
  type: string;
}

export const communityData: CommunityData[] = [
  {
    id: "1",
    title: "My First Post",
    content:
      "This is the content of my first post This is the content of my first post This is the content of my first post.",
    author: "John Doe",
    authorId: "1",
    premium: false,
    follow: true,
    authorAvatar:
      "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    likes: 20000000,
    comments: [
      {
        id: "1",
        text: "Great post! Keep it up 💪",
        user: {
          name: "Sarah",
          avatar:
            "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png",
        },
      },
      {
        id: "2",
        text: "This is amazing content",
        user: {
          name: "Mike",
          avatar:
            "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png",
        },
      },
    ],
    media: [
      {
        id: "1",
        url: "https://wyndhamgardenajman.com/wp-content/uploads/2017/09/Fitness-club-banner-image-min.jpg",
        type: "image",
      },
      {
        id: "3",
        url: "https://wyndhamgardenajman.com/wp-content/uploads/2017/09/Fitness-club-banner-image-min.jpg",
        type: "image",
      },
      {
        id: "2",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video",
      },
    ],
  },
  {
    id: "2",
    title: "Another Post",
    content: "This is a second post with a different media type.",
    author: "Jane Smith",
    authorId: "2",
    premium: true,
    follow: false,
    authorAvatar:
      "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png",
    createdAt: "2021-01-02",
    updatedAt: "2021-01-02",
    likes: 10,
    comments: [
      {
        id: "3",
        text: "Nice work! 👏",
        user: {
          name: "Alex",
          avatar:
            "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png",
        },
      },
    ],
    media: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fHww&w=1000&q=80",
        type: "image",
      },
    ],
  },
];
