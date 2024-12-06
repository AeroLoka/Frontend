import React from "react";
import { useForm } from "react-hook-form";

const AccountSettings = () => {
    return (
        <div>
            <>
                <h2 className="text-xl font-bold mb-4 mt-4">
                    Account Settings
                </h2>
                <div>
                    <p>This action cannot be undone. Please continue with caution</p>
                </div>
                <div className="mt-4">
                <button
                            type="submit"
                            className="bg-red-500 text-white rounded-md py-2 px-8 hover:bg-red-600"
                        >
                            Delete
                        </button>
                </div>
            </>
        </div>
    );
};

export default AccountSettings;
