import React from "react";
import "../assets/sass/Footer.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const login = useSelector((state) => state.login.userData);
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };
  const handleNavigateScopri = () => {
    navigate("/scopri");
  };

  return (
    <footer>
      <section className="d-flex justify-content-between">
        <h1 className="mt-h1-footer text-white rounded-5 w-50 ms-5 p-3">
          Iscriviti per far parte della nostra community di pescatori!
        </h1>
        {login ? (
          <div className="d-flex justify-content-center ">
            <Button
              className="btn-login fw-bold px-4 py-2 fs-3 bot"
              onClick={() => handleNavigateScopri()}
            >
              Scopri di Più
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-center ">
            <Button
              className="btn-login fw-bold px-4 py-2 fs-3 bot"
              onClick={() => handleNavigateLogin()}
            >
              ISCRIVITI
            </Button>
          </div>
        )}

        <div className="background ">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="100%"
            height="100%"
            viewBox="0 0 1600 900"
          >
            <defs>
              <path
                id="wave"
                fill="rgba(0,191,230, 1)"
                d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
      s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
              />
            </defs>
            <g>
              <use xlinkHref="#wave" opacity=".4">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="8s"
                  calcMode="spline"
                  values="270 230; -334 180; 270 230"
                  keyTimes="0; .5; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacity=".6">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="6s"
                  calcMode="spline"
                  values="-270 230;243 220;-270 230"
                  keyTimes="0; .6; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacty=".9">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="4s"
                  calcMode="spline"
                  values="0 230;-140 200;0 230"
                  keyTimes="0; .4; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
            </g>
          </svg>
        </div>

        <div className="footer-links text-secondary fs-5 position-absolute bottom-0 flex-column d-flex jutify-content-center align-items-center w-100">
          <ul className="socials">
            <li className="white-nav_links">
              <i className="bi bi-twitter-x "></i>
            </li>
            <li className="white-nav_links">
              <i className="bi bi-facebook "></i>
            </li>
            <li className="white-nav_links">
              <i className="bi bi-linkedin "></i>
            </li>
          </ul>
          <ul className="links">
            <li className="white-nav_links">
              <a>Home</a>
            </li>
            <li className="white-nav_links">
              <a>About</a>
            </li>
            <li className="white-nav_links">
              <a>Portfolio</a>
            </li>
            <li className="white-nav_links">
              <a>Skillset</a>
            </li>
            <li className="white-nav_links">
              <a>Hire</a>
            </li>
          </ul>
          <p className="legal">© 2024 Davide Paderi</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
