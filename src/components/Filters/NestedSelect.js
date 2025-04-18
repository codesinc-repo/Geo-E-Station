import React, { useState, useRef, useEffect } from 'react';
import './nestedselect.css';

const NestedSelect = ({ 
  options, 
  selectedItems, 
  onSelect, 
  placeholder = "Select"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setExpandedGroups([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setExpandedGroups([]);
  };

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const handleCheckboxChange = (itemId) => {
    const newSelected = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    onSelect(newSelected);
  };

  return (
    <div className="nested-select-container" ref={dropdownRef}>
      <div 
        className="nested-select-header form-select mb-3"
        onClick={toggleDropdown}
      >
        {selectedItems.length > 0 
          ? `${selectedItems.length} selected` 
          : placeholder}
        <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="nested-select-dropdown">
          {options.map((group) => (
            <div key={group.name} className="group-container">
              <div 
                className="nested-select-group"
                onClick={() => toggleGroup(group.name)}
              >
                {group.name}
                <span className={`group-arrow ${expandedGroups.includes(group.name) ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
              
              {expandedGroups.includes(group.name) && (
                <div className="group-items">
                  {group.items.map((item) => (
                    <div key={item.id} className="nested-select-item py-1">
                      <input
                        type="checkbox"
                        id={`item-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <label className='fw-normal mb-0' htmlFor={`item-${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedSelect;