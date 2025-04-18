import React, { useState, useEffect } from 'react';
import './PriceRangeSlider.css';

const PriceRangeSlider = ({ min = 0, max = 10000000000, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="price-range-container">
      <h2 className="section-header">Price range</h2>
      
      <div className="slider-container">
        <div className="slider-track d-flex " />
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb--left w-100"
          style={{ zIndex: minVal > max - 100 ? 5 : 3,background: 'transparent' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          style={{background: 'transparent',width: '100%' ,marginRight: '40px'}}
          className="thumb thumb--right "
        />
        
        <div className="slider-range" 
          style={{
            overflow: 'hidden',
            margin: '0 20px',
            top: '5px',
            left: `${getPercent(minVal) }%`,
            right: `${98 - getPercent(maxVal)}%`
          }}
        />
      </div>
      
      <div className="range-input-container">
        <div className="range-input">
          <label>Min</label>
          <div className="input-wrapper">
            <span>$</span>
            <input
              type="number"
              value={minVal}
              onChange={handleMinChange}
              min={min}
              max={maxVal - 1}
            />
          </div>
        </div>
        <div className="range-input">
          <label>Max</label>
          <div className="input-wrapper">
            <span>$</span>
            <input
              type="number"
              value={maxVal}
              onChange={handleMaxChange}
              min={minVal + 1}
              max={max}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;