import { useEffect, useState } from "react";
import { Link } from "react-router";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getRegistrations() {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/registrations?select=*,events(*)&order=createdAt.desc`,
          { headers },
        );

        if (!response.ok) {
          throw new Error("Registrations could not be loaded");
        }

        const data = await response.json();
        setRegistrations(data);
        setRegistrationCount(data.length);
        setError("");
      } catch {
        setError("Tilmeldingerne kunne ikke hentes. Prøv igen senere.");
      }
    }

    getRegistrations();

    function refreshOnFocus() {
      if (document.visibilityState === "visible") {
        getRegistrations();
      }
    }

    document.addEventListener("visibilitychange", refreshOnFocus);

    return () =>
      document.removeEventListener("visibilitychange", refreshOnFocus);
  }, []);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrationCount} tilmeldinger i alt</p>
      </header>
      <main>
        {error && <p role="alert">{error}</p>}
        <div className="registration-list">
          <div className="registration-row registration-labels">
            <span>Navn</span>
            <span>Event</span>
            <span>Dato</span>
            <span>Status</span>
          </div>
          {registrations.map((registration) => (
            <div className="registration-row" key={registration.id}>
              <div>
                <strong>{registration.name}</strong>
              </div>
              <span>
                <Link
                  to={`/events/${encodeURIComponent(registration.events?.title.toLowerCase().trim().replace(/\s+/g, "-"))}`}
                  className="event-title-link"
                >
                  {registration.events?.title}
                </Link>
              </span>
              <span>
                {new Date(registration.events?.date).toLocaleDateString("da-DK")}
              </span>
              <span className="status">{registration.status}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
