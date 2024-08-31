import React from "react";
import "./index.css";

// List of colors used in the app
const colors: Record<string, string> = {
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",
  primary: "#EB6D20",
};

// ----------------- //
// COMPONENT EFFECTS //
// ----------------- //

/**
 * Calculate the contrast ratio between two hex colors.
 *
 * Contrast ratio is a value between 1 and 21, where 1 is the lowest
 * contrast and 21 is the highest. The recommended contrast ratio for
 * body text is at least 4.5.
 *
 * @param {string} color1 The first hex color to compare.
 * @param {string} color2 The second hex color to compare.
 * @returns {number} The contrast ratio between the two colors.
 */
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

/**
 * Convert a hex color code to an RGB object.
 *
 * @param {string} hex The hex color code to convert.
 * @returns {{ r: number; g: number; b: number }} The RGB object.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Regex to convert hex codes to RGB values
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Create a ripple effect on a button.
 *
 * @param {React.MouseEvent<HTMLButtonElement>} e The event that triggered
 *   the ripple effect.
 * @param {HTMLButtonElement} button The button to create the ripple effect on.
 * @param {string} bgColor The background color of the button.
 */
export function Ripple(
  e: React.MouseEvent<HTMLButtonElement>,
  button: HTMLButtonElement,
  bgColor: string,
) {
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

/**
 * Create a button with a ripple effect.
 *
 * @param {Object} props The props for the button.
 * @param {string} [props.color=transparent] The background color of the button.
 * @param {string} [props.textColor=black] The text color of the button.
 * @param {string} [props.img] The image URL for the button icon.
 * @param {React.CSSProperties} [props.xcss] Additional CSS styles for the button.
 * @param {React.ReactNode} [props.children] The children nodes of the button.
 * @param {() => void} [props.onClick] The function to call when the button is clicked.
 * @returns {JSX.Element} The button element.
 */
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

  /**
   * Create the ripple effect for the button.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e The event that triggered the ripple effect.
   */
  function ripple(e: React.MouseEvent<HTMLButtonElement>) {
    Ripple(e, buttonRef.current!, color);
  }

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        ripple(e);
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
