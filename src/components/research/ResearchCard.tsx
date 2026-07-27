"use client";


interface ResearchCardProps {

  title: string;

  children: React.ReactNode;

  variant?:
    | "default"
    | "highlight"
    | "framework";

}





export default function ResearchCard({

  title,

  children,

  variant = "default",

}: ResearchCardProps) {



  const styles = {


    default: `

      border-[#2d2925]/10

      bg-white

    `,


    highlight: `

      border-[#b4853b]/30

      bg-[#fbf7ef]

    `,


    framework: `

      border-[#183655]/20

      bg-[#f3f6fa]

    `,


  };





  return (


    <section

      className={`
      
        my-12
        
        rounded-[28px]
        
        border
        
        p-8
        
        shadow-sm
        
        transition
        
        duration-300
        
        md:p-10
        
        ${styles[variant]}

      `}

    >




      <h2

        className="
        
        mb-8
        
        border-s-4
        
        border-[#b4853b]
        
        ps-5
        
        font-serif
        
        text-3xl
        
        font-semibold
        
        text-[#171512]
        
        "

      >

        {title}


      </h2>





      <div

        className="
        
        text-lg
        
        leading-9
        
        text-[#625d56]
        
        "

      >

        {children}


      </div>





    </section>


  );


}