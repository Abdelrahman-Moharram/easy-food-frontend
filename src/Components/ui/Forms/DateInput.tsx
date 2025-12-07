import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FC,
} from "react";
import styled from "styled-components";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isValid,
} from "date-fns";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  input {
    width: 200px;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus {
    border-color: #00A69C;
  }

  .calendar {
    position: absolute;
    top: 110%;
    left: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    z-index: 10;
    width: 280px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.5rem;
    background: #00A69C;
    color: white;
    border-radius: 6px 6px 0 0;
  }

  select {
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  .week {
    display: grid;
    grid-template-columns: repeat(7, 2.2rem);
    text-align: center;
    font-weight: bold;
    margin-top: 0.3rem;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 2.2rem);
    text-align: center;
  }

  .day {
    padding: 0.3rem;
    margin: 0.15rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .day:hover {
    background: #00c0b3;
    color: white;
  }

  .selected {
    background: #00A69C;
    color: white;
  }

  .faded {
    color: #999;
  }
`;

export interface DateInput {
  labelId: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  dateFormat?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: any;
  /** optional year range */
  yearRange?: { start: number; end: number };
}

const DateInput: FC<DateInput> = ({
  labelId,
  label,
  value,
  onChange,
  placeholder,
  dateFormat = "yyyy-MM-dd",
  required,
  disabled,
  errors,
  yearRange = { start: 1950, end: 2050 },
}) => {
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? parse(value, dateFormat, new Date()) : new Date()
  );
  const [inputValue, setInputValue] = useState<string>(value || "");
  const wrapperRef = useRef<HTMLDivElement>(null);

  /** Close calendar on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowCal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Handle typing */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  /** Handle blur → validate & format */
  const handleBlur = () => {
    const parsed = parse(inputValue, dateFormat, new Date());
    if (isValid(parsed)) {
      const formatted = format(parsed, dateFormat);
      setInputValue(formatted);
      const ev = {
        ...({} as ChangeEvent<HTMLInputElement>),
        target: { name: labelId, id: labelId, value: formatted },
      } as ChangeEvent<HTMLInputElement>;
      onChange(ev);
    }
  };

  /** Handle calendar click */
  const handleDayClick = (day: Date) => {
    const formatted = format(day, dateFormat);
    setInputValue(formatted);
    setShowCal(false);
    const ev = {
      ...({} as ChangeEvent<HTMLInputElement>),
      target: { name: labelId, id: labelId, value: formatted },
    } as ChangeEvent<HTMLInputElement>;
    onChange(ev);
  };

  /** Year options */
  const years = Array.from(
    { length: yearRange.end - yearRange.start + 1 },
    (_, i) => yearRange.start + i
  );

  /** Render calendar days */
  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows: React.ReactElement[] = [];
    let days: React.ReactElement[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected =
          inputValue && isSameDay(day, parse(inputValue, dateFormat, new Date()));

        days.push(
          <div
            key={day.toString()}
            className={
              "day " +
              (!isSameMonth(day, monthStart) ? "faded " : "") +
              (isSelected ? "selected" : "")
            }
            onClick={() => handleDayClick(cloneDay)}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="days" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="calendar">
        <div className="header">
          <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            ▶
          </button>
          <div>
            {format(currentMonth, "MMMM")}
            <select
              className="text-black"
              value={currentMonth.getFullYear()}
              onChange={(e) =>
                setCurrentMonth(
                  new Date(
                    parseInt(e.target.value, 10),
                    currentMonth.getMonth(),
                    1
                  )
                )
              }
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            ◀
          </button>
          
        </div>
        <div className="week">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        {rows}
      </div>
    );
  };

  return (
    <Wrapper ref={wrapperRef}>
      {label && (
        <label
          htmlFor={labelId}
          className={`block text-md font-medium text-gray-700 ${errors ? "border-red-500" : ""}`}
        >
          {label}
        </label>
      )}

      <input
        type="text"
        id={labelId}
        name={labelId}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        
        onFocus={() => setShowCal(true)}
        placeholder={placeholder || ''}
        required={required}
        disabled={disabled}
        autoComplete="off"
      />

      {showCal && renderCalendar()}
    </Wrapper>
  );
};

export default DateInput;
