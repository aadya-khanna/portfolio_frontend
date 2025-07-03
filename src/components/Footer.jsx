import { HeartIcon } from '../components/Icons';

export default function Footer() {
    return (
      <footer className="flex flex-col items-center justify-center pb-2">
        <div className="text-foreground dark:text-foreground-dark">
          <p className="font-gambetta font-semibold text-base flex items-center justify-center gap-1">Made with <HeartIcon className="text-accent w-5 h-5"/> by Aadya</p>
        </div>
      </footer>
    );
}

