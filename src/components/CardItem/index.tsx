import { FC } from "react";

import { Link } from "../../contexts/links";
import "./index.css";

const CardItem: FC<{ item: Link }> = ({ item }) => (
  <div className="card">
    <div
      className="title dotted-line"
      dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
    />
    <div>
      <a
        href={item.link}
        rel="noreferrer"
        target="_blank"
        className="dotted-line"
      >
        {item.link}
      </a>
    </div>
    <div className="description">{item.snippet}</div>
  </div>
);

export default CardItem;
