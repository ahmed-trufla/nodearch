import { App, AppContext, IAppInfo, Logger, Service } from '@nodearch/core';
import Mocha, {Test} from 'mocha';
import NYC from 'nyc';
import { ITestOptions } from './test.interfaces.js';
// import open from 'open';
import path from 'path';
import { TestMode } from '../annotation/test.enums.js';
import { FileLoader } from '@nodearch/core/fs';
import { TestService } from './test.service.js';


@Service()
export class MochaService {

  constructor(
    private readonly appContext: AppContext,
    private readonly testService: TestService,
    private readonly logger: Logger
  ) {}

  async run(options: ITestOptions) {
    this.logger.info('Running test cases using Mocha');

    let nyc: NYC | undefined = undefined;

    if (options.generalOptions.coverage) {
      nyc = new NYC(
        {
          ...options.nycOptions,
          cwd: this.appContext.appInfo.paths.rootDir,
          extension: [ '.ts' ],
          // TODO: load src directory path based on appInfo.paths
          include: [ 'src/**/**.ts' ],
          exclude: [ 'node_modules', 'src/**/**.spec.ts', 'src/**/**.test.ts' ],
          hookRequire: true
        }
      );
      await nyc.reset();
      await nyc.wrap();
      await nyc.addAllFiles();
    }

    // TODO: validate this step
    // delete require.cache[require.resolve(filePath)];

    // TODO: use AppLoader instead 
    // const MainApp: any = (await FileLoader.importModule(this.appContext.appInfo.paths.app)).default;

    // const app: App = new MainApp();
    // await app.init({
    //   mode: 'app',
    //   appInfo: this.appContext.appInfo
    // });
    
    // if (options.generalOptions.mode.includes(TestMode.E2E)) {
    //   await app.start();
    // }

    const suites = await this.testService.getTestSuitesInfo(options.generalOptions.mode);
  
    const mochaInstance = new Mocha(options.mochaOptions);

    suites.forEach((suite: any) => {
      const suiteInstance = Mocha.Suite.create(mochaInstance.suite, suite.name);
  
      suite.beforeAll.forEach((beforeAll: any) => {
        suiteInstance.beforeAll(
          beforeAll.title || beforeAll.fn.name,
          beforeAll.fn.bind(beforeAll.fn)
        );
      });
  
      suite.afterAll.forEach((afterAll: any) => {
        suiteInstance.afterAll(
          afterAll.title || afterAll.fn.name,
          afterAll.fn.bind(afterAll.fn)
        );
      });
  
      suite.beforeEach.forEach((beforeEach: any) => {
        suiteInstance.beforeEach(
          beforeEach.title || beforeEach.fn.name,
          beforeEach.fn.bind(beforeEach.fn)
        );
      });
  
      suite.afterEach.forEach((afterEach: any) => {
        suiteInstance.afterEach(
          afterEach.title || afterEach.fn.name,
          afterEach.fn.bind(afterEach.fn)
        );
      });
  
      suite.testCases.forEach((testCase: any) => {
        suiteInstance.addTest(
          new Test(testCase.title, testCase.fn ? testCase.fn.bind(testCase.fn) : undefined)
        );
      });
  
    });
  
    const code: number = await (new Promise((resolve, reject) => {
      mochaInstance.run((failures) => {
        resolve(failures);
      });
    }));
  
    if (nyc) {
      await nyc.writeCoverageFile();
      await nyc.report();
      
      if (options.generalOptions.openCoverage) {
        await this.openCoverageReport(this.appContext.appInfo, options.nycOptions);
      }
    }

    return code;
  }

  private async openCoverageReport(appInfo: IAppInfo, nycOptions: Record<string, any>) {
    const reporters = nycOptions.reporter;
    const htmlEnabled = reporters.includes('lcov') || reporters.includes('html');
    
    if (!htmlEnabled) return;

    // const reportSpecificPath = reporters.includes('html') ? 'index.html' : path.join('lcov-report', 'index.html');

    // const htmlPath = path.join(appInfo.paths.rootDir, nycOptions.reporterDir, reportSpecificPath);

    // await open(htmlPath, { wait: true });

  }
}