import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";


type ResearchArticleProps = {
  title: string;
  description?: string;
  content: string;

  researchId?: string;
  category?: string;
  status?: string;
};



export default function ResearchArticle({

  title,

  description,

  content,

  researchId,

  category,

  status,

}: ResearchArticleProps) {



  return (

    <main
      className="
        min-h-screen
        bg-[#f7f3ed]
        px-5
        py-16
        md:px-8
      "
    >


      <article
        className="
          mx-auto
          max-w-5xl
        "
      >



        {/* ARTICLE HERO */}

        <header
          className="
            mb-12
            rounded-[36px]
            border
            border-neutral-200
            bg-white
            px-8
            py-14
            md:px-16
            md:py-16
            shadow-sm
          "
        >


          <div
            className="
              mb-8
              flex
              justify-end
              gap-3
            "
          >

            <span
              className="
                rounded-full
                border
                border-neutral-200
                px-5
                py-2
                text-sm
                text-neutral-600
              "
            >
              Research Library
            </span>


            {researchId && (

              <span
                className="
                  rounded-full
                  bg-[#183655]
                  px-5
                  py-2
                  text-sm
                  text-white
                "
              >
                {researchId}
              </span>

            )}

          </div>





          <h1
            dir="rtl"
            className="
              text-right
              text-4xl
              md:text-6xl
              font-semibold
              leading-[1.55]
              tracking-tight
              text-neutral-900
            "
          >
            {title}
          </h1>





          {description && (

            <p
              dir="rtl"
              className="
                mt-8
                text-right
                text-lg
                leading-[2]
                text-neutral-600
              "
            >

              {description}

            </p>

          )}






          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-end
              gap-x-8
              gap-y-3
              border-t
              border-neutral-200
              pt-6
              text-sm
              text-neutral-500
            "
          >

            {category && (

              <span>
                {category}
              </span>

            )}


            {status && (

              <span>
                {status}
              </span>

            )}


          </div>



        </header>






        {/* ARTICLE CONTENT */}


        <section
          className="
            rounded-[36px]
            border
            border-neutral-200
            bg-white
            px-8
            py-12
            md:px-16
            md:py-16
            shadow-sm
          "
        >



          <div
            dir="rtl"
            className="
              text-right

              [&>h2]:
              mt-16

              [&>h2]:
              mb-8

              [&>h2]:
              border-b

              [&>h2]:
              border-neutral-200

              [&>h2]:
              pb-4

              [&>h2]:
              text-3xl

              [&>h2]:
              font-semibold

              [&>h2]:
              text-neutral-900


              [&>h3]:
              mt-12

              [&>h3]:
              mb-5

              [&>h3]:
              text-2xl

              [&>h3]:
              font-semibold

              [&>p]:
              mb-8

              [&>p]:
              text-lg

              [&>p]:
              leading-[2.3]

              [&>ul]:
              my-10

              [&>ul]:
              space-y-4


              [&>ul>li]:
              rounded-2xl

              [&>ul>li]:
              bg-[#f7f3ed]

              [&>ul>li]:
              px-6

              [&>ul>li]:
              py-4


              [&_strong]:
              font-semibold

              [&_strong]:
              text-neutral-900

            "
          >


            <ReactMarkdown

              remarkPlugins={[
                remarkGfm
              ]}

              rehypePlugins={[
                rehypeRaw
              ]}

            >

              {content}

            </ReactMarkdown>


          </div>



        </section>



      </article>


    </main>

  );

}