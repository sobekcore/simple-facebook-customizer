import { h } from 'preact';
import Skeleton from '@popup/components/Skeletons/Skeleton';
import '@popup/styles/settings-option/settings-option.scss';

export default function SettingsOptionSkeleton() {
  return (
    <div class="settings-option" data-skeleton>
      <div role="separator" class="settings-option-separator"></div>
      <div class="settings-option-content">
        <span class="settings-option-label">
          <Skeleton />
        </span>
      </div>
    </div>
  );
}
