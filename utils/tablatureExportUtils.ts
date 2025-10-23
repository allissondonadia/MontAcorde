import { TABLATURE_CONFIG } from "../types/tablature";

interface ExportOptions {
  svg: SVGSVGElement;
  tablatureName: string;
  backgroundImageUrl?: string;
}

export const exportTablatureAsPng = async ({
  svg,
  tablatureName,
  backgroundImageUrl = "/tablatura.png",
}: ExportOptions): Promise<void> => {
  console.log("exportTablatureAsPng started");

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
    canvas.width = TABLATURE_CONFIG.width * 2;
    canvas.height = (TABLATURE_CONFIG.height + titleHeight) * 2;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    // White background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add tablature name at top
    ctx.fillStyle = "#000";
    ctx.font = "bold 48px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(tablatureName || "Tablatura", canvas.width / 2, 80);

    // Draw background image (offset down)
    ctx.drawImage(
      backgroundImg,
      0,
      titleHeight * 2,
      canvas.width,
      TABLATURE_CONFIG.height * 2
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
        TABLATURE_CONFIG.height * 2
      );

      // Export PNG
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Data URL created, length:", dataUrl.length);

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${tablatureName || "tablatura"}.png`;
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
