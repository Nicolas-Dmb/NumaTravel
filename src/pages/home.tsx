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
        title="Numa Travel | Travel planner Indonésie"
        description="Travel planner indépendante spécialisée Indonésie, Numa Travel conçoit des voyages sur mesure de Bali à Raja Ampat, adaptés à votre budget et à vos envies."
        canonicalPath="/"
      />
      <main>
        <section id='first-layer'><FirstLayer /></section>
        <SecondLayer />
        <section id="services-voyages"><ThirdLayer /></section>
        <section id="fourth-layer"><FourthLayer isWhiteBackground={false} /></section>
        <section id="panoramic-layer"><PanoramicLayer /></section>
        <section id='travel-planner'><FifthLayer /></section>
        <section id="sixth-layer"><SixthLayer /></section>
      </main>
    </>
  );
}
