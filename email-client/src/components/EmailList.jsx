import EmailItem from './EmailItem';

const EmailList = ({ emails, onClick, onFavoriteToggle }) => {
  return (
    <ul className='email-list'>
      {emails.map((email) => (
        <EmailItem 
          key={email.id} 
          email={email} 
          onClick={() => onClick(email.id)}  
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </ul>
  );
};

export default EmailList;
