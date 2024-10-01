import React, { useState, useEffect } from 'react';
import './anime.css'; // Ensure you have styles here or include them inline

const MemoryGame = () => {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        shuffleImages();
    }, []);

    useEffect(() => {
        if (selected.length === 2) {
            const [first, second] = selected;
            if (images[first.index] === images[second.index]) {
                setMatched(prev => [...prev, first.index, second.index]);
                setScore(prev => prev + 10);
            }
            setTimeout(() => {
                setSelected([]);
                setMoves(prev => prev + 1);
            }, 1000);
        }
    }, [selected]);

    const shuffleImages = () => {
        const arr = Array.from({ length: 16 }, (_, i) => Math.floor(i / 2));
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setImages(arr);
    };

    const handleClick = (index) => {
        if (selected.length < 2 && !selected.some(s => s.index === index)) {
            setSelected(prev => [...prev, { index }]);
        }
    };

    return (
        <div className="memory-game">
            <h1>Memory Game</h1>
            <h2>ANIME</h2>
            <p>Moves: <span>{moves}</span></p>
            <h3>Score: <span>{score}</span></h3>
            <div className="game-board">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`card ${matched.includes(index) ? 'matched' : ''} ${selected.some(s => s.index === index) ? 'flipped' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {selected.some(s => s.index === index) || matched.includes(index) ? (
                            <img src={`/images/${img}.jpg`} alt={`Card ${img}`} />
                        ) : (
                            <div className="card-back">?</div>
                        )}
                    </div>
                ))}
            </div>
            {moves >= 20 && <div className="game-over">Game Over!</div>}
        </div>
    );
};

export default MemoryGame;
