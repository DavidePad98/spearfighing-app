import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../assets/sass/Home.scss";

const Home = () => {
  const { innerHeight } = window;

  const getRatio = (el) => innerHeight / (innerHeight + el.offsetHeight);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray("section").forEach((section, i) => {
      section.bg = section.querySelector(".bg");

      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="home-section">
        <div className="d-flex align-items-center bg image1">
          <h1 className="text-white w-75 rounded-5 ms-5 p-3">
            SaltwaterSpearos è un punto d'incontro per gli appassionati di pesca
            subacquea, un luogo dove poter condividere esperienze, storie
            avvincenti e conoscenze con altri pescatori
          </h1>
        </div>
      </section>
      <section className="home-section">
        <div className="d-flex align-items-center bg image2">
          <h1 className="text-white  w-75 rounded-5 ms-5  p-3">
            Sia che tu sia un neofita desideroso di apprendere, o un esperto
            desideroso di condividere le tue avventure, qui troverai
            un'atmosfera accogliente e stimolante
          </h1>
        </div>
      </section>
      <section className="home-section">
        <div className="d-flex align-items-center bg image3">
          <h1 className="text-white  w-75 rounded-5 ms-5  p-3">
            Scopri, interagisci e lasciati ispirare dalla comunità di amanti
            della pesca subacquea
          </h1>
        </div>
      </section>
    </>
  );
};
export default Home;
