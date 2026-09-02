import { Link } from "react-router";
import "./EventCard.css";

function formatEventDate(eventDate) {
  const date = new Date(eventDate);
  const formattedDate = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export default function EventCard( {event} ) {
  const eventSlug = encodeURIComponent(event.title.toLowerCase().trim().replace(/\s+/g, "-"));

    return (
<article className="event-card" key={event.title}>
  <img src={event.image} alt="" />
  <div className="event-card-content">
    <p className="event-category">{event.category}</p>
    <h3>{event.title}</h3>
    <p>{event.summary}</p>
    <dl className="event-meta">
      <div>
        <dt>Dato</dt>
        <dd>{formatEventDate(event.date)}</dd>
      </div>
      <div>
        <dt>Sted</dt>
        <dd>{event.venues?.name || "Sted ikke oplyst"}</dd>
      </div>
    </dl>
    <Link className="card-link" to={`/events/${eventSlug}`} aria-label={`Læs mere om ${event.title}`}>
      Læs mere
    </Link>
  </div>
</article>
);
}
