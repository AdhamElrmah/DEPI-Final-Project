import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";

const CardsShow = ({ cards, renderCards }) => {
  return (
    <>
      <div className="relative px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          mousewheel={true}
          keyboard={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Mousewheel, Keyboard]}
          className="py-9"
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="h-full">{renderCards(card)}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardsShow;
