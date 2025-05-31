import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncPopulateThreadsAndUsers } from "../states/threads/action";
import { Link } from "react-router-dom";
import ThreadList from "../components/ThreadList";
import CategoryFilter from "../components/CategoryFilter";

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser = null,
    loadingBar = 0,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const threadList = threads
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }))
    .filter((thread) => thread.owner);

  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  if (loadingBar > 0 && threads.length === 0) {
    return <p>Loading threads...</p>;
  }

  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <div className="home-page">
      <h2>Daftar Diskusi</h2>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ThreadList threads={filteredThreads} />
      {authUser && (
        <div className="add-thread-button-container">
          <Link to="/new" className="add-thread-button">
            +
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
