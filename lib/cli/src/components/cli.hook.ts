import { CommandDecorator, ICommand, CommandService } from '@nodearch/command';
import { AppContext, Hook, IHook, Logger } from '@nodearch/core';
import { LocalAppService } from './local-app.service.js';

@Hook()
export class CliHook implements IHook {

  constructor(
    private readonly commandService: CommandService,
    private readonly localAppService: LocalAppService,
    private readonly logger: Logger,
    private readonly appContext: AppContext
  ) {}

  async onStart() {
    this.logger.info(`Starting NodeArch CLI v${this.appContext.getSettings().version}`);
    this.logger.info(`Log Level: ${this.logger.getLogLevel()}`);
    this.logger.info(`Check https://nodearch.io for documentation and guides`);
    this.logger.info('Scanning for a local app...');
    
    // Scan & Load local app
    await this.localAppService.init();

    let localAppCommands: ICommand[] = [];

    const excludedCommands: string[] = [];
    
    if (this.localAppService.isAppDir) {
      const localApp = this.localAppService.app;
      const localAppInfo = this.localAppService.info;

      if (localAppInfo) {
        this.logger.info(`Local app found: ${localAppInfo.name} v${localAppInfo.version} - ${localAppInfo.loadMode.toUpperCase()} Mode`);
      }
      else {
        this.logger.warn(`Local app found but we were unable to load it.`);
      }

      /**
       * The fact that we are in an app directory doesn't mean
       * that the app exists or loaded correctly, so we still
       * need to check if the app is loaded correctly
       */
      if (localApp && !this.localAppService.hasLoadError) {
        localAppCommands = localApp.getContainer().getById<ICommand>(CommandDecorator.COMMAND);
      }
      else {
        excludedCommands.push('start');
      }

      excludedCommands.push('new');
    }
    else {
      excludedCommands.push('start');
      excludedCommands.push('build');
    }

    await this.commandService.start({ commands: localAppCommands, exclude: excludedCommands });
  }
}