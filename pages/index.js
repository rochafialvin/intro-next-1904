import axios from "../utils/axios";

export default function Home(props) {
  return <h1>Jumlah events : {props.events.length}</h1>;
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
