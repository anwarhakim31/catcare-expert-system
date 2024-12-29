import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { accordionItems } from "@/utils/constant";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistic/home`, {
    cache: "no-store",
  });
  return res.json();
};

const FaqView = async () => {
  const data = await getData();

  const items = accordionItems(data?.data);
  return (
    <section className="flex  gap-8 pt-36 pb-30 container">
      <figure className="hidden lg:block lg:w-1/2 aspect-square">
        <Image
          src="/home/faq-img.png"
          alt="faq"
          width={500}
          height={500}
          quality={100}
          priority
          className="w-full h-auto object-cover"
        />
      </figure>

      <div className="w-full lg:w-1/2">
        <h3
          style={inter.style}
          className="text-xl sm:text-3xl  text-gray-900 tracking-wider  font-bold mb-14"
        >
          Paling Sering Ditanyakan di Catcare
        </h3>
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <AccordionItem value={item.value} key={item.value}>
              <AccordionTrigger className="text-base px-4 border border-b-0  rounded-tl-md rounded-tr-md font-medium">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="p-4 border-x rounded-bl-md rounded-br-md text-gray-700">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqView;
