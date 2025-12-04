import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { getCarBookings } from "@/lib/getRent";

export default function DateRangePicker({ carId, value, onChange }) {
  const [disabledRanges, setDisabledRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getCarBookings(carId);
        const bookings = res.bookings || [];
        const ranges = bookings
          .map((b) => {
            const from = b.startDate ? new Date(b.startDate) : null;
            const to = b.endDate ? new Date(b.endDate) : null;
            if (!from || !to || isNaN(from) || isNaN(to)) return null;
            return { from, to };
          })
          .filter(Boolean);

        if (mounted) setDisabledRanges(ranges);
      } catch (err) {
        console.error("Failed to load bookings", err);
        if (mounted) setError("Failed to load bookings");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (carId) load();
    return () => (mounted = false);
  }, [carId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disabled = [{ before: today }, ...disabledRanges];

  const handleSelect = (range) => {
    // range: { from: Date | undefined, to: Date | undefined }
    if (!range) return;
    const from = range.from ? new Date(range.from) : null;
    const to = range.to ? new Date(range.to) : null;

    // Check overlap with disabled ranges
    if (from && to) {
      const overlaps = disabledRanges.some((d) => {
        const dFrom = new Date(d.from);
        const dTo = new Date(d.to);
        // overlap if from <= dTo && to >= dFrom
        return from <= dTo && to >= dFrom;
      });

      if (overlaps) {
        setError(
          "Selected range overlaps existing bookings. Please choose other dates."
        );
        // Do not call onChange with overlapping range
        return;
      }
    }

    setError(null);

    // Convert to YYYY-MM-DD for form values
    const toISO = (d) => {
      if (!d) return "";
      const tzOffset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
    };

    onChange({
      startDate: from ? toISO(from) : "",
      endDate: to ? toISO(to) : "",
    });
  };

  return (
    <div>
      {loading ? (
        <div className="text-gray-600">Loading calendar...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <DayPicker
          mode="range"
          selected={
            value.startDate || value.endDate
              ? {
                  from: value.startDate ? new Date(value.startDate) : undefined,
                  to: value.endDate ? new Date(value.endDate) : undefined,
                }
              : undefined
          }
          onSelect={handleSelect}
          disabled={disabled}
          fromDate={today}
        />
      )}
    </div>
  );
}
