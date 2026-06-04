"use client";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function HeroSection1() {
  return (
    <section
      className="bg-background py-8"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-6 lg:gap-8">
          <div className="section-title-gap-xl flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 id="hero-heading" className="heading-xl">
              Solve your user's main problem
            </h1>
            <p className="text-muted-foreground text-lg/8 text-pretty">
              Follow with one or two sentences that expand on your value
              proposition and focus on key benefits.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 lg:justify-start ">
            <Link href="/travel">
              <Button className="bg-blue-900">Get started</Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary">Learn more</Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex-1">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/world-bro.png"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
