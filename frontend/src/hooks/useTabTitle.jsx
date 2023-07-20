import { useEffect } from 'react';

export default function useTabTitle(title) {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;
        return () => {
            document.title = prevTitle;
        }
    }, [title])
}
