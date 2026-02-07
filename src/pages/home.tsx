import FirstLayer from '../features/home/components/firstLayer';
import SecondLayer from '../features/home/components/secondLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import FourthLayer from '../features/home/components/fourthLayer';
import PanoramicLayer from '../features/home/components/panoramicLayer';
import FifthLayer from '../features/home/components/fifthLayer';
import SixthLayer from '../features/home/components/sixthLayer';
import SEO from '../components/SEO';

export default function Home() {

  return (
    <>
      <SEO
        title="Numa Travel | Travel planner"
        description="Travel planner indépendante, Numa Travel conçoit des voyages sur mesure en France et à l’étranger, adaptés à votre budget et à vos envies."
        canonicalPath="/"
      />
      <main>
        <section id='first-layer'><FirstLayer /></section>
        <SecondLayer />
        <section id="services-voyages"><ThirdLayer /></section>
        <section id="fourth-layer"><FourthLayer /></section>
        <section id="panoramic-layer"><PanoramicLayer /></section>
        <section id='travel-planner'><FifthLayer /></section>

        <div className="h-5 bg-numa-red"/>
        <div className="h-5 bg-numa-black"/>
        <div className="h-5 bg-numa-red"/>
        <div className="h-5 bg-numa-black"/>

        <section id="sixth-layer"><SixthLayer /></section>
      </main>
    </>
  );
}
