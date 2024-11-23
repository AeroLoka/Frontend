import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
      //navbar nanti disini
        <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
            <Outlet />
        </main>

        //footer nanti disini
    );
};

export default PublicLayout;
