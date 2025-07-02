// src/components/GallerySection.jsx
import React from 'react';
const fileNames = [
    'yelenakphoto_junbae_sholpan_-1.jpg',
  'yelenakphoto_junbae_sholpan_-1a.jpg',
  'yelenakphoto_junbae_sholpan_-2.jpg',
  'yelenakphoto_junbae_sholpan_-2a.jpg',
  'yelenakphoto_junbae_sholpan_-3 копия.jpg',
  'yelenakphoto_junbae_sholpan_-3.jpg',
  'yelenakphoto_junbae_sholpan_-4.jpg',
  'yelenakphoto_junbae_sholpan_-5.jpg',
  'yelenakphoto_junbae_sholpan_-5a.jpg',
  'yelenakphoto_junbae_sholpan_-6.jpg',
  'yelenakphoto_junbae_sholpan_-7.jpg',
  'yelenakphoto_junbae_sholpan_-8.jpg',
  'yelenakphoto_junbae_sholpan_-9.jpg',
  'yelenakphoto_junbae_sholpan_-10.jpg',
];

const images = fileNames.map(name => `${process.env.PUBLIC_URL}/gallery/${name}`);
export default function GallerySection() {
  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow">
            <img
              src={src}
              alt={`사진 ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}