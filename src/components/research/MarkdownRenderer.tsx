import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Locale } from "@/i18n/config";

type MarkdownRendererProps = {
  content: string;
  locale?: Locale;
};

function isExternalLink(
  href?: string,
): boolean {
  if (!href) {
    return false;
  }

  return (
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("//")
  );
}

export default function MarkdownRenderer({
  content,
  locale = "fa",
}: MarkdownRendererProps) {
  const isPersian =
    locale === "fa";

  const direction =
    isPersian
      ? "rtl"
      : "ltr";

  return (
    <div
      lang={locale}
      dir={direction}
      className="
        max-w-none
        font-sans
        text-[#625d56]
        [overflow-wrap:anywhere]
      "
    >
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
        skipHtml
        components={{
          h1: ({
            children,
          }) => (
            <h1
              className={`
                mb-8
                mt-14
                first:mt-0
                text-[#171512]
                ${
                  isPersian
                    ? "font-sans text-[clamp(2rem,4vw,3.4rem)] font-[650] leading-[1.65] tracking-normal"
                    : "font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
                }
              `}
            >
              {children}
            </h1>
          ),

          h2: ({
            children,
          }) => (
            <h2
              className={`
                mb-7
                mt-14
                first:mt-0
                border-s-4
                border-[#b4853b]
                ps-5
                text-[#171512]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.65rem,3vw,2.5rem)] font-[650] leading-[1.75] tracking-normal"
                    : "font-serif text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em]"
                }
              `}
            >
              {children}
            </h2>
          ),

          h3: ({
            children,
          }) => (
            <h3
              className={`
                mb-5
                mt-10
                first:mt-0
                text-[#183655]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.3rem,2vw,1.75rem)] font-[650] leading-[1.8] tracking-normal"
                    : "font-serif text-[clamp(1.55rem,2.4vw,2.15rem)] font-semibold leading-[1.25]"
                }
              `}
            >
              {children}
            </h3>
          ),

          h4: ({
            children,
          }) => (
            <h4
              className={`
                mb-4
                mt-8
                text-[#24211e]
                ${
                  isPersian
                    ? "font-sans text-[1.15rem] font-[650] leading-[1.9]"
                    : "font-sans text-[1.15rem] font-semibold leading-7"
                }
              `}
            >
              {children}
            </h4>
          ),

          p: ({
            children,
          }) => (
            <p
              className={`
                mb-7
                text-[#625d56]
                last:mb-0
                ${
                  isPersian
                    ? "text-[15.5px] leading-[2.15] sm:text-[16.5px]"
                    : "text-[17px] leading-[2.05rem]"
                }
              `}
            >
              {children}
            </p>
          ),

          ul: ({
            children,
          }) => (
            <ul
              className={`
                mb-8
                list-disc
                space-y-3
                ps-7
                marker:text-[#b4853b]
                ${
                  isPersian
                    ? "text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                    : "text-[17px] leading-8"
                }
              `}
            >
              {children}
            </ul>
          ),

          ol: ({
            children,
          }) => (
            <ol
              className={`
                mb-8
                list-decimal
                space-y-3
                ps-7
                marker:font-semibold
                marker:text-[#8a672f]
                ${
                  isPersian
                    ? "text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                    : "text-[17px] leading-8"
                }
              `}
            >
              {children}
            </ol>
          ),

          li: ({
            children,
          }) => (
            <li
              className="
                ps-1
                text-[#625d56]
              "
            >
              {children}
            </li>
          ),

          strong: ({
            children,
          }) => (
            <strong
              className="
                font-semibold
                text-[#211f1c]
              "
            >
              {children}
            </strong>
          ),

          em: ({
            children,
          }) => (
            <em
              className="
                italic
                text-[#514b44]
              "
            >
              {children}
            </em>
          ),

          blockquote: ({
            children,
          }) => (
            <blockquote
              className={`
                my-10
                rounded-e-[20px]
                border-s-4
                border-[#183655]
                bg-[#f3eee7]
                px-6
                py-6
                text-[#625d56]
                [&>p:last-child]:mb-0
                ${
                  isPersian
                    ? "font-sans text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                    : "font-serif text-[18px] italic leading-8"
                }
              `}
            >
              {children}
            </blockquote>
          ),

          a: ({
            href,
            children,
          }) => {
            const external =
              isExternalLink(href);

            return (
              <a
                href={href}
                target={
                  external
                    ? "_blank"
                    : undefined
                }
                rel={
                  external
                    ? "noopener noreferrer"
                    : undefined
                }
                className="
                  font-semibold
                  text-[#2e5d91]
                  underline
                  decoration-[#2e5d91]/30
                  decoration-1
                  underline-offset-4
                  transition-colors
                  duration-300
                  hover:text-[#183655]
                  hover:decoration-[#183655]
                  focus-visible:rounded-sm
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/15
                "
              >
                {children}
              </a>
            );
          },

          hr: () => (
            <hr
              className="
                my-12
                border-0
                border-t
                border-[#2d2925]/12
              "
            />
          ),

          table: ({
            children,
          }) => (
            <div
              className="
                my-10
                overflow-x-auto
                rounded-[20px]
                border
                border-[#2d2925]/12
                bg-white
              "
            >
              <table
                className="
                  w-full
                  min-w-[680px]
                  border-collapse
                  text-start
                  font-sans
                "
              >
                {children}
              </table>
            </div>
          ),

          thead: ({
            children,
          }) => (
            <thead
              className="
                bg-[#183655]
                text-white
              "
            >
              {children}
            </thead>
          ),

          tbody: ({
            children,
          }) => (
            <tbody
              className="
                divide-y
                divide-[#2d2925]/10
              "
            >
              {children}
            </tbody>
          ),

          tr: ({
            children,
          }) => (
            <tr
              className="
                transition-colors
                duration-200
                even:bg-[#f7f3ed]/60
                hover:bg-[#ebe4da]/50
              "
            >
              {children}
            </tr>
          ),

          th: ({
            children,
          }) => (
            <th
              className={`
                border-e
                border-white/15
                px-5
                py-4
                text-start
                font-semibold
                last:border-e-0
                ${
                  isPersian
                    ? "text-[13px] leading-7"
                    : "text-[13px]"
                }
              `}
            >
              {children}
            </th>
          ),

          td: ({
            children,
          }) => (
            <td
              className={`
                border-e
                border-[#2d2925]/10
                px-5
                py-4
                align-top
                text-[#625d56]
                last:border-e-0
                ${
                  isPersian
                    ? "text-[13.5px] leading-7"
                    : "text-[14px] leading-7"
                }
              `}
            >
              {children}
            </td>
          ),

          pre: ({
            children,
          }) => (
            <pre
              dir="ltr"
              className="
                my-9
                overflow-x-auto
                rounded-[20px]
                border
                border-[#183655]/15
                bg-[#142b42]
                px-5
                py-5
                text-left
                font-mono
                text-[13px]
                leading-7
                text-[#f4efe8]
                shadow-[0_18px_38px_rgba(20,43,66,0.12)]
                sm:px-6
                sm:py-6
              "
            >
              {children}
            </pre>
          ),

          code: ({
            className,
            children,
          }) => {
            const isCodeBlock =
              Boolean(
                className?.startsWith(
                  "language-",
                ),
              );

            if (isCodeBlock) {
              return (
                <code
                  className={className}
                >
                  {children}
                </code>
              );
            }

            return (
              <code
                dir="ltr"
                className="
                  rounded-md
                  bg-[#ebe4da]
                  px-1.5
                  py-0.5
                  font-mono
                  text-[0.88em]
                  text-[#183655]
                "
              >
                {children}
              </code>
            );
          },

          del: ({
            children,
          }) => (
            <del
              className="
                text-[#82796e]
                decoration-[#9a8170]
              "
            >
              {children}
            </del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}