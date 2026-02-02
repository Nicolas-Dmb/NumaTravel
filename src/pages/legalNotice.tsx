import ReactMarkdown from "react-markdown";
import legal from "../features/markdown/legal.md?raw";

export default function LegalNotice(){
    return(
        <article className="legal font-poppins text-numa-black leading-relaxed bg-numa-white p-16 md:p-24 min-h-screen">
            <ReactMarkdown>{legal}</ReactMarkdown>
        </article>
    )
}