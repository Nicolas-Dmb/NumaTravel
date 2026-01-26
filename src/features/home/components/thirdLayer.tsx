import itineraire from '../assets/itineraire.jpg';
import vols from '../assets/vols.jpg';
import logements from '../assets/logements.jpg';
import activites from '../assets/activity.jpg';
import carnet from '../assets/carnet.jpg';
import assistance from '../assets/assistance.jpg';
import React from 'react';
import useDevice from '../hook/useDevice';

export default function ThirdLayer(){
    
    const { islaptop, istouchpad } = useDevice();

    const itineraryCard = 
    <Card
        title="ITINERAIRES"
        description="Des parcours personnalisés, pensés selon vos envies, votre rythme et votre style de voyage."
        img={itineraire}
    />
    const flyCard = 
    <Card
        title="VOLS"
        description="Sélection des meilleures options de vols en fonction de vos dates, de votre budget et de vos priorités."
        img={vols}
    />
    const hotelCard =
    <Card
        title="LOGEMENTS"
        description="Recommandation d’hébergements adaptés à votre voyage, entre confort, emplacement et authenticité."
        img={logements}
    />
    const activityCard =
    <Card
        title="ACTIVITÉS"
        description="Suggestions d’activités et d’expériences en accord avec vos centres d’intérêt et la destination."
        img={activites}
    />
    const guideCard =
    <Card
        title="CARNET DE VOYAGE"
        description="Un guide complet et personnalisé regroupant toutes les informations utiles pour voyager sereinement."
        img={carnet}
    />
    const supportCard =
    <Card
        title="ASSISTANCE VOYAGE"
        description="Un accompagnement avant et pendant le voyage pour vous conseiller et vous aider en cas de besoin."
        img={assistance}
    />

    return (
        <section className="xl:min-h-screen bg-numa-black text-numa-white">
            <h1 className="pt-10 pb-0 font-cormorant font-bold text-[50px] lg:text-[55px] text-numa-white text-center">Mes services</h1>
            <div className="mx-auto h-1 w-[10vw] mt-4 bg-numa-white mb-10"></div>
            <div className="mx-auto flex w-full flex-col items-center justify-evenly gap-10 py-10">
                {   islaptop ? laptopCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}) : istouchpad ? touchpadCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}) : mobileCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard})}
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

function mobileCardLayout({itineraryCard, flyCard, hotelCard, activityCard, guideCard, supportCard}:LayoutProps) {
    return (
        <div className="w-full overflow-x-auto px-4">
            <div className="flex gap-6 snap-x snap-mandatory">
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {itineraryCard}
                </div>
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {flyCard}
                </div>
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {hotelCard}
                </div>
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {activityCard}
                </div>
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {guideCard}
                </div>
                <div className="snap-start min-w-[90%] sm:min-w-[80%] md:min-w-[33%]">
                {supportCard}
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
}

function Card({ title, description, img }: CardProps) {
    return (
        <div className="flex flex-col items-center text-numa-white text-center px-10">
            <img src={img} alt={title} className="w-[70vw] h-[30vh] lg:w-[20vw] lg:h-[20vh] object-cover rounded-md mb-4" />
            <h2 className="text-[26px] font-bold font-cormorant pb-8 md:pb-4 ">{title}</h2>
            <p className="text-[20px] font-bold font-cormorant">{description}</p>
        </div>
    );
}