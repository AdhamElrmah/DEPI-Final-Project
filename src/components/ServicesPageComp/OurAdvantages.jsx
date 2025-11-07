import React from 'react';
import { Button } from '../UI/button';
import A1 from '../../assets/ServicesPage/OurAdvantages1.avif';
import A2 from '../../assets/ServicesPage/OurAdvantages2.avif';
import A3 from '../../assets/ServicesPage/OurAdvantages3.avif';
import A4 from '../../assets/ServicesPage/OurAdvantages4.avif';

const data = [
  { title: 'Airport pickup & drop off', description: 'Nothing looks more menacing than a hooded limousine. So, why bother to rent one and ride in one when you can drive yourself in a car like this.', price: '90', tags: ['Private driver'], img: A4 },
  { title: 'Private chauffeur services', description: 'She was a champion body builder and since then she has gone on to become one of the biggest stars in Hollywood now but she is hoping to start training.', price: '299', tags: ['Private driver', 'Luxury cars'], img: A1 },
  { title: 'Limousine service', description: 'I just set up the table and unpacked the last of my food. First I had to check on her before I could go to the dining room.', price: '90', tags: ['Private driver', 'Luxury cars'], img: A2 },
  { title: 'Long-term car rental', description: 'The cable was not done yet so we had to call my brother, then my other brother, then my other wife then my uncle, who was the one who suggested.', price: '90', tags: ['Luxury cars'], img: A3 },
];

const Card = ({ x }) => {
  const { title, description, price, tags, img } = x;
  return (
    <div className="bg-white rounded-xl overflow-hidden group cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          className="w-full object-cover aspect-[4/3] transition-all duration-300 group-hover:grayscale"
          src={img}
          alt={title}
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <Button variant="default" size="sm" className="bg-black text-white hover:bg-black hover:text-white">{`Starting from $${price}`}</Button>
          {tags?.map((y, i) => (
            <Button key={i} variant="default" size="sm" className="bg-black text-white hover:bg-black hover:text-white">{y}</Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OurAdvantages = () => (
  <section className="font-inter w-full py-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
      {data.map((x, i) => (
        <Card key={i} x={x} />
      ))}
    </div>
  </section>
);

export default OurAdvantages;