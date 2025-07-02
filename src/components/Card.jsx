import React from "react";
import 'remixicon/fonts/remixicon.css';


export default function ProjectCard({ title, description, tech, github, site, youtube }) 
{
    return (
      <div className="md:w-3/4 w-3/4 xl:w-1/2 rounded-xl border p-6 shadow-sm hover:shadow-black/40 hover:dark:shadow-white/40 transition hover:shadow-md mb-6 border-foreground dark:border-foreground-dark text-foreground dark:text-foreground-dark">
        <h3 className="text-xl font-plein font-semibold">{title}</h3>
        <p className="mt-1 font-plein text-sm">{description}</p>
   
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((stack, i) => (
            <span
              key={i}
              className="rounded-md bg-foreground/10 dark:bg-foreground-dark/10 px-2 py-1 text-xs font-plein font-medium "
            >
              {stack}
            </span>
          ))}
        </div>
  
        <div className="mt-4 flex items-center gap-4 text-xl">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              <i className="ri-github-line" />
            </a>
          )}
          {site && (
            <a href={site} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              <i className="ri-global-line" />
            </a>
          )}
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              <i className="ri-youtube-line" />
            </a>
          )}
        </div>
      </div>
    );
  }
  