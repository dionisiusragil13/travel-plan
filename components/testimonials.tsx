import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Solo Backpacker & Travel Blogger",
    avatar: "https://mockmind-api.uifaces.co/content/human/97.jpg",
    testimonial:
      "This AI completely changed the way I solo travel. I just typed my random preferences, and it discovered hidden gems in Kyoto that I couldn’t find anywhere on Google. Absolutely love it!",
  },
  {
    name: "Raj Mehta",
    role: "Father of Two",
    avatar: "https://mockmind-api.uifaces.co/content/human/80.jpg",
    testimonial:
      "Planning a 5-day family trip used to take me weeks of stress. Itinera did it flawlessly in 30 seconds, optimized our budget, and kept my kids entertained with perfect activity pacing."
  },
  {
    name: "Emily Chen",
    role: "Digital Nomad",
    avatar: "https://mockmind-api.uifaces.co/content/human/113.jpg",
    testimonial:
      "The UX is incredibly seamless. I usually hate rigid itineraries, but the ability to quickly regenerate specific days while keeping my download offline-ready via PDF is a total lifesaver."
  },
  {
    name: "Daniel Kim",
    role: "Remote Software Engineer",
    avatar: "https://mockmind-api.uifaces.co/content/human/90.jpg",
    testimonial:
      "I've tried multiple travel planners, but none match the speed and precision of this AI. The route optimization is brilliant—it actually groups places by distance so you don't waste time in traffic."
  },
  {
    name: "Aisha Patel",
    role: "Weekend Explorer",
    avatar: "https://mockmind-api.uifaces.co/content/human/116.jpg",
    testimonial:
      "As someone with a hectic corporate job, I only have weekends to escape. This tool cuts down my research time to zero, allowing me to just generate a plan, pack my bags, and enjoy."
  },
  {
    name: "Liam Garcia",
    role: "Lifestyle Content Creator",
    avatar: "https://mockmind-api.uifaces.co/content/human/112.jpg",
    testimonial:
      "Beautiful aesthetics paired with robust AI capabilities. It beautifully balances standard tourist hotspots with authentic local experiences. Highly recommend it to anyone who loves traveling!"
  },
];

const Testimonials = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20">
      <h2 className="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Testimonials
      </h2>
      <p className="mt-2.5 text-balance text-center text-lg text-muted-foreground tracking-[-0.015em] sm:text-2xl">
        What our customers say about us
      </p>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(({ name, avatar, role, testimonial }, index) => (
          <div
            className="relative flex flex-col rounded-lg border bg-muted/70 px-5 pt-10 pb-3"
            key={index}
          >
            {/* Quote */}
            <span className="absolute top-2 left-4 font-satoshi text-8xl text-foreground/30">
              &ldquo;
            </span>

            <p className="grow py-6 font-medium text-lg">{testimonial}</p>
            <Separator />
            <div className="flex items-center gap-3 py-3.5">
              <img alt="" className="h-10 w-10 rounded-full" src={avatar} />
              <div className="flex flex-col">
                <p className="font-medium">{name}</p>
                <p className="text-muted-foreground text-sm">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
