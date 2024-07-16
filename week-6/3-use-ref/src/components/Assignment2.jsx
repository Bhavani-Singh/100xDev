import React, { useState, useCallback, useRef, useEffect } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, setForceRender] = useState(0);

    const handleReRender = () => {
        // Update state to force re-render
        setForceRender(Math.random());
    };

    const renderedCount = useRef(0);

    renderedCount.current = renderedCount.current + 1;    

    return (
        <div>
            <p>This component has rendered {renderedCount.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};