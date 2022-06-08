import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";
import "react-multi-carousel/lib/styles.css";
import Section from "./Section";
import "./CarouselNetflix.css";
const base_URL = "https://image.tmdb.org/t/p/original";

const CarouselNetflix = ({ movies, handleClick, isLargeRow }) => {
  let responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      paritialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      paritialVisibilityGutter: 30,
    },
  };
  if (isLargeRow) {
    responsive.desktop.items = 10;
    responsive.tablet.items = 6;
    responsive.mobile.items = 3;
  } else {
    responsive.desktop.items = 5;
    responsive.tablet.items = 3;
    responsive.mobile.items = 1;
  }
  return (
    <Section>
      <Carousel
        containerClass="classContainer"
        swipeable={true}
        draggable={false}
        partialVisible={false}
        infinite={true}
        shouldResetAutoplay={false}
        itemClass="image-item"
        responsive={responsive}
      >
        {movies.map((image, i) => {
          return (
            <Image
              key={i}
              style={{
                width: "100%",
                height: "100%",
              }}
              src={`${base_URL}${
                isLargeRow ? image.poster_path : image.backdrop_path
              }`}
              className="imgBorder"
              onClick={() => handleClick(image)}
            />
          );
        })}
      </Carousel>
    </Section>
  );
};

export { CarouselNetflix };
