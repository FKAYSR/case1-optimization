import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Lottie } from "lottie-react";
import successAni from "../assets/animations/check-animation.json"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submittedData, setSubmittedData] = useState("");

  useEffect(() => {
    async function getEvent() {
      const response = await fetch(`${SUPABASE_URL}/events?id=eq.${eventId}`, { headers });
      const data = await response.json();
      setEvent(data[0]);
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    console.log({ name, email, event: event.title });

    setSubmittedData({ name, email})

    setName("");
    setEmail("");

    setShowAnimation(true);

    setTimeout(() => {
      setIsClosing(true);

      setTimeout(() => {
        setShowAnimation(false);
        setIsClosing(false);
      }, 300);
    }, 1600);
  }

  if (!event) {
    return null;
  }

  const date = new Date(event.date);

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>

        <section className="event-detail">
          <img src={event.image} alt="" />
          <div className="event-detail-content">
            <p className="event-category">{event.category}</p>
            <h1>{event.title}</h1>
            <p className="lead">{event.summary}</p>
            <div className="detail-list">
              <p>
                <strong>Dato</strong>
                {date.toLocaleDateString("da-DK", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                kl.{" "}
                {date.toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Sted</strong>
                <span>
                  {event.venueName}
                  <br />
                  {event.venueAddress}, {event.venuePostalCode}{" "}
                  {event.venueCity}
                  {event.venueWebsite && (
                    <>
                      <br />
                      <a href={event.venueWebsite}>Besøg venue</a>
                    </>
                  )}
                </span>
              </p>
              <p>
                <strong>Pris</strong>
                {event.price === 0 ? "Gratis" : `${event.price} kr.`}
              </p>
            </div>
            <p>{event.description}</p>
          </div>
        </section>

        <section className="signup-panel">
          {submittedData ? (
            // Bekræftigelse efter bruger har tilmeldt sig
            <div className="signup-success-state">
              <p className="eyebrow dark">Tilmeldt</p>
              <h2>Mange tak, {submittedData.name}!</h2>
              <p>
                Vi har sendt en bekræftigelses mail til{" "}
                <strong>{submittedData.email}</strong>.
              </p>

              {/* Link til RegistrationsPage */}
              <Link to="/tilmeldinger" className="back-link">
                Se alle tilmeldinger →
              </Link>
            </div>
          ) : (
            // Tilmeldings formularens default
            <div>
              <p className="eyebrow dark">Tilmelding</p>
              <h2>Reserver din plads</h2>
              <p>
                Udfyld formularen, så sender vi din tilmelding til arrangøren.
              </p>
            </div>
          )}

          <div>
            {submittedData && <h3>Vil du tilføje en ven?</h3>}

            <form onSubmit={handleSubmit}>
              <label htmlFor="signup-navn">
                Navn
                <input
                  id="signup-navn"
                  required
                  value={name}
                  onChange={(inputEvent) => setName(inputEvent.target.value)}
                  placeholder="dit kaldenavn"
                />
              </label>
              <label htmlFor="signup-email">
                E-mail
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(inputEvent) => setEmail(inputEvent.target.value)}
                  placeholder="dig@example.com"
                />
              </label>
              <button type="submit">Tilmeld mig</button>
            </form>
          </div>
        </section>
      </main>

      {showAnimation && (
        <div className={`lottie-overlay ${isClosing ? "is-closing" : ""}`}>
          <div>
            <Lottie src={successAni} autoplay loop={false} aria-hidden="true" />
          </div>
          <p>Du er tilmeldt!</p>
        </div>
      )}
    </>
  );
}
