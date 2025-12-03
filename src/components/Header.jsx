import Toggle from './Toggle';
import AudioToggle from './AudioToggle';
import TrackSelectDropdown from './TrackSelectDropdown';

export default function Header() {
  return (
    <header className="flex items-center justify-between text-background  dark:text-foreground">
      {/* Left-aligned dropdown */}
      <div className="text-foreground dark:text-foreground-dark p-4 pb-3">
        <TrackSelectDropdown />
      </div>

      {/* Right-aligned toggles */}
      <div className="flex space-x-2 items-center text-foreground dark:text-foreground-dark p-4 pb-3">
        <AudioToggle />
        <Toggle />
      </div>
    </header>
  );
}
