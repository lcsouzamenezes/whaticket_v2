import React, { useMemo } from "react";
import Markdown from "markdown-to-jsx";

import { elements, allowedElements } from "./elements";

const CustomLink = ({ children, ...props }) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const MarkdownWrapper = ({ children }) => {
  const boldRegex = /\*(.*?)\*/g;
  const tildaRegex = /~(.*?)~/g;

  if (children && boldRegex.test(children)) {
    children = children.replace(boldRegex, "**$1**");
  }
  if (children && tildaRegex.test(children)) {
    children = children.replace(tildaRegex, "~~$1~~");
  }

  const options = useMemo(() => {
    const markdownOptions = {
      disableParsingRawHTML: true,
      forceInline: true,
      overrides: {
        a: { component: CustomLink }
      }
    };

    elements.forEach(element => {
      if (!allowedElements.includes(element)) {
        markdownOptions.overrides[element] = el => el.children || null;
      }
    });

    return markdownOptions;
  }, []);

  if (!children) return null;

  return <Markdown options={options}>{children}</Markdown>;
};

export default MarkdownWrapper;
