import React from 'react';

const Cards = ({ cards }) => {
  return (
    <div className="row">
      {cards.map((card) => (
        <div className="col-md-4 mb-4" key={card.id}>
          <div className="card factory-card h-100">
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-subtitle mb-2 text-muted">{card.status}</p>
              <p className="card-text">{card.detail}</p>
              <p className="card-text">
                <small className="text-muted">{card.metric}</small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
