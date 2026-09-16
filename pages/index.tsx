import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  MergeTool,
  SplitTool,
  ImagesToPdfTool,
  SimplePdfTool,
  WatermarkTool,
  MetadataTool,
  AdBox,
  ADSENSE_SLOT_IDS,
} from "../components/ToolKit";


/* =========================================================
   TOOLS
   ========================================================= */

const TOOLS = [
  {
    id: "merge",
    label: "Merge",
    sub: "Combine PDFs",
    desc: "Combine multiple PDF files into one.",
  },
  {
    id: "split",
    label: "Split",
    sub: "Extract Pages",
    desc: "Extract selected pages into a new PDF.",
  },
  {
    id: "compress",
    label: "Compress",
    sub: "Reduce Size",
    desc: "Optimize PDF structure to reduce file size where possible.",
  },
  {
    id: "images",
    label: "Images → PDF",
    sub: "Create PDF",
    desc: "Turn JPG or PNG images into an A4 PDF.",
  },
  {
    id: "rotate",
    label: "Rotate",
    sub: "Turn Pages",
    desc: "Rotate selected pages by 90°, 180° or 270°.",
  },
  {
    id: "delete",
    label: "Delete Pages",
    sub: "Remove Pages",
    desc: "Remove unwanted pages from a PDF.",
  },
  {
    id: "watermark",
    label: "Watermark",
    sub: "Stamp PDF",
    desc: "Add a light text watermark to every page.",
  },
  {
    id: "numbers",
    label: "Page Numbers",
    sub: "Number Pages",
    desc: "Add page numbers to every page.",
  },
  {
    id: "crop",
    label: "Crop",
    sub: "Trim Pages",
    desc: "Crop every page by its edges.",
  },
  {
    id: "metadata",
    label: "Metadata",
    sub: "Edit Details",
    desc: "Edit title, author, subject and keywords.",
  },
] as const;


type ToolId =
  typeof TOOLS[number]["id"];


/* =========================================================
   TOOL RENDERER
   ========================================================= */

function Tool({
  id,
}: {
  id: ToolId;
}) {
  switch (id) {

    case "merge":
      return <MergeTool />;

    case "split":
      return <SplitTool />;

    case "images":
      return <ImagesToPdfTool />;

    case "compress":
      return (
        <SimplePdfTool
          mode="compress"
        />
      );

    case "rotate":
      return (
        <SimplePdfTool
          mode="rotate"
        />
      );

    case "delete":
      return (
        <SimplePdfTool
          mode="delete"
        />
      );

    case "crop":
      return (
        <SimplePdfTool
          mode="crop"
        />
      );

    case "watermark":
      return (
        <WatermarkTool />
      );

    case "numbers":
      return (
        <WatermarkTool
          numbers
        />
      );

    case "metadata":
      return (
        <MetadataTool />
      );

    default:
      return null;
  }
}


/* =========================================================
   TOOL PANEL
   ========================================================= */

function ToolPanel({
  tool,
  mobile = false,
}: {
  tool: typeof TOOLS[number];
  mobile?: boolean;
}) {
  return (
    <section
      className={
        mobile
          ? "mobile-tool-panel"
          : `
            desktop-tool-panel
            bg-white/50
            border
            border-paperline
            px-5
            py-7
            sm:px-8
            sm:py-9
          `
      }
    >

      <p className="
        font-mono
        text-[11px]
        uppercase
        tracking-wider
        text-stamp
        mb-2
      ">
        {tool.label}
      </p>

      <h2 className="
        font-serif
        text-3xl
        text-ink
      ">
        {tool.sub}
      </h2>

      <p className="
        text-sm
        text-ink/50
        mt-1
        mb-7
      ">
        {tool.desc}
      </p>

      <Tool id={tool.id} />

    </section>
  );
}


/* =========================================================
   HOME
   ========================================================= */

