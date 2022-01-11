import axios from "../../utils/axios";

// Jika mengambil data didalam component, proses tersebut akan berjalan di client (browser)
export default function EventDetailPage(props) {
  const { event } = props;

  return <h1>Event title : {event.title} </h1>;
}

// Jika mengambil data di dalam getStaticProps, proses tersebut akan berjalan saat proses build (localhost)
export async function getStaticProps(context) {
  // localhost:3000/events/3
  // context.params.eventId = 3
  try {
    const { params } = context;
    const res = await axios.get(`/events/${params.eventId}`);
    //res.data = {id: 3, title: Advanced Next JS , ...}

    return {
      props: { event: res.data },
    };
  } catch (error) {
    console.log({ error });
  }
}

// Untuk memberitahu next js mengenai nilai apa saja yang dapat diakses dari params eventId
export async function getStaticPaths() {
  // localhost:3000/events/2
  return {
    paths: [
      { params: { eventId: "1" } }, // -> eventid-1.html
      { params: { eventId: "2" } }, // -> eventid-2.html
      { params: { eventId: "3" } }, // -> eventid-1.html
    ],
    fallback: false,
  };
}
