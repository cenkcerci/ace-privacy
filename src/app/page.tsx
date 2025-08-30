export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: 840, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        PolicyGen (MVP)
      </h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Generate a Privacy Policy and Cookie Policy with U.S./Canada localization.
      </p>

      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <a href="/privacy" style={{ textDecoration: 'underline' }}>Preview Privacy Policy</a>
        </li>
        <li>
          <a href="/cookie" style={{ textDecoration: 'underline' }}>Preview Cookie Policy</a>
        </li>
        <li>
          <a href="/playground" style={{ textDecoration: 'underline' }}>Open Playground</a>
        </li>
      </ul>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
        Tip: if these routes don’t exist yet, create simple pages at
        <code> /privacy</code>, <code>/cookie</code>, or a form-driven{" "}
        <code>/playground</code> that POSTs to your API route.
      </div>
    </main>
  );
}
