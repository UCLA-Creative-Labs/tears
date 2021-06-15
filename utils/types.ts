export interface Note {
  note: string;
  from: string;
}

export interface Song {
  title: string;
  artist: string;
  audioPath: string;
  imagePath: string;
}

export type AnimeTarget = string | DOMTokenList;