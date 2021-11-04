import React, { PropsWithChildren, useState, FormEvent } from "react";
import { Dispatch } from "redux";
import { addComment } from "../../actions/post";

type Props = PropsWithChildren<{
  dispatch: Dispatch<any>;
  history: any;
  id: string;
}>;

const CommentForm: React.FC<Props> = ({ dispatch, history, id }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    addComment(dispatch, history, text, id);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols={30}
          rows={5}
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
