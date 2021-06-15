import { Song } from './types';

export enum SENIOR {
  ARJUN='arjun',
  NORMAN='norman',
  JASON='jason',
  JOSEPH='joseph',
  EMMY='emmy',
  DON='don',
  ANGELA='angela',
  JUSTINE='justine',
  KALI='kali',
  VIVI='vivi',
}

export const VALID_NAMES = Object.values(SENIOR);

export const QUOTES_DB = 'quotes';

export const FILLER_QUOTE = '[insert cute description here]';

export const FAVICON = '❤️';

export const senior2song = (person?: SENIOR): Song => {
  const audioPath = person
    ? `/songs/${person}/music.mp3`
    : '/songs/la-la-lost-you.mp3';
  const imagePath = person
    ? `/songs/${person}/vinyl-image.png`
    : '/cl.png';

  let title = 'La La Lost You';
  let artist = 'NIKI';
  switch (person) {
    case SENIOR.ARJUN:
      title = 'Afterglow';
      artist = 'Ed Sheeran';
      break;
    case SENIOR.NORMAN:
      title = 'Crazy Frog';
      artist = 'Axel F';
      break;
    case SENIOR.JASON:
      title = 'Dynamite';
      artist = 'BTS';
      break;
    case SENIOR.JOSEPH:
      title = 'Norton\'s Room';
      artist = 'jandro_gaming';
      break;
    case SENIOR.EMMY:
      title = 'Pompeii';
      artist = 'Bastille';
      break;
    case SENIOR.DON:
      title = 'Ah Yeah!!';
      artist = 'Haiykuu!!';
      break;
    case SENIOR.ANGELA:
      title = 'Afterglow';
      artist = 'Ed Sheeran';
      break;
    case SENIOR.JUSTINE:
      title = 'Afterglow';
      artist = 'Ed Sheeran';
      break;
    case SENIOR.KALI:
      title = 'Afterglow';
      artist = 'Ed Sheeran';
      break;
    case SENIOR.VIVI:
      title = 'Afterglow';
      artist = 'Ed Sheeran';
      break;
  }

  return {
    title,
    artist,
    audioPath,
    imagePath,
  };
};