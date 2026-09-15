import {
  useEffect,
  useState,
} from "react";

import type {
  ChangeEvent,
  ReactNode,
} from "react";

import {
  PDFDocument,
  StandardFonts,
  degrees,
  rgb,
} from "pdf-lib";


/* =========================================================
   KAAGAZ — ADSENSE CONFIGURATION
   ========================================================= */

/*
 * true:
 *     Development/test mode.
 *     Google ko koi ad request nahi bheji jaati.
 *
 * false:
 *     Real Google AdSense mode.
 */
export const ADSENSE_TEST_MODE = true;


/*
 * REAL ADSENSE PUBLISHER ID
 *
 * Example:
 * ca-pub-1234567890123456
 *
 * Is value ko later apni real AdSense Publisher ID
 * se replace karna hai.
 */
export const ADSENSE_PUBLISHER_ID =
  "ca-pub-1234567890123456";


/*
 * THREE DIFFERENT AD SLOT IDs
 *
 * SELECT:
 * Select PDF/File button ke paas
 *
 * ACTION:
 * Download/Action button ke paas
 *
 * BOTTOM:
 * Page ke bottom mein
 */
export const ADSENSE_SLOT_IDS = {
  select: "1234567890",
  action: "5678901234",
  bottom: "9012345678",
} as const;


/* =========================================================
   ADSENSE GLOBAL TYPE
   ========================================================= */

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}


/* =========================================================
   AD BOX
   ========================================================= */

export function AdBox({
  slot,
  className = "",
}: {
  slot: string;
  className?: string;
}) {

  /*
   * IMPORTANT:
   *
   * Hook ko conditional ke andar nahi rakhna hai.
   * Isliye useEffect hamesha top-level par hai.
   */
  useEffect(() => {

    /*
     * TEST MODE mein Google AdSense ko call nahi karna.
     */
    if (ADSENSE_TEST_MODE) {
      return;
    }

    try {

      window.adsbygoogle =
        window.adsbygoogle || [];

      window.adsbygoogle.push({});

    } catch (error) {

      console.error(
        "AdSense initialization failed:",
        error
      );

    }

  }, [slot]);


  /* =======================================================
     TEST MODE
     ======================================================= */

  if (ADSENSE_TEST_MODE) {

    return (
      <div
        className={`
          ad-box
          inline-flex
          items-center
          justify-center
          shrink-0
          overflow-hidden
          border
          border-dashed
          border-ink/25
          bg-white/30
          ${className}
        `}
        style={{
          width: "180px",
          minWidth: "180px",
          height: "72px",
          minHeight: "72px",
        }}
        aria-label="Advertisement"
      >

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-ink/35
          "
        >
          Ad
        </span>

      </div>
    );
  }


  /* =======================================================
     REAL GOOGLE ADSENSE MODE
     ======================================================= */

  return (
    <div
      className={`
        ad-box
        inline-flex
        items-center
        justify-center
        shrink-0
        overflow-hidden
        ${className}
      `}
      aria-label="Advertisement"
    >

      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "72px",
        }}
        data-ad-client={
          ADSENSE_PUBLISHER_ID
        }
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

    </div>
  );
}


/* =========================================================
   DOWNLOAD HELPER
   ========================================================= */

export function downloadBytes(
  bytes: Uint8Array,
  filename: string,
  type = "application/pdf"
) {

  const blob = new Blob(
    [bytes],
    {
      type,
    }
  );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;

  anchor.download =
    filename;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();

  window.setTimeout(() => {

    URL.revokeObjectURL(
      url
    );

  }, 1000);
}


/* =========================================================
   ACTION BUTTON
   ========================================================= */

function Button({
  children,
  disabled = false,
  onClick,
  secondary = false,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
}) {

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-4
        mt-6
      "
    >

      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`
          ${
            secondary
              ? `
                border
                border-ink/30
                bg-transparent
                text-ink
                hover:border-stamp
              `
              : `
                bg-stamp
                text-paper
                hover:bg-stampdark
              `
          }

          px-5
          py-2.5
          text-sm
          font-medium
          disabled:opacity-40
          transition-colors
          focus-ring
        `}
      >
        {children}
      </button>


      {/* =====================================================
          AD #2 — ACTION
          ===================================================== */}

      <AdBox
        slot={
          ADSENSE_SLOT_IDS.action
        }
      />

    </div>
  );
}


/* =========================================================
   FILE PICKER
   ========================================================= */

function Pick({
  accept,
  multiple = false,
  onChange,
  label = "+ Select Files",
}: {
  accept: string;
  multiple?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: string;
}) {

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-4
      "
    >

      <label
        className="
          inline-flex
          items-center
          gap-2
          border
          border-ink/30
          px-4
          py-2.5
          text-sm
          cursor-pointer
          hover:border-stamp
          hover:text-stamp
          transition-colors
          focus-ring
        "
      >

        <span>
          {label}
        </span>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={onChange}
        />

      </label>


      {/* =====================================================
          AD #1 — SELECT
          ===================================================== */}

      <AdBox
        slot={
          ADSENSE_SLOT_IDS.select
        }
      />

    </div>
  );
}


/* =========================================================
   STATUS
   ========================================================= */

function Status({
  text,
}: {
  text: string;
}) {

  if (!text) {
    return null;
  }

  return (
    <p
      className="
        mt-4
        text-sm
        text-ink/60
      "
      role="status"
    >
      {text}
    </p>
  );
}


/* =========================================================
   FILE LIST
   ========================================================= */

function FileList({
  files,
  remove,
  move,
}: {
  files: File[];
  remove: (
    index: number
  ) => void;
  move?: (
    index: number,
    direction: -1 | 1
  ) => void;
}) {

  return (
    <ul
      className="
        mt-5
        divide-y
        divide-paperline
        border-y
        border-paperline
      "
    >

      {files.map(
        (file, index) => (

          <li
            key={`${file.name}-${index}`}
            className="
              flex
              items-center
              justify-between
              gap-3
              py-2.5
              text-sm
            "
          >

            <span className="truncate">

              <span className="text-ink/40 mr-2">
                {index + 1}.
              </span>

              {file.name}

            </span>


            <span
              className="
                flex
                items-center
                gap-3
                text-ink/50
                shrink-0
              "
            >

              {move && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      move(
                        index,
                        -1
                      )
                    }
                    className="
                      hover:text-stamp
                      focus-ring
                    "
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      move(
                        index,
                        1
                      )
                    }
                    className="
                      hover:text-stamp
                      focus-ring
                    "
                  >
                    ↓
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() =>
                  remove(index)
                }
                className="
                  hover:text-red
                  focus-ring
                "
              >
                ✕
              </button>

            </span>

          </li>

        )
      )}

    </ul>
  );
}


/* =========================================================
   PDF FILE HOOK
   ========================================================= */

function usePdfFile() {

  const [
    file,
    setFile,
  ] = useState<File | null>(
    null
  );

  const [
    pages,
    setPages,
  ] = useState<number | null>(
    null
  );

  return {
    file,
    pages,
    setFile,
    setPages,
  };
}


/* =========================================================
   MERGE
   ========================================================= */

export function MergeTool() {

  const [
    files,
    setFiles,
  ] = useState<File[]>([]);

  const [
    busy,
    setBusy,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState("");


  const pick = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    setFiles((previous) => [

      ...previous,

      ...Array.from(
        event.target.files || []
      ),

    ]);

    setStatus("");
  };


  const move = (
    index: number,
    direction: -1 | 1
  ) => {

    setFiles((previous) => {

      const next = [
        ...previous,
      ];

      const target =
        index + direction;

      if (
        target < 0 ||
        target >= next.length
      ) {
        return next;
      }

      [
        next[index],
        next[target],
      ] = [
        next[target],
        next[index],
      ];

      return next;
    });
  };


  const run = async () => {

    if (files.length < 2) {

      setStatus(
        "Select at least 2 PDFs."
      );

      return;
    }

    setBusy(true);

    setStatus(
      "Merging..."
    );

    try {

      const output =
        await PDFDocument.create();


      for (
        const file of files
      ) {

        const source =
          await PDFDocument.load(
            await file.arrayBuffer()
          );

        const copied =
          await output.copyPages(
            source,
            source.getPageIndices()
          );

        copied.forEach(
          (page) =>
            output.addPage(page)
        );
      }


      const bytes =
        await output.save({
          useObjectStreams:
            true,
        });


      downloadBytes(
        bytes,
        "merged.pdf"
      );


      setStatus(
        "Done — download started."
      );

    } catch (error) {

      console.error(error);

      setStatus(
        "Could not process this PDF. It may be corrupt or password-protected."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">
        Combine multiple PDFs into one
        file. Your files stay in this
        browser.
      </p>


      <Pick
        accept="application/pdf"
        multiple
        onChange={pick}
        label="+ Select PDFs"
      />


      {files.length > 0 && (
        <FileList
          files={files}
          remove={(index) =>
            setFiles(
              (previous) =>
                previous.filter(
                  (_, i) =>
                    i !== index
                )
            )
          }
          move={move}
        />
      )}


      <Button
        disabled={
          busy ||
          files.length < 2
        }
        onClick={run}
      >
        {busy
          ? "Merging..."
          : "Merge & Download PDF"}
      </Button>


      <Status
        text={status}
      />
    </>
  );
}


/* =========================================================
   SPLIT
   ========================================================= */

export function SplitTool() {

  const {
    file,
    pages,
    setFile,
    setPages,
  } = usePdfFile();

  const [
    range,
    setRange,
  ] = useState("");

  const [
    busy,
    setBusy,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState("");


  const pick = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const selected =
      event.target.files?.[0];

    if (!selected) {
      return;
    }

    try {

      const document =
        await PDFDocument.load(
          await selected.arrayBuffer()
        );

      setFile(
        selected
      );

      setPages(
        document.getPageCount()
      );

      setStatus("");

    } catch {

      setStatus(
        "This PDF could not be opened."
      );

    }
  };


  const parsePages = (
    value: string,
    maximum: number
  ) => {

    const result =
      new Set<number>();


    for (
      const part of value
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean)
    ) {

      if (
        part.includes("-")
      ) {

        const [
          first,
          last,
        ] = part
          .split("-")
          .map(Number);


        if (
          Number.isFinite(first) &&
          Number.isFinite(last)
        ) {

          for (
            let page =
              Math.min(
                first,
                last
              );

            page <=
            Math.max(
              first,
              last
            );

            page++
          ) {

            if (
              page >= 1 &&
              page <= maximum
            ) {

              result.add(
                page - 1
              );

            }
          }
        }

      } else {

        const page =
          Number(part);

        if (
          Number.isInteger(page) &&
          page >= 1 &&
          page <= maximum
        ) {

          result.add(
            page - 1
          );

        }
      }
    }


    return [
      ...result,
    ].sort(
      (a, b) =>
        a - b
    );
  };


  const run = async () => {

    if (
      !file ||
      !pages
    ) {
      return;
    }


    const pageIndexes =
      parsePages(
        range,
        pages
      );


    if (
      pageIndexes.length === 0
    ) {

      setStatus(
        "Enter a valid range such as 1-3,5."
      );

      return;
    }


    setBusy(true);

    setStatus(
      "Extracting..."
    );


    try {

      const source =
        await PDFDocument.load(
          await file.arrayBuffer()
        );


      const output =
        await PDFDocument.create();


      const copied =
        await output.copyPages(
          source,
          pageIndexes
        );


      copied.forEach(
        (page) =>
          output.addPage(page)
      );


      downloadBytes(
        await output.save(),
        "extracted.pdf"
      );


      setStatus(
        "Done — download started."
      );

    } catch {

      setStatus(
        "Could not process this PDF."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">
        Extract selected pages into a
        new PDF. Example:
        <code> 1-3,5,8-9</code>.
      </p>


      <Pick
        accept="application/pdf"
        onChange={pick}
        label="+ Select PDF"
      />


      {file &&
        pages && (
          <div className="mt-5">

            <p
              className="
                text-sm
                text-ink/60
                mb-2
              "
            >
              {file.name} — {pages} pages
            </p>


            <input
              value={range}
              onChange={(event) =>
                setRange(
                  event.target.value
                )
              }
              placeholder={`e.g. 1-3,5 (max ${pages})`}
              className="
                field
                max-w-sm
              "
            />

          </div>
        )}


      <Button
        disabled={
          busy ||
          !file
        }
        onClick={run}
      >
        {busy
          ? "Extracting..."
          : "Extract & Download"}
      </Button>


      <Status
        text={status}
      />
    </>
  );
}


/* =========================================================
   IMAGES → PDF
   ========================================================= */

export function ImagesToPdfTool() {

  const [
    files,
    setFiles,
  ] = useState<File[]>([]);

  const [
    busy,
    setBusy,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState("");


  const pick = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const selected =
      Array.from(
        event.target.files || []
      ).filter(
        (file) =>
          /image\/(jpeg|png)/.test(
            file.type
          )
      );


    setFiles(
      (previous) => [
        ...previous,
        ...selected,
      ]
    );

    setStatus("");
  };


  const move = (
    index: number,
    direction: -1 | 1
  ) => {

    setFiles(
      (previous) => {

        const next = [
          ...previous,
        ];

        const target =
          index + direction;


        if (
          target < 0 ||
          target >= next.length
        ) {
          return next;
        }


        [
          next[index],
          next[target],
        ] = [
          next[target],
          next[index],
        ];


        return next;
      }
    );
  };


  const run = async () => {

    if (!files.length) {
      return;
    }


    setBusy(true);

    setStatus(
      "Creating PDF..."
    );


    try {

      const output =
        await PDFDocument.create();


      for (
        const file of files
      ) {

        const bytes =
          await file.arrayBuffer();


        const image =
          file.type ===
          "image/png"

            ? await output.embedPng(
                bytes
              )

            : await output.embedJpg(
                bytes
              );


        const pageWidth =
          595;

        const pageHeight =
          842;


        const scale =
          Math.min(
            pageWidth /
              image.width,

            pageHeight /
              image.height,

            1
          );


        const width =
          image.width *
          scale;


        const height =
          image.height *
          scale;


        const page =
          output.addPage([
            pageWidth,
            pageHeight,
          ]);


        page.drawImage(
          image,
          {
            x:
              (pageWidth -
                width) /
              2,

            y:
              (pageHeight -
                height) /
              2,

            width,
            height,
          }
        );
      }


      downloadBytes(
        await output.save(),
        "images.pdf"
      );


      setStatus(
        "Done — download started."
      );

    } catch (error) {

      console.error(error);

      setStatus(
        "Only JPG and PNG images are supported."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">
        Convert JPG/PNG images into an
        A4 PDF. Reorder them before
        creating the file.
      </p>


      <Pick
        accept="image/jpeg,image/png"
        multiple
        onChange={pick}
        label="+ Select Images"
      />


      {files.length > 0 && (
        <FileList
          files={files}
          remove={(index) =>
            setFiles(
              (previous) =>
                previous.filter(
                  (_, i) =>
                    i !== index
                )
            )
          }
          move={move}
        />
      )}


      <Button
        disabled={
          busy ||
          !files.length
        }
        onClick={run}
      >
        {busy
          ? "Generating..."
          : "Generate & Download PDF"}
      </Button>


      <Status
        text={status}
      />
    </>
  );
}


/* =========================================================
   ROTATE / DELETE / COMPRESS / CROP
   ========================================================= */

export function SimplePdfTool({
  mode,
}: {
  mode:
    | "rotate"
    | "delete"
    | "compress"
    | "crop";
}) {

  const {
    file,
    pages,
    setFile,
    setPages,
  } = usePdfFile();


  const [
    selected,
    setSelected,
  ] = useState("1");


  const [
    angle,
    setAngle,
  ] = useState("90");


  const [
    crop,
    setCrop,
  ] = useState({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });


  const [
    busy,
    setBusy,
  ] = useState(false);


  const [
    status,
    setStatus,
  ] = useState("");


  const pick = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }


    try {

      const document =
        await PDFDocument.load(
          await selectedFile.arrayBuffer()
        );


      setFile(
        selectedFile
      );


      setPages(
        document.getPageCount()
      );


      setStatus("");

    } catch {

      setStatus(
        "This PDF could not be opened."
      );

    }
  };


  const parsePageNumbers = (
    value: string,
    maximum: number
  ) => {

    const values =
      value
        .split(",")
        .map((item) =>
          Number(
            item.trim()
          )
        )
        .filter(
          (page) =>
            Number.isInteger(
              page
            ) &&
            page >= 1 &&
            page <= maximum
        )
        .map(
          (page) =>
            page - 1
        );


    return [
      ...new Set(values),
    ];
  };


  const run = async () => {

    if (
      !file ||
      !pages
    ) {
      return;
    }


    setBusy(true);

    setStatus(
      "Processing..."
    );


    try {

      const document =
        await PDFDocument.load(
          await file.arrayBuffer()
        );


      /* ================================================
         ROTATE
         ================================================ */

      if (
        mode === "rotate"
      ) {

        const pageIndexes =
          parsePageNumbers(
            selected,
            pages
          );


        pageIndexes.forEach(
          (index) => {

            document
              .getPage(index)
              .setRotation(
                degrees(
                  Number(angle)
                )
              );

          }
        );
      }


      /* ================================================
         DELETE
         ================================================ */

      if (
        mode === "delete"
      ) {

        const deleteIndexes =
          new Set(
            parsePageNumbers(
              selected,
              pages
            )
          );


        for (
          let index =
            pages - 1;

          index >= 0;

          index--
        ) {

          if (
            deleteIndexes.has(
              index
            )
          ) {

            document.removePage(
              index
            );

          }
        }


        if (
          document.getPageCount() ===
          0
        ) {

          throw new Error(
            "All pages deleted."
          );

        }
      }


      /* ================================================
         CROP
         ================================================ */

      if (
        mode === "crop"
      ) {

        const left =
          Math.max(
            0,
            Number(
              crop.left
            ) || 0
          );


        const right =
          Math.max(
            0,
            Number(
              crop.right
            ) || 0
          );


        const top =
          Math.max(
            0,
            Number(
              crop.top
            ) || 0
          );


        const bottom =
          Math.max(
            0,
            Number(
              crop.bottom
            ) || 0
          );


        document
          .getPages()
          .forEach(
            (page) => {

              const width =
                page.getWidth();

              const height =
                page.getHeight();


              page.setCropBox(
                left,
                bottom,
                Math.max(
                  1,
                  width -
                    left -
                    right
                ),
                Math.max(
                  1,
                  height -
                    top -
                    bottom
                )
              );

            }
          );
      }


      /* ================================================
         SAVE
         ================================================ */

      const bytes =
        await document.save({
          useObjectStreams:
            true,
        });


      downloadBytes(
        bytes,
        `${mode}.pdf`
      );


      setStatus(
        "Done — download started."
      );

    } catch (error) {

      console.error(error);

      setStatus(
        "Could not process this PDF."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">

        {mode ===
        "compress"

          ? "Re-save and optimize the PDF structure. Image-heavy PDFs may not shrink much."

          : mode ===
            "delete"

          ? "Enter pages to delete, for example 2,5-7."

          : mode ===
            "rotate"

          ? "Rotate selected pages by 90°, 180° or 270°."

          : "Crop every page by entering points to remove from each edge."}

      </p>


      <Pick
        accept="application/pdf"
        onChange={pick}
        label="+ Select PDF"
      />


      {file &&
        pages && (
          <div className="mt-5 space-y-4">

            <p
              className="
                text-sm
                text-ink/60
              "
            >
              {file.name} — {pages} pages
            </p>


            {mode ===
              "rotate" && (
              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <input
                  className="
                    field
                    w-36
                  "
                  value={selected}
                  onChange={(event) =>
                    setSelected(
                      event.target.value
                    )
                  }
                  placeholder="Pages: 1,3-5"
                />


                <select
                  className="
                    field
                    w-32
                  "
                  value={angle}
                  onChange={(event) =>
                    setAngle(
                      event.target.value
                    )
                  }
                >

                  <option value="90">
                    90°
                  </option>

                  <option value="180">
                    180°
                  </option>

                  <option value="270">
                    270°
                  </option>

                </select>

              </div>
            )}


            {mode ===
              "delete" && (
              <input
                className="
                  field
                  max-w-sm
                "
                value={selected}
                onChange={(event) =>
                  setSelected(
                    event.target.value
                  )
                }
                placeholder="Pages to delete: 2,5-7"
              />
            )}


            {mode ===
              "crop" && (
              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-4
                  gap-3
                "
              >

                {(
                  [
                    "top",
                    "right",
                    "bottom",
                    "left",
                  ] as const
                ).map(
                  (side) => (

                    <label
                      key={side}
                      className="
                        text-xs
                        text-ink/50
                      "
                    >

                      {side}

                      <input
                        className="
                          field
                          mt-1
                          w-full
                        "
                        value={
                          crop[side]
                        }
                        onChange={(event) =>
                          setCrop({
                            ...crop,
                            [side]:
                              event.target
                                .value,
                          })
                        }
                      />

                    </label>

                  )
                )}

              </div>
            )}

          </div>
        )}


      <Button
        disabled={
          busy ||
          !file
        }
        onClick={run}
      >
        {busy
          ? "Processing..."
          : mode ===
            "compress"
          ? "Compress & Download"
          : "Apply & Download"}
      </Button>


      <Status
        text={status}
      />


      <p
        className="
          mt-4
          text-xs
          text-ink/40
        "
      >
        This tool runs locally in
        your browser.
      </p>

    </>
  );
}


/* =========================================================
   WATERMARK / PAGE NUMBERS
   ========================================================= */

export function WatermarkTool({
  numbers = false,
}: {
  numbers?: boolean;
}) {

  const {
    file,
    setFile,
  } = usePdfFile();


  const [
    text,
    setText,
  ] = useState(
    numbers
      ? "Page"
      : "CONFIDENTIAL"
  );


  const [
    size,
    setSize,
  ] = useState("28");


  const [
    opacity,
    setOpacity,
  ] = useState("0.25");


  const [
    busy,
    setBusy,
  ] = useState(false);


  const [
    status,
    setStatus,
  ] = useState("");


  const run = async () => {

    if (!file) {
      return;
    }


    setBusy(true);

    setStatus(
      "Applying..."
    );


    try {

      const document =
        await PDFDocument.load(
          await file.arrayBuffer()
        );


      const font =
        await document.embedFont(
          StandardFonts.Helvetica
        );


      document
        .getPages()
        .forEach(
          (page, index) => {

            const width =
              page.getWidth();

            const height =
              page.getHeight();


            if (numbers) {

              const value =
                `${index + 1}`;

              const fontSize =
                Number(size);


              page.drawText(
                value,
                {
                  x:
                    width / 2 -
                    font.widthOfTextAtSize(
                      value,
                      fontSize
                    ) /
                      2,

                  y: 20,

                  size:
                    fontSize,

                  font,

                  color:
                    rgb(
                      0.15,
                      0.18,
                      0.2
                    ),
                }
              );

            } else {

              const value =
                text ||
                "CONFIDENTIAL";

              const fontSize =
                Number(size);


              page.drawText(
                value,
                {
                  x:
                    width / 2 -
                    font.widthOfTextAtSize(
                      value,
                      fontSize
                    ) /
                      2,

                  y:
                    height / 2,

                  size:
                    fontSize,

                  font,

                  color:
                    rgb(
                      0.2,
                      0.2,
                      0.2
                    ),

                  opacity:
                    Number(
                      opacity
                    ),

                  rotate:
                    degrees(-35),
                }
              );
            }

          }
        );


      downloadBytes(
        await document.save(),
        numbers
          ? "page-numbers.pdf"
          : "watermarked.pdf"
      );


      setStatus(
        "Done — download started."
      );

    } catch (error) {

      console.error(error);

      setStatus(
        "Could not apply this setting."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">

        {numbers
          ? "Add page numbers to every page."
          : "Stamp every page with a light text watermark."}

      </p>


      <Pick
        accept="application/pdf"
        onChange={(event) => {

          const selected =
            event.target.files?.[0];

          if (selected) {

            setFile(
              selected
            );

            setStatus("");

          }

        }}
        label="+ Select PDF"
      />


      {file &&
        !numbers && (

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-3
            "
          >

            <input
              className="field"
              value={text}
              onChange={(event) =>
                setText(
                  event.target.value
                )
              }
              placeholder="Watermark text"
            />


            <input
              className="
                field
                w-24
              "
              value={size}
              onChange={(event) =>
                setSize(
                  event.target.value
                )
              }
              type="number"
              min="8"
            />


            <input
              className="
                field
                w-24
              "
              value={opacity}
              onChange={(event) =>
                setOpacity(
                  event.target.value
                )
              }
              type="number"
              min="0.05"
              max="1"
              step="0.05"
            />

          </div>

        )}


      {file &&
        numbers && (

          <div className="mt-5">

            <input
              className="
                field
                w-24
              "
              value={size}
              onChange={(event) =>
                setSize(
                  event.target.value
                )
              }
              type="number"
              min="8"
            />

          </div>

        )}


      <Button
        disabled={
          busy ||
          !file
        }
        onClick={run}
      >
        {busy
          ? "Applying..."
          : "Apply & Download"}
      </Button>


      <Status
        text={status}
      />

    </>
  );
}


/* =========================================================
   METADATA
   ========================================================= */

export function MetadataTool() {

  const {
    file,
    setFile,
  } = usePdfFile();


  const [
    meta,
    setMeta,
  ] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });


  const [
    busy,
    setBusy,
  ] = useState(false);


  const [
    status,
    setStatus,
  ] = useState("");


  const run = async () => {

    if (!file) {
      return;
    }


    setBusy(true);

    setStatus(
      "Saving..."
    );


    try {

      const document =
        await PDFDocument.load(
          await file.arrayBuffer()
        );


      document.setTitle(
        meta.title
      );

      document.setAuthor(
        meta.author
      );

      document.setSubject(
        meta.subject
      );

      document.setKeywords(
        meta.keywords
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      );


      downloadBytes(
        await document.save(),
        "metadata-edited.pdf"
      );


      setStatus(
        "Done — download started."
      );

    } catch (error) {

      console.error(error);

      setStatus(
        "Could not edit metadata."
      );

    } finally {

      setBusy(false);

    }
  };


  return (
    <>
      <p className="tool-help">
        Edit common PDF metadata
        fields. Leave a field blank
        to clear it.
      </p>


      <Pick
        accept="application/pdf"
        onChange={(event) => {

          const selected =
            event.target.files?.[0];

          if (selected) {

            setFile(
              selected
            );

            setStatus("");

          }

        }}
        label="+ Select PDF"
      />


      {file && (

        <div
          className="
            mt-5
            grid
            sm:grid-cols-2
            gap-3
          "
        >

          {(
            Object.keys(
              meta
            ) as Array<
              keyof typeof meta
            >
          ).map(
            (key) => (

              <input
                key={key}
                className="field"
                placeholder={
                  key
                    .charAt(0)
                    .toUpperCase() +
                  key.slice(1)
                }
                value={
                  meta[key]
                }
                onChange={(event) =>
                  setMeta({
                    ...meta,
                    [key]:
                      event.target
                        .value,
                  })
                }
              />

            )
          )}

        </div>

      )}


      <Button
        disabled={
          busy ||
          !file
        }
        onClick={run}
      >
        {busy
          ? "Saving..."
          : "Save Metadata"}
      </Button>


      <Status
        text={status}
      />

    </>
  );
}