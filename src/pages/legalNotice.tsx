import ReactMarkdown from "react-markdown";
import legal from "../features/markdown/legal.md?raw";
import SEO from "../components/SEO";

export default function LegalNotice(){
    return(
        <>
        <SEO
            title="Mentions légales – Numa Travel | Travel planner"
            description="Mentions légales du site Numa Travel, édité par une travel planner indépendante."
            canonicalPath="/legal-notice"
        />
        <main>
            <article className="legal font-poppins text-numa-black leading-relaxed bg-numa-white p-16 md:p-24 min-h-screen">
                <h1 className="text-[40px] lg:text-[70px] font-bold font-poppins text-numa-black pb-10">Mentions légales</h1>
                <ReactMarkdown>{legal}</ReactMarkdown>
            </article>
        </main>
        </>
    )
}