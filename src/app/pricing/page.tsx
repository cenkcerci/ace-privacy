import Link from "next/link";
import UpgradeButton from "./UpgradeButton";

export default function PricingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link href="/policy-generator" className="text-sm text-gray-600 hover:underline">
          ← Back to Generator
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Pricing</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-sm text-gray-500 mb-4">3 policies/day · HTML only</p>
          <ul className="text-sm list-disc ml-5 mb-6">
            <li>Privacy &amp; Cookie Policy</li>
            <li>Copy / Download HTML</li>
          </ul>
          <Link href="/policy-generator" className="inline-block rounded-md border px-4 py-2">
            Get Started
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="text-sm text-gray-500 mb-4">Unlimited · HTML + PDF</p>
          <ul className="text-sm list-disc ml-5 mb-6">
            <li>Unlimited generations</li>
            <li>Download PDF</li>
          </ul>
          <UpgradeButton /> {/* client component; no props */}
        </div>
      </div>
    </main>
  );
}
