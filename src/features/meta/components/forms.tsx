import useMeta from '../hooks/useMeta';

export default function ContactForm() {
    const { error, handleSubmit, isLoading } = useMeta();


    return (
        <div className="flex flex-col justify-center font-poppins text-numa-black px-4 pb-16 w-full max-w-2xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl shadow-md p-6 flex flex-col gap-5 bg-white"
            >
                <h2 className="text-xl font-semibold text-center">
                    Parlez-moi de votre projet, de vos envies ou de vos questions 😊
                </h2>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className="text-sm mb-1">Nom</label>
                        <input
                            type="text"
                            name="secondName"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-sm mb-1">Prénom</label>
                        <input
                            type="text"
                            name="firstName"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
                        />
                    </div>
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className="text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-sm mb-1">Téléphone (optionnel)</label>
                        <input
                            type="tel"
                            name="phone"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-1">Message</label>
                    <textarea
                        name="message"
                        rows={3}
                        placeholder="Parlez-moi de votre projet de voyage, ou de vos questions"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-numa-black text-white rounded-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoading ? "Envoi..." : "Envoyer"}
                </button>
            </form>

            {error && (
                <p className="text-numa-red text-center mt-4">{error}</p>
            )}
        </div>
    );
}