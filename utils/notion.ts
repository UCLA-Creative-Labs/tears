import { Client } from '@notionhq/client';
import { Note } from '.';

const PAGE_ID = '1ee6ddaed3634f25aa650926f70ae16c';

const getClient = () => {
  return new Client({
    auth: process.env.NOTION_TOKEN,
  });
};

export const getDatabases = async (): Promise<string[]> => {
  const notion = getClient();
  const page = await notion.blocks.children.list({
    block_id: PAGE_ID,
  });
  // Currently, tables are unsupported types
  const data = page.results.slice(1).filter(({type}) => type == 'unsupported');
  return data.map(({id}) => id);
};

export const getNameFromId = async (id: string): Promise<string> => {
  const notion = getClient();
  const page  = await notion.databases.retrieve({database_id: id });
  return page.title[0].plain_text;
};

export const getDedsFromId = async (id: string): Promise<Note[]> => {
  const notion = getClient();
  const db = await notion.databases.query({database_id: id});
  return db.results.map(r => {
    return {
      note: r?.properties?.Note?.rich_text[0]?.plain_text as string,
      from: r?.properties?.From?.title[0]?.plain_text as string,
    };
  });
};

export const getIdFromName = async (name: string): Promise<string> => {
  const dbs = await getDatabases();
  const names = await Promise.all(dbs.map(id => getNameFromId(id)));
  const idx = names.findIndex(v => v.toLowerCase().split(' ')[0] === name);
  return dbs[idx];
};