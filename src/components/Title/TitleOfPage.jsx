import { useEffect } from "react";

const TitleOfPage = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default TitleOfPage;
