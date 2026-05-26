"use client";

import * as React from "react";

interface DisqusCommentsProps {
  /** Unique identifier for the page (e.g. post slug or ID) */
  identifier: string;
  /** Full URL of the page */
  url: string;
  /** Page title */
  title: string;
}

/**
 * Disqus comment embed using Universal Code.
 * Shortname: sman-modalbangsa
 */
export function DisqusComments({ identifier, url, title }: DisqusCommentsProps) {
  const disqusRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const shortname = "sman-modalbangsa";

    // Set Disqus config
    (window as any).disqus_config = function (this: any) {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    // If Disqus is already loaded, reset it
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page.url = url;
          this.page.identifier = identifier;
          this.page.title = title;
        },
      });
      return;
    }

    // Load Disqus embed script
    const script = document.createElement("script");
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute("data-timestamp", String(+new Date()));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const disqusThread = document.getElementById("disqus_thread");
      if (disqusThread) disqusThread.innerHTML = "";
    };
  }, [identifier, url, title]);

  return (
    <div className="mt-10 border-t border-[color:var(--border)] pt-8">
      <div id="disqus_thread" ref={disqusRef} />
      <noscript>
        Silakan aktifkan JavaScript untuk melihat{" "}
        <a href="https://disqus.com/?ref_noscript" rel="noopener noreferrer">
          komentar dari Disqus.
        </a>
      </noscript>
    </div>
  );
}
