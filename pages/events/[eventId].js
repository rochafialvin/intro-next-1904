import { useRouter } from "next/router";

export default function EventDetailPage() {
  const { query } = useRouter();

  return <h1>Event detail : {query.eventId}</h1>;
}