export default function Home() {

  const [
    active,
    setActive,
  ] = useState<ToolId>(
    "merge"
  );

  const activeTool =
    TOOLS.find(
      (tool) =>
        tool.id === active
    )!;


  return (
    <>
      <Head>

        {/* =================================================
            SEO TITLE
            ================================================= */}

        <title>
          Kaagaz PDF-Tools — Free Online PDF Tools
        </title>


        {/* =================================================
            SEO DESCRIPTION
            ================================================= */}

        <meta
          name="description"
          content="Kaagaz PDF-Tools is a free browser-based PDF toolkit for merging, splitting, compressing, converting, rotating, cropping, watermarking and editing PDF files."
        />


        {/* =================================================
            KEYWORDS
            ================================================= */}

        <meta
          name="keywords"
          content="Kaagaz PDF-Tools, Kaagaz, PDF tools, free PDF tools, online PDF tools, merge PDF, split PDF, compress PDF, PDF editor, PDF converter"
        />


        {/* =================================================
            SEARCH ENGINE
            ================================================= */}

        <meta
          name="robots"
          content="index, follow"
        />


        {/* =================================================
            CANONICAL URL
            ================================================= */}

        <link
          rel="canonical"
          href="https://zyvron66-devlop.github.io/Kaagaz/"
        />


        {/* =================================================
            GOOGLE SITE NAME
            ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kaagaz PDF-Tools",
              "alternateName": "Kaagaz",
              "url": "https://zyvron66-devlop.github.io/Kaagaz/",
              "description":
                "Free browser-based PDF tools for merging, splitting, compressing, converting and editing PDF files.",
            }),
          }}
        />


        {/* =================================================
            ORGANIZATION / BRAND
            ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kaagaz PDF-Tools",
              "url":
                "https://zyvron66-devlop.github.io/Kaagaz/",
              "logo":
                "https://zyvron66-devlop.github.io/Kaagaz/kaagaz-logo.png",
            }),
          }}
        />


        {/* =================================================
            FAVICON / LOGO
            ================================================= */}

        <link
          rel="icon"
          type="image/png"
          href="/Kaagaz/kaagaz-logo.png"
        />

        <link
          rel="apple-touch-icon"
          href="/Kaagaz/kaagaz-logo.png"
        />


        {/* =================================================
            THEME COLOR
            ================================================= */}

        <meta
          name="theme-color"
          content="#f5f3ed"
        />


        {/* =================================================
            OPEN GRAPH
            ================================================= */}

        <meta
          property="og:title"
          content="Kaagaz PDF-Tools — Free Online PDF Tools"
        />

        <meta
          property="og:description"
          content="Free browser-based PDF tools for merging, splitting, compressing, converting and editing PDFs."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://zyvron66-devlop.github.io/Kaagaz/"
        />

        <meta
          property="og:site_name"
          content="Kaagaz PDF-Tools"
        />

        <meta
          property="og:image"
          content="https://zyvron66-devlop.github.io/Kaagaz/kaagaz-logo.png"
        />

      </Head>


      <div className="
        min-h-screen
        ledger-bg
      ">

        <div className="
          max-w-5xl
          mx-auto
          px-5
          sm:px-8
          py-10
          sm:py-14
        ">


          {/* =================================================
              HEADER
              ================================================= */}

          <header className="mb-12">

            <div className="
              flex
              items-center
              justify-between
              gap-4
            ">

              <p className="
                font-mono
                text-xs
                tracking-wide
                text-stamp
              ">
                KAAGAZ · PDF TOOLKIT
              </p>


              <nav className="
                flex
                gap-4
                text-xs
                text-ink/50
              ">

                <Link
                  href="/about"
                  className="hover:text-ink"
                >
                  About
                </Link>

                <Link
                  href="/faq"
                  className="hover:text-ink"
                >
                  FAQ
                </Link>

                <Link
                  href="/privacy"
                  className="hover:text-ink"
                >
                  Privacy
                </Link>

                <Link
                  href="/contact"
                  className="hover:text-ink"
                >
                  Contact
                </Link>

              </nav>

            </div>


            <h1 className="
              font-serif
              text-5xl
              sm:text-6xl
              leading-[1.05]
              text-ink
              mt-5
            ">
              Kaagaz.
              <br />

              <span className="text-stamp">
                PDF work,
              </span>{" "}
              without the upload.
            </h1>


            <p className="
              mt-5
              text-ink/70
              max-w-2xl
              leading-relaxed
            ">
              Merge, split, convert, and
              polish PDFs directly in your
              browser. No account required.
              Your files are processed
              locally for supported tools.
            </p>

          </header>


          {/* =================================================
              PRIVACY NOTE
              ================================================= */}

          <section className="
            privacy-note
            mb-10
          ">
            <strong>
              Private by default.
            </strong>{" "}
            Core PDF operations run locally
            in your browser. We do not need
            an account or a file-upload backend.
          </section>


          {/* =================================================
              MAIN TOOL AREA
              ================================================= */}

          <div className="
            grid
            lg:grid-cols-[250px_1fr]
            gap-8
          ">


            {/* =================================================
                LEFT TOOL MENU
                ================================================= */}

            <aside>

              <p className="section-label">
                TOOLS
              </p>


              <div className="tool-list">

                {TOOLS.map(
                  (tool) => (

                    <div
                      key={tool.id}
                      className="tool-nav-wrap"
                    >

                      <button
                        onClick={() =>
                          setActive(
                            tool.id
                          )
                        }
                        className={`
                          tool-nav
                          ${
                            active ===
                            tool.id
                              ? "active"
                              : ""
                          }
                        `}
                      >

                        <span>
                          {tool.label}
                        </span>

                        <small>
                          {tool.sub}
                        </small>

                      </button>


                      {/* ======================================
                          MOBILE TOOL PANEL
                          ====================================== */}

                      {active ===
                        tool.id && (
                        <ToolPanel
                          tool={tool}
                          mobile
                        />
                      )}

                    </div>

                  )
                )}

              </div>

            </aside>


            {/* =================================================
                DESKTOP TOOL AREA
                ================================================= */}

            <main className="
              desktop-tool-area
            ">

              <ToolPanel
                tool={activeTool}
              />


              {/* =================================================
                  INFO CARDS
                  ================================================= */}

              <div className="
                mt-8
                grid
                sm:grid-cols-3
                gap-3
                text-xs
                text-ink/55
              ">

                <div className="paper-card">
                  <b>
                    Local processing
                  </b>

                  <br />

                  No upload needed for
                  core tools.
                </div>


                <div className="paper-card">
                  <b>
                    No account
                  </b>

                  <br />

                  Open the tool and work
                  immediately.
                </div>


                <div className="paper-card">
                  <b>
                    Simple output
                  </b>

                  <br />

                  Download your finished
                  file when ready.
                </div>

              </div>

            </main>

          </div>


          {/* =================================================
              AD #3 — BOTTOM
              ================================================= */}

          <div className="
            mt-12
            flex
            justify-center
          ">

            <AdBox
              slot={
                ADSENSE_SLOT_IDS.bottom
              }
              className="
                w-full
                max-w-2xl
                min-h-[90px]
              "
            />

          </div>


          {/* =================================================
              FOOTER
              ================================================= */}

          <footer className="
            mt-10
            pt-7
            border-t
            border-paperline
            text-xs
            text-ink/40
            flex
            flex-wrap
            gap-x-5
            gap-y-2
          ">

            <span>
              © {new Date().getFullYear()} Kaagaz
            </span>

            <Link
              href="/terms"
              className="hover:text-ink"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="hover:text-ink"
            >
              Privacy
            </Link>

            <Link
              href="/about"
              className="hover:text-ink"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-ink"
            >
              Contact
            </Link>

          </footer>

        </div>

      </div>
    </>
  );
}