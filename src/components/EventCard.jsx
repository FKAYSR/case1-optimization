import { Link } from "react-router";

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
  console.log(event);
  const eventSlug = encodeURIComponent(event.title.toLowerCase().trim().replace(/\s+/g, "-"));

    return (
<div className="event-card" key={event.title}>
  <img src={event.image} alt="" />
  <div className="event-card-content">
    <p className="event-category">{event.category}</p>
    <h3>{event.title}</h3>
    <p>{event.summary}</p>
    <div className="event-meta">
      <span>{formatEventDate(event.date)}</span>
      <span>{event.venues?.name}</span>
    </div>
    <Link className="card-link" to={`/events/${eventSlug}`}>
      Læs mere
    </Link>
  </div>
</div>
);
}
