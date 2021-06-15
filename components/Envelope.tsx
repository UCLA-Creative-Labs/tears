import Link from 'next/link';
import React, { useRef } from 'react';
import styles from '../styles/Envelope.module.scss';
import { SENIOR } from '../utils';

interface EnvelopeProps {
  name: string;
  popup: (ref: HTMLElement) => void;
}

const NON_EXISTING_POSTCARDS = [
  SENIOR.DON,
  SENIOR.ANGELA,
  SENIOR.JUSTINE,
  SENIOR.KALI,
  SENIOR.VIVI,
];

export default function Envelope({name, popup}: EnvelopeProps): JSX.Element {
  const postcardRef = useRef<HTMLDivElement>(null);

  const postcardHref = NON_EXISTING_POSTCARDS.find((v) => v === name as SENIOR)
    ? "url('/postcard/placeholder.png')"
    : `url('/postcard/${name}.png')`;

  return (
    <div className={styles.wrapper}>
      <Link href={`/${name}`}>
        <a>
          <div className={styles.envelope} style={{backgroundImage: `url('/envelope/${name}.svg')`}} />
          <h3 className={styles.name}>{name}</h3>
        </a>
      </Link>
      <div
        ref={postcardRef}
        onClick={() => popup(postcardRef.current)}
        className={styles.postcard}
        style={{backgroundImage: postcardHref}}/>
    </div>
  );
}