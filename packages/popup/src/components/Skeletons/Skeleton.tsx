import { h } from 'preact';
import '@popup/styles/skeleton.scss';

export default function Skeleton() {
  return (
    <div aria-busy="true" class="skeleton">
      Loading
    </div>
  );
}
