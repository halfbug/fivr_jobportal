import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://source.unsplash.com/Q7wGvnbuwj0/1600x900',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: 'https://source.unsplash.com/rE9vgD_TXgM/1600x900',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'https://source.unsplash.com/_wDZkpybAfY/1600x900',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;