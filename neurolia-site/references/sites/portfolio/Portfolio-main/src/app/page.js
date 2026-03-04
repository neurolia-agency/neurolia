import {
  About,
  Contact,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "@/components";
import Experience from "@/components/Experience";
import Feedbacks from "@/components/Feedbacks";
import IntroWrapper from "@/components/IntroWrapper";

export default function Home() {
  return (
    <IntroWrapper>
      <div>
        <Navbar />
        <Hero />
        <div className="bg-primary relative z-[1] h-full">
          <div className="relative z-[1]">
            <About />
            {/* <Experience /> */}
            <div className="overflow-hidden">
              <Tech />
            </div>
            <Works />
            {/* <Feedbacks /> */}
            <Contact />
          </div>
          <StarsCanvas />
        </div>
      </div>
    </IntroWrapper>
  );
}
