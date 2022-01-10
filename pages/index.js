import axios from "../utils/axios";
import EventItem from "../components/events/event-item";

export default function Home(props) {
  const renderEvents = () => {
    return props.events.map((event) => (
      <EventItem key={event.id} event={event} />
    ));
  };

  return (
    <ul style={{ width: "60%", margin: "3rem auto" }}>{renderEvents()}</ul>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await axios.get("/events");

    return {
      props: { events: res.data }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log({ error });
  }
}
