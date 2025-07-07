import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductSlide from "../ProductSlide/ProductSlide";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import styles from "./SliderComponent.module.scss";
import SampleNextArrow from "../SampleNextArrow/SampleNextArrow";
import SamplePrevArrow from "../SamplePrevArrow/SamplePrevArrow";

const settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1452.98,
      settings: {
        slidesToShow: 4.5
      }
    },
    {
      breakpoint: 1390.98,
      settings: {
        slidesToShow: 4
      }
    },
      {
        breakpoint: 1299.98,
        settings: {
          slidesToShow: 3
        }
      },

      {
        breakpoint: 1079.98,
        settings: {
          slidesToShow: 2.5
        }
      },

      {
        breakpoint: 976.98,
        settings: {
          slidesToShow: 2
        }
      },

      {
        breakpoint: 683.98,
        settings: {
          slidesToShow: 1.5
        }
      }
    ]
};

function SliderComponent({token, idCategories, idProduct}) {
  const products = useProductsByCategory(token, idCategories);

  const filteredProducts = products.filter(
    (product) => product.id_bas !== idProduct
  );

  return (

      <div className={styles.slideWraper}>
        <Slider {...settings}>
        {filteredProducts.map((product) => (
            <ProductSlide
              key={product.id_bas} 
              product={product} 
            />
          ))}
        </Slider>
    </div>
  );
}

export default SliderComponent;
