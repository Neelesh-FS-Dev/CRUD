import React, { useState, useEffect } from "react";
import "./AddEntryForm.css";

const AddEntryForm = ({ onAddEntry, onEditEntry, editEntry }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (editEntry) {
      setFirstName(editEntry.firstName);
      setLastName(editEntry.lastName);
      setPhoneNumber(editEntry.phoneNumber);
    }
  }, [editEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { firstName, lastName, phoneNumber };

    if (editEntry) {
      onEditEntry(editEntry.id, newEntry);
    } else {
      fetch("http://localhost:3001/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })
        .then((response) => response.json())
        .then((addedEntry) => {
          onAddEntry(addedEntry);
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
        })
        .catch((error) => {
          console.error("Error adding entry:", error);
        });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="tel"
          className="form-input"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit" className="submit-button">
          {editEntry ? "Edit Entry" : "Add Entry"}
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
