import { Card } from "@mui/material";
import Image from "next/image";
import classes from "./event-item.module.css";

export default function EventItem(props) {
  const { event } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.image}>
        <Image
          layout="responsive"
          width="100%"
          height="100%"
          src={`/${event.image}`}
          alt={event.title}
        />
      </div>
      <div className={classes.info}>
        <p className={classes.title}>{event.title}</p>
        <p className={classes.date}>{event.date}</p>
        <p className={classes.location}>{event.location}</p>
      </div>
    </Card>
  );
}
