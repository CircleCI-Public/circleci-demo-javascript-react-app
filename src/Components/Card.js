// updated Card.js so when you click image, a small heart on bottom appears (like IG)

import React, { useState } from 'react';

const Cards = ({ cards }) => {
    const [likedCards, setLikedCards] = useState({});

    const toggleLike = (id) => {
        setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="row">
       {cards.map((card) => (
            <span key={card.data.id}>
                { card.data.crosspost_parent == null && card.data.media == null ?
                <div className="card mb-4">
                    <img
                        src={ card.data.url }
                        alt=""
                        width="400px"
                        height="300px"
                        onClick={() => toggleLike(card.data.id)}
                        style={{ cursor: 'pointer' }}
                    />
                    {likedCards[card.data.id] && (
                        <div style={{ textAlign: 'center', fontSize: '24px' }}>❤️</div>
                    )}
                </div>
                : ""
                }
            </span>
       ))}
       </div>
    )
}

export default Cards