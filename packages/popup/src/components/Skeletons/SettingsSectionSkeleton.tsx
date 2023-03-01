import { h } from 'preact';
import Skeleton from '@popup/components/Skeletons/Skeleton';
import SettingsOptionSkeleton from '@popup/components/Skeletons/SettingsOptionSkeleton';
import '@popup/styles/settings-section.scss';

interface SettingsSectionSkeletonProps {
  options: number;
}

export default function SettingsSectionSkeleton(props: SettingsSectionSkeletonProps) {
  return (
    <section class="settings-section" data-skeleton>
      <h2 class="settings-section-title">
        <Skeleton />
      </h2>
      {Array.from({ length: props.options }, () => (
        <SettingsOptionSkeleton />
      ))}
    </section>
  );
}
