import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddThread } from "../states/threads/action";

function AddThreadPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      dispatch(asyncAddThread({ title, body, category })).then(() => {
        navigate("/");
      });
    } else {
      alert("Judul dan isi thread tidak boleh kosong!");
    }
  };

  return (
    <div className="add-thread-page">
      <h2>Buat Thread Baru</h2>
      <form onSubmit={onSubmit} className="add-thread-form">
        <input
          type="text"
          placeholder="Judul Thread"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Kategori (Opsional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Isi Thread (mendukung HTML dasar)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          required></textarea>
        <button type="submit">Buat Thread</button>
      </form>
    </div>
  );
}

export default AddThreadPage;
