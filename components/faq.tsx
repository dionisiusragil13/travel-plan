import {
  CircleDollarSign,
  Clock,
  Package,
  Download,
  PackageX,
  Plane,
  Sparkles,
  Waypoints,
  UserCheck,
  Sliders,
  Coins,
  Compass,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI travel planner work?",
    answer:
      "Our AI analyzes your travel preferences such as destination, duration, budget, and activities and instantly generates a customized, comprehensive day-by-day itinerary tailored just for you.",
    icon: Sparkles,
  },
  {
    question: "Can I download my travel plan as a PDF?",
    answer:
      "Yes, absolutely! Once the AI generates your itinerary, you can easily download it as a beautifully formatted PDF to keep it accessible offline during your trip.",
    icon: Download,
  },
  {
    question: "Do I need an account to create a travel plan?",
    answer:
      "You can try out the AI planner and generate your itinerary for free without signing up. However, you will need to create a free account or log in to download the final PDF version.",
    icon: UserCheck,
  },
  {
    question: "Can I customize the itinerary after it is generated?",
    answer:
      "Yes! The initial generation is just the starting point. You can easily adjust your preferences, regenerate specific days, or swap out activities until the plan fits your needs perfectly.",
    icon: Sliders,
  },
  {
    question: "Is this service free to use?",
    answer: "Generating your travel plans on our website is completely free. We offer core planning features and standard PDF downloads at zero cost to help you get ready for your next adventure.",
    icon: Coins,
  },
  {
    question: "Does the AI support international travel destinations?",
    answer:
      "Yes! Our AI planner is powered by global travel data, meaning you can plan trips for thousands of cities and hidden gems all around the world, whether it's a local weekend getaway or an international vacation.",
    icon: Compass,
  },
];

const FAQ = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20">
      <h2 className="text-balance text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
        Frequently Asked Questions
      </h2>
      <p className="mt-3 text-balance text-center text-lg text-muted-foreground md:text-2xl md:tracking-[-0.015em]">
        Find answers to common questions about our services
      </p>

      <div className="mx-auto mt-12 max-w-2xl sm:mt-16">
        <Accordion className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              className="rounded-xl not-last:border-b-0 bg-muted px-5"
              key={index}
              value={faq.question}
            >
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <faq.icon className="mr-2.5 size-5" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="relative pl-10 text-base">
                {faq.answer}
                <div className="absolute inset-y-0 left-2.5 border-foreground/10 border-s border-dashed" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
