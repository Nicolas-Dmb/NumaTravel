import ReactMarkdown from "react-markdown";
import cgv from "../features/markdown/cgv.md?raw";
import SEO from "../components/SEO";

export default function CGV(){
    return(
        <>
            <SEO
                title="CGV – Numa Travel | Travel planner"
                description="Consultez les conditions générales de vente de Numa Travel, travel planner indépendante spécialisée dans les voyages sur mesure."
                canonicalPath="/cgv"
            />
            <main>
                <article className="legal font-poppins text-numa-black leading-relaxed bg-numa-white  p-16 md:p-24 min-h-screen">
                    <h1 className="text-[40px] lg:text-[70px] font-bold font-poppins text-numa-black pb-10">Conditions Générales de Vente</h1>
                    <ReactMarkdown>{cgv}</ReactMarkdown>
                </article>
            </main>
        </>
    )
}