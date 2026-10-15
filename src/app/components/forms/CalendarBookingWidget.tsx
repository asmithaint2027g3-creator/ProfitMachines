import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * CalendarBookingWidget
 * In-app date picker + available time slot selector.
 * Fetches real availability from /api/calendar-availability and lets
 * the visitor pick a slot without ever leaving the application.
 */

interface TimeSlot {
    label: string;
    startTime: string;
    endTime: string;
}

interface AvailabilityResponse {
    date: string;
    timezone: string;
    durationMinutes: number;
    available: boolean;
    totalSlots: number;
    availableCount: number;
    slots: TimeSlot[];
    reason?: string;
    error?: string;
    setupRequired?: boolean;
}

export interface CalendarBookingWidgetProps {
    onSlotSelected: (slot: { date: string; startTime: string; endTime: string; label: string } | null) => void;
    selectedSlot: { date: string; startTime: string; endTime: string; label: string } | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function pad(n: number) { return String(n).padStart(2, '0'); }

function toDateString(d: Date): string {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

// Weekdays only (Mon-Fri available)
function isWeekday(d: Date): boolean {
    const day = d.getDay();
    return day >= 1 && day <= 5;
}

// Cannot book past dates or within next 24 hours
function isBookable(d: Date): boolean {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + 60);

    return d >= tomorrow && d <= maxDate && isWeekday(d);
}

export default function CalendarBookingWidget({ onSlotSelected, selectedSlot }: CalendarBookingWidgetProps) {
    const today = new Date();
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(selectedSlot?.date || null);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [setupRequired, setSetupRequired] = useState(false);
    const [unavailableMessage, setUnavailableMessage] = useState<string | null>(null);

    // ── Fetch availability when date changes ──────────────────────────────
    const fetchAvailability = useCallback(async (dateStr: string) => {
        setLoading(true);
        setError(null);
        setSlots([]);
        setUnavailableMessage(null);

        try {
            const res = await fetch(`/api/calendar-availability?date=${dateStr}`);
            const data: AvailabilityResponse = await res.json();

            if (data.setupRequired) {
                setSetupRequired(true);
                // Generate fallback static slots for demo/dev mode
                const fallbackSlots = generateFallbackSlots(dateStr);
                setSlots(fallbackSlots);
                return;
            }

            if (data.error && !data.slots) {
                setError(data.error);
                return;
            }

            if (data.reason) {
                setUnavailableMessage(data.reason);
                return;
            }

            setSlots(data.slots || []);
            if (data.slots?.length === 0) {
                setUnavailableMessage('No available slots for this date. Please try another day.');
            }
        } catch (err: any) {
            console.error('[CalendarWidget] Fetch error:', err);
            // Fallback: generate static slots when API is not available (local dev)
            const fallbackSlots = generateFallbackSlots(dateStr);
            setSlots(fallbackSlots);
            setSetupRequired(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchAvailability(selectedDate);
        }
    }, [selectedDate, fetchAvailability]);

    // ── Calendar Grid Generation ──────────────────────────────────────────
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startPad = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const calendarDays: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        calendarDays.push(new Date(viewYear, viewMonth, d));
    }

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
        else setViewMonth(viewMonth - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
        else setViewMonth(viewMonth + 1);
    };

    const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();
    const maxMonthDate = new Date(today);
    maxMonthDate.setDate(maxMonthDate.getDate() + 60);
    const canGoNext = viewYear < maxMonthDate.getFullYear() || viewMonth < maxMonthDate.getMonth();

    const handleDateClick = (d: Date) => {
        if (!isBookable(d)) return;
        const ds = toDateString(d);
        setSelectedDate(ds);
        // Clear previously selected slot when date changes
        onSlotSelected(null);
    };

    const handleSlotClick = (slot: TimeSlot) => {
        onSlotSelected({
            date: selectedDate!,
            startTime: slot.startTime,
            endTime: slot.endTime,
            label: slot.label,
        });
    };

    return (
        <div className="space-y-5">

            <div className="flex flex-col lg:flex-row gap-5">
                {/* ── Calendar Date Picker ────────────────────────────────── */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-[#2878B5]" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Date</span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-3">
                            <button
                                type="button"
                                onClick={prevMonth}
                                disabled={!canGoPrev}
                                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="text-sm font-bold text-slate-800">
                                {MONTH_NAMES[viewMonth]} {viewYear}
                            </span>
                            <button
                                type="button"
                                onClick={nextMonth}
                                disabled={!canGoNext}
                                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                            </button>
                        </div>

                        {/* Day of Week Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-1">
                            {DAY_NAMES.map(dn => (
                                <div key={dn} className="text-center text-[10px] font-bold text-slate-400 uppercase py-1">
                                    {dn}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((d, i) => {
                                if (!d) return <div key={`pad-${i}`} className="h-9" />;

                                const bookable = isBookable(d);
                                const isSelected = selectedDate === toDateString(d);
                                const isToday = isSameDay(d, today);

                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleDateClick(d)}
                                        disabled={!bookable}
                                        className={`
                                            h-9 w-full rounded-lg text-xs font-semibold transition-all duration-150
                                            ${isSelected
                                                ? 'bg-[#2878B5] text-white shadow-md shadow-blue-500/25 scale-105'
                                                : bookable
                                                    ? 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-[#2878B5] hover:shadow-sm cursor-pointer'
                                                    : 'text-slate-300 cursor-not-allowed'
                                            }
                                            ${isToday && !isSelected ? 'ring-1 ring-[#2878B5]/40' : ''}
                                        `}
                                    >
                                        {d.getDate()}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded bg-[#2878B5]" /> Selected
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded bg-slate-50 border border-slate-200" /> Available
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded bg-slate-100" /> Unavailable
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Time Slot Selector ──────────────────────────────────── */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {selectedDate ? 'Available Times' : 'Select a Date First'}
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm min-h-[280px] flex flex-col">
                        {!selectedDate && (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                    <p className="text-xs text-slate-400">Choose a date to see available time slots</p>
                                </div>
                            </div>
                        )}

                        {selectedDate && loading && (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <Loader2 className="w-6 h-6 text-[#2878B5] animate-spin mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">Checking calendar availability…</p>
                                </div>
                            </div>
                        )}

                        {selectedDate && !loading && error && (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                                    <p className="text-xs text-red-600 font-semibold">{error}</p>
                                </div>
                            </div>
                        )}

                        {selectedDate && !loading && unavailableMessage && (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                                    <p className="text-xs text-amber-700 font-semibold">{unavailableMessage}</p>
                                </div>
                            </div>
                        )}

                        {selectedDate && !loading && !error && !unavailableMessage && slots.length > 0 && (
                            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                                {slots.map((slot, idx) => {
                                    const isActive = selectedSlot?.startTime === slot.startTime;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleSlotClick(slot)}
                                            className={`
                                                w-full px-4 py-2.5 rounded-xl text-left text-xs font-semibold
                                                transition-all duration-150 flex items-center justify-between group
                                                ${isActive
                                                    ? 'bg-[#2878B5] text-white shadow-md shadow-blue-500/20'
                                                    : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-[#2878B5] hover:shadow-sm border border-transparent hover:border-blue-100'
                                                }
                                            `}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-[#2878B5]/60'}`} />
                                                {slot.label}
                                            </span>
                                            {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Selected slot summary */}
                    {selectedSlot && (
                        <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-bold text-emerald-800">
                                        {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', {
                                            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-[11px] text-emerald-700">{selectedSlot.label} • 45 min session</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Fallback slots for local development / when API is not connected ──────
function generateFallbackSlots(dateStr: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const hours = [9, 10, 11, 13, 14, 15, 16, 17];

    for (const h of hours) {
        const endH = h;
        const endM = 45;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h > 12 ? h - 12 : h;
        const endAmpm = endH >= 12 ? 'PM' : 'AM';
        const endH12 = endH > 12 ? endH - 12 : endH;

        slots.push({
            label: `${h12}:00 ${ampm} – ${endH12}:${String(endM).padStart(2, '0')} ${endAmpm}`,
            startTime: `${dateStr}T${String(h).padStart(2, '0')}:00:00`,
            endTime: `${dateStr}T${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}:00`,
        });
    }

    return slots;
}
