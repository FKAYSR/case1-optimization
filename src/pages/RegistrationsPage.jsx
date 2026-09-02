import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./RegistrationsPage.css";
import { SUPABASE_URL, headers } from "../services/events";

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
          <table>
            <caption className="visually-hidden">
              Oversigt over tilmeldinger
            </caption>
            <thead>
              <tr className="registration-row registration-labels">
                <th scope="col">Navn</th>
                <th scope="col">Event</th>
                <th scope="col">Dato</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr className="registration-row" key={registration.id}>
                  <th scope="row" data-label="Navn">
                    {registration.name}
                  </th>
                  <td data-label="Event">
                    <Link
                      to={`/events/${encodeURIComponent(registration.events?.title.toLowerCase().trim().replace(/\s+/g, "-"))}`}
                      className="event-title-link"
                    >
                      {registration.events?.title}
                    </Link>
                  </td>
                  <td data-label="Dato">
                    {new Date(registration.events?.date).toLocaleDateString(
                      "da-DK",
                    )}
                  </td>
                  <td data-label="Status">
                    <span className="status">{registration.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
