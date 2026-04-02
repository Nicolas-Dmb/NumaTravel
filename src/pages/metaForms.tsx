import ContactForm from '../features/meta/components/forms';
import { useEffect } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
}

export default function MetaContact({ setMetaRoutes }: MetaContactProps){
    useEffect(() => {
        setMetaRoutes(true);
    }, [setMetaRoutes]);


    return <main>
        <div className="min-h-[calc(100vh-4rem)] bg-numa-white pt-4 sm:pt-16">
            <ContactForm />
            <ThirdLayer />
            <FourthLayer />
        </div>
    </main>
}