import React, { memo } from "react";
import "../css/mainStyle.css"

export const Item = memo(({ data }) => {
  return (
    <div className="gallaryFlexItems">
      {data.thumbnail !== "self" && <img src={data.thumbnail} alt="" />}
      <p>{data.title}</p>
      <p>Number of comments: {data.num_comments}</p>
      <a
        href={`https://www.reddit.com/${data.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        link
      </a>
    </div>
  );
});
