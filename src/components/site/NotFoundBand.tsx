import Link from "next/link";

export function NotFoundBand() {
  return (
    <section className="pintro f-sky">
      <h1 className="display">Not found</h1>
      <p>
        This page doesn&apos;t exist, or it has moved.{" "}
        <Link className="link" href="/" style={{ textDecorationColor: "currentColor" }}>
          Go to the home page
        </Link>
        .
      </p>
    </section>
  );
}
