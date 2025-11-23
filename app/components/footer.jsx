"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-16 text-center">
          <div className="flex gap-6 justify-center">
            <a
              href="https://scist.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SCIST website"
              className="h-32 w-62 bg-white rounded-2xl flex items-center justify-center border-2 border-background/30 overflow-hidden cursor-pointer"
            >
              <Image
                src="/assets/images/scist.png"
                alt="SCIST"
                width={192}
                height={128}
                className="object-contain"
              />
            </a>

            <a
              href="https://scaict.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SCAICT website"
              className="h-32 w-62 bg-white rounded-2xl flex items-center justify-center border-2 border-background/30 overflow-hidden cursor-pointer"
            >
              <Image
                src="/assets/images/scaict.png"
                alt="SCAICT"
                width={192}
                height={128}
                className="object-contain"
              />
            </a>
          </div>

          <div className="flex items-center justify-center">
            <p className="text-sm text-background/60">
              Copyright &copy; 2025-2026 SCIST × SCAICT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
