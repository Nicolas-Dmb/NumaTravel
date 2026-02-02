import ReactMarkdown from "react-markdown";
import cgv from "../features/markdown/cgv.md?raw";

export default function CGV(){
    return(
        <article className="legal font-poppins text-numa-black leading-relaxed bg-numa-white px-2 py-16 md:p-24 min-h-screen">
            <ReactMarkdown>{cgv}</ReactMarkdown>
        </article>
    )
}