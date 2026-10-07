import { Component } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  tech: string;
  link?: string;
  links?: { label: string; url: string }[];
  image?: string;
}

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'L-Systems',
      description: 'A masters project researching L-Systems to generate trees, with an implementation in Minecraft to improve the realism of in-game trees.',
      tech: 'Java',
      image: 'assets/images/MC_Tree.png',
      link: 'https://github.com/Mawsonator/LSystemTrees'
    },
    {
      title: 'Generative Adversarial Networks',
      description: 'An AI to take simple line images representing craters and turn them into 3D terrain models.',
      tech: 'Python',
      image: 'assets/images/GAN_Moon.png'
    },
    {
      title: 'Typetastic App',
      description: 'A responsive Android app to measure typing speed, with profile creation and local/global leaderboards via Firebase.',
      tech: 'Java, Android Studio',
      image: 'assets/images/TypeTastic.png'
    },
    {
      title: 'Arduino Virtual Pet',
      description: 'A Tamagotchi-style virtual pet using custom characters on an Arduino with an Adafruit display.',
      tech: 'C++, Arduino',
      image: 'assets/images/Virtual_Pet.png'
    },
    {
      title: 'JavaScript Graphics',
      description: 'Smaller JavaScript projects I developed, porting from C#.',
      tech: 'JavaScript, Canvas',
      image: 'assets/images/JSShapes.PNG',
      links: [
        { label: 'Shapes_3D', url: 'assets/demos/Shapes3D.html' },
        { label: "Conway's Game of Life", url: 'assets/demos/Conway.html' },
        { label: 'Solitaire Demo', url: 'assets/demos/solitaire.html' },
      ]
    },
    {
      title: 'C# Projects',
      description: 'Various projects, from a 3D maze game to a plotter for differential equations.',
      tech: 'C#, SharpDevelop',
      image: 'assets/images/MazeFinder.png'
    },
  ];
}
