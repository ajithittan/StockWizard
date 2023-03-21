import { useState, useEffect, useRef } from 'react';

const useComponentVisible = (initialIsVisible,callBackOnceClosed) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) || event.keyCode == 27) {
            setIsComponentVisible(false);
            callBackOnceClosed(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.addEventListener('keydown', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}

export default useComponentVisible