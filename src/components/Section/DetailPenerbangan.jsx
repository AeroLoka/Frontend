import React from "react";

const DetailPenerbangan = (props) => {
    const {departure_time, departure_date, departure_airport, return_time, return_date, return_airport} = props;
    return (
        <div className="space-y-4">
            <div className="flex justify-between m-0">
                <span className="font-bold">{departure_time}</span>
                <span className="text-purple-600">Keberangkatan</span>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>{departure_date}</p>
                    <p>{departure_airport} - Terminal 1A Domestik</p>
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Jet Air - Economy</p>
                        <p className="font-bold">JT - 203</p>
                    </div>
                </div>
            </div>

            <div className="border-b py-4">
                <p className="font-bold mb-2">Informasi:</p>
                <ul className="text-gray-600 space-y-1">
                    <li>Baggage 20 kg</li>
                    <li>Cabin baggage 7 kg</li>
                    <li>In Flight Entertainment</li>
                </ul>
            </div>
            <div className="flex justify-between">
                <span className="font-bold">{return_time}</span>
                <span className="text-purple-600">Kedatangan</span>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>{return_date}</p>
                    <p>{return_airport}</p>
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                    <p className="font-bold">Rincian Harga</p>
                    <div className="flex justify-between">
                        <span>2 Adults</span>
                        <span>IDR 9.550.000</span>
                    </div>
                    <div className="flex justify-between">
                        <span>1 Baby</span>
                        <span>IDR 0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>IDR 300.000</span>
                    </div>
                    <div className="flex justify-between font-bold text-purple-600 pt-2 border-t text-lg">
                        <span>Total</span>
                        <span>IDR 9.850.000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPenerbangan;
