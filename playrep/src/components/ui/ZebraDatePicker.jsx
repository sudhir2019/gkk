import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/en';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const ZebraDatePicker = ({ value, onChange, minDate, maxDate }) => {
    const [viewDate, setViewDate] = useState(value ? dayjs(value) : dayjs());
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);
    const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'

    const startOfMonth = viewDate.startOf('month');
    const endOfMonth = viewDate.endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');

    const isWeekend = (date) => [0, 6].includes(date.day());
    const isDisabled = (date) => {
        if (minDate && date.isBefore(dayjs(minDate), 'day')) return true;
        if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true;
        return false;
    };

    const handleDateClick = (date) => {
        if (isDisabled(date)) return;
        setSelectedDate(date);
        onChange?.(date.toDate());
    };

    const handleMonthClick = (monthIndex) => {
        const newDate = viewDate.month(monthIndex);
        setViewDate(newDate);
        setViewMode('days');
    };

    const handleYearClick = (year) => {
        const newDate = viewDate.year(year);
        setViewDate(newDate);
        setViewMode('months');
    };

    const renderDays = () => {
        const days = [];
        let current = startDate.clone();

        while (current.isBefore(endDate)) {
            const week = [];

            for (let i = 0; i < 7; i++) {
                const notInMonth = !current.isSame(viewDate, 'month');
                const disabled = isDisabled(current);
                const weekend = isWeekend(current);
                const isToday = current.isSame(dayjs(), 'day');
                const isSelected = selectedDate && current.isSame(selectedDate, 'day');

                const className = [
                    notInMonth ? 'dp_not_in_month dp_disabled' : '',
                    weekend ? 'dp_weekend' : '',
                    disabled ? 'dp_disabled' : '',
                    isToday ? 'dp_current' : '',
                    isSelected ? 'dp_selected' : '',
                ].join(' ');

                week.push(
                    <td
                        key={i}
                        className={className}
                        onClick={() => !disabled && handleDateClick(current)}
                        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                    >
                        {current.date()}
                    </td>
                );
                current = current.add(1, 'day');
            }

            days.push(<tr key={current.toString()}>{week}</tr>);
        }

        return (
            <table className="dp_daypicker dp_body">
                <thead>
                    <tr>{WEEKDAYS.map((day) => <th scope="col" key={day}>{day}</th>)}</tr>
                </thead>
                <tbody>{days}</tbody>
            </table>
        );
    };

    const renderMonths = () => {
        const months = dayjs.monthsShort();
        const rows = [];

        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                row.push(
                    <td
                        key={index}
                        onClick={() => handleMonthClick(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        {months[index]}
                    </td>
                );
            }
            rows.push(<tr key={i}>{row}</tr>);
        }

        return (
            <table className="dp_monthpicker dp_body" style={{ display: 'table' }}>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    const renderYears = () => {
        const currentYear = viewDate.year();
        const startYear = currentYear - (currentYear % 12);
        const rows = [];

        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                const year = startYear + i * 3 + j;
                row.push(
                    <td
                        key={year}
                        onClick={() => handleYearClick(year)}
                        style={{ cursor: 'pointer' }}
                    >
                        {year}
                    </td>
                );
            }
            rows.push(<tr key={i}>{row}</tr>);
        }

        return (
            <table className="dp_yearpicker dp_body" style={{ display: 'table' }}>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div className="Zebra_DatePicker" style={{ width: 257, userSelect: 'none' }}>
            <table className="dp_header dp_actions">
                <tbody>
                    <tr>
                        <td className="dp_previous" onClick={() => {
                            if (viewMode === 'years') setViewDate(viewDate.subtract(12, 'year'));
                            else if (viewMode === 'months') setViewDate(viewDate.subtract(1, 'year'));
                            else setViewDate(viewDate.subtract(1, 'month'));
                        }}>◀</td>
                        <td
                            className="dp_caption"
                            onClick={() =>
                                setViewMode((prev) =>
                                    prev === 'days' ? 'months' : prev === 'months' ? 'years' : 'days'
                                )
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            {viewMode === 'days' && viewDate.format('MMMM, YYYY')}
                            {viewMode === 'months' && viewDate.format('YYYY')}
                            {viewMode === 'years' && `${viewDate.year() - (viewDate.year() % 12)} - ${viewDate.year() - (viewDate.year() % 12) + 11}`}
                        </td>
                        <td className="dp_next" onClick={() => {
                            if (viewMode === 'years') setViewDate(viewDate.add(12, 'year'));
                            else if (viewMode === 'months') setViewDate(viewDate.add(1, 'year'));
                            else setViewDate(viewDate.add(1, 'month'));
                        }}>▶</td>
                    </tr>
                </tbody>
            </table>

            {viewMode === 'days' && renderDays()}
            {viewMode === 'months' && renderMonths()}
            {viewMode === 'years' && renderYears()}

            <table className="dp_footer dp_actions">
                <tbody>
                    <tr>
                        <td
                            className="dp_today"
                            style={{ width: '50%', cursor: 'pointer' }}
                            onClick={() => {
                                const today = dayjs();
                                setSelectedDate(today);
                                setViewDate(today);
                                setViewMode('days');
                                onChange?.(today.toDate());
                            }}
                        >
                            Today
                        </td>
                        <td
                            className="dp_clear"
                            style={{ width: '50%', cursor: 'pointer' }}
                            onClick={() => {
                                setSelectedDate(null);
                                onChange?.(null);
                            }}
                        >
                            Clear date
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ZebraDatePicker;
