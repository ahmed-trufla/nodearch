import { FileLoader } from '../fs/file-loader.js';
import path from 'node:path';
import { pathToFileURL } from 'node:url';


export class AppFinder {
  static async find(typescript?: boolean) {
    const appUrl = pathToFileURL(
      typescript ? 
        path.join(process.cwd(), 'src', 'main.ts') : 
        path.join(process.cwd(), 'dist', 'main.js')
    );

    const stats = await FileLoader.getPathInfo(appUrl);
  
    return stats ? appUrl : undefined;
  } 

  static async loadApp(typescript?: boolean) {
    const appUrl = await AppFinder.find(typescript);

    if (!appUrl) return undefined;

    const loadedModule = await FileLoader.importModule(appUrl);

    return Object.keys(loadedModule).find(key => {
      if (loadedModule[key].nodearch) {
        return loadedModule[key];
      }
    });
  }
}