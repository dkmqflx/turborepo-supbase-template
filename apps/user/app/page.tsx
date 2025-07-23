import Link from 'next/link';

export default function Home() {
  return (
    <div className="m-10 flex gap-4">
      <Link href="/query-test">Query Test</Link>
      <Link href="/prefetch">Prefetch</Link>
    </div>
  );
}
