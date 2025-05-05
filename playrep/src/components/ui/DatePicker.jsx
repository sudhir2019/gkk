import React, { useState, useEffect, useRef } from 'react';
import './datepicker.css'; // Import your CSS styles
const DatePicker = ({
    value,
    onChange,
    format = 'Y-m-d',
    firstDayOfWeek = 1,
    minDate,
    maxDate,
    placeholder = 'Select a date',
    disabled = false,
    className = '',
    readOnly = true,
    showClearDate = true,
    alwaysVisible = false,
    showOtherMonths = true,
    selectOtherMonths = false,
    showSelectToday = 'Today',
    showWeekNumber = false
}) => {
    const [visible, setVisible] = useState(alwaysVisible);
    const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
    const [view, setView] = useState('days'); // 'days', 'months', 'years'
    const calendarRef = useRef(null);
    const inputRef = useRef(null);

    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const DAYS_ABBR = DAYS.map(day => day.substring(0, 3));
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const MONTHS_ABBR = MONTHS.map(month => month.substring(0, 3));
    const WEEKEND_DAYS = [0, 6]; // Sunday and Saturday

    useEffect(() => {
        // Event listener to handle clicks outside the calendar
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setVisible(alwaysVisible);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [alwaysVisible]);

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value));
            setCurrentDate(new Date(value));
        }
    }, [value]);

    // Format date according to format string
    const formatDate = (date) => {
        if (!date) return '';

        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const day = date.getDay();

        return format
            .replace(/Y/g, y)
            .replace(/y/g, String(y).slice(-2))
            .replace(/m/g, padZero(m))
            .replace(/n/g, m)
            .replace(/F/g, MONTHS[m - 1])
            .replace(/M/g, MONTHS_ABBR[m - 1])
            .replace(/d/g, padZero(d))
            .replace(/j/g, d)
            .replace(/l/g, DAYS[day])
            .replace(/D/g, DAYS_ABBR[day]);
    };

    // Helper function to pad with leading zeros
    const padZero = (num, count = 2) => {
        return String(num).padStart(count, '0');
    };

    // Get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get day of week for first day of month
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Check if date is in allowed range
    const isDateInRange = (date) => {
        if (minDate && date < new Date(minDate)) return false;
        if (maxDate && date > new Date(maxDate)) return false;
        return true;
    };

    // Generate week number
    const getWeekNumber = (date) => {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setVisible(alwaysVisible);

        if (onChange) {
            onChange(formatDate(date), date);
        }
    };

    const handleMonthClick = (month) => {
        setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
        setView('days');
    };

    const handleYearClick = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setView('months');
    };

    const handleTodayClick = () => {
        const today = new Date();
        setSelectedDate(today);
        setCurrentDate(today);

        if (onChange) {
            onChange(formatDate(today), today);
        }

        setVisible(alwaysVisible);
    };

    const handleClearClick = () => {
        setSelectedDate(null);

        if (onChange) {
            onChange('', null);
        }

        setVisible(alwaysVisible);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const previousYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    };

    const nextYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    };

    const previousDecade = () => {
        setCurrentDate(new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), 1));
    };

    const nextDecade = () => {
        setCurrentDate(new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), 1));
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const daysFromPrevMonth = (firstDay - firstDayOfWeek + 7) % 7;
        const daysInPrevMonth = getDaysInMonth(year, month - 1);

        const days = [];

        // Days from previous month
        for (let i = daysFromPrevMonth; i > 0; i--) {
            const day = daysInPrevMonth - i + 1;
            const date = new Date(year, month - 1, day);
            const isSelectable = selectOtherMonths && isDateInRange(date);

            days.push({
                day,
                month: month - 1,
                year,
                isCurrentMonth: false,
                isSelectable,
                date
            });
        }

        // Days from current month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({
                day: i,
                month,
                year,
                isCurrentMonth: true,
                isSelectable: isDateInRange(date),
                date
            });
        }

        // Days from next month
        const totalDays = days.length;
        const remainingDays = 42 - totalDays;

        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            const isSelectable = selectOtherMonths && isDateInRange(date);

            days.push({
                day: i,
                month: month + 1,
                year,
                isCurrentMonth: false,
                isSelectable,
                date
            });
        }

        return days;
    };

    const renderCalendarHeader = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        let title;

        if (view === 'days') {
            title = `${MONTHS[month]} ${year}`;
        } else if (view === 'months') {
            title = year.toString();
        } else {
            const startYear = Math.floor(year / 10) * 10;
            title = `${startYear} - ${startYear + 9}`;
        }

        return (
            <div className="dp-header">
                <button
                    type="button"
                    className="dp-prev"
                    onClick={() => {
                        if (view === 'days') previousMonth();
                        else if (view === 'months') previousYear();
                        else previousDecade();
                    }}
                >
                    &laquo;
                </button>
                <div
                    className="dp-caption"
                    onClick={() => {
                        if (view === 'days') setView('months');
                        else if (view === 'months') setView('years');
                    }}
                >
                    {title}
                </div>
                <button
                    type="button"
                    className="dp-next"
                    onClick={() => {
                        if (view === 'days') nextMonth();
                        else if (view === 'months') nextYear();
                        else nextDecade();
                    }}
                >
                    &raquo;
                </button>
            </div>
        );
    };

    const renderDaysView = () => {
        const days = renderDays();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const dayIndex = (firstDayOfWeek + i) % 7;
            weekDays.push(DAYS_ABBR[dayIndex]);
        }

        return (
            <div className="Zebra_DatePicker">
                <div className="dp-days-header">
                    {showWeekNumber && <div className="dp-weekday dp-weeknumber">Wk</div>}
                    {weekDays.map((day, index) => (
                        <div
                            key={index}
                            className={`dp-weekday ${WEEKEND_DAYS.includes((firstDayOfWeek + index) % 7) ? 'dp-weekend' : ''}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="dp-days-body">
                    {showWeekNumber && <div className="dp-week-numbers">
                        {Array.from(new Set(days.filter(d => d.isCurrentMonth).map(d => getWeekNumber(d.date)))).map(week => (
                            <div key={week} className="dp-week-number">{week}</div>
                        ))}
                    </div>}
                    <div className="dp-days-grid">
                        {days.map((day, index) => {
                            const isToday = day.isCurrentMonth &&
                                day.day === today.getDate() &&
                                day.month === today.getMonth() &&
                                day.year === today.getFullYear();

                            const isSelected = selectedDate &&
                                day.day === selectedDate.getDate() &&
                                day.month === selectedDate.getMonth() &&
                                day.year === selectedDate.getFullYear();

                            const isWeekend = WEEKEND_DAYS.includes(day.date.getDay());

                            return (
                                <div
                                    key={index}
                                    className={`dp-day ${!day.isCurrentMonth ? 'dp-other-month' : ''} ${isToday ? 'dp-today' : ''} ${isSelected ? 'dp-selected' : ''} ${isWeekend ? 'dp-weekend' : ''} ${!day.isSelectable ? 'dp-disabled' : ''} ${!day.isCurrentMonth && !showOtherMonths ? 'dp-hidden' : ''}`}
                                    onClick={() => day.isSelectable && handleDateClick(day.date)}
                                >
                                    {day.day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderMonthsView = () => {
        const year = currentDate.getFullYear();
        const currentMonthIndex = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
            <div className="dp-months-view">
                <div className="dp-months-grid">
                    {MONTHS_ABBR.map((month, index) => {
                        const isCurrentMonth = index === currentMonthIndex && year === currentYear;
                        const isSelected = selectedDate && index === selectedDate.getMonth() && year === selectedDate.getFullYear();
                        const monthDate = new Date(year, index, 1);
                        const isSelectable = isDateInRange(monthDate);

                        return (
                            <div
                                key={index}
                                className={`dp-month ${isCurrentMonth ? 'dp-current' : ''} ${isSelected ? 'dp-selected' : ''} ${!isSelectable ? 'dp-disabled' : ''}`}
                                onClick={() => isSelectable && handleMonthClick(index)}
                            >
                                {month}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderYearsView = () => {
        const year = currentDate.getFullYear();
        const startYear = Math.floor(year / 10) * 10;
        const years = [];

        for (let i = startYear - 1; i <= startYear + 10; i++) {
            years.push(i);
        }

        const currentYear = new Date().getFullYear();

        return (
            <div className="dp-years-view">
                <div className="dp-years-grid">
                    {years.map((yearValue, index) => {
                        const isCurrentYear = yearValue === currentYear;
                        const isSelected = selectedDate && yearValue === selectedDate.getFullYear();
                        const yearDate = new Date(yearValue, 0, 1);
                        const isSelectable = isDateInRange(yearDate);

                        return (
                            <div
                                key={index}
                                className={`dp-year ${yearValue < startYear || yearValue > startYear + 9 ? 'dp-other-decade' : ''} ${isCurrentYear ? 'dp-current' : ''} ${isSelected ? 'dp-selected' : ''} ${!isSelectable ? 'dp-disabled' : ''}`}
                                onClick={() => isSelectable && handleYearClick(yearValue)}
                            >
                                {yearValue}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        return (
            <div className="dp-footer">
                {showSelectToday && (
                    <button
                        type="button"
                        className="dp-today-button"
                        onClick={handleTodayClick}
                    >
                        {showSelectToday}
                    </button>
                )}
                {showClearDate && (
                    <button
                        type="button"
                        className="dp-clear-button"
                        onClick={handleClearClick}
                    >
                        Clear
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={`react-datepicker-container ${className}`}>
            <input
                ref={inputRef}
                type="text"
                className="datepicker-input"
                placeholder={placeholder}
                value={selectedDate ? formatDate(selectedDate) : ''}
                readOnly={readOnly}
                disabled={disabled}
                onClick={() => !disabled && setVisible(true)}
            />
            {visible && (
                <div
                    ref={calendarRef}
                    className="datepicker-calendar"
                >
                    {renderCalendarHeader()}
                    {view === 'days' && renderDaysView()}
                    {view === 'months' && renderMonthsView()}
                    {view === 'years' && renderYearsView()}
                    {renderFooter()}
                </div>
            )}
        </div>
    );
};

export default DatePicker;