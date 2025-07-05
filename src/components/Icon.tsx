import React from "react";
import { useIcon } from "../hooks/useIcon";
import { IconProps } from "../types";

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className,
  apiBaseUrl,
}) => {
  const { data, loading, error } = useIcon(name, { apiBaseUrl });

  if (loading) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "2px",
        }}
      >
        <span style={{ fontSize: "10px", color: "#666" }}>...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fee",
          borderRadius: "2px",
        }}
      >
        <span style={{ fontSize: "10px", color: "#c00" }}>!</span>
      </div>
    );
  }

  // Parse SVG and apply props
  const svgCode = data.svg_code;
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgCode, "image/svg+xml");
  const svgElement = doc.documentElement;

  // Apply size
  if (size) {
    svgElement.setAttribute("width", size.toString());
    svgElement.setAttribute("height", size.toString());
  }

  // Apply color if provided
  if (color) {
    svgElement.setAttribute("fill", color);
    svgElement.setAttribute("stroke", color);
  }

  // Apply className if provided
  if (className) {
    svgElement.setAttribute("class", className);
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgElement.outerHTML,
      }}
      style={{ display: "inline-block" }}
    />
  );
};
