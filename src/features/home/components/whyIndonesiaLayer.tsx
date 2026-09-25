export default function WhyIndonesiaLayer() {
  const matches = [
    { desire: "Vous rêvez de jungle et de trek ?", destination: "Sumatra." },
    { desire: "De fonds marins exceptionnels ?", destination: "Raja Ampat ou Sulawesi." },
    { desire: "De plages sauvages et de villages traditionnels ?", destination: "Sumba ou Sumbawa." },
    { desire: "D’un voyage entre volcans, culture et nature ?", destination: "Java ou Flores." },
    { desire: "D’un séjour entre îles et snorkeling ?", destination: "Lombok et les Gili." },
  ];

  return (
    <section className="bg-numa-red text-numa-white text-center px-4 py-10">
      <h1 className="font-cormorant text-[40px] font-bold lg:text-[55px]">
        Pourquoi l’Indonésie ?
      </h1>
      <div className="h-1 w-[30vw] bg-numa-white mx-auto mt-4 mb-6 lg:mb-10"></div>

      <p className="mx-auto max-w-3xl font-poppins text-[15px] leading-relaxed sm:text-[18px]">
        L’Indonésie ne se résume pas à Bali. Bali est magnifique, mais l’Indonésie est
        composée de milliers d’îles, chacune avec son identité, ses paysages et sa façon
        de voyager.
      </p>

      <div className="mx-auto mt-8 max-w-4xl flex flex-col divide-y divide-numa-white/30 lg:mt-10">
        {matches.map((m) => (
          <div
            key={m.destination}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:text-left"
          >
            <p className="font-poppins text-[15px] leading-relaxed sm:text-[18px]">
              {m.desire}
            </p>
            <p className="font-cormorant text-[22px] font-bold sm:text-[26px] sm:text-right sm:whitespace-nowrap">
              {m.destination}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl font-poppins text-[15px] font-semibold leading-relaxed sm:text-[18px] lg:mt-10">
        Mon rôle est justement de vous aider à trouver l’Indonésie qui correspond à vos
        envies.
      </p>
    </section>
  );
}
