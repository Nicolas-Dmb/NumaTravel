import ReactMarkdown from "react-markdown";
import cgv from "../features/cgv/cgv.md?raw";

export default function CGV(){
    return(
        <article className="legal font-poppins text-numa-black leading-relaxed bg-numa-white p-8 md:p-16 min-h-screen">
            <ReactMarkdown>{cgv}</ReactMarkdown>
        </article>
    )
}