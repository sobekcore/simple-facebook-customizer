import { OptionState } from '@shared/enums/option-state';
import { Option } from '@shared/interfaces/option';

export interface CustomOption extends Option {
  custom: true;
  customSelector: boolean;
  customStyle: boolean;
  selectSimilar: boolean;
  state: OptionState;
  previous?: Partial<CustomOption>;
}
