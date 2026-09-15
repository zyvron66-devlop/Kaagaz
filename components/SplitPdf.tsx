import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBytes } from "./MergePdf";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setStatus("");
    const bytes = await f.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    setPageCount(doc.getPageCount());
  }

  function parseRange(input: string, max: number): number[] {
    const indices = new Set<number>();
    const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((n) => parseInt(n.trim(), 10));
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
            if (i >= 1 && i <= max) indices.add(i - 1);
          }
        }
      } else {
        const n = parseInt(part, 10);
        if (!isNaN(n) && n >= 1 && n <= max) indices.add(n - 1);
      }
    }
    return Array.from(indices).sort((a, b) => a - b);
  }

  async function split() {
    if (!file || !pageCount) return;
    const indices = parseRange(range, pageCount);
    if (indices.length === 0) {
      setStatus("Please enter a valid page range, e.g., 1-3,5");
      return;
    }
    setBusy(true);
    setStatus("Nikaal raha hai...");
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      downloadBytes(outBytes, "split.pdf");
      setStatus("Done — download started.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Is the file corrupted or password-protected?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-ink/70 mb-4">
        Select a PDF, then enter the range of pages you need (for example <span className="font-mono">1-3,5,8-9</span>).
      </p>

      <label className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2 text-sm cursor-pointer hover:border-stamp hover:text-stamp transition-colors focus-ring">
        <span>+ Select PDF</span>
        <input type="file" accept="application/pdf" className="hidden" onChange={onPick} />
      </label>

      {file && pageCount && (
        <div className="mt-5">
          <p className="text-sm text-ink/60 mb-2">
            {file.name} — {pageCount} pages
          </p>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder={`e.g. 1-3,5 (max ${pageCount})`}
            className="border border-ink/30 px-3 py-2 text-sm w-full max-w-xs bg-transparent focus-ring"
          />
        </div>
      )}

      <button
        onClick={split}
        disabled={busy || !file}
        className="mt-6 block bg-stamp text-paper px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-stampdark transition-colors focus-ring"
      >
        {busy ? "Extracting..." : "Extract and download pages"}
      </button>

      {status && <p className="mt-3 text-sm text-ink/60">{status}</p>}
    </div>
  );
}
