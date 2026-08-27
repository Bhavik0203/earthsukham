import React from 'react';
import Calculators from '../components/Calculators';

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Financial Calculators</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use our interactive financial calculators to estimate your monthly loan EMIs or calculate the Return on Investment (ROI) for your property investments.
          </p>
        </div>
        
        <Calculators />
      </div>
    </div>
  );
}
