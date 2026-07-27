import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


type ResearchSectionProps = {
  title: string;
  content: string;
};



export default function ResearchSection({

  title,

  content,

}: ResearchSectionProps) {



  const sectionStyle =
    title.includes("Framework")
      ? "border-[#183655]"
      : title.includes("دیدگاه")
      ? "border-[#7d8265]"
      : "border-neutral-200";



  return (

    <section
      className={`
        rounded-[32px]
        border
        ${sectionStyle}
        bg-white
        p-8
        md:p-12
        shadow-sm
      `}
    >



      <header
        className="
          mb-10
          border-b
          border-neutral-100
          pb-6
        "
      >

        <h2
          className="
            text-right
            font-serif
            text-2xl
            md:text-3xl
            font-semibold
            leading-relaxed
            text-neutral-900
          "
        >
          {title}
        </h2>


      </header>





      <div
        dir="rtl"
        className="
          text-right

          [&_p]:
          mb-7

          [&_p]:
          text-lg

          [&_p]:
          leading-[2.1]

          [&_ul]:
          my-8

          [&_li]:
          mb-4

          [&_li]:
          rounded-xl

          [&_li]:
          bg-[#f7f3ed]

          [&_li]:
          px-5

          [&_li]:
          py-3

          [&_h3]:
          mt-10

          [&_h3]:
          mb-5

          [&_h3]:
          text-xl

          [&_h3]:
          font-semibold

          [&_strong]:
          font-bold

          text-neutral-700
        "
      >


        <ReactMarkdown
          remarkPlugins={[
            remarkGfm
          ]}
        >

          {content}

        </ReactMarkdown>


      </div>



    </section>

  );

}