"use client";

import { format } from "date-fns";

import { useState } from "react";

import {
  MdCalendarMonth,
  MdKeyboardArrowDown,
} from "react-icons/md";

function DatePicker({
  date,
  updateDate,
}) {
  const [show, setShow] =
    useState(false);

  return (
    <div className="relative w-full">
      
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-left text-gray-700 outline-none transition-all hover:bg-white focus:border-emerald-400"
      >
        {date?.from ? (
          date.to ? (
            <>
              {format(
                date.from,
                "LLL dd, y"
              )}{" "}
              -{" "}
              {format(
                date.to,
                "LLL dd, y"
              )}
            </>
          ) : (
            format(
              date.from,
              "LLL dd, y"
            )
          )
        ) : (
          "Pick a date"
        )}
      </button>

      {/* ICONS */}
      <MdCalendarMonth className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />

      <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />

      {/* DATE PICKER */}
      {show && (
        <div className="absolute top-14 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-full">
          
          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* FROM */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                From
              </label>

              <input
                type="date"
                value={
                  date?.from
                    ?.toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  updateDate({
                    ...date,
                    from: new Date(
                      e.target.value
                    ),
                  })
                }
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-emerald-400 focus:bg-white"
              />
            </div>

            {/* TO */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                To
              </label>

              <input
                type="date"
                value={
                  date?.to
                    ?.toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  updateDate({
                    ...date,
                    to: new Date(
                      e.target.value
                    ),
                  })
                }
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-emerald-400 focus:bg-white"
              />
            </div>
          </div>

          {/* ACTION */}
          <button
            type="button"
            onClick={() => setShow(false)}
            className="mt-4 w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all"
          >
            Apply Date
          </button>
        </div>
      )}
    </div>
  );
}

export default DatePicker;