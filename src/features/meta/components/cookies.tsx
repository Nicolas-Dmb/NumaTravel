interface CookiesBannerProps {
    handleBannerAccept: () => void;
    handleBannerRefuse: () => void;
}

export function CookiesBanner({
    handleBannerAccept,
    handleBannerRefuse,
}: CookiesBannerProps) {
    return (
        <div className="fixed inset-x-0 bottom-4 z-50 px-4">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl text-numa-black">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-numa-black/60">
                        Cookies
                    </p>
                    <p className="mt-1 text-sm leading-6 sm:text-base">
                        Nous utilisons des cookies de mesure d’audience et publicitaires
                        pour comprendre ce qui fonctionne sur le site et améliorer votre expérience.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                        onClick={handleBannerRefuse}
                        className="rounded-full border border-numa-black/15 px-5 py-2.5 text-sm font-medium text-numa-black transition hover:border-numa-black/30 hover:bg-numa-black/5"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={handleBannerAccept}
                        className="rounded-full bg-numa-black px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] hover:opacity-90"
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}

interface CookiesPopupProps {
    handlePopupAccept: () => void;
    handlePopupRefuse: () => void;
}

export function CookiesPopup({
    handlePopupAccept,
    handlePopupRefuse,
}: CookiesPopupProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-numa-black/50">
                        Consentement
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-numa-black">
                        Préférence de cookies
                    </h2>
                </div>

                <p className="text-sm leading-6 text-numa-black/80 sm:text-base">
                    Avant d’envoyer le formulaire, souhaitez-vous autoriser les cookies
                    de mesure d’audience et publicitaires&nbsp;?
                </p>

                <div className="mt-6 rounded-2xl bg-numa-black/5 p-4 text-sm leading-6 text-numa-black/70">
                    Votre choix n’empêche pas l’envoi du formulaire, mais il détermine
                    si nous pouvons mesurer la performance de cette page.
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={handlePopupRefuse}
                        className="rounded-full border border-numa-black/15 px-5 py-3 text-sm font-medium text-numa-black transition hover:border-numa-black/30 hover:bg-numa-black/5"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={handlePopupAccept}
                        className="rounded-full bg-numa-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:opacity-90"
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}