import React from 'react';
import '../../Style/Reddit.css';

const Reddit = () => {
    return (
        <div className="redditFeed">
            <h2>Temple University Latest News</h2>

            <div className="embedContainer">
                <iframe
                    title="Temple University Reddit Feed"
                    src="https://www.redditmedia.com/r/Temple?ref_source=embed&ref=share&embed=true"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                ></iframe>
            </div>
        </div>
    );
};

export default Reddit;
