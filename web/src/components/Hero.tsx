'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-6 md:px-12 md:py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight">
          Clues by Sam Archive
        </h1>
        <p className="mt-6 text-lg md:text-xl text-blue-600 max-w-2xl mx-auto">
          List of past Clues by Sam puzzles.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button
            asChild
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <Link href="https://cluesbysam.com" target="_blank">
              Today&apos;s puzzle
            </Link>
          </Button>
          <Button className="cursor-pointer text-blue-600 bg-transparent border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
            {/* <Link href="/about">Learn more</Link> */}
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
