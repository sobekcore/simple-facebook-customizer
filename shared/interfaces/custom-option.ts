import { Option } from '@shared/interfaces/option';

export interface CustomOption extends Option {
  custom: true;
  edit: boolean;
}
