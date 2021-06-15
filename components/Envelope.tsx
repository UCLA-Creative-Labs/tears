import Link from 'next/link';
import React from 'react';
import styles from '../styles/Envelope.module.scss';

interface EnvelopeProps {
  name: string;
  children?: JSX.Element[];
}

export default function Envelope({name}: EnvelopeProps): JSX.Element {
  return (
    <Link href={`/${name}`}>
      <div className={styles.envelope} style={{backgroundImage: `url('/envelope/${name}.svg')`}} />
    </Link>
  );
}