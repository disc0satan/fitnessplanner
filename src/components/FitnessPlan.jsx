import React, { useState } from 'react';
import styles from './FitnessPlan.module.scss';

export default function FitnessPlan({ data, onBack }) {
  const [expandedDay, setExpandedDay] = useState(0);

  // 1. Safety Check: Ensure data and days exist before rendering
  if (!data || !Array.isArray(data.days)) return null;

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  // --- 2. SMART CALCULATION LOGIC ---
  // We calculate these ourselves so they are ALWAYS 100% accurate,
  // bypassing any bad math the AI might send in the summary.
  
  const totalKcal = data.days.reduce((sum, day) => {
    const cals = Number(day.calories_est);
    return sum + (isNaN(cals) ? 0 : cals);
  }, 0);
  
  const restDaysCount = data.days.filter(day => {
    const type = (day.type || '').toUpperCase();
    const title = (day.title || '').toLowerCase();
    return type === 'RECOVERY' || type === 'REST' || title.includes('rest');
  }).length;

  const activeDaysCount = data.days.length - restDaysCount;
  // ----------------------------------

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroBadge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          </div>
          <h1>ELITE PERFORMANCE WEEKLY</h1>
          
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <strong>{activeDaysCount}</strong>
              <label>ACTIVE DAYS</label>
            </div>
            <div className={styles.summaryCard}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <strong>{restDaysCount}</strong>
              <label>REST DAYS</label>
            </div>
            <div className={styles.summaryCard}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M17.5 19c-1.5 0-2.5-1-2.5-2.5a2.5 2.5 0 1 1 5 0c0 1.5-1 2.5-2.5 2.5z"></path><path d="M12 22c-2.2 0-4-1.8-4-4a4 4 0 1 1 8 0c0 2.2-1.8 4-4 4z"></path><path d="M6.5 15c-1.4 0-2.5-1.1-2.5-2.5a2.5 2.5 0 1 1 5 0c0 1.4-1.1 2.5-2.5 2.5z"></path></svg>
              <strong>{totalKcal}</strong>
              <label>KCAL / WK</label>
            </div>
          </div>
        </section>

        {/* OPTIMIZATION TIPS */}
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🥗</div>
            <p>{data.nutrition_tip}</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🔋</div>
            <p>{data.recovery_tip}</p>
          </div>
        </div>

        {/* WORKOUT DAYS */}
        <div className={styles.daysList}>
          {data.days.map((day, idx) => {
            const isExpanded = expandedDay === idx;
            // 3. Fallback format for missing day labels
            const displayDayStr = day.day || `DAY 0${idx + 1}`;

            return isExpanded ? (
              <article key={idx} className={styles.dayCardExpanded}>
                <header className={styles.dayHeader} onClick={() => toggleDay(idx)}>
                  <div className={styles.dayTitleGroup}>
                    <div className={styles.dayIcon}>⚡</div>
                    <div className={styles.titleInfo}>
                      <div className={styles.tagGroup}>
                        <span className={styles.dayNum}>{displayDayStr}</span>
                        <span className={styles.typeBadge}>{day.type}</span>
                      </div>
                      <h2>{day.title}</h2>
                    </div>
                  </div>
                  <div className={styles.expandIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
                  </div>
                </header>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {/* Safe fallbacks for missing data */}
                    <strong>{day.duration_min || 0}</strong>
                    <label>MIN SESSION</label>
                  </div>
                  <div className={styles.metricBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M12 2c0 0-5 6.4-5 11.2a5 5 0 0 0 10 0C17 8.4 12 2 12 2z"></path></svg>
                    <strong>{day.calories_est || 0}</strong>
                    <label>EST BURN</label>
                  </div>
                  <div className={styles.metricBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    <strong>{day.exercises?.length || 0}</strong>
                    <label>MOVEMENTS</label>
                  </div>
                  <div className={styles.metricBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    <strong>{day.intensity || 'LOW'}</strong>
                    <label>INTENSITY</label>
                  </div>
                </div>

                <div className={styles.exerciseList}>
                  {day.exercises?.map((ex, i) => (
                    <div key={i} className={styles.exerciseRow}>
                      <div className={styles.exLeft}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        <span className={styles.exName}>{ex.name}</span>
                      </div>
                      <div className={styles.exRight}>
                        {ex.sets} SETS × {ex.reps} REPS
                      </div>
                    </div>
                  ))}
                </div>

                {day.protocol && (
                  <div className={styles.protocolBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <p>Protocol: {day.protocol}</p>
                  </div>
                )}
              </article>
            ) : (
              <div key={idx} className={styles.dayCardCollapsed} onClick={() => toggleDay(idx)}>
                <div className={styles.collapsedLeft}>
                  <div className={styles.dayIcon}>⚡</div>
                  <div className={styles.collapsedInfo}>
                    <div className={styles.tagGroup}>
                      <span className={styles.dayNum}>{displayDayStr}</span>
                      <span className={styles.typeBadgeCollapsed}>{day.type}</span>
                    </div>
                    <h3>{day.title}</h3>
                  </div>
                </div>
                <div className={styles.collapsedRight}>
                  <div className={styles.durationBlock}>
                    <strong>{day.duration_min || 0}</strong>
                    <label>MIN</label>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            );
          })}
        </div>

        <button className={styles.backBtn} onClick={onBack}>
          ← GENERATE NEW PROTOCOL
        </button>
      </div>
    </div>
  );
}