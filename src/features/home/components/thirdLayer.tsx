import itineraire from '../assets/itineraire.webp';
import vols from '../assets/vols.webp';
import logements from '../assets/logements.webp';
import activites from '../assets/activity.webp';
import carnet from '../assets/carnet.webp';
import assistance from '../assets/assistance.webp';
import React from 'react';

import useDevice from '../../../hook/useDevice';
import useAutoScrollPingPong from "../hooks/useAutoMarqueeScroll";

export default function ThirdLayer(){
    
    const { islaptop, istouchpad } = useDevice();

    const itineraryCard = 
    <Card
        title="ITINERAIRES"
        description="Des parcours personnalisés, pensés selon vos envies, votre rythme et votre style de voyage."
        img={itineraire}
        alt="photo pour illustrer les itinéraires"
    />
    const flyCard = 
    <Card
        title="VOLS"
        description="Sélection des meilleures options de vols en fonction de vos dates, de votre budget et de vos priorités."
        img={vols}
        alt="photo pour illustrer les vols"
    />
    const hotelCard =
    <Card
        title="LOGEMENTS"
        description="Recommandation d’hébergements adaptés à votre voyage, entre confort, emplacement et authenticité."
        img={logements}
        alt="photo pour illustrer les logements"
    />
    const activityCard =
    <Card
        title="ACTIVITÉS"
        description="Suggestions d’activités et d’expériences en accord avec vos centres d’intérêt et la destination."
        img={activites}
        alt="photo pour illustrer les activités"
    />
    const guideCard =
    <Card
        title="CARNET DE VOYAGE"
        description="Un guide complet et personnalisé regroupant toutes les informations utiles pour voyager sereinement."
        img={carnet}
        alt="photo pour illustrer le carnet de voyage"
    />
    const supportCard =
    <Card
        title="ASSISTANCE VOYAGE"
        description="Un accompagnement avant et pendant le voyage pour vous conseiller et vous aider en cas de besoin."
        img={assistance}
        alt="photo pour illustrer l'assistance voyage"
    />

    return (
        <section className="xl:min-h-screen bg-numa-black text-numa-white">
            <h1 className="pt-10 pb-0 font-cormorant font-bold text-[50px] lg:text-[55px] text-numa-white text-center">Mes services</h1>
            <div className="mx-auto h-1 w-[10vw] mt-4 bg-numa-white mb-10"></div>
            <div className="mx-auto flex w-full flex-col items-center justify-evenly gap-10 py-10">
                {   islaptop ? laptopCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}) : istouchpad ? touchpadCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}) : MobileCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard})}
            </div>
        </section>
    )
}

interface LayoutProps{
    itineraryCard: React.ReactNode;
    flyCard: React.ReactNode;
    hotelCard: React.ReactNode;
    activityCard: React.ReactNode;
    guideCard: React.ReactNode;
    supportCard: React.ReactNode;
}

function laptopCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}:LayoutProps) {
    return (
        <div className="grid w-full grid-cols-3 gap-10 px-4 gap-y-16">
            {itineraryCard}
            {flyCard}
            {hotelCard}
            {activityCard}
            {guideCard}
            {supportCard}
        </div>
    );
}

function MobileCardLayout({
  itineraryCard,
  flyCard,
  hotelCard,
  activityCard,
  guideCard,
  supportCard,
}: LayoutProps) {
  const cards = [itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard];

  const { scrollerRef, interactionHandlers } = useAutoScrollPingPong(40);

  return (
    <div className="w-full px-4">
      <div className="overflow-hidden">
        <div
          ref={scrollerRef}
          {...interactionHandlers}
          className="hide-scrollbar overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
           <div className="flex flex-nowrap gap-6 w-max py-2">
              {cards.map((card, i) => (
                <div key={i} className="w-[260px] sm:w-[300px] md:w-[340px] flex-none">
                  {card}
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}



function touchpadCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}:LayoutProps) {
    return (
        <div className="grid w-full grid-cols-2 gap-10 px-4">
            {itineraryCard}
            {flyCard}
            {hotelCard}
            {activityCard}
            {guideCard}
            {supportCard}
        </div>
    );
}

interface CardProps {
    title: string;
    description: string;
    img: string;
    alt: string
}

function Card({ title, description, img, alt }: CardProps) {
  return (
    <div className="flex flex-col items-center text-numa-white text-center">
      <img
        src={img}
        alt={alt}
        className="w-full h-[180px] sm:h-[200px] object-cover rounded-md mb-4"
      />
      <h2 className="text-[22px] sm:text-[24px] font-bold font-cormorant pb-3">
        {title}
      </h2>
      <p className="text-[16px] sm:text-[18px] font-cormorant">
        {description}
      </p>
    </div>
  );
}