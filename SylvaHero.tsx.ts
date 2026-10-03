import React, { useMemo } from "react";
import innerGreenSource from "../../../public/landing-pages/inner-green-3d.html?raw";

export interface SylvaHeroProps {
  variant?: "living-green" | "maple-autumn" | "sakura-sunset" | "sequoia-mist";
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string | number;
  bodyWeight?: string | number;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  className?: string;
}

export const SylvaHero: React.FC = ({
  variant = "living-green",
  primaryColor = "#ffffff",
  headingSize = 63,
  bodySize = 16.5,
  headingLetterSpacing = -0.006,
  className = "",
}) => {
  const srcDoc = useMemo(() => {
    let html = innerGreenSource;

    // Chèn kiểu chữ và màu sắc tùy chỉnh vào trong thẻ  của HTML
    const customStyles = `
      
    `;

    return html.replace("", `${customStyles}`);
  }, [primaryColor, headingSize, bodySize, headingLetterSpacing]);

  return (
    
  );
};

export default SylvaHero;