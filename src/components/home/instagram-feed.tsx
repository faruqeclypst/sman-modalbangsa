import Image from "next/image";
import { Container } from "@/components/ui/container";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const BEHOLD_FEED_URL =
  process.env.NEXT_PUBLIC_BEHOLD_FEED_URL ??
  "https://feeds.behold.so/yqI9zrjyjYhovCj2nfNN";

interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: string;
  mediaUrl: string;
  sizes: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
  };
  caption: string;
  prunedCaption: string;
  hashtags: string[];
}

interface BeholdFeed {
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: BeholdPost[];
}

async function getBeholdFeed(): Promise<BeholdFeed | null> {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: 3600 }, // Re-fetch every 1 hour
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function InstagramFeed() {
  const feed = await getBeholdFeed();
  const posts = feed?.posts?.slice(0, 6) ?? [];

  return (
    <section
      aria-label="Instagram"
      className="relative overflow-hidden bg-[color:var(--background)] py-14 sm:py-16"
    >
      {/* Background decoration - floating abstract cameras or geometry */}
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 translate-x-1/4 translate-y-1/4 opacity-[0.03] text-purple-700 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="20" strokeDasharray="4 4" />
          <path d="M 10 50 L 90 50" />
          <path d="M 50 10 L 50 90" />
        </svg>
      </div>
      <div className="absolute left-0 top-0 -z-10 h-64 w-64 -translate-x-1/4 -translate-y-1/4 opacity-[0.02] text-orange-600 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" />
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white">
              <InstagramIcon className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">
                <a
                  href="https://instagram.com/smanmodalbangsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--primary)] transition-colors"
                >
                  Instagram
                </a>
              </h2>
              <p className="text-sm text-muted-foreground">
                @smanmodalbangsa
                {feed?.followersCount ? (
                  <> • <span className="font-medium">{feed.followersCount.toLocaleString()} followers</span></>
                ) : null}
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/smanmodalbangsa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200/50 transition-all hover:shadow-lg hover:opacity-90"
          >
            Follow
            <InstagramIcon className="size-4" />
          </a>
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {posts.map((post) => {
              const imgUrl =
                post.sizes?.medium?.mediaUrl ??
                post.sizes?.small?.mediaUrl ??
                post.mediaUrl;

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                >
                  <Image
                    src={imgUrl}
                    alt={post.prunedCaption?.slice(0, 80) ?? "Instagram post"}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 16vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                    <div className="flex items-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <InstagramIcon className="size-6 text-white" />
                    </div>
                  </div>
                  {post.mediaType === "CAROUSEL_ALBUM" ? (
                    <div className="absolute right-2 top-2 rounded bg-black/50 p-1">
                      <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M4 6h12v12H4V6zm2 2v8h8V8H6zm10-4h4v12h-2V6h-2V4z" />
                      </svg>
                    </div>
                  ) : post.mediaType === "VIDEO" ? (
                    <div className="absolute right-2 top-2 rounded bg-black/50 p-1">
                      <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : null}
                </a>
              );
            })}
          </div>
        ) : (
          /* Placeholder grid when feed is unavailable */
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <a
                key={i}
                href="https://instagram.com/smanmodalbangsa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 transition-colors hover:from-pink-50 hover:to-purple-50"
              >
                <div className="flex h-full items-center justify-center">
                  <InstagramIcon className="size-8 text-gray-200 transition-colors group-hover:text-pink-300" />
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
