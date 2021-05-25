const { Client } = require('@notionhq/client');
const path = require('path');
const {writeFileSync} = require('fs');
require('dotenv').config();

const PAGE_ID = '1ee6ddaed3634f25aa650926f70ae16c';
let SAVE_FLAG = 1;

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const saveTo = (title, data) => {
  writeFileSync(
    path.resolve(__dirname, `data/${title}.json`),
    JSON.stringify(data, null, 2),
  );
}

async function getDatabases(){
  const page = await notion.blocks.children.list({
    block_id: PAGE_ID,
  });
  const data = page.results.slice(1).filter(({type}) => type == 'unsupported');

  if (SAVE_FLAG) {
    saveTo('deds-page', page);
    saveTo('filtered-deds-page', data);
  }
  return data.map(({id}) => id);
}

async function saveDatabaseContent(id) {
  let name = id;
  try {
    const page  = await notion.databases.retrieve({database_id: id });
    name = page.title[0].plain_text;
  } catch {
    console.log(`!!! Failed on ${name}`);
  }
  const db = await notion.databases.query({database_id: id});
  const notes = db.results.map(r => {
    return {
      note: r.properties.Note.rich_text[0].plain_text,
      from: r.properties.From.title[0].plain_text,
    };
  });

  saveTo(name.toLowerCase().replace(' ', '-'), notes);
}

async function main() {
  const dbs = await getDatabases();
  dbs.map((id) => saveDatabaseContent(id));
}

main();