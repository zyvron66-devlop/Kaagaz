import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
    setStatus("");
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return next;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) {
      setStatus("Please select at least 2 PDFs.");
      return;
    }
    setBusy(true);
    setStatus("Merging...");
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const outBytes = await merged.save();
      downloadBytes(outBytes, "merged.pdf");
      setStatus("Done — your download has started.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. File corrupt or password-protected?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-ink/70 mb-4">
        Select at least 2 PDFs, set the order, and generate your merged PDF — no files are uploaded to any server.
      </p>

      <label className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2 text-sm cursor-pointer hover:border-stamp hover:text-stamp transition-colors focus-ring">
        <span>+ Select PDFs</span>
        <input
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={onPick}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-5 divide-y divide-paperline border-t border-b border-paperline">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between py-2 text-sm">
              <span className="truncate max-w-[55%]">
                <span className="text-ink/40 mr-2">{i + 1}.</span>
                {f.name}
              </span>
              <span className="flex items-center gap-3 text-ink/50">
                <button onClick={() => move(i, -1)} className="hover:text-stamp focus-ring" aria-label="Upar move karo">↑</button>
                <button onClick={() => move(i, 1)} className="hover:text-stamp focus-ring" aria-label="Neeche move karo">↓</button>
                <button onClick={() => removeFile(i)} className="hover:text-red focus-ring" aria-label="Hatao">✕</button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={merge}
        disabled={busy || files.length < 2}
        className="mt-6 bg-stamp text-paper px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-stampdark transition-colors focus-ring"
      >
        {busy ? "Merging..." : "Merge & Download PDF"}
      </button>

      {status && <p className="mt-3 text-sm text-ink/60">{status}</p>}
    </div>
  );
}

export function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
