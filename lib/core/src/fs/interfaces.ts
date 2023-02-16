import { ParsedPath } from 'path';
import { ClassConstructor } from '../utils/types.js';
import { FileType } from './enums.js';



export interface IFileInfo extends ParsedPath {
  readonly url: URL;
  readonly path: string;
  readonly type: FileType;
}

export interface IFile extends IFileInfo {
  content: any;
}

export interface IClassLoaderOptions {
  classes?: ClassConstructor[];
  url?: URL;
  depth?: number;
  include?: (RegExp | string)[];
  exclude?: (RegExp | string)[];
}