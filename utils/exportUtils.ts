import { FRETBOARD_CONFIG } from "../types/chord";

interface ExportOptions {
  svg: SVGSVGElement;
  chordName: string;
  backgroundImageUrl?: string;
}

export const exportChordAsPng = async ({
  svg,
  chordName,
  backgroundImageUrl = "/grade_2.png",
}: ExportOptions): Promise<void> => {
  console.log("exportChordAsPng started");

  if (!svg) {
    console.error("SVG element not found");
    return;
  }

  const backgroundImg = new Image();
  backgroundImg.crossOrigin = "anonymous";

  const exportWithBackground = () => {
    console.log("exportWithBackground started");
    const titleHeight = 40;
    const canvas = document.createElement("canvas");
    canvas.width = FRETBOARD_CONFIG.width * 2;
    canvas.height = (FRETBOARD_CONFIG.height + titleHeight) * 2;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    // White background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add chord name at top
    ctx.fillStyle = "#000";
    ctx.font = "bold 48px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(chordName || "Chord", canvas.width / 2, 80);

    // Draw background image (offset down)
    ctx.drawImage(
      backgroundImg,
      0,
      titleHeight * 2,
      canvas.width,
      FRETBOARD_CONFIG.height * 2
    );

    // Draw SVG on top (offset down)
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const svgImg = new Image();
    svgImg.onload = () => {
      console.log("SVG image loaded, drawing to canvas");
      ctx.drawImage(
        svgImg,
        0,
        titleHeight * 2,
        canvas.width,
        FRETBOARD_CONFIG.height * 2
      );

      // Export PNG
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Data URL created, length:", dataUrl.length);

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${chordName || "chord"}.png`;
      a.style.display = "none";
      document.body.appendChild(a);

      console.log("Triggering download");
      a.click();

      // Cleanup
      setTimeout(() => {
        a.remove();
        URL.revokeObjectURL(svgUrl);
      }, 100);
    };

    svgImg.onerror = (error) => {
      console.error("Error loading SVG image:", error);
    };

    svgImg.src = svgUrl;
  };

  backgroundImg.onload = () => {
    console.log("Background image loaded");
    exportWithBackground();
  };

  backgroundImg.onerror = (error) => {
    console.error("Error loading background image:", error);
  };

  backgroundImg.src = backgroundImageUrl;
};

export const createCanvasFromSvg = (
  svg: SVGSVGElement,
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(svgUrl);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = svgUrl;
  });
};

export const downloadCanvasAsPng = (
  canvas: HTMLCanvasElement,
  filename: string
): void => {
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
