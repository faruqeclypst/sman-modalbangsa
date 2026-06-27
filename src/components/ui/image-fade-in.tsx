"use client";

import * as React from "react";

/**
 * Global component that handles fade-in transition when images are fully loaded,
 * replacing the progressive progressive top-to-bottom load.
 */
export function ImageFadeIn() {
  React.useEffect(() => {
    // Add js-active class to the root html element
    document.documentElement.classList.add("js-active");

    const addLoadedClass = (img: HTMLImageElement) => {
      // Avoid re-triggering transitions
      if (!img.classList.contains("img-loaded")) {
        img.classList.add("img-loaded");
      }
    };

    const checkImage = (img: HTMLImageElement) => {
      if (img.complete && img.naturalWidth > 0) {
        addLoadedClass(img);
      } else {
        img.addEventListener(
          "load",
          () => {
            addLoadedClass(img);
          },
          { once: true }
        );
        img.addEventListener(
          "error",
          () => {
            // Remove opacity constraint on load errors so alt text or empty space shows normally
            addLoadedClass(img);
          },
          { once: true }
        );
      }
    };

    // Initial check for all images currently in DOM
    const checkAllImages = () => {
      document.querySelectorAll("img").forEach((img) => {
        checkImage(img);
      });
    };

    checkAllImages();

    // Set up MutationObserver to dynamically apply loaded class to newly added images (like navigations)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            checkImage(node);
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll("img").forEach((img) => {
              checkImage(img);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}