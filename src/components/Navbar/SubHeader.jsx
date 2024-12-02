import React from "react";

const SubHeader = (props) => {
    const {
      label, children
    } = props;
    return (
        <div className="shadow-md">
            <div className="max-w-7xl pl-4 mx-auto mt-32 font-bold text-xl flex">
                <p>{label}</p>
            </div>
            <div className="max-w-7xl pl-4 mx-auto py-3">{children}</div>
        </div>
    );
};

export default SubHeader;
