import React, { useState } from 'react';
import styles from './InputForm.module.scss';

export default function InputForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    age: '28', 
    weight: '72', 
    height: '180', 
    gender: 'Male',
    experience: 'Advanced', 
    objective: 'Build Muscle', 
    load: '7', 
    notes: ''
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  // Primary Objective Options with Inline SVGs
  const objectives = [
    { id: 'Lose Fat', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-5 6.4-5 11.2a5 5 0 0 0 10 0C17 8.4 12 2 12 2z"></path></svg> },
    { id: 'Build Muscle', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.4 17.6l-2.1-2.1c-.8-.8-.8-2.1 0-2.8l1.4-1.4c.8-.8 2.1-.8 2.8 0l2.1 2.1"></path><path d="M17.6 6.4l2.1 2.1c.8.8.8 2.1 0 2.8l-1.4 1.4c-.8.8-2.1.8-2.8 0l-2.1-2.1"></path><path d="M8.5 15.5l7-7"></path></svg> },
    { id: 'Endurance', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> },
    { id: 'Mobility', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"></circle><path d="M5 22v-5l7-5 7 5v5"></path><path d="M5 10h14"></path></svg> },
    { id: 'General', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
    { id: 'Strength', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> }
  ];

  return (
    <div className={styles.bodyWrapper}>
      <header className={styles.header}>
        <span className={styles.logoText}>AI FITNESS PLANNER</span>
      </header>

      <main className={styles.mainContainer}>
        <section className={styles.heroSection}>
          <div className={styles.iconOverlay}>⚡</div>
          <h1>BUILD YOUR <span>PLAN</span></h1>
          <p>Share a few details and we'll build your perfect weekly fitness routine.</p>
        </section>

        <section className={styles.statsCard}>
          <h2 className={styles.cardHeading}>BODY STATS</h2>
          <div className={styles.statsGrid}>
            <div className={styles.inputGroup}>
              <label>AGE</label>
              <input type="number" value={formData.age} onChange={(e) => updateField('age', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>WEIGHT (KG)</label>
              <input type="number" value={formData.weight} onChange={(e) => updateField('weight', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>HEIGHT (CM)</label>
              <input type="number" value={formData.height} onChange={(e) => updateField('height', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>GENDER</label>
              <div className={styles.genderToggle}>
                <button 
                  className={`${styles.pillBtn} ${formData.gender === 'Male' ? styles.active : ''}`}
                  onClick={() => updateField('gender', 'Male')}
                >
                  <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="14" r="6" /><path d="M14.2 9.8L21 3" /><path d="M16 3h5v5" />
                  </svg>
                  MALE
                </button>

                <button 
                  className={`${styles.pillBtn} ${formData.gender === 'Female' ? styles.active : ''}`}
                  onClick={() => updateField('gender', 'Female')}
                >
                  <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="6" /><path d="M12 16v6" /><path d="M9 19h6" />
                  </svg>
                  FEMALE
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statsCard}>
          <h2 className={styles.cardHeading}>EXPERIENCE TIER</h2>
          <div className={styles.tierGrid}>
            {[
              { id: 'Beginner', sub: 'ALPHA PHASE (<6mo)' },
              { id: 'Intermediate', sub: 'BETA PHASE (6mo-2yr)' },
              { id: 'Advanced', sub: 'ELITE PHASE (2yr+)' }
            ].map(tier => (
               <button 
                 key={tier.id} 
                 className={`${styles.tierCard} ${formData.experience === tier.id ? styles.active : ''}`}
                 onClick={() => updateField('experience', tier.id)}
               >
                 <h3>{tier.id.toUpperCase()}</h3>
                 <span className={styles.tierSub}>{tier.sub}</span>
               </button>
            ))}
          </div>
        </section>

        <section className={styles.statsCard}>
          <h2 className={styles.cardHeading}>PRIMARY OBJECTIVE</h2>
          <div className={styles.objGrid}>
            {objectives.map(obj => (
               <button 
                 key={obj.id} 
                 className={`${styles.objCard} ${formData.objective === obj.id ? styles.active : ''}`}
                 onClick={() => updateField('objective', obj.id)}
               >
                 <div className={styles.objIconWrapper}>{obj.icon}</div>
                 {obj.id.toUpperCase()}
               </button>
            ))}
          </div>
        </section>

        <section className={styles.statsCard}>
          <div className={styles.loadHeader}>
            <h2 className={styles.cardHeading}>WEEKLY LOAD</h2>
            <div className={styles.loadDisplay}>
              <strong>0{formData.load}</strong><span>DAYS</span>
            </div>
          </div>
          <div className={styles.loadGrid}>
            {['3', '4', '5', '6', '7'].map(num => (
              <button 
                key={num} 
                className={`${styles.pillBtn} ${styles.loadBtn} ${formData.load === num ? styles.active : ''}`}
                onClick={() => updateField('load', num)}
              >{num}</button>
            ))}
          </div>
        </section>

        <section className={styles.statsCard}>
          <h2 className={styles.cardHeading}>ANYTHING ELSE?</h2>
          <textarea 
            className={styles.textArea} 
            placeholder="I have a bad knee, only have dumbbells, prefer home workouts, training for a 5k..."
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
          />
        </section>

        <button className={styles.submitBtn} onClick={() => onGenerate(formData)}>
          GENERATE MY PLAN <span>✦</span>
        </button>
      </main>
    </div>
  );
}