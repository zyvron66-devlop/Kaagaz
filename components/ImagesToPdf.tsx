import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBytes } from "./MergePdf";

export default function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
    setStatus("");
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function convert() {
    if (files.length === 0) return;
    setBusy(true);
    setStatus("Bana raha hai...");
    try {
      const doc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const isPng = file.type === "image/png";
        const img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const outBytes = await doc.save();
      downloadBytes(outBytes, "images.pdf");
      setStatus("Done — your download has started.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Only JPG and PNG images are supported.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-ink/70 mb-4">
        Select JPG/PNG images, set the order, and generate your PDF — each image becomes its own page.
      </p>

      <label className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2 text-sm cursor-pointer hover:border-stamp hover:text-stamp transition-colors focus-ring">
        <span>+ Select Images</span>
        <input
          type="file"
          accept="image/jpeg,image/png"
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
              <button onClick={() => removeFile(i)} className="text-ink/50 hover:text-red focus-ring" aria-label="Hatao">✕</button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={convert}
        disabled={busy || files.length === 0}
        className="mt-6 bg-stamp text-paper px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-stampdark transition-colors focus-ring"
      >
        {busy ? "Generating..." : "Generate & Download PDF"}
      </button>

      {status && <p className="mt-3 text-sm text-ink/60">{status}</p>}
    </div>
  );
}
