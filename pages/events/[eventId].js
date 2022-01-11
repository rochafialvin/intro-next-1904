import axios from "../../utils/axios";
import { useRouter } from "next/router";

// Jika mengambil data didalam component, proses tersebut akan berjalan di client (browser)
export default function EventDetailPage(props) {
  const router = useRouter();
  const { event } = props;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <h1>Event title : {event.title} </h1>;
}

// Jika mengambil data di dalam getStaticProps, proses tersebut akan berjalan saat proses build (localhost)
export async function getStaticProps(context) {
  // localhost:3000/events/3
  // context.params.eventId = 3
  try {
    const { params } = context;
    const res = await axios.get(`/events/${params.eventId}`);
    console.log({ data: res.data });
    //res.data = {id: 3, title: Advanced Next JS , ...}

    return {
      props: { event: res.data },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error.message); // Jika data tidak berhasil ditemukan, akan masuk ke catch karena di anggap error.
    // Dan saat kita mereturn sebuah object dengan property notFound yang berisi true akan memberitahu next untuk menampilkan halaman 404
  }
}

// Untuk memberitahu next js mengenai nilai apa saja yang dapat diakses dari params eventId
export async function getStaticPaths() {
  try {
    const res = await axios.get("/events");

    // merubah bentuk data --> map
    const paths = res.data.map((event) => ({
      params: { eventId: String(event.id) },
    }));
    // res.data --> [ {id: 1}, {id: 2}, {id: 3} ]
    // paths    --> [ {params: { eventId: "1" }}, {params: { eventId: "2" }}, {params: { eventId: "3" }} ]

    return {
      paths: paths,
      fallback: true,
      // false : Jika eventId yang dikunjungi tidak terdefinisi pada paths, maka akan memunculkan halaman 404
    };
  } catch (error) {
    console.log({ error });
  }
}
