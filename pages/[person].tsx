import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getDatabases, getDedsFromId, getIdFromName, getNameFromId, Note, toFirstNames, validateNames } from '../utils';

interface PersonalPageProps {
  deds: Note[];
}

export default function PersonalPage({deds}: PersonalPageProps): JSX.Element {

  return (
    <div>
      {deds.map(({note, from}) =>
        <>
          <h3>===</h3>
          <h1>{from}</h1>
          <p>{note}</p>
          <h3>===</h3>
        </>,
      )}
    </div>
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

  return {
    props: {deds},
  };
};