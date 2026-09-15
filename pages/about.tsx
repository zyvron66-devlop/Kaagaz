import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Kaagaz — Simple PDF Tools</title>
        <meta
          name="description"
          content="Learn about Kaagaz, a simple browser-based toolkit for everyday PDF and document tasks."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen ledger-bg">
        <main className="max-w-3xl mx-auto px-6 py-14">
          <Link href="/" className="text-sm text-stamp">
            ← Kaagaz
          </Link>

          <h1 className="font-serif text-5xl mt-8">About Kaagaz.</h1>

          <p className="mt-6 leading-7 text-ink/70">
            Kaagaz is a document utility built to make common PDF tasks straightforward, accessible, and easy to complete from a web browser.
          </p>

          <p className="mt-4 leading-7 text-ink/70">
            The idea behind Kaagaz is simple: everyday document work should not need a complicated workflow or an account just to perform a basic task. This application is proudly developed and maintained by an independent developer named Mahtab, who is dedicated to keeping your digital productivity fast and hassle-free.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            What Kaagaz is for
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Kaagaz provides tools for common document operations such as
            combining PDF files, extracting pages, reducing file size,
            converting images to PDF, converting PDF pages to images, rotating
            pages, removing pages, changing page order, adding watermarks,
            adding page numbers, cropping pages, and editing supported PDF
            metadata.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            The available tools are designed around individual tasks so that
            you can choose what you need without having to work through an
            unnecessarily complicated document editor.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            Privacy-conscious by design
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Where a Kaagaz tool performs processing locally in the browser, the
            document operation is carried out on your device rather than by
            intentionally uploading the document to a Kaagaz application
            server.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            This approach can be useful when working with documents that you
            would rather process directly on your own device. However, browser,
            device, operating-system, network, and third-party software
            behavior remains outside Kaagaz's control.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            For a complete explanation of information that may be processed
            when using the website, see the{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="font-serif text-2xl mt-10">
            No account required for core tools
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Kaagaz's core document tools are designed to be usable without
            creating an account. You can select a supported file, perform the
            available operation, and save the resulting document to your
            device.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            Some future or optional services may have different requirements.
            Any such requirements will be communicated as part of the relevant
            feature.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            Built for everyday use
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Kaagaz is intended for practical document tasks: preparing files
            for submission, combining documents, extracting pages, converting
            images, making small document changes, and handling other routine
            PDF work.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            Processing performance depends on the device and browser being
            used. Large or complex documents can require substantial memory and
            processing resources, and some PDF features may behave differently
            depending on the structure of the source document.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            Accuracy matters
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Document processing is not always perfectly lossless. Fonts,
            annotations, forms, embedded content, metadata, layouts, and other
            PDF features can behave differently depending on the operation and
            source file.
          </p>

          <p className="mt-3 leading-7 text-ink/70">
            For important documents, keep the original file and verify the
            generated result before submitting, publishing, printing, signing,
            archiving, or otherwise relying on it.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            Our approach
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            Kaagaz focuses on keeping document utilities understandable,
            practical, and focused on the task at hand. The goal is not to add
            unnecessary complexity, but to provide useful tools that work well
            across modern browsers and devices.
          </p>

          <h2 className="font-serif text-2xl mt-10">
            Feedback and contact
          </h2>

          <p className="mt-3 leading-7 text-ink/70">
            If you find a problem, have a suggestion, or want to contact
            Kaagaz, you can use the{" "}
            <Link href="/contact" className="underline">
              Contact
            </Link>{" "}
            page.
          </p>

          <div className="mt-14 pt-6 border-t border-ink/10 text-sm text-ink/50">
            <p>
              Kaagaz is a general-purpose document utility. Availability,
              supported formats, and individual tools may change as the
              service develops.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}