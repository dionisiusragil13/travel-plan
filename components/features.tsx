const features = [
  {
    title: "AI driven discovery",
    description: "Find untapped destinations and hidden gems tailored perfectly to your travel style.",
    image: "https://www.fffuel.co/images/dddepth-preview/dddepth-051.jpg",
  },
  {
    title: "Smart Budgeting",
    description: "Optimize your travel expenses intelligently with data-driven cost estimations.",
    image: "https://www.fffuel.co/images/dddepth-preview/dddepth-248.jpg",
  },
  {
    title: "Instant Itineraries",
    description: "Generate comprehensive day-by-day plans and download your ready-to-go PDF instantly.",
    image: "https://www.fffuel.co/images/dddepth-preview/dddepth-034.jpg",
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="mx-auto text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          Where Journeys Take Shape
        </h2>
        <p className="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
          No complex configs. Just type your preferences and let AI build your perfect trip.
        </p>
        <div className="mt-18 grid w-full gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="flex w-full flex-col text-start"
              key={feature.title}
            >
              <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-xl sm:mb-6">
                <img
                  alt=""
                  className="size-full bg-muted object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={feature.image}
                />
              </div>
              <div className="px-1">
                <span className="font-medium text-[22px] tracking-[-0.015em]">
                  {feature.title}
                </span>
                <p className="mt-1 max-w-[25ch] text-[17px] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
