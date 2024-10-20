import { useEffect, useState } from "react";
import EmailList from "./components/EmailList";
import EmailBody from "./components/EmailBody";
import './styles.css';

function App() {
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default filter set to "all"

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://flipkart-email-mock.now.sh/');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        const updatedEmails = data.list.map(email => ({
          ...email,
          read: false,
          favorite: false
        }));
        setEmails(updatedEmails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleEmailClick = (emailId) => {
    setEmails(emails.map(email => email.id === emailId ? { ...email, read: true } : email));
    setSelectedEmailId(emailId);
  };

  const handleFavoriteToggle = (emailId) => {
    setEmails(emails.map(email => email.id === emailId ? { ...email, favorite: !email.favorite } : email));
  };

  const handleCloseEmail = () => {
    setSelectedEmailId(null);
  };

  const filteredEmails = emails.filter(email => {
    switch (filter) {
      case "favorites":
        return email.favorite;
      case "read":
        return email.read;
      case "unread":
        return !email.read;
      default:
        return true; // "all"
    }
  });

  return (
    <div className={`container ${selectedEmailId ? "email-selected" : ""}`}>
      <div className="email-list-container">
        <div className="filter-buttons">
          {["all", "favorites", "read", "unread"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={filter === filterOption ? "active" : ""}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p>Loading emails...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        <EmailList emails={filteredEmails} onClick={handleEmailClick} onFavoriteToggle={handleFavoriteToggle} />
      </div>

      {selectedEmailId && (
        <div className="email-body-container">
          <EmailBody
            emailId={selectedEmailId}
            email={emails.find(email => email.id === selectedEmailId)}
            onClose={handleCloseEmail}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      )}
    </div>
  );
}

export default App;
