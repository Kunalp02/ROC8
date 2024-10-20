// src/services/api.js
export const fetchEmails = async () => {
    const url = 'https://flipkart-email-mock.now.sh/';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
      const data = await response.json();
      return data.list; // Return the list of emails
    } catch (error) {
      console.error('Error fetching emails:', error);
      return [];
    }
  };
  
  export const fetchEmailBody = async (emailId) => {
    const url = `https://flipkart-email-mock.now.sh/?id=${emailId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch email body');
      }
      const data = await response.json();
      return data; // Return the email body data
    } catch (error) {
      console.error('Error fetching email body:', error);
      return null;
    }
  };
  