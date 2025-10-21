import React, { useState } from 'react';

const styles = {
    container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
    },
    overlay: {
        position: 'absolute',
        bottom: '380px',
        left: '-300px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(20px)',
        opacity: 0,
        visibility: 'hidden',
        transition: 'all 0.3s ease'
    },
    overlayVisible: {
        transform: 'translateY(0)',
        opacity: 1,
        visibility: 'visible'
    },
    button: {
        position: 'relative',
        padding: '10px 20px',
        backgroundColor: '#1DB954',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#1ed760'
        }
    }
};


const SpotifyPlaylist = () => {
    const [isVisible, setIsVisible] = useState(false);

    const togglePlaylist = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div style={styles.container}>
            <div style={{
                ...styles.overlay,
                ...(isVisible ? styles.overlayVisible : {})
            }}>
                <iframe
                    src="https://open.spotify.com/embed/playlist/2HUIF5w9J4WoXNswVt71KI"
                    width="300"
                    height="380"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                ></iframe>
            </div>
            <button 
                style={{
                    ...styles.button,
                    backgroundColor: isVisible ? '#1ed760' : '#1DB954'
                }}
                onClick={togglePlaylist}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1ed760'}
                onMouseOut={(e) => e.target.style.backgroundColor = isVisible ? '#1ed760' : '#1DB954'}
            >
                {isVisible ? 'Hide Playlist' : 'Show Playlist'}
            </button>
        </div>
    );
};

export default SpotifyPlaylist;
