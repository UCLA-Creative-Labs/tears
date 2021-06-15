import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/RecordPlayer.module.scss';
import { AnimeControls, moveRecordArm, pulseRecordArm, spin, senior2song, Song } from '../utils';

export enum RECORD_PLAYER_STATE {
  INIT = 'INIT',
  POPUP = 'POPUP',
}

export interface RecordPlayerProps {
  song: Song;
}

export default function RecordPlayer({song}: RecordPlayerProps): JSX.Element {
  const {audioPath, imagePath, title, artist} = song ?? senior2song();
  const audio = useRef(null);
  const vinylRef = useRef<AnimeControls | null>(null);
  const armRef = useRef<AnimeControls | null>(null);
  const pulseRef = useRef<AnimeControls | null>(null);
  const isPlaying = useRef(false);
  const isReversed = useRef(false);
  const [state, setState] = useState(RECORD_PLAYER_STATE.INIT);
  const [volume, setVolume] = useState(50);

  const adjustVolume = () => {
    audio.current && (audio.current.volume = volume / 100);
  };

  useEffect(() => {
    vinylRef.current = spin(`#${styles.vinyl}`);
    armRef.current = moveRecordArm(`#${styles.arm}`);
    audio.current = new Audio(audioPath);
    adjustVolume();

    return () => {
      audio.current.pause();
    };
  }, []);

  useEffect(() => {
    adjustVolume();
  }, [volume]);

  const reverseArmIf = (condition: boolean) => {
    if (!condition) return;
    armRef.current.reverse();
    isReversed.current = !isReversed.current;
  };

  const play = () => {
    if (isPlaying.current) return;
    reverseArmIf(isReversed.current);
    armRef.current.play();
    isPlaying.current = true;

    setTimeout(() => {
      if (!isPlaying.current) return;
      pulseRef.current = pulseRecordArm(`#${styles.arm}`);
      pulseRef.current.play();
      vinylRef.current.play();
      audio.current.play();
    }, 500);
  };

  const pause = () => {
    vinylRef.current?.pause();
    pulseRef.current?.pause();
    pulseRef.current = null;

    if (isPlaying.current) {
      audio.current.pause();
      reverseArmIf(!isReversed.current);
      armRef.current.play();
      isPlaying.current = false;
    }
  };

  const togglePlay = () => {
    isPlaying.current
      ? pause()
      : play();
  };

  const toggleState = () => {
    setState(prev => prev === RECORD_PLAYER_STATE.INIT
      ? RECORD_PLAYER_STATE.POPUP
      : RECORD_PLAYER_STATE.INIT,
    );
  };

  return (
    <>
      {state === RECORD_PLAYER_STATE.INIT
        ? <div id={styles.metadata}>
          <p>now playing: {title}</p>
          <p>by: {artist}</p>
        </div>
        : <div id={styles.blur} onClick={toggleState}/>
      }
      <div id={styles.wrapper} className={state === RECORD_PLAYER_STATE.POPUP ? styles.popup : ''}>
        <div id={styles.container} onClick={toggleState}>
          <svg id={styles.vinyl} width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <mask id="path-1-inside-1" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M400 800C620.914 800 800 620.914 800 400C800 179.086 620.914 0 400 0C179.086 0 0 179.086 0 400C0 620.914 179.086 800 400 800ZM400 415C408.284 415 415 408.284 415 400C415 391.716 408.284 385 400 385C391.716 385 385 391.716 385 400C385 408.284 391.716 415 400 415Z"/>
            </mask>
            <path fillRule="evenodd" clipRule="evenodd" d="M400 800C620.914 800 800 620.914 800 400C800 179.086 620.914 0 400 0C179.086 0 0 179.086 0 400C0 620.914 179.086 800 400 800ZM400 415C408.284 415 415 408.284 415 400C415 391.716 408.284 385 400 385C391.716 385 385 391.716 385 400C385 408.284 391.716 415 400 415Z" fill="#181818"/>
            <path d="M796 400C796 618.705 618.705 796 400 796V804C623.123 804 804 623.123 804 400H796ZM400 4C618.705 4 796 181.295 796 400H804C804 176.877 623.123 -4 400 -4V4ZM4 400C4 181.295 181.295 4 400 4V-4C176.877 -4 -4 176.877 -4 400H4ZM400 796C181.295 796 4 618.705 4 400H-4C-4 623.123 176.877 804 400 804V796ZM411 400C411 406.075 406.075 411 400 411V419C410.493 419 419 410.493 419 400H411ZM400 389C406.075 389 411 393.925 411 400H419C419 389.507 410.493 381 400 381V389ZM389 400C389 393.925 393.925 389 400 389V381C389.507 381 381 389.507 381 400H389ZM400 411C393.925 411 389 406.075 389 400H381C381 410.493 389.507 419 400 419V411Z" fill="black" fillOpacity="0.4" mask="url(#path-1-inside-1)"/>
            <circle cx="400" cy="400" r="298" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <circle cx="400" cy="400" r="273" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <circle cx="400" cy="400" r="248" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <circle cx="400" cy="400" r="187.5" stroke="black" strokeOpacity="0.6" strokeWidth="45"/>
            <circle cx="400" cy="400" r="348" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <circle cx="400" cy="400" r="373" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <circle cx="400" cy="400" r="323" stroke="black" strokeOpacity="0.4" strokeWidth="4"/>
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="250" y="250" width="300" height="300">
              <path fillRule="evenodd" clipRule="evenodd" d="M400 550C482.843 550 550 482.843 550 400C550 317.157 482.843 250 400 250C317.157 250 250 317.157 250 400C250 482.843 317.157 550 400 550ZM400 415C408.284 415 415 408.284 415 400C415 391.716 408.284 385 400 385C391.716 385 385 391.716 385 400C385 408.284 391.716 415 400 415Z" fill="#DA0000"/>
            </mask>
            <g mask="url(#mask0)">
              <rect x="250" y="250" width="300" height="300" fill="url(#pattern0)"/>
            </g>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0" transform="scale(0.00444444)"/>
              </pattern>
              <image id="image0" width="225" height="225" href={imagePath} />
            </defs>
          </svg>

          <svg id={styles.arm} width="359" height="904" viewBox="0 0 359 904" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="245.5" cy="144.5" r="113.5" fill="#4B4B4B"/>
            <circle cx="245.5" cy="144.5" r="111.5" stroke="#181818" strokeWidth="4"/>
            <circle cx="246" cy="145" r="95" stroke="#181818" strokeWidth="4"/>
            <path d="M230.391 5.62328C230.391 2.86186 232.629 0.623291 235.391 0.623291H256.753C259.515 0.623291 261.753 2.86187 261.753 5.62329V578.124H230.391V5.62328Z" fill="#D6D6D6"/>
            <rect x="211" y="106" width="69" height="76" rx="5" fill="#181818"/>
            <rect x="235.419" y="558.846" width="32.6172" height="250.902" transform="rotate(35 235.419 558.846)" fill="#D6D6D6"/>
            <mask id="path-7-inside-1" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M46.4638 902.477C48.4773 903.887 51.2169 903.624 52.9258 901.857L118.444 834.114L155.312 858.23C157.646 859.756 160.777 859.078 162.271 856.723L164.834 852.683C166.187 850.55 165.736 847.742 163.783 846.14L132.02 820.077L143.825 807.871C145.963 805.661 145.618 802.063 143.099 800.299L66.5458 746.696C64.0451 744.945 60.5727 745.824 59.2065 748.554L0.792752 865.287C-0.316511 867.504 0.365786 870.198 2.39628 871.62L46.4638 902.477Z"/>
            </mask>
            <path fillRule="evenodd" clipRule="evenodd" d="M46.4638 902.477C48.4773 903.887 51.2169 903.624 52.9258 901.857L118.444 834.114L155.312 858.23C157.646 859.756 160.777 859.078 162.271 856.723L164.834 852.683C166.187 850.55 165.736 847.742 163.783 846.14L132.02 820.077L143.825 807.871C145.963 805.661 145.618 802.063 143.099 800.299L66.5458 746.696C64.0451 744.945 60.5727 745.824 59.2065 748.554L0.792752 865.287C-0.316511 867.504 0.365786 870.198 2.39628 871.62L46.4638 902.477Z" fill="#535353"/>
            <path d="M52.9258 901.857L55.801 904.638L52.9258 901.857ZM46.4638 902.477L48.7581 899.2L48.7581 899.2L46.4638 902.477ZM118.444 834.114L120.633 830.767L117.867 828.957L115.569 831.334L118.444 834.114ZM155.312 858.23L153.122 861.577L155.312 858.23ZM162.271 856.723L165.649 858.866V858.866L162.271 856.723ZM164.834 852.683L161.456 850.541L164.834 852.683ZM163.783 846.14L161.246 849.232V849.232L163.783 846.14ZM132.02 820.077L129.145 817.296L126.128 820.416L129.483 823.169L132.02 820.077ZM143.825 807.871L140.95 805.09L140.95 805.09L143.825 807.871ZM143.099 800.299L140.805 803.576L140.805 803.576L143.099 800.299ZM66.5458 746.696L68.8401 743.42V743.42L66.5458 746.696ZM59.2065 748.554L62.7837 750.344V750.344L59.2065 748.554ZM0.792752 865.287L-2.78437 863.497H-2.78437L0.792752 865.287ZM2.39628 871.62L4.69058 868.344H4.69058L2.39628 871.62ZM50.0505 899.076C49.7087 899.429 49.1608 899.482 48.7581 899.2L44.1695 905.753C47.7938 908.291 52.7251 907.818 55.801 904.638L50.0505 899.076ZM115.569 831.334L50.0505 899.076L55.801 904.638L121.319 836.895L115.569 831.334ZM157.502 854.882L120.633 830.767L116.254 837.462L153.122 861.577L157.502 854.882ZM158.893 854.581C158.595 855.052 157.968 855.187 157.502 854.882L153.122 861.577C157.323 864.325 162.96 863.105 165.649 858.866L158.893 854.581ZM161.456 850.541L158.893 854.581L165.649 858.866L168.212 854.826L161.456 850.541ZM161.246 849.232C161.637 849.552 161.727 850.114 161.456 850.541L168.212 854.826C170.647 850.986 169.836 845.932 166.321 843.047L161.246 849.232ZM129.483 823.169L161.246 849.232L166.321 843.047L134.558 816.985L129.483 823.169ZM140.95 805.09L129.145 817.296L134.896 822.858L146.701 810.652L140.95 805.09ZM140.805 803.576C141.309 803.929 141.378 804.648 140.95 805.09L146.701 810.652C150.548 806.674 149.927 800.197 145.394 797.023L140.805 803.576ZM64.2515 749.973L140.805 803.576L145.394 797.023L68.8401 743.42L64.2515 749.973ZM62.7837 750.344C63.0569 749.798 63.7514 749.623 64.2515 749.973L68.8401 743.42C64.3388 740.268 58.0885 741.85 55.6294 746.764L62.7837 750.344ZM4.36988 867.077L62.7837 750.344L55.6294 746.764L-2.78437 863.497L4.36988 867.077ZM4.69058 868.344C4.28449 868.059 4.14802 867.52 4.36988 867.077L-2.78437 863.497C-4.78104 867.487 -3.55292 872.338 0.101976 874.897L4.69058 868.344ZM48.7581 899.2L4.69058 868.344L0.101971 874.897L44.1695 905.753L48.7581 899.2Z" fill="#181818" mask="url(#path-7-inside-1)"/>
          </svg>
        </div>
        {state === RECORD_PLAYER_STATE.POPUP &&
        <div id={styles.controls}>
          <p>{title} by {artist}
            <button id={styles.play} onClick={togglePlay}>
              <img src={'/play.svg'} alt={'Toggle between play and pause'}/>
            </button>
          </p>
          <div>
            <img src={'/volume.svg'} alt={'A volume icon'}/>
            <input min={0} max={100} value={volume} type={'range'} onChange={(e) => setVolume(+e.target.value)}id={styles.volume}/>
          </div>
        </div>}
      </div>
    </>
  );
}