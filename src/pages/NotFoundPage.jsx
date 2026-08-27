import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <header>
        <h1 className="not-found-title">404</h1>
      </header>
      <main className="not-found">
        <p>Siden, du leder efter, findes ikke.</p>
        <Link to="/" className="not-found-link">
          Gå til forsiden
        </Link>
      </main>
    </>
  );
}
