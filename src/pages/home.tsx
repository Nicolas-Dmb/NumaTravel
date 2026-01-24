import FirstLayer from '../features/home/components/firstLayer';
import SecondLayer from '../features/home/components/secondLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import FourthLayer from '../features/home/components/fourthLayer';
import PanoramicLayer from '../features/home/components/panoramicLayer';
import FifthLayer from '../features/home/components/fifthLayer';
import SixthLayer from '../features/home/components/sixthLayer';

export default function Home() {
    return (
        <div>
            <FirstLayer />
            <SecondLayer />
            <ThirdLayer />
            <FourthLayer />
            <PanoramicLayer />
            <FifthLayer />
            <div className="h-5 bg-numa-red"/>
            <div className="h-5 bg-numa-black"/>
            <div className="h-5 bg-numa-red"/>
            <div className="h-5 bg-numa-black"/>
            <SixthLayer />
        </div>
    );
}