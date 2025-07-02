import WebringIcon from "./icon.custom";

export default function Footer() {
    return (
      <footer className="flex flex-col items-center justify-center pb-2">
        <div className="text-foreground dark:text-foreground-dark">
          <p className="font-gambetta font-semibold text-base">Made with <span className="text-accent"> ♥ </span> by Aadya</p>
        </div> 
  
        <div className="flex items-center gap-2 pt-2 text-2xl">
            <a href='https://cs.uwatering.com/#www.aadyakhanna.com?nav=prev' className="hover:text-accent">☜</a>
            <a href='https://cs.uwatering.com/#www.aadyakhanna.com' target='_blank' rel="noopener noreferrer">
                <WebringIcon 
                className="text-foreground dark:text-foreground-dark hover:text-accent dark:hover:text-accent" 
                />
            </a>
            <a href='https://cs.uwatering.com/#www.aadyakhanna.com?nav=next' className="hover:text-accent" > ☞</a>
        </div>
      </footer>
    );
}

