import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";
import MarkdownSupport from "./MarkdownSupport";

export default function HelpCenter() {
  const { helpdoc } = useParams();
  const [helpdocContent, setHelpdocContent] = useState("");
  const [loadingErrorState, setErrorState] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/assets/helpdoc/" + helpdoc + ".md")
      .then((res) => {
        setHelpdocContent(res.data);
      })
      .catch(() => {
        setErrorState(true);
      });
  }, [helpdoc]);

  if (loadingErrorState) {
    return (
      <ErrorNotice text="We can not load the helper document. It may be a bug or a problem in your network connection."></ErrorNotice>
    );
  } else if (helpdocContent !== "") {
    return <MarkdownSupport content={helpdocContent}></MarkdownSupport>;
  } else {
    return null;
  }
}
