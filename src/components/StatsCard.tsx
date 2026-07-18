export default function StatsCard() {
  return (

    <div
      className="
      w-[280px]
      rounded-3xl
      bg-black/80
      backdrop-blur-xl
      border
      border-yellow-400/40
      p-7
      shadow-2xl
      "
    >


      <div
        className="
        pb-5
        border-b
        border-white/10
        "
      >

        <h3
          className="
          text-3xl
          font-semibold
          text-yellow-400
          "
        >
          +45%
        </h3>


        <p
          className="
          text-sm
          text-gray-300
          mt-2
          "
        >
          Organic Traffic Growth
        </p>

      </div>



      <div
        className="
        py-5
        border-b
        border-white/10
        "
      >

        <h3
          className="
          text-3xl
          font-semibold
          text-yellow-400
          "
        >
          +30%
        </h3>


        <p
          className="
          text-sm
          text-gray-300
          mt-2
          "
        >
          Sales Uplift
        </p>


      </div>



      <div
        className="
        pt-5
        "
      >

        <h3
          className="
          text-lg
          font-medium
          "
        >
          SEO • AI • Strategy
        </h3>


        <p
          className="
          text-sm
          text-gray-400
          mt-2
          "
        >
          Data-driven growth systems
        </p>


      </div>


    </div>

  );
}