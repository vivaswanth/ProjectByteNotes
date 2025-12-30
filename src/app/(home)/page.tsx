import { ArrowUpRight, LinkedinIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { GITHUB_URL, TURBOSTARTER_URL, FUMADOCS_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Hero />
      <Footer />
    </div>
  );
}

const Hero = () => {
  return (

    <div className="flex flex-1 flex-col justify-center items-center text-center gap-2 relative p-6">
      <h1 className="max-w-6xl text-balance font-semibold text-6xl leading-tighter tracking-tighter! sm:text-6xl md:max-w-4xl md:text-7xl ">
        <span className="font-semibold text-5xl md:text-6xl leading-tight text-left">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Byte Notes 
          </span>
        </span>
      </h1>

      <p className="max-w-xl text-balance text-center md:max-w-3xl md:text-lg lg:text-xl leading-snug">
        Hi, I’m Vidya — a Senior Java Full Stack Developer with nearly a decade of experience designing and building scalable web applications and Agentic AI-driven solutions to deliver impactful user experiences and accelerate business outcomes.
      </p>

      <p className="max-w-xl text-balance text-center text-muted-foreground md:max-w-2xl leading-relaxed">
        My work primarily involves developing complex business and financial platforms using Java, Spring Boot, Angular, and React. 
        Alongside my professional projects, I pursued a master’s in Data Science, where I gained hands-on experience in deep learning and neural network–based anomaly detection using Python.
      </p>
      
      <div className="flex gap-4 mt-4">
        <Link
          href="/docs/cs-101"
          className={buttonVariants({ variant: "default", size: "lg" })}>
          <ArrowUpRight className="size-4" />
          Explore Articles
        </Link>
        <Link
          href="https://www.linkedin.com/in/vidya-vivaswanth/"
          target="new"
          className={buttonVariants({ variant: "secondary", size: "lg" })}>
          <Linkedin className="size-4" />
          Connect with me
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-4 md:py-6 text-center border-t border-dotted">
      <p className="text-muted-foreground text-sm">
        Made with ❤️ and{" "}
        <a
          href={FUMADOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          FumaDocs
        </a>{", "} powered by{" "}
        <a
          href={TURBOSTARTER_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          TurboStarter
        </a>{" "}
        by{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          @vivaswanth
        </a>
      </p>
    </footer>
  );
};
