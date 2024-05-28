import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../assets/sass/Scopri.scss";

const Scopri = () => {
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
      <section className="scopri-section">
        <div className="d-flex justify-content-center align-items-center bg image-s1">
          <div className="d-flex flex-column text-white rounded-5 mx-3 p-3  glass">
            <h1 className=" p-3 bg-transparent text-center  h1-s">
              Scopri qualcosa sulla pesca subacquea
            </h1>
            <hr className="my-3" />
            <p className="p-s">
              Per praticare la pesca in apnea è fondamentale saper padroneggiare
              le principali tecniche. Stiamo infatti parlando di una disciplina
              sportiva che presenta non solo approcci differenti, ma anche
              strategie e movimenti precisi a seconda della tipologia di pesca
              che verrà scelta. Le principali tecniche sono la pesca
              all’agguato, quella all’aspetto e quella in tana.
            </p>
          </div>
        </div>
      </section>
      <section className="scopri-section">
        <div className="d-flex justify-content-center align-items-center bg image-s2">
          <div className="d-flex flex-column text-white p-4 rounded-5 mx-3  p-3 glass">
            <h1 className="text-center p-3 bg-transparent  h1-s">
              Pesca all’agguato
            </h1>
            <hr className="my-3" />
            <p className="p-s">
              L’agguato è una tecnica di pesca che si effettua in movimento e
              che si raffina con il tempo, comportando necessariamente una
              grandissima e adeguata acquaticità. Si pratica prevalentemente in
              condizioni di mare mosso, anche se può ritenersi efficace in
              qualunque situazione meteo. L’abilità sta nello scegliere i punti
              in cui praticare la tecnica, immaginando di incontrare un pesce o
              di seguirlo dopo averlo avvistato dalla superficie. Muoversi senza
              essere visti dalle prede è tutt’altro che semplice, avvicinarsi a
              prede notevoli lo è ancora meno.
            </p>
            <hr className="my-2" />
            <p className="p-s">
              La maggior parte delle volte si spara d’istinto o d’imbracciata.
              L’agguato richiede un enorme risparmio d’energia e l’abilità sta
              nel riuscire a muoversi bruciando il meno possibile. La muta
              subacquea in questo caso deve garantire un benessere termico.
              Sapersi muovere silenziosamente nell’acqua, senza movimenti
              bruschi e con attenzione, sarà la prima cosa da imparare.
            </p>
          </div>
        </div>
      </section>
      <section className="scopri-section">
        <div className="d-flex justify-content-center align-items-center bg image-s3">
          <div className="d-flex flex-column text-white p-4 rounded-5 mx-3  p-3 glass">
            <h1 className="text-center p-3 bg-transparent  h1-s">
              Pesca all’aspetto
            </h1>
            <hr className="my-3" />
            <p className="p-s">
              La pesca all’aspetto richiede un’alta autonomia da parte di chi la
              pratica e la capacità di restare immobile sul fondo. Il pescatore
              infatti dovrà nascondersi, attendendo l’arrivo del pesce. È
              richiesta grande esperienza, un’ottima preparazione fisica e
              grande autocontrollo. Tecnicamente si predilige l’uso di arbaleti
              più potenti che veloci, comunque la misura deve essere da 100
              centimetri in su, con variazioni in relazione alla trasparenza
              dell’acqua
            </p>
          </div>
        </div>
      </section>
      <section className="scopri-section">
        <div className="d-flex justify-content-center align-items-center bg image-s4">
          <div className="d-flex flex-column text-white p-4 rounded-5 mx-3  p-3 glass">
            <h1 className="text-center p-3 bg-transparent  h1-s">
              Pesca in tana
            </h1>
            <hr className="my-3" />
            <p className="p-s">
              Fra le tecniche più conosciute e “classiche” della pesca in apnea
              c’è la pesca in tana. Può essere praticata sia dagli esperti che
              dai principianti. Molto utile è saper distinguere le varie
              tipologie di tane, con il fondo sabbioso, sotto enormi lastroni,
              formate da piccoli e grandi massi accatastati, composte da blocchi
              artificiali di forma quadrata o tripodi. La discesa e
              l’avvicinamento alla tana richiedono un affinamento della tecnica.
            </p>
            <hr className="my-2" />
            <p className="p-s">
              Questa tecnica richiede massima rapidità di azione, prontezza di
              riflessi una volta individuata la preda da insidiare, e di
              conseguenza gli arbaleti non saranno mai lunghi. Per comprendere
              questa tecnica sarebbe opportuno immergersi con un compagno
              esperto, in generale il consiglio è quello di non desistere,
              dedicando molte giornate di pesca a questa pratica.
            </p>
          </div>
        </div>
      </section>
      <section className="scopri-section">
        <div className="d-flex justify-content-center align-items-center bg image-s5">
          <div className="d-flex flex-column text-white p-4 rounded-5 mx-3  p-3 glass">
            <h1 className="text-center p-3 bg-transparent h1-s">
              Regole della pesca in apnea
            </h1>
            <hr className="my-3" />
            <p className="p-s">
              Se le tecniche variano è fondamentale seguire comunque alcune
              regole generali per garantire la SICUREZZA e il divertimento in
              questo sport. Quando ci si immerge è importantissimo conoscere le
              regole del luogo e le limitazioni imposte dalle autorità.
              L’attrezzatura deve essere sempre adeguata per evitare problemi,
              mentre un elemento essenziale resta il buonsenso che, unito a una
              buona preparazione fisica e psicologica, permetterà di vivere in
              serenità uno sport.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Scopri;
