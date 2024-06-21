'use client'

import { SetStateAction, useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselButtonsComponent from "./CarouselButtons";
import Image from "next/image";
import { Card, CustomFlowbiteTheme } from "flowbite-react";
import { useRouter } from "next/navigation";

type CarouselProps = {
  characters: CharacterType[]
  // setCharacters: React.Dispatch<SetStateAction<CharacterType[]>>
  openCharacterInfo: (character: CharacterType) => void
}

const CarouselComponent = ({ characters, openCharacterInfo }: CarouselProps) => {

  const customCard: CustomFlowbiteTheme["card"] = {
    "root": {
      "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
      "children": "flex flex-col justify-start pt-2  gap-3 px-6 items-start !h-12",
      "horizontal": {
        "off": "flex-col",
        "on": "flex-col md:max-w-xl md:flex-row"
      },
      "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
    },
    "img": {
      "base": "h-[180px] w-full object-cover",
      "horizontal": {
        "off": "rounded-t-lg",
        "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
      }
    }
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="min-w-screen relative">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
        centerMode={false}
        className="w-full"
        containerClass="container-with-dots "
        dotListClass=""
        customButtonGroup={<CarouselButtonsComponent previous={() => { }} next={() => { }} />}
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {characters.slice(0, 8).map((character, idx) => (
          <div key={idx} className='col-span-1 mx-2 cursor-pointer' onClick={() => openCharacterInfo(character)}>
            <Card
              className="max-w-sm cursor-pointer"
              imgAlt={character.name}
              imgSrc={character.image || '/default.jpg'}
              theme={customCard}

            >
              <div className="w-full flex justify-center">
                <h5 className="text-lg font-poppinsMed tracking-tight font-kodchasan-medium text-gray-900 m-0 dark:text-white">
                  {character.name}
                </h5>
              </div>

            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselComponent
