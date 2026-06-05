"use client";

import { useState } from "react";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperContent,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface StepperTravelPlannerProps {
  onSuccess: (data: any) => void;
}
const steps = [
  {
    id: "destination",
    title: "Destination",
    description: "Where do you want to go?",
    type: "text",
  },
  {
    id: "duration",
    title: "Duration",
    description: "How many days will you travel?",
    type: "number",
  },
  {
    id: "budget",
    title: "Budget",
    description: "What is your travel budget?",
    type: "number",
  },
  {
    id: "style",
    title: "Travel Style",
    description: "Choose your travel style",
    type: "select",
    options: ["Luxury", "Mid-range", "Backpacker"],
  },
  {
    id: "group",
    title: "amount of people",
    description: "how many people will join you in the travel?",
    type: "number",
  },
  {
    id: "preference",
    title: "Preference",
    description: "Tell us your interests and preferences",
    type: "textarea",
  },
];

function ContentBlock({
  step,
  value,
  onChange,
}: {
  step: (typeof steps)[number];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="bg-secondary text-secondary-foreground rounded-lg border p-4">
      <h3 className="font-medium text-lg">{step.title}</h3>

      <p className="text-muted-foreground mt-2">{step.description}</p>

      <div className="mt-4">
        {step.type === "text" && (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter destination"
          />
        )}

        {step.type === "number" && (
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter value"
          />
        )}

        {step.type === "textarea" && (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Food, nature, culture, shopping..."
            rows={5}
          />
        )}

        {step.type === "select" && (
          <Select value={value} onValueChange={(val) => onChange(val ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>

            <SelectContent>
              {step.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export default function StepperTravelPlanner({
  onSuccess,
}: StepperTravelPlannerProps) {
  const [current, setCurrent] = useState(steps[0].id);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    destination: "",
    duration: "",
    budget: "",
    style: "",
    group: "",
    preference: "",
  });

  const currentIndex = steps.findIndex((step) => step.id === current);
  const isLastStep = currentIndex === steps.length - 1;

  const goNext = () => {
    if (!isLastStep) setCurrent(steps[currentIndex + 1].id);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrent(steps[currentIndex - 1].id);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error);
      }

      console.log("trip plan original:", result.data);
      const parsedData =
        typeof result.data === "string" ? JSON.parse(result.data) : result.data;

      console.log("trip plan setelah di-parse:", parsedData);

      onSuccess(parsedData);

      // Opsional: Scroll otomatis ke bawah agar user tahu hasilnya sudah muncul
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Submit error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <Stepper
        steps={steps}
        value={current}
        onValueChange={setCurrent}
        orientation="vertical"
        className="w-full"
      >
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.id}>
              <div className="flex flex-col">
                <div className="w-64 shrink-0">
                  <StepperItem stepId={step.id} className="justify-start">
                    <StepperTrigger className="flex items-start gap-3">
                      <StepperIndicator>{index + 1}</StepperIndicator>

                      <div className="ml-2 text-left">
                        <StepperTitle>{step.title}</StepperTitle>

                        <StepperDescription>
                          {step.description}
                        </StepperDescription>
                      </div>
                    </StepperTrigger>
                  </StepperItem>
                </div>

                <div className="ml-12">
                  <StepperContent value={step.id}>
                    <div className="mt-2 md:w-xl xl:w-2xl">
                      <ContentBlock
                        step={step}
                        value={answers[step.id as keyof typeof answers]}
                        onChange={(value) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [step.id]: value,
                          }))
                        }
                      />
                    </div>
                  </StepperContent>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="secondary"
              onClick={goBack}
              disabled={currentIndex === 0}
            >
              <ArrowLeftIcon className="size-4" />
              Previous
            </Button>

            {isLastStep ? (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner />
                    Generating...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            ) : (
              <Button onClick={goNext}>
                Next
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </Stepper>
    </div>
  );
}
