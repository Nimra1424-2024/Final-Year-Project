import React from 'react';

const Stats = () => {
    return (
        <div className="grid grid-cols-3 gap-12 pt-8">
            <div>
                <h3 className="text-3xl font-bold text-orange-500">50K+</h3>
                <p className="text-gray-500 font-medium mt-1">Happy Pets</p>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-orange-500">1200+</h3>
                <p className="text-gray-500 font-medium mt-1">Connected Vets</p>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-orange-500">98%</h3>
                <p className="text-gray-500 font-medium mt-1">Accuracy Rate</p>
            </div>
        </div>
    );
};

export default Stats;
