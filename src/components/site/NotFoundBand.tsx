import Link from "next/link";

export function NotFoundBand() {
  return (
    <section className="pintro f-mist">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1 pintro__title">This page doesn&apos;t exist</h1>
        <p className="lead pintro__lead">It may have moved. Start from the home page or request your free audit.</p>
        <div className="btn-row" style={{ marginTop: "2rem" }}>
          <Link className="btn btn--primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn--secondary" href="/contact">
            Get a free audit
          </Link>
        </div>
      </div>
    </section>
  );
}
