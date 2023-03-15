import { h } from 'preact';
import '@popup/styles/skeletons/skeleton.scss';

export default function Skeleton() {
  return (
    <div aria-busy="true" class="skeleton">
      Loading
    </div>
  );
}
