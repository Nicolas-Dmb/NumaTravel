import default_img from '../assets/default_img.jpg';
import React from 'react';
import useDevice from '../hook/useDevice';

export default function ThirdLayer(){
    
    const { islaptop, istouchpad } = useDevice();

    const itineraryCard = 
    <Card
        title="ITINERAIRE"
        description="Un parcours personnalisé, pensé selon vos envies, votre rythme et votre style de voyage."
        img={default_img}
    />
    const flyCard = 
    <Card
        title="VOLS"
        description="Sélection des meilleures options de vols en fonction de vos dates, de votre budget et de vos priorités."
        img={default_img}
    />
    const hotelCard =
    <Card
        title="LOGEMENTS"
        description="Recommandation d’hébergements adaptés à votre voyage, entre confort, emplacement et authenticité."
        img={default_img}
    />
    const activityCard =
    <Card
        title="ACTIVITÉS"
        description="Suggestions d’activités et d’expériences en accord avec vos centres d’intérêt et la destination."
        img={default_img}
    />
    const guideCard =
    <Card
        title="CARNET DE VOYAGE"
        description="Un guide complet et personnalisé regroupant toutes les informations utiles pour voyager sereinement."
        img={default_img}
    />
    const supportCard =
    <Card
        title="ASSISTANCE VOYAGE"
        description="Un accompagnement avant et pendant le voyage pour vous conseiller et vous aider en cas de besoin."
        img={default_img}
    />

    return (
        <section className="xl:min-h-screen bg-numa-black text-numa-white">
            <h1 className="py-10 font-cormorant font-bold text-[50px] lg:text-[55px] text-numa-white text-center">Mes services voyage</h1>
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
        <div className="grid w-full grid-cols-3 gap-10 px-4">
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
        <div className="grid w-full grid-cols-1 gap-10 px-4">
            {itineraryCard}
            {flyCard}
            {hotelCard}
            {activityCard}
            {guideCard}
            {supportCard}
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
            <img src={img} alt={title} className="w-[70vw] lg:w-[20vw] object-cover rounded-md mb-4" />
            <h2 className="text-[24px] font-bold font-cormorant pb-2">{title}</h2>
            <p className="text-[16px] font-bold font-cormorant">{description}</p>
        </div>
    );
}