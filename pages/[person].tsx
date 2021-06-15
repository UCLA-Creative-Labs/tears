import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Button from '../components/Button';
import Layout from '../components/Layout';
import styles from '../styles/PersonalPage.module.scss';
import {
  animateOutUp,
  animateUp,
  Note,
  SENIOR,
  senior2song,
  Song,
  toFirstNames,
  validateNames,
} from '../utils';
import {
  getDatabases,
  getDedsFromId,
  getIdFromName,
  getNameFromId,
  getQuoteFromName,
} from '../utils/node';

interface PersonalPageProps {
  deds: Note[];
  name: string;
  quote: string;
  song: Song;
}

const parse = (s: string): JSX.Element[] => {
  const text = s.split('\n');
  return text.reduce((acc, t): JSX.Element[] =>
    [...acc, (<>{t}<br/></>)], []);
};

export default function PersonalPage(props: PersonalPageProps): JSX.Element {
  const {deds, name, quote, song} = props;
  const [idx, setIdx] = useState(0);
  const noteContainer = `#${styles['note-container']}`;

  useEffect(() => {
    const storage = window.sessionStorage;
    const _idx = storage.getItem('idx');
    if (_idx) setIdx(+_idx);
  }, []);

  useEffect(() => {
    const storage = window.sessionStorage;
    storage.setItem('idx', `${idx}`);
    animateUp(noteContainer);
  }, [idx]);

  const prev = () => {
    animateOutUp(noteContainer);
    setTimeout(() => {
      setIdx(i => i - 1 >= 0 ? i - 1 : deds.length - 1);
    }, 1250);
  };

  const next = () => {
    animateOutUp(noteContainer);
    setTimeout(() => {
      setIdx(i => i + 1 < deds.length ? i + 1 : 0);
    }, 1250);
  };

  return (
    <Layout id={styles.container} title={name} song={song}>
      <header>
        <Link href={'/'}>
          <Button.LEFT uid={'homeButton'} text={'back to home'}/>
        </Link>
      </header>
      <div>
        <h1 id={styles.name}>{name}</h1>
        <p id={styles.description}>{quote}</p>
        <div id={styles['note-container']}>
          <p id={styles.note}>
            {parse(deds ? deds[idx].note : 'i love you')}
          </p>
          <p id={styles.from}>
            -{deds ? deds[idx].from : 'bippen'}
          </p>
        </div>
      </div>
      <footer>
        <Button.LEFT uid={'prevButton'} text={'previous letter'} onClick={() => prev()}/>
        <Button.RIGHT uid={'nextButton'} text={'next letter'} onClick={() => next()}/>
      </footer>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dbs = await getDatabases();
  const names = await Promise.all(dbs.map(id => getNameFromId(id)));
  const firstNames = toFirstNames(names);
  const paths = validateNames(firstNames).map(name => {
    return { params: { person: name } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {person} = params;
  const id = await getIdFromName(person as string);
  const deds = await getDedsFromId(id);
  const quote = await getQuoteFromName(person as string);
  const filteredDeds = deds.filter(({ note, from }) => note && from);

  return {
    props: {
      deds: filteredDeds,
      name: person,
      song: senior2song(person as SENIOR),
      quote,
    },
  };
};