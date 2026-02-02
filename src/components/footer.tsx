import { FaInstagram, FaWhatsapp, FaFacebook} from "react-icons/fa";
import {useNavigate} from "react-router-dom"


export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-numa-black text-white py-6 flex flex-row justify-between items-start px-8 h-16">
                <div className="flex flex-row gap-4">
                    <button className="text-sm text-numa-white cursor-pointer hover:scale-105" onClick={() => navigate("/mentions-legales")}>Mentions légales</button>
                    <button className="text-sm text-numa-white cursor-pointer hover:scale-105" onClick={() => navigate("/cgv")}>CGV</button>
                </div>
                <div className="flex flex-row gap-4">
                    <FaInstagram className="text-numa-white text-2xl cursor-pointer hover:scale-105" onClick={() => window.open("https://www.instagram.com/numatravelplan/", "_blank")} />
                    <FaWhatsapp className="text-numa-white text-2xl cursor-pointer hover:scale-105" onClick={() => window.open("https://wa.me/0659589733", "_blank")} />
                    <FaFacebook className="text-numa-white text-2xl cursor-pointer hover:scale-105" onClick={() => window.open("https://www.facebook.com/profile.php?id=61585037937716", "_blank")} />
                </div>
        </footer>
    );
}