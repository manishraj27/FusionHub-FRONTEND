import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import SparklesText from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const MainHome = () => {
  return (
    <section id="hero" aria-label="hero section">
      <div className="relative min-h-[700px] w-full overflow-hidden rounded-lg bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Announcement Banner */}
          <div className="z-10 pt-32 flex justify-center">
            <div className="group rounded-full border border-black/5 bg-neutral-100 transition-all hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 text-sm text-neutral-900 dark:text-neutral-200">
                <span>✨Manage project with your friends!</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 mx-auto max-w-5xl pt-8 pb-24 text-center">
            <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              FusionHub : Project and Portfolio Management{" "}
              <SparklesText className="text-red-400" text="SYSTEM" />
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-semibold">
              Simplify your project management with FusionHub. Create, manage, and track your projects with ease.
              Share your portfolios with your friends and employers and get feedbacks from them.
            </p>

          
          </div>
        </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      </div>

    </section>
  );
}

export default MainHome