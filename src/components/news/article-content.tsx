import parse, {
  domToReact,
  Element as DomElement,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface ArticleContentProps {
  html: string;
  className?: string;
}

const DISALLOWED_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
]);

const DISALLOWED_ATTR_PREFIX = ["on"]; // strip on* event handlers
const DISALLOWED_ATTRS = new Set(["style"]);

function isElement(node: unknown): node is DomElement {
  return Boolean(
    node &&
      typeof node === "object" &&
      "type" in (node as Record<string, unknown>) &&
      (node as Record<string, unknown>).type === "tag",
  );
}

function sanitizeProps(
  attribs: Record<string, string> | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!attribs) return out;
  for (const [name, value] of Object.entries(attribs)) {
    const lower = name.toLowerCase();
    if (DISALLOWED_ATTRS.has(lower)) continue;
    if (DISALLOWED_ATTR_PREFIX.some((p) => lower.startsWith(p))) continue;
    if (lower === "class") {
      out.className = value;
      continue;
    }
    out[name] = value;
  }
  return out;
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

/**
 * Render trusted (from our own WordPress backend) HTML safely:
 * - Strip script/style/iframe/object/embed tags
 * - Strip inline `style` and on* event handlers
 * - Replace <img> with next/image where possible
 * - Convert internal <a> tags to next/link
 */
export function ArticleContent({ html, className }: ArticleContentProps) {
  if (!html) return null;

  const options: HTMLReactParserOptions = {
    replace: (node: DOMNode) => {
      if (!isElement(node)) return undefined;
      const tag = node.name?.toLowerCase();
      if (!tag) return undefined;
      if (DISALLOWED_TAGS.has(tag)) return <></>;

      const attribs = sanitizeProps(node.attribs);

      if (tag === "img") {
        const src = attribs.src ?? "";
        if (!src) return <></>;
        const width = Number(attribs.width) || 800;
        const height = Number(attribs.height) || 600;

        // Use image URL as-is from WordPress (already sized appropriately in content)
        if (isHttpUrl(src)) {
          const isSchoolHost = /(^|\/\/)(www\.)?sman-modalbangsa\.sch\.id\//i.test(src);
          return (
            <Image
              src={src}
              alt={attribs.alt ?? ""}
              width={width > 100 ? width : 800}
              height={height > 100 ? height : 600}
              className="article-img mx-auto h-auto max-w-full rounded-lg"
              unoptimized={!isSchoolHost}
            />
          );
        }
        // eslint-disable-next-line @next/next/no-img-element
        return (
          <img
            src={src}
            alt={attribs.alt ?? ""}
            loading="lazy"
            className="article-img mx-auto h-auto max-w-full rounded-lg"
          />
        );
      }

      if (tag === "a") {
        const href = attribs.href ?? "#";
        const isInternal =
          href.startsWith("/") &&
          !href.startsWith("//") &&
          !href.startsWith("/wp-");
        if (isInternal) {
          return (
            <Link
              href={href}
              className={attribs.className}
              {...(attribs.title ? { title: attribs.title } : {})}
            >
              {domToReact((node.children as DOMNode[]) ?? [], options)}
            </Link>
          );
        }
        return (
          <a
            href={href}
            target={attribs.target ?? "_blank"}
            rel={attribs.rel ?? "noopener noreferrer"}
            className={attribs.className}
            {...(attribs.title ? { title: attribs.title } : {})}
          >
            {domToReact((node.children as DOMNode[]) ?? [], options)}
          </a>
        );
      }

      return undefined; // default rendering
    },
  };

  return <div className={className}>{parse(html, options)}</div>;
}
