import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getDatabases, getDedsFromId, getIdFromName, getNameFromId, Note, toFirstNames, validateNames } from '../utils';
import styles from '../styles/PersonalPage.module.scss';
import * as Button from '../components/Button';

interface PersonalPageProps {
  deds: Note[];
  name: string;
}

const parse = (s: string): JSX.Element[] => {
  const text = s.split('\n');
  return text.reduce((acc, t): JSX.Element[] =>
   [...acc, (<>{t}</>), (<br/>)], []);
}

const FILLER = `[insert cute description here]`;

export default function PersonalPage({deds, name}: PersonalPageProps): JSX.Element {

  const NoteCarousel = (): JSX.Element => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      const storage = window.sessionStorage;
      const _idx = storage.getItem('idx');
      if (_idx) setIdx(+_idx);
    }, []);

    useEffect(() => {
      const storage = window.sessionStorage;
      storage.setItem('idx', `${idx}`);
    }, [idx]);

    const prev = () => {
      setIdx(i => i - 1 >= 0 ? i - 1 : deds.length - 1);
    }

    const next = () => {
      setIdx(i => i + 1 < deds.length ? i + 1 : 0);
    }
    
    return (
      <>
        <p id={styles.note}>
          {parse(deds ? deds[idx].note : 'i love you')}
        </p>
        <p id={styles.from}>
          -{deds ? deds[idx].from : 'bippen'}
        </p>
        <footer>
          <Button.LEFT text={'previous letter'} onClick={() => prev()}/>
          <Button.RIGHT text={'next letter'} onClick={() => next()}/>
        </footer>
      </>
    );
  }

  return (
    <Layout id={styles.container}>
      <nav>
        <Link href={'/'}>
          <Button.LEFT text={'back to home'}/>
        </Link>
      </nav>
      <h1 id={styles.name}>{name}</h1>
      <p id={styles.description}>{FILLER}</p>
      <NoteCarousel />
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
  const filteredDeds = deds.filter(({note, from}) => note && from);

  return {
    props: {
      deds: filteredDeds,
      name: person,
    },
  };
};