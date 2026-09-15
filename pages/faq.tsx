import Head from "next/head";
import Link from "next/link";

const q = [
  [
    "What is Kaagaz?",
    "Kaagaz is a browser-based document toolkit for common PDF tasks such as merging, splitting, compression, image conversion, page management, watermarking, page numbering, cropping, and supported metadata editing.",
  ],
  [
    "Do I need an account?",
    "No account is required for the core Kaagaz tools. You can select a supported file, perform the available operation, and save the resulting file to your device.",
  ],
  [
    "Are my PDFs uploaded to Kaagaz?",
    "For tools that perform processing locally in your browser, the selected document is processed on your device rather than being intentionally uploaded to a Kaagaz application server for the document operation.",
  ],
  [
    "Does local processing mean my files are completely invisible to the internet?",
    "No website can make that guarantee for every part of your device or network. Local processing means the supported document operation is performed in your browser. Your browser, device, operating system, extensions, network, and other software can have their own behavior.",
  ],
  [
    "Does Kaagaz store my PDF files?",
    "The core browser-based processing flow is not designed to store your selected documents on a Kaagaz application server. Temporary file data can exist in browser memory or other browser-managed resources while processing is taking place.",
  ],
  [
    "Can I use Kaagaz on a phone?",
    "Yes. Kaagaz is designed to work with modern desktop and mobile browsers. Processing performance and supported browser features can vary between devices.",
  ],
  [
    "Will large PDFs work?",
    "Large PDFs may work, but processing them can require significant memory and processing power. Browser and device limitations vary, so smaller files generally process faster and more reliably.",
  ],
  [
    "Why did my PDF become larger after processing?",
    "Some PDF operations can increase file size because of how content is reconstructed or encoded. A processed PDF is not guaranteed to be smaller than the original unless the specific tool is designed for size reduction.",
  ],
  [
    "Can Kaagaz compress every PDF dramatically?",
    "No. The amount of reduction depends on the contents and structure of the PDF. PDFs containing images that are already compressed may have limited room for further size reduction.",
  ],
  [
    "Will compression preserve the exact original quality?",
    "Not necessarily. Compression can change image quality or other document data depending on the file and the processing method. Always check the resulting document before using it for an important purpose.",
  ],
  [
    "Can I merge multiple PDF files?",
    "Yes. The Merge PDF tool is designed to combine supported PDF files into a single PDF. The resulting document should be checked after processing, especially when the source files contain unusual or advanced PDF features.",
  ],
  [
    "Can I split or extract specific pages?",
    "Yes. The Split PDF tool can be used to extract selected pages or create separate PDF output from supported source documents.",
  ],
  [
    "Can I convert images to PDF?",
    "Yes. Supported image files can be combined into a PDF. The available page and image options depend on the current version of the tool.",
  ],
  [
    "Can I convert a PDF into images?",
    "Kaagaz can provide PDF-to-image conversion where that tool is available. Output quality, supported formats, and processing performance depend on the source PDF and browser capabilities.",
  ],
  [
    "Can I rotate PDF pages?",
    "Yes. The Rotate PDF tool can rotate supported PDF pages. Always review the resulting document to confirm that the page orientation is correct.",
  ],
  [
    "Can I delete PDF pages?",
    "Yes. Supported PDF documents can have selected pages removed using the Delete Pages tool.",
  ],
  [
    "Can I change the order of PDF pages?",
    "Yes, where the Reorder PDF tool is available. You can arrange supported pages into the desired order before generating the resulting PDF.",
  ],
  [
    "Can I add a watermark?",
    "Yes. The Watermark tool can add supported watermark content to a PDF. The available positioning and appearance options depend on the current tool implementation.",
  ],
  [
    "Can I add page numbers?",
    "Yes. The Page Numbers tool can add numbering to supported PDF pages using the available positioning and formatting options.",
  ],
  [
    "Can I crop PDF pages?",
    "Yes. The Crop PDF tool can modify the visible page area of supported PDFs. Because PDF layouts can vary, the resulting document should be reviewed after processing.",
  ],
  [
    "Can I edit PDF metadata?",
    "Yes. The Metadata tool can edit supported document information such as title, author, subject, and keywords when those fields are supported by the source PDF and processing library.",
  ],
  [
    "Why doesn't a particular PDF work?",
    "PDF is a complex format and files can contain features that are not supported by a particular browser-based processing library. A file may also be damaged, encrypted, unusually structured, or use features that the current tool does not handle.",
  ],
  [
    "What should I do if processing fails?",
    "Keep the original file and try the operation again with a smaller or different document. Updating your browser can also help. If the problem continues, use the Contact page to report the issue with enough information to reproduce it without sharing sensitive document contents.",
  ],
  [
    "Should I keep my original PDF?",
    "Yes. For important documents, always keep an original copy. You should verify the generated file before submitting, signing, printing, publishing, archiving, or otherwise relying on it.",
  ],
  [
    "Does Kaagaz guarantee that the output will be identical to the original?",
    "No. PDF processing can affect fonts, annotations, forms, metadata, embedded content, layouts, or other features depending on the operation and source document.",
  ],
  [
    "Does Kaagaz provide legal or professional document advice?",
    "No. Kaagaz provides document-processing utilities. It does not provide legal, financial, medical, or other professional advice, and generated documents should be independently reviewed when they are important.",
  ],
  [
    "Does Kaagaz use cookies or analytics?",
    "The website may use cookies, browser storage, analytics, advertising, or other third-party technologies depending on the services enabled in the deployed version. See the Privacy Policy for information about how such technologies may be used.",
  ],
  [
    "Does Kaagaz show advertisements?",
    "Advertising may be displayed when advertising services are enabled on the website. Advertisements are provided and processed according to the applicable advertising provider's systems and policies.",
  ],
  [
    "Can I use Kaagaz without an internet connection?",
    "Kaagaz is delivered as a web application, so an internet connection is generally required to access the website and load its resources. After the application is loaded, individual browser-based operations may run locally on your device.",
  ],
  [
    "Is Kaagaz completely secure?",
    "No service can honestly guarantee complete security. Kaagaz is designed to perform supported document processing locally in the browser, but your browser, device, operating system, network, and other software remain important parts of the security environment.",
  ],
  [
    "What happens to temporary processing data?",
    "During local processing, file data and generated content can temporarily exist in browser memory or other browser-managed resources. How that temporary data is handled and released can depend on the browser and device.",
  ],
  [
    "Where can I learn more about privacy?",
    "See the Privacy Policy for information about documents, technical information, cookies, advertising, analytics, contact information, retention, security, and third-party services.",
  ],
  [
    "How can I contact Kaagaz?",
    "Use the Contact page to send a question, report a problem, or provide feedback about the website.",
  ],
  [
    "Who is the developer of Kaagaz?",
    "Kaagaz is developed and maintained by an independent developer named Mahtab. See the About page for more information.",
  ]
];

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ — Kaagaz</title>
        <meta
          name="description"
          content="Frequently asked questions about Kaagaz PDF tools, browser-based processing, privacy, files, compression, and document operations."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen ledger-bg">
        <main className="max-w-3xl mx-auto px-6 py-14">
          <Link href="/" className="text-sm text-stamp">
            ← Kaagaz
          </Link>

          <h1 className="font-serif text-5xl mt-8">FAQ.</h1>

          <p className="mt-5 leading-7 text-ink/70">
            Answers to common questions about Kaagaz, its browser-based PDF
            tools, document processing, privacy, and supported workflows.
          </p>

          <div className="mt-10">
            {q.map(([question, answer]) => (
              <section
                key={question}
                className="border-b border-paperline py-7"
              >
                <h2 className="font-serif text-2xl">{question}</h2>

                <p className="mt-3 text-ink/65 leading-7">{answer}</p>
              </section>
            ))}
          </div>

          <div className="mt-14 pt-6 border-t border-ink/10 text-sm text-ink/50">
            <p>
              For information about how Kaagaz handles information, see the{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              . For the rules governing use of the service, see the{" "}
              <Link href="/terms" className="underline">
                Terms of Use
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}