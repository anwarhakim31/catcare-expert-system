import Image from "next/image";
import React from "react";

const MarqueView = () => {
  return (
    <section className="relative  mt-20 mb-20 container h-[100px] flex items-center justify-center overflow-hidden">
      <div className="marquee-content ">
        <div className="relative chase-animation">
          <Image
            src={"/marquee/boiler.png"}
            alt="boiler"
            width={50}
            height={25}
          />
          <div className="relative h-full w-[100px] ">
            <Image
              src={"/marquee/birds.gif"}
              alt="birds"
              width={100}
              height={30}
              className="absolute -top-10 left-0"
            />
          </div>
          <div className="flex items-center">
            <Image
              src={"/marquee/grass1.png"}
              alt="birds"
              width={50}
              height={20}
            />
            <Image
              src={"/marquee/stone.png"}
              alt="birds"
              width={100}
              height={20}
            />
            <Image
              src={"/marquee/grass2.png"}
              alt="birds"
              width={50}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-end gap-4 justify-center">
        <Image src={"/cat.gif"} alt="cat" width={150} height={50} />
        <Image src={"/mouse.gif"} alt="mouse" width={100} height={25} />
      </div>
    </section>
  );
};

export default MarqueView;
