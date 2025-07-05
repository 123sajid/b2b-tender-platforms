import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Hello Tailwind + Next.js!
        </h1>
        <Link href="/login" className="text-blue-500 underline">
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}
