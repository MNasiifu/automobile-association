import { menuIcons } from '../data/navigationIcons';

export type MenuIconKey = keyof typeof menuIcons;

export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly children?: ReadonlyArray<{
    readonly label: MenuIconKey;
    readonly path: string;
  }>;
}