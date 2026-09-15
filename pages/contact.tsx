import Head from "next/head";
import Link from "next/link";

const CONTACT_EMAIL = "zyvron66@gmail.com";

export default function Contact() {
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(CONTACT_EMAIL)}` +
    `&su=${encodeURIComponent("Contact — Kaagaz")}`;

  return (
    <>
      <Head>
        <title>Contact — Kaagaz</title>
        <meta
          name="description"
          content="Contact Kaagaz for feedback, bug reports, questions and enquiries."
        />
      </Head>

      <div className="min-h-screen ledger-bg">
        <main className="max-w-2xl mx-auto px-6 py-14">

          <Link href="/" className="text-sm text-stamp">
            ← Kaagaz
          </Link>

          <h1 className="font-serif text-5xl mt-8">
            Contact.
          </h1>

          <p className="mt-5 leading-7 text-ink/70">
            Have feedback, found a bug, or facing a problem?
            Send us a message through Gmail.
          </p>

          <div className="mt-8 border border-paperline bg-white/40 p-6">

            <p className="text-sm text-ink/60">
              Feedback & Support
            </p>

            <h2 className="font-serif text-2xl mt-2">
              Send us a message.
            </h2>

            <p className="mt-3 text-sm text-ink/60 leading-6">
              Click below to open Gmail and send your message directly
              to the Kaagaz support team.
            </p>

            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-6 px-5 py-3 border border-ink bg-ink text-white text-sm hover:opacity-90 transition-opacity"
            >
              Contact Kaagaz
            </a>

          </div>

          <p className="mt-6 text-xs text-ink/45 leading-5">
            Gmail will open with the recipient and subject already
            prepared. Enter your message and send it.
          </p>

        </main>
      </div>
    </>
  );
}