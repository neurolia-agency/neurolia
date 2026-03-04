import {
  mobile,
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  inkSync,
  tracker,
  threejs,
  nextjs,
  express,
  java,
  jwt,
  nextauth,
  socialSphere,
  vega,
  tesla,
  shopify,
  meta,
  starbucks,
  speedvitals,
  nestjs,
  reactNative,
  prisma,
  trpc,
  postgresql,
  initialLetterLogo,
} from "../assets";

const initialLetterIcon = initialLetterLogo;
const remainingLetters = "imanshu";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: mobile,
  },
  {
    title: "Mobile Developer",
    icon: backend,
  },
  // {
  //   title: "Creator",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
    position: [0, 0, 0],
  },
  {
    name: "Next JS",
    icon: nextjs,
    position: [2, 0, 0],
  },
  {
    name: "Express JS",
    icon: express,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  // {
  //   name: "Java",
  //   icon: java,
  // },
  // {
  //   name: "JWT",
  //   icon: jwt,
  // },
  // {
  //   name: "NextAuth",
  //   icon: nextauth,
  // },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "NestJS",
    icon: nestjs,
  },
  { name: "React Native", icon: reactNative },
  { name: "Prisma", icon: prisma },
  { name: "tRPC", icon: trpc },
];

const projects = [
  {
    name: "Vega",
    description:
      "A media streaming app for mobile with 1000+ GitHub stars, 400,000+ downloads, and 1300+ community members.",
    features: [
      "Stream media from community-created extension providers.",
      "Show Movies/Series info and rating.",
      "Add to watchList option.",
      "Background Downloader.",
    ],
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "zustand",
        color: "pink-text-gradient",
      },
      {
        name: "expo",
        color: "orange-text-gradient",
      },
      {
        name: "nativewind",
        color: "purple-text-gradient",
      },
    ],
    image: vega,
    source_code_link: "https://github.com/Zenda-Cross/vega-app",
    live_link: "https://github.com/Zenda-Cross/vega-app",
  },
  {
    name: "Hayasaka",
    description:
      "A dynamic full-stack music streaming web application with Next.js 13 and MongoDB.",
    features: [
      "User authentication using NextAuth.js with JWT and OAuth providers.",
      "Play, pause, skip, and control the playback of songs.",
      "Users can Create, update and delete their own playlists and Add songs to favorites.",
      "Swipe and touch gestures for touch-responsive devices.",
      "PWA (Progressive Web App) support. ",
    ],
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "nextjs",
        color: "orange-text-gradient",
      },
      {
        name: "nextauth",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/himanshu8443/hayasaka",
    live_link: "https://hayasaka.vercel.app/",
  },
  {
    name: "InkSync",
    description:
      "A real-time collaborative whiteboard web application built with NextJs, Express, and Socket.io.",
    features: [
      "Users can create a room and invite others to join the room using a unique room code.",
      "Users can draw on the whiteboard and the changes will be reflected in real-time to all the users in the room.",
      "Save and load whiteboard sessions.",
    ],
    tags: [
      {
        name: "NextJs",
        color: "blue-text-gradient",
      },
      {
        name: "ExpressJs",
        color: "green-text-gradient",
      },
      {
        name: "Socket.io",
        color: "pink-text-gradient",
      },
      {
        name: "Tailwind",
        color: "orange-text-gradient",
      },
      {
        name: "NodeJs",
        color: "blue-text-gradient",
      },
    ],
    image: inkSync,
    source_code_link: "https://github.com/himanshu8443/InkSync",
    live_link: "https://inksynk.vercel.app/",
  },
  {
    name: "Social Sphere",
    description:
      "A full-stack social media application with user authentication, infinite scroll, and image and video uploads.",
    features: [
      "User authentication using JWT and OAuth providers.",
      "Infinite scroll for posts.",
      "Image and video uploads.",
      "Like, comment, and share posts.",
      "Follow and unfollow users.",
      "Dark mode support.",
    ],
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "Supabase",
        color: "pink-text-gradient",
      },
      {
        name: "tailwind",
        color: "orange-text-gradient",
      },
      {
        name: "redux",
        color: "blue-text-gradient",
      },
    ],
    image: socialSphere,
    source_code_link: "https://github.com/himanshu8443/SocialSphere",
    live_link: "https://socialspherex.vercel.app/",
  },
];

const experiences = [
  {
    title: "Frontend Developer Intern",
    company_name: "SpeedVitals",
    icon: speedvitals,
    iconBg: "#383E56",
    date: "Feb 2025 - April 2025",
    points: [
      "Architected and developed the Real User Monitoring (RUM) web application from scratch using React, Vite, and Tailwind CSS.",
      "Integrated Apache Charts to visualise complex performance datasets, providing actionable insights for business clients.",
      "Collaborated with design and backend teams to integrate new features and enhance user experience.",
      "Tech Stack - React, Tailwind, Vite, Apache Charts.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "SpeedVitals",
    icon: speedvitals,
    iconBg: "#383E56",
    date: "April 2025 - Present",
    points: [
      "Spearheaded the migration of the core platform from Sails.js to Next.js, reducing page load times and improving Core Web Vitals scores.",
      "Implemented Server-Side Rendering (SSR) and Static Site Generation (SSG), resulting in a measurable boost in SEO rankings and faster Time to First Byte (TTFB).",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  initialLetterIcon,
  remainingLetters,
};
