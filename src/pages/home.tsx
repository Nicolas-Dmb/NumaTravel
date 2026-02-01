import SectionNavigator from "../features/home/components/sectionNavigator";

import FirstLayer from '../features/home/components/firstLayer';
import SecondLayer from '../features/home/components/secondLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import FourthLayer from '../features/home/components/fourthLayer';
import PanoramicLayer from '../features/home/components/panoramicLayer';
import FifthLayer from '../features/home/components/fifthLayer';
import SixthLayer from '../features/home/components/sixthLayer';
import isDevice from "../hook/useDevice";

export default function Home() {
  const { islaptop} = isDevice();
  const sections = [
    { id: "first-layer", label: "Accueil" },
    { id: "services-voyages", label: "Services" },
    { id: "fourth-layer", label: "Qui suis-je" },
    { id: "panoramic-layer", label: "Image" },
    { id: "travel-planner", label: "Travel planner" },
    { id: "sixth-layer", label: "Les étapes" },
  ];

  return (
    <div>
      {!islaptop && <SectionNavigator sections={sections} />}

      <section id='first-layer'><FirstLayer /></section>
      <section id="first-layer"><SecondLayer /></section>
      <section id="services-voyages"><ThirdLayer /></section>
      <section id="fourth-layer"><FourthLayer /></section>
      <section id="panoramic-layer"><PanoramicLayer /></section>
      <section id='travel-planner'><FifthLayer /></section>

      <div className="h-5 bg-numa-red"/>
      <div className="h-5 bg-numa-black"/>
      <div className="h-5 bg-numa-red"/>
      <div className="h-5 bg-numa-black"/>

      <section id="sixth-layer"><SixthLayer /></section>
    </div>
  );
}
