export interface Song {
  albumArt: string;
  title: string;
  url: string;
}

const playlist: Song[] = [
  {
    albumArt: "/music/art/By.jpg",
    title: "By.flp",
    url: "/music/By.mp3",
  },
  {
    albumArt: "/music/art/Untitled_08.jpg",
    title: "Untitled_08",
    url: "/music/untitled_08.mp3",
  },
  {
    albumArt: "/music/art/Nostalgic Acts.jpg",
    title: "Nostalgic Acts",
    url: "/music/Nostaligic ActsII_Remastered.mp3",
  },
  {
    albumArt: "/music/art/Arabina.jpg",
    title: "Arabina",
    url: "/music/Arabina.mp3",
  },

  {
    albumArt: "/music/art/By.jpg",
    title: "Jello",
    url: "/music/Jello.mp3",
  },
];

export default playlist;
