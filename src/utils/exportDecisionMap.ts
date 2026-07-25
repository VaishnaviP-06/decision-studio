import type { Edge } from "@xyflow/react";
import type { DecisionNodeType } from "../store/decisionStore";

export function exportDecisionMapAsJson(
  nodes: DecisionNodeType[],
  edges: Edge[]
) {
  const payload = {
    exportedAt: new Date().toISOString(),
    nodes: nodes.map((n) => ({
      id: n.id,
      position: n.position,
      data: n.data,
    })),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      relationship: (e.data?.relationship as string | undefined) ?? "supports",
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });

  downloadBlob(blob, "decision-map.json");
}

/**
 * Rasterizes the current React Flow viewport (the .react-flow__viewport
 * element) into a PNG using only native browser APIs — no external
 * screenshot libraries or network calls.
 */
export async function exportDecisionMapAsImage(container: HTMLElement) {
  const viewport = container.querySelector(
    ".react-flow__viewport"
  ) as HTMLElement | null;

  if (!viewport) return;

  const rect = viewport.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  const styles = getComputedStyle(document.documentElement);
  const background = styles.getPropertyValue("--background").trim() || "#ffffff";

  // Serialize the viewport DOM into an SVG foreignObject, then draw that
  // SVG into a canvas — a standard browser-only DOM-to-image technique.
  // Computed styles are inlined recursively because a foreignObject does
  // not automatically inherit the page's external stylesheet.
  const clone = inlineComputedStyles(viewport);
  clone.style.transform = "none";

  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:${background};">
          ${clone.outerHTML}
        </div>
      </foreignObject>
    </svg>
  `;

  const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(2, 2);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, "decision-map.png");
    }, "image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function inlineComputedStyles(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;

  const sourceEls = [source, ...Array.from(source.querySelectorAll("*"))];
  const cloneEls = [clone, ...Array.from(clone.querySelectorAll("*"))];

  sourceEls.forEach((sourceEl, i) => {
    const cloneEl = cloneEls[i] as HTMLElement | undefined;
    if (!cloneEl || !(sourceEl instanceof HTMLElement)) return;

    const computed = getComputedStyle(sourceEl);
    let cssText = "";
    for (let j = 0; j < computed.length; j++) {
      const prop = computed[j];
      cssText += `${prop}:${computed.getPropertyValue(prop)};`;
    }
    cloneEl.setAttribute("style", cssText);
  });

  return clone;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
