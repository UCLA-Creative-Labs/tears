import { GetStaticProps } from 'next';
import React from 'react';
import Envelope from '../components/Envelope';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { getDatabases, getNameFromId, toFirstNames, validateNames } from '../utils';

interface HomeProps {
  names: string[];
}

export default function Home({names}: HomeProps): JSX.Element {
  return (
    <Layout id={styles.container}>
      <h1 id={styles.heading}>senior deds pee pee poo poo</h1>
      <p id={styles['sappy-text']}>
        A website dedicated to our amazing 2021 seniors.
        You all will be very missed.
      </p>
      <div id={styles['envelope-container']}>
        {names?.map(name => <Envelope name={name}/>)}
      </div>
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
    },
  };
};