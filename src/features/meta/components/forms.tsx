import useMeta from '../hooks/useMeta';

export default function ContactForm() {
    const { error, handleSubmit } = useMeta();
    return <div className="min-h-screen flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto p-4">
            <div className="flex gap-4">
                <label htmlFor="secondName">Nom
                    <input type="text" name="secondName"/>
                </label>
                <label htmlFor="firstName">Prénom
                    <input type="text" name="firstName"/>
                </label>
            </div>
            <div className="flex gap-4">
                <label htmlFor="email">Email
                    <input type="email" name="email"/>
                </label>
                <label htmlFor="phone">Téléphone (Optionnel)
                    <input type="tel" name="phone"/>
                </label>
            </div>
            <label htmlFor="message">Message
                <textarea name="message" placeholder="Parlez-moi de votre projet de voyage, de vos envies ou de vos questions 😊"/>
            </label>
            <button type="submit">Envoyer</button>
        </form>
        {error && <p className="text-numa-red text-center mt-4">{error}</p>}
    </div>
}