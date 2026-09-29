"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContributionResponse = { total: Record<string, number>; contributions: Contribution[] };
type Tooltip = { message: string; x: number; y: number; below: boolean };

const API_URL = "https://github-contributions-api.jogruber.de/v4/marktrowa199?y=all";
const formatter = new Intl.NumberFormat();
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
let contributionRequest: Promise<ContributionResponse> | null = null;

function isContributionResponse(value: unknown): value is ContributionResponse {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<ContributionResponse>;
  return Array.isArray(data.contributions) && data.contributions.every((day) =>
    typeof day.date === "string" && typeof day.count === "number" &&
    Number.isInteger(day.level) && day.level >= 0 && day.level <= 4
  ) && !!data.total && typeof data.total === "object";
}

function loadContributions() {
  if (!contributionRequest) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    contributionRequest = fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Contribution data unavailable");
        return response.json() as Promise<unknown>;
      })
      .then((value) => {
        if (!isContributionResponse(value) || value.contributions.length === 0) {
          throw new Error("Contribution data unavailable");
        }
        return value;
      })
      .finally(() => window.clearTimeout(timeout))
      .catch((error: unknown) => {
        contributionRequest = null;
        throw error;
      });
  }
  return contributionRequest;
}

function utcDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getCalendarWeeks(days: Contribution[], year: number) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const first = new Date(Date.UTC(year, 0, 1));
  const last = new Date(Date.UTC(year, 11, 31));
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  last.setUTCDate(last.getUTCDate() + (6 - last.getUTCDay()));

  const weeks: (Contribution | null)[][] = [];
  for (const cursor = new Date(first); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
    const week: (Contribution | null)[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = new Date(cursor);
      date.setUTCDate(cursor.getUTCDate() + dayIndex);
      week.push(date.getUTCFullYear() === year ? byDate.get(dateKey(date)) ?? {
        date: dateKey(date), count: 0, level: 0,
      } : null);
    }
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(year: number, weekCount: number) {
  const labels: { label: string; column: number }[] = [];
  for (let month = 0; month < 12; month += 1) {
    const firstOfMonth = new Date(Date.UTC(year, month, 1));
    const firstSunday = new Date(Date.UTC(year, 0, 1));
    firstSunday.setUTCDate(firstSunday.getUTCDate() - firstSunday.getUTCDay());
    const column = Math.floor((firstOfMonth.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    const previous = labels[labels.length - 1];
    if (!previous || column > previous.column) {
      labels.push({ label: firstOfMonth.toLocaleString("en-US", { month: "short", timeZone: "UTC" }), column: Math.min(column, weekCount) });
    }
  }
  return labels;
}

function tooltipText(day: Contribution) {
  const date = dateFormatter.format(utcDate(day.date));
  return day.count === 0 ? `No contributions on ${date}` : `${formatter.format(day.count)} ${day.count === 1 ? "contribution" : "contributions"} on ${date}`;
}

export default function ContributionCalendar() {
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadContributions()
      .then((response) => {
        if (!cancelled) {
          setData(response);
          const years = [...new Set(response.contributions.map((day) => Number(day.date.slice(0, 4))))];
          setSelectedYear(Math.max(...years));
        }
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  const years = useMemo(() => data
    ? [...new Set(data.contributions.map((day) => Number(day.date.slice(0, 4))))].sort((a, b) => b - a)
    : [], [data]);
  const yearDays = useMemo(() => data && selectedYear !== null
    ? data.contributions.filter((day) => Number(day.date.slice(0, 4)) === selectedYear)
    : [], [data, selectedYear]);
  const weeks = useMemo(() => selectedYear === null ? [] : getCalendarWeeks(yearDays, selectedYear), [yearDays, selectedYear]);
  const monthLabels = useMemo(() => selectedYear === null ? [] : getMonthLabels(selectedYear, weeks.length), [selectedYear, weeks.length]);
  const total = selectedYear === null || !data ? 0 : data.total[String(selectedYear)] ?? yearDays.reduce((sum, day) => sum + day.count, 0);

  const showTooltip = (day: Contribution, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const below = rect.top < 80;
    const edge = Math.max(0, Math.min(150, window.innerWidth / 2 - 8));
    const x = Math.max(edge, Math.min(window.innerWidth - edge, rect.left + rect.width / 2));
    setTooltip({ message: tooltipText(day), x, y: below ? rect.bottom + 9 : rect.top - 9, below });
  };

  if (failed) {
    return (
      <div className="contribution-panel contribution-error" role="status">
        <p>GitHub activity is unavailable right now.</p>
        <a href="https://github.com/marktrowa199" target="_blank" rel="noreferrer">View my GitHub profile</a>
      </div>
    );
  }
  if (!data || selectedYear === null) {
    return <div className="contribution-panel contribution-loading" role="status">Loading public contribution activity…</div>;
  }

  return (
    <div className="contribution-panel">
      <div className="contribution-topline">
        <p className="contribution-total"><strong>{formatter.format(total)}</strong> contributions in {selectedYear}</p>
        <a className="contribution-profile-link" href="https://github.com/marktrowa199" target="_blank" rel="noreferrer">View GitHub profile</a>
      </div>
      <div className="contribution-years" role="group" aria-label="Select contribution year">
        {years.map((year) => (
          <button
            className={`contribution-year${year === selectedYear ? " is-active" : ""}`}
            type="button"
            aria-pressed={year === selectedYear}
            key={year}
            onClick={() => { setSelectedYear(year); setTooltip(null); }}
          >{year}</button>
        ))}
      </div>
      <div className="contribution-scroll" role="region" aria-label={`${selectedYear} GitHub contributions`} tabIndex={0}>
        <div className="contribution-calendar" style={{ "--week-count": weeks.length } as CSSProperties}>
          <div className="contribution-months" aria-hidden="true">
            {monthLabels.map((month) => <span style={{ gridColumn: month.column }} key={`${month.label}-${month.column}`}>{month.label}</span>)}
          </div>
          <div className="contribution-weekdays" aria-hidden="true">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="contribution-weeks" role="grid" aria-label={`Daily public contributions in ${selectedYear}`}>
            {weeks.map((week, weekIndex) => (
              <div className="contribution-week" role="row" key={weekIndex}>
                {week.map((day, dayIndex) => day ? (
                  <button
                    className={`contribution-day contribution-day--${day.level}`}
                    type="button"
                    role="gridcell"
                    aria-label={tooltipText(day)}
                    key={day.date}
                    onMouseEnter={(event) => showTooltip(day, event.currentTarget)}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={(event) => showTooltip(day, event.currentTarget)}
                    onBlur={() => setTooltip(null)}
                    onKeyDown={(event) => { if (event.key === "Escape") setTooltip(null); }}
                  />
                ) : <span className="contribution-day contribution-day--empty" aria-hidden="true" key={`outside-${weekIndex}-${dayIndex}`} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="contribution-footer">
        <span>Public activity on GitHub</span>
        <div className="contribution-legend" aria-label="Contribution intensity legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => <span key={level} className={`contribution-day contribution-day--${level}`} aria-hidden="true" />)}
          <span>More</span>
        </div>
      </div>
      {tooltip && typeof document !== "undefined" && createPortal(
        <div className={`contribution-tooltip${tooltip.below ? " is-below" : ""}`} role="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.message}
        </div>,
        document.body,
      )}
    </div>
  );
}
