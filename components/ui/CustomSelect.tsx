'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';
import { CaretDown, Check } from '@phosphor-icons/react/ssr';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Tanlang',
  icon
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to object format
  const normalizedOptions: Option[] = typeof options[0] === 'string'
    ? (options as string[]).map(opt => ({ label: opt, value: opt }))
    : (options as Option[]);

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        type="button" 
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.triggerContent}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.value}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <CaretDown weight="duotone" className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {normalizedOptions.map((option) => (
              <li key={option.value} className={styles.listItem}>
                <button
                  type="button"
                  className={`${styles.optionBtn} ${value === option.value ? styles.selected : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {value === option.value && <Check weight="duotone" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
