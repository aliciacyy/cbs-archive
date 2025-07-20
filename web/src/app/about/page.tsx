'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-6 px-6 md:px-32 md:py-8">
      <h1 className="text-4xl mb-8 font-bold text-left md:text-center text-blue-700">
        About
      </h1>

      <h2 className="text-2xl mb-4 font-bold text-left text-blue-700">
        Important disclaimer
      </h2>
      <p className="text-lg mb-4">
        I am not affiliated with Clues by Sam or its developers in any way. This
        is just a random side project and I am not earning anything from this.
      </p>

      <h2 className="text-2xl mb-4 font-bold text-left text-blue-700">
        What is Clues by Sam?
      </h2>
      <p className="text-lg mb-4">
        It&apos;s a daily free puzzle game that you can play on{' '}
        <a
          href="https://cluesbysam.com"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          https://cluesbysam.com
        </a>
        .
      </p>

      <h2 className="text-2xl mb-4 font-bold text-left text-blue-700">
        Then what&apos;s this site for?
      </h2>
      <p className="text-lg mb-4">
        Currently, the site does not have a way for players to be able to play
        puzzles from previous days. Thankfully, it is still possible to play
        past puzzles by using the &quot;Share Progress&quot; feature on the
        website.
      </p>
      <p className="text-lg mb-4">I created this site for 2 reasons:</p>
      <ul className="list-disc pl-6 mb-4 text-lg">
        <li>To save the links for past puzzles.</li>
        <li>To keep track of my own progress.</li>
      </ul>
      <p className="text-lg mb-4">
        Keeping track of the progress requires an account.
      </p>

      <h2 className="text-2xl mb-4 font-bold text-left text-blue-700">
        Why does the archive only have up to 6th July 2025?
      </h2>
      <p className="text-lg mb-4">
        Because I only thought of this idea then 😅. The game definitely existed
        way before that.
      </p>

      <h2 className="text-2xl mb-4 font-bold text-left text-blue-700">
        How can I create an account?
      </h2>
      <p className="text-lg mb-4">
        Account creation is only open to a small group of people to prevent
        abuse. However, I will be adding an alternative way to save progress
        without an account in the near future.
      </p>
    </div>
  );
}
