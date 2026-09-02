import { useEffect, useState } from "react";
import EventCard from "../components/EventCard"
import "./HomePage.css";
import { SUPABASE_URL, headers } from "../services/events";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`${SUPABASE_URL}/events?select=*,venues(*)&order=date.asc`, { headers });
      const data = await response.json();
      setEvents(data);
    }

    getEvents();
  }, []);

  const categories = ["Alle", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter.
        </p>
        <a className="hero-link" href="#events">
          Se kommende events ↓
        </a>
      </header>

      <main id="events">
        <section className="section-heading">
          <div>
            <p className="eyebrow-dark">Det sker</p>
            <h2 id="upcoming-events-title">Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <section className="filters" aria-label="Filtrer events">
          <label>
            Søg
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Søg efter titel eller sted"
            />
          </label>
          <label>
            Kategori
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="event-grid" aria-labelledby="upcoming-events-title">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      </main>
    </>
  );
}
