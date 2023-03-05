import { SimpleFacebookCustomizer } from '@content/interfaces/simple-facebook-customizer';

declare global {
  interface Window {
    simpleFacebookCustomizer: SimpleFacebookCustomizer;
  }
}
