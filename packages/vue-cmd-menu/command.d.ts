import Vue, { PluginFunction, VueConstructor } from 'vue';

import { Action as ActionItem } from './src/types'

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
export interface InstallableComponent extends VueConstructor<Vue> {
  install: InstallFunction;
}

export type Action = ActionItem;

declare const CommandMenu: InstallableComponent;
export default CommandMenu;
