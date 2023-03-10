import { SectionState } from '@shared/enums/section-state';
import { Section } from '@shared/interfaces/section';
import { CustomOption } from '@shared/interfaces/custom-option';

export interface CustomSection extends Section {
  custom: true;
  name: string;
  options: CustomOption[];
  state: SectionState;
}
