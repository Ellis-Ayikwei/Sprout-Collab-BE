import React from 'react';



const Features = () => {
  const features = [
    {
      icon: 'path/to/your/icon1.svg',
      title: 'Feature 1',
      description: 'A short description of Feature 1',
    },
    {
      icon: 'path/to/your/icon2.svg',
      title: 'Feature 2',
      description: 'A short description of Feature 2',
    },
    {
      icon: 'path/to/your/icon3.svg',
      title: 'Feature 3',
      description: 'A short description of Feature 3',
    },
  ];

  return (
    <div className='styled-features'>
      {features.map((feature) => (
        <div key={feature.title}>
          <img src={feature.icon} alt={feature.title} />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
