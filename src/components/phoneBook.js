import React, { useState, useEffect } from "react";
import AddEntryForm from "./addEntryForm";
import "./PhoneBook.css";

const PhoneBook = () => {
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/entries")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
      });
  }, []);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
    setEditEntry(null);
  };

  const editEntryHandler = (index) => {
    setEditEntry({ ...entries[index], id: index });
  };

  const onEditEntry = (id, updatedEntry) => {
    const updatedEntries = entries.map((entry, index) =>
      index === id ? updatedEntry : entry
    );
    setEntries(updatedEntries);
    setEditEntry(null);
  };

  const deleteEntry = (index) => {
    fetch(`http://localhost:3001/entries/${index}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const filteredEntries = entries.filter((entry) =>
    `${entry.firstName} ${entry.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="phone-book-container">
      <h1 className="phone-book-title">Phone Book</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <AddEntryForm
        onAddEntry={addEntry}
        onEditEntry={onEditEntry}
        editEntry={editEntry}
      />
      <ul className="entry-list">
        {filteredEntries.map((entry, index) => (
          <li key={index} className="entry">
            {entry.firstName} {entry.lastName} - {entry.phoneNumber}
            <button
              className="edit-button"
              onClick={() => editEntryHandler(index)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteEntry(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneBook;
