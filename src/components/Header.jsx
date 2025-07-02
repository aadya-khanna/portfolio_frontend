import Toggle from './Toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-end text-background  dark:text-foreground">
      <div className="text-foreground dark:text-foreground-dark p-4 pb-3">
        <Toggle />
      </div>
    </header>
  );
}
