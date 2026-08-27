'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Percent } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'emi' | 'roi'>('emi');

  // EMI State
  const [principal, setPrincipal] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // ROI State
  const [investment, setInvestment] = useState(5000000);
  const [expectedValue, setExpectedValue] = useState(8000000);
  const [roiYears, setRoiYears] = useState(5);

  // EMI Calculation
  const calculateEMI = () => {
    const p = principal;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (p === 0 || r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalAmount: 0 };

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  };

  // ROI Calculation
  const calculateROI = () => {
    if (investment === 0 || expectedValue === 0 || roiYears === 0) return { totalRoi: 0, annualizedRoi: 0, profit: 0 };

    const profit = expectedValue - investment;
    const totalRoi = (profit / investment) * 100;
    const annualizedRoi = (Math.pow(expectedValue / investment, 1 / roiYears) - 1) * 100;

    return {
      totalRoi: totalRoi.toFixed(2),
      annualizedRoi: annualizedRoi.toFixed(2),
      profit: Math.round(profit)
    };
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const emiResult = calculateEMI();
  const roiResult = calculateROI();

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('emi')}
          className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-colors flex items-center justify-center gap-2
            ${activeTab === 'emi' ? 'bg-[#224295] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Calculator size={18} />
          Loan EMI Calculator
        </button>
        <button
          onClick={() => setActiveTab('roi')}
          className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-colors flex items-center justify-center gap-2
            ${activeTab === 'roi' ? 'bg-[#224295] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <TrendingUp size={18} />
          ROI Calculator
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><DollarSign size={16} className="text-[#224295]"/> Principal Amount</span>
                  <span className="font-bold text-[#224295]">{formatCurrency(principal)}</span>
                </label>
                <input 
                  type="range" 
                  min="100000" 
                  max="50000000" 
                  step="100000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><Percent size={16} className="text-[#224295]"/> Interest Rate (p.a)</span>
                  <span className="font-bold text-[#224295]">{interestRate}%</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="15" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-[#224295]"/> Loan Tenure (Years)</span>
                  <span className="font-bold text-[#224295]">{tenureYears} Yrs</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 flex flex-col justify-center border border-gray-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-500 text-sm font-medium mb-1">Monthly EMI</p>
                <h3 className="text-4xl font-bold text-[#224295]">{formatCurrency(emiResult.emi)}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Principal Amount</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Interest</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(emiResult.totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-medium">Total Payable</span>
                  <span className="font-bold text-[#224295]">{formatCurrency(emiResult.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><DollarSign size={16} className="text-[#224295]"/> Initial Investment</span>
                  <span className="font-bold text-[#224295]">{formatCurrency(investment)}</span>
                </label>
                <input 
                  type="range" 
                  min="100000" 
                  max="100000000" 
                  step="100000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><TrendingUp size={16} className="text-[#224295]"/> Expected Final Value</span>
                  <span className="font-bold text-[#224295]">{formatCurrency(expectedValue)}</span>
                </label>
                <input 
                  type="range" 
                  min={investment} 
                  max="200000000" 
                  step="100000"
                  value={expectedValue}
                  onChange={(e) => setExpectedValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-[#224295]"/> Time Period (Years)</span>
                  <span className="font-bold text-[#224295]">{roiYears} Yrs</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="1"
                  value={roiYears}
                  onChange={(e) => setRoiYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#224295]"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 flex flex-col justify-center border border-gray-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-500 text-sm font-medium mb-1">Annualized ROI (CAGR)</p>
                <h3 className="text-4xl font-bold text-green-600">{roiResult.annualizedRoi}%</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Profit</span>
                  <span className="font-semibold text-green-600">+{formatCurrency(roiResult.profit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Absolute ROI</span>
                  <span className="font-semibold text-gray-900">{roiResult.totalRoi}%</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-medium">Final Value</span>
                  <span className="font-bold text-[#224295]">{formatCurrency(expectedValue)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
