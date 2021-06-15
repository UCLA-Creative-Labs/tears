import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Envelope from '../components/Envelope';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { senior2song, Song, toFirstNames, validateNames } from '../utils';
import { getDatabases, getNameFromId } from '../utils/node';

interface HomeProps {
  names: string[];
  song: Song;
}

export default function Home({names, song}: HomeProps): JSX.Element {
  const [modal, setModal] = useState<string| null>(null);

  const popup = (ref: HTMLDivElement) => {
    setModal(ref.style.backgroundImage);
  } 

  const close = () => {
    setModal(null);
  }

  return (
    <Layout id={styles.container} song={song}>
      <h1 id={styles.heading}>senior deds pee pee poo poo</h1>
      <p id={styles['sappy-text']}>
        A website dedicated to our amazing 2021 seniors.
        You all will be very missed.
      </p>
      <div id={styles['envelope-container']}>
        {names?.map(name => <Envelope popup={popup} key={name} name={name}/>)}
      </div>
      {modal && 
        <>
          <div id={styles.modal} style={{backgroundImage: modal}}/>
          <div id={styles.blur} style={{WebkitBackdropFilter: 'blur(2px)'}} onClick={close}/>
        </>}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dbs = await getDatabases();
  const names = await Promise.all(dbs.map(id => getNameFromId(id)));
  const firstNames = toFirstNames(names);
  const validNames = validateNames(firstNames);
  return {
    props: {
      names: validNames,
      song: senior2song(),
    },
  };
};