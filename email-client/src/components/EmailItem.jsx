import LetteredAvatar from 'react-lettered-avatar';

const EmailItem = ({ email, onClick, onFavoriteToggle }) => {
  const { from, subject, short_description, date } = email;

  return (
    <li onClick={onClick} className="email-item">
      <div className="email-item-header">
        {/* Lettered Avatar */}
        <LetteredAvatar name={from.name} size={40} />
        
        {/* Email Info */}
        <div className="email-info">
          <h3><strong>From:</strong> {from.name} ({from.email})</h3>
          <h4>Subject: {subject}</h4>
          <p>{short_description}</p>
        </div>

        {/* Date and Favorite Button */}
        <div className="email-extra">
          <p><small>{new Date(date).toLocaleString()}</small></p>
          <button 
            className="favourite-btn"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(email.id);
            }}
          >
            {email.favorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default EmailItem;
