#!/usr/bin/env ts-node

import { App } from '@nodearch/core';
import { ClassConstructor } from '@nodearch/core/utils';
import path from 'path';


async function main() {
  let CliApp: ClassConstructor<App> | undefined; 

  // Try to load a local copy of the Cli
  try {
    const localCliPath = path.join(process.cwd(), 'node_modules', '@nodearch', 'cli');
    CliApp = (await import(localCliPath))?.Cli;
  }
  catch(e: any) {}

  if (!CliApp) {
    CliApp = (await import('./main.js')).Cli;
  }

  const app = new CliApp();
  await app.init({
    mode: 'app',
    cwd: new URL('..', import.meta.url),
    typescript: true
  });
  await app.start();
}
 
main().catch(e => {
  console.log(e);
  process.exit(1);
});