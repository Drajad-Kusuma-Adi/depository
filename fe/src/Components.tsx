import React from "react";
import "./index.css";

const colors: Record<string, string> = {
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",
  primary: "#EB6D20",
};

// ----------------- //
// COMPONENT EFFECTS //
// ----------------- //

function getContrastRatio(color1: string, color2: string): number {
  // Convert hex codes to RGB values
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Calculate luminance for each color
  const luminance1 = 0.2126 * rgb1.r + 0.7152 * rgb1.g + 0.0722 * rgb1.b;
  const luminance2 = 0.2126 * rgb2.r + 0.7152 * rgb2.g + 0.0722 * rgb2.b;

  // Calculate contrast ratio
  return (
    (Math.max(luminance1, luminance2) + 0.05) /
    (Math.min(luminance1, luminance2) + 0.05)
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function Ripple(e: React.MouseEvent<HTMLButtonElement>, button: HTMLButtonElement, bgColor: string) {
  // Create the ripple element
  const ripple = document.createElement("span");
  ripple.className = `ripple`;

  // Determine the background color of the ripple
  const colorRgb = hexToRgb(colors[bgColor] || bgColor);
  if (!colorRgb) return;
  const whiteContrast = getContrastRatio("#ffffff", bgColor);
  const blackContrast = getContrastRatio("#000000", bgColor);
  ripple.style.backgroundColor =
    whiteContrast > blackContrast
      ? "rgba(0, 0, 0, 0.25)"
      : "rgba(255, 255, 255, 0.25)";

  // Calculate the size and position of the ripple
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// ---------- //
// COMPONENTS //
// ---------- //

export function Button({
  color = "transparent",
  textColor = "black",
  img,
  xcss,
  children,
  onClick,
}: {
  color?: string;
  textColor?: string;
  img?: string;
  xcss?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  function ripple(e: React.MouseEvent<HTMLButtonElement>) {
    Ripple(e, buttonRef.current!, color);
  }

  function bouncy() {
    buttonRef.current?.classList.add("scale-95");

    setTimeout(() => {
      buttonRef.current?.classList.remove("scale-95");
    }, 300);
  }

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        if (color !== "transparent") {
          ripple(e);
        } else {
          bouncy();
        }

        if (!onClick) return;

        onClick();
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[color] ? colors[color] : color,
        color: colors[textColor] ? colors[textColor] : textColor,
        borderRadius: "9999px",
        padding: color !== "transparent" ? "0.5rem 2rem" : "0.25rem 0.5rem",
        ...xcss,
      }}
      className={`${color === "transparent" && "scale-100"} transition duration-300`}
    >
      {img && <img src={img} className="size-6 me-2" />}
      {children}
    </button>
  );
}