import { useEffect, useState } from 'react';

const EmailBody = ({ emailId, email, onClose, onFavoriteToggle }) => {
  const [emailBody, setEmailBody] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailBody = async () => {
      if (!emailId) return;
      setLoading(true);
      try {
        const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${emailId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch email body');
        }
        const data = await response.json();
        setEmailBody(data.body ? data : { body: 'No body available', subject: 'No subject', date: null });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailBody();
  }, [emailId]);

  if (loading) return <p>Loading email body...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!emailBody) return <p>Select an email to view its body.</p>;

  return (
    <div className='email-body-container'>
      <div>
        <button onClick={onClose} className='close-btn'> X </button>
      </div>
      <h2>{emailBody.subject || 'No Subject'}</h2>
      {/* Render the email body as HTML */}
      <div dangerouslySetInnerHTML={{ __html: emailBody.body }} />
      {emailBody.date && <p>{new Date(emailBody.date).toLocaleString()}</p>}
      <div>
        <button 
          className='favourite-btn'
          onClick={() => onFavoriteToggle(email.id)} 
        >
          {email.favorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default EmailBody;
