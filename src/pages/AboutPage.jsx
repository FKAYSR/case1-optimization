import { Link } from "react-router";

export default function AboutPage() {
  return (
    <>
      <header className="page-header about-header">
        <div className="about-header-content">
          <p className="eyebrow">Om Mellemrum</p>
          <h1>Vi skaber mellemrum i kalenderen.</h1>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
      </header>
      <main className="about-page">
        <section className="about-intro" aria-labelledby="about-intro-title">
          <div>
            <p className="eyebrow dark">Idéen</p>
            <h2 id="about-intro-title">En enkel vej til det, der sker tæt på.</h2>
          </div>
          <div className="about-intro-copy">
            <p className="lead">
              Mellemrum samler koncerter, talks, workshops og fællesskaber, så du lettere kan opdage noget, du ikke
              allerede kendte.
            </p>
            <p>
              Vi gør det lokale kulturliv mere overskueligt og skaber en kort vej fra nysgerrighed til en plads i
              kalenderen.
            </p>
          </div>
        </section>

        <section className="about-audiences" aria-labelledby="about-audiences-title">
          <div className="about-section-heading">
            <p className="eyebrow">Målgrupper</p>
            <h2 id="about-audiences-title">Mellemrum forbinder oplevelser med mennesker.</h2>
          </div>
          <div className="about-audience-split">
            <article>
              <span>Primær målgruppe</span>
              <h3>For dig, der vil opdage byen</h3>
              <p>Find lokale oplevelser, få det vigtigste overblik, og tilmeld dig uden unødige omveje.</p>
              <Link to="/">Udforsk kommende events →</Link>
            </article>
            <article>
              <span>For arrangører</span>
              <h3>Gør oplevelsen synlig</h3>
              <p>Del events med et nysgerrigt publikum, og få overblik over de mennesker, der tilmelder sig.</p>
              <a href="mailto:hej@mellemrum.dk">Tal med os om et event →</a>
            </article>
          </div>
        </section>

        <section className="about-flow-section" aria-labelledby="about-flow-title">
          <div className="about-section-heading">
            <p className="eyebrow dark">Sådan hænger det sammen</p>
            <h2 id="about-flow-title">Fra idé til plads i kalenderen.</h2>
          </div>
          <ol className="about-flow-list">
            <li>
              <span>01</span>
              <strong>Arrangører deler events</strong>
              <p>Oplevelsen får en tydelig plads på platformen.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Brugere opdager</strong>
              <p>Søgning, kategorier og kuratering gør det lettere at vælge.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Brugere tilmelder sig</strong>
              <p>Fra interesse til tilmelding i ét sammenhængende flow.</p>
            </li>
          </ol>
        </section>

        <section className="about-city" aria-labelledby="about-city-title">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1532370778713-1400f3d62094?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Moderne arkitektur med lyse facader og turkise altaner"
            />
            <figcaption>Byrum, arkitektur og nye perspektiver.</figcaption>
          </figure>
          <div>
            <p className="eyebrow dark">Aarhus tæt på</p>
            <h2 id="about-city-title">Find plads til noget nyt.</h2>
            <p>Mellemrum peger på steder, idéer og fællesskaber på tværs af byen — fra små scener til store tanker.</p>
            <Link className="about-cta" to="/">
              Se kommende events →
            </Link>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-brand">
              mellemrum<span>.</span>
            </p>
            <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-link-group">
              <p className="footer-heading">Udforsk</p>
              <Link to="/">Events</Link>
              <Link to="/om">Om Mellemrum</Link>
            </div>
            <div className="footer-link-group">
              <p className="footer-heading">For arrangører</p>
              <Link to="/tilmeldinger">Se tilmeldinger</Link>
              <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-meta">© 2026 Mellemrum</p>
          <p>Aarhus, Danmark</p>
        </div>
      </footer>
    </>
  );
}
