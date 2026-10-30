/**
 * HYPERTROPHY DDP COACH - PWA ENGINE
 * Evidence-based progressive overload, RIR guardrails, stretch mechanics, & timer.
 * Follows Hallmark UI rules: no slop, accessible controls, clean copy.
 */

(() => {
  'use strict';

// ============================================================================
// 1. ROUTINE BLUEPRINT & EXERCISE DATABASE
// ============================================================================

const ROUTINE_DATA = {
  upperA: {
    id: 'upperA',
    name: 'Upper A',
    dayName: 'Monday',
    title: 'Upper A: Horizontal Push & Vertical Pull',
    focus: 'Flat DB Press, Lat Pulldown, Incline Smith, Direct Arms',
    exercises: [
      {
        id: 'flat_db_press',
        name: 'Flat Dumbbell Press',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 2,
        targetRirLabel: '2 RIR',
        restSeconds: 180,
        isAxialCompound: true,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Set 1 dictates weekly progression. Hold 2 RIR to manage axial fatigue.'
        },
        cues: 'Retract and depress shoulder blades against the bench. Lower deep for maximum pectoral stretch with elbows at 45 degrees. Pause 1s at the bottom.',
        substitutions: [
          'Barbell Flat Bench Press',
          'Plate-Loaded Chest Press Machine',
          'Converging Incline or Flat Machine Press'
        ]
      },
      {
        id: 'neutral_lat_pulldown',
        name: 'Neutral-Grip Lat Pulldown',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: '2s stretch pause',
          badgeClass: 'badge-stretch',
          desc: 'Pause 2 seconds in the fully lengthened stretch at the top of every rep.'
        },
        cues: 'Shoulder-width neutral grip. Let shoulder blades elevate fully at the top (2s pause), then drive elbows down toward your back pockets.',
        substitutions: [
          'Neutral-Grip Pull-ups (weighted if needed)',
          'Single-Arm Cable High Row',
          'Pronated Lat Pulldown'
        ]
      },
      {
        id: 'incline_smith_press',
        name: 'Incline Smith Machine Press (30°)',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: '3s eccentric',
          badgeClass: 'badge-pause',
          desc: 'Lower under strict 3-second control on every rep.'
        },
        cues: 'Set bench to 30 degrees to bias the clavicular head. Touch the bar softly to upper chest and press without harsh elbow lockout.',
        substitutions: [
          '30° Incline Dumbbell Press',
          'Incline Barbell Bench Press',
          'Incline Machine Chest Press'
        ]
      },
      {
        id: 'chest_supported_db_row',
        name: 'Chest-Supported Dumbbell Row',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 1,
        targetRirLabel: '1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Upper back bias',
          badgeClass: 'badge-pause',
          desc: 'Zero lumbar momentum. Pure mechanical tension on rhomboids and mid-traps.'
        },
        cues: 'Set bench to 30 or 45 degrees. Press chest firmly into pad. Flare elbows 45 degrees and squeeze shoulder blades for 1 second at the top before a controlled descent.',
        substitutions: [
          'Chest-Supported T-Bar Row',
          'Seated Wide-Grip Cable Row',
          'Chest-Supported Machine Row'
        ]
      },
      {
        id: 'cable_lateral_raise',
        name: 'Cable Lateral Raise',
        sets: 3,
        targetReps: [12, 15],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 60,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause on Set 3',
          badgeClass: 'badge-rest-pause',
          desc: 'On Set 3: hit failure (0 RIR), rest 15s, squeeze out 4 reps, rest 15s, finish with 3 reps.'
        },
        cues: 'Set pulley at wrist height. Raise in the scapular plane (30 degrees forward). Smooth constant resistance across the entire arc.',
        substitutions: [
          'Dumbbell Lateral Raise with pause',
          'Machine Lateral Raise'
        ]
      },
      {
        id: 'cable_katana_ext',
        name: 'Overhead Cable Katana Extension',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Lengthened partials (Set 2)',
          badgeClass: 'badge-partials',
          desc: 'On Set 2: when full range fails, complete 4 to 6 pulses in the deepest stretched half behind your head.'
        },
        cues: 'Cables crossed behind your head. Deep elbow flexion to stretch the triceps long head. Extend cleanly without moving elbows.',
        substitutions: [
          'Single-Arm Overhead Cable Triceps Extension',
          'Incline Overhead DB Triceps Extension',
          'Dual Rope Overhead Cable Extension'
        ]
      },
      {
        id: 'incline_db_curl',
        name: 'Incline Dumbbell Curl (45°)',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Lengthened partials (Set 2)',
          badgeClass: 'badge-partials',
          desc: 'On Set 2: at failure, complete 4 to 5 partial reps from the bottom stretch.'
        },
        cues: 'Set bench to 45 degrees. Let arms hang vertical. Keep shoulders pinned against the bench to pre-stretch the biceps long head.',
        substitutions: [
          'Behind-the-Back Cable Curl (Bayesian Curl)',
          'Preacher Curl',
          'Seated Dumbbell Curl'
        ]
      }
    ]
  },

  lowerA: {
    id: 'lowerA',
    name: 'Lower A',
    dayName: 'Tuesday',
    title: 'Lower A: Quad Bias & Knee Flexion',
    focus: 'Hack Squat, Seated Leg Curl, Bulgarian Split Squats, Calves',
    exercises: [
      {
        id: 'hack_squat',
        name: 'Hack Squat or Leg Press',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 180,
        isAxialCompound: true,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Max depth without pelvic tuck. Set 1 dictates weekly progression.'
        },
        cues: 'Place feet low to mid platform to maximize knee travel over toes. Lower under 3-second control.',
        substitutions: [
          '45° Leg Press (low feet)',
          'Smith Machine Squat (forward feet or heels elevated)',
          'Barbell High Bar Squat'
        ]
      },
      {
        id: 'seated_leg_curl',
        name: 'Seated Leg Curl',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: 'Lengthened partials (Set 3)',
          badgeClass: 'badge-partials',
          desc: 'On Set 3: at failure, complete 4 to 5 pulses in the deep stretch with knees nearly straight.'
        },
        cues: 'Keep torso upright or lean slightly forward to pre-stretch hamstrings at the hip. Lock thigh pad down tightly.',
        substitutions: [
          'Lying Leg Curl (hips elevated on pad)',
          'Nordic Hamstring Curl'
        ]
      },
      {
        id: 'bulgarian_split_squat',
        name: 'Bulgarian Split Squat',
        sets: 2,
        targetReps: [8, 10],
        targetRir: 2,
        targetRirLabel: '2 RIR per leg',
        restSeconds: 90,
        isAxialCompound: true,
        technique: {
          badge: 'Unilateral stability',
          badgeClass: 'badge-pause',
          desc: 'Rest 90 seconds between legs to keep cardio fatigue from capping quad output.'
        },
        cues: 'Lean torso 15 to 20 degrees forward to distribute load across glutes and quads. Rest rear foot on bench or roller.',
        substitutions: [
          'Walking Dumbbell Lunges',
          'Barbell or Dumbbell Reverse Lunges',
          'Single-Leg Press'
        ]
      },
      {
        id: 'leg_extension',
        name: 'Leg Extension Machine',
        sets: 2,
        targetReps: [12, 15],
        targetRir: 0,
        targetRirLabel: '0 RIR (Failure)',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause on Set 2',
          badgeClass: 'badge-rest-pause',
          desc: 'On Set 2: reach 0 RIR, rest 15s, squeeze out 4 reps, rest 15s, finish with 3 reps.'
        },
        cues: 'Align machine pivot with knee joint. Pause 1s at peak contraction without hyperextending.',
        substitutions: [
          'Assisted Sissy Squat',
          'Reverse Nordic Curl'
        ]
      },
      {
        id: 'standing_calf_raise',
        name: 'Standing Calf Raise',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: '2s stretch pause',
          badgeClass: 'badge-stretch',
          desc: 'Mandatory 2-second pause at the bottom stretch to eliminate Achilles tendon recoil.'
        },
        cues: 'Keep knees locked to stretch gastrocnemius. Deep drop, freeze 2s at bottom, drive up onto balls of feet under control.',
        substitutions: [
          'Leg Press Calf Press (2s pause)',
          'Smith Machine Calf Raise'
        ]
      }
    ]
  },

  upperB: {
    id: 'upperB',
    name: 'Upper B',
    dayName: 'Thursday',
    title: 'Upper B: Vertical Push & Horizontal Pull',
    focus: 'T-Bar Row, Seated DB Shoulder Press, Incline Cable Flyes, Arms',
    exercises: [
      {
        id: 'tbar_cable_row',
        name: 'Chest-Supported T-Bar or Cable Row',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 150,
        isAxialCompound: false,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Top set progression driver for upper back density.'
        },
        cues: 'Semi-wide grip. Let shoulder blades protract forward in the stretch, then retract hard into the pull.',
        substitutions: [
          'Chest-Supported Dumbbell Row',
          'Seated Wide-Grip Cable Row',
          'Barbell Pendlay Row'
        ]
      },
      {
        id: 'seated_db_shoulder_press',
        name: 'Seated DB Shoulder Press (75°)',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: '75° bench angle',
          badgeClass: 'badge-pause',
          desc: 'A 75-degree incline protects the shoulder joint and prevents excessive lumbar arching.'
        },
        cues: 'Lower dumbbells to ear or chin height to stretch anterior delts. Elbows tucked 30 degrees into scapular plane.',
        substitutions: [
          'Overhead Smith Machine Press',
          'Seated Machine Shoulder Press',
          'Standing Overhead Barbell Press (1 to 2 RIR)'
        ]
      },
      {
        id: 'incline_cable_flyes',
        name: 'Incline Cable Flyes',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: '10s loaded stretch (Set 3)',
          badgeClass: 'badge-stretch',
          desc: 'After the final rep of Set 3, hold the deep stretch under load for 10 seconds.'
        },
        cues: 'Set pulleys at mid height. Maintain a slight fixed elbow bend. Focus on feeling the upper pec stretch at the bottom.',
        substitutions: [
          'Pec Deck Machine (10s loaded stretch finisher)',
          'Flat Cable Crossover',
          'Incline Dumbbell Flyes'
        ]
      },
      {
        id: 'single_arm_lat_pulldown',
        name: 'Single-Arm Lat Pulldown',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 1,
        targetRirLabel: '1 RIR per side',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Iliac fiber alignment',
          badgeClass: 'badge-pause',
          desc: 'Line up the cable directly with the lat iliac fibers.'
        },
        cues: 'Slight side bend toward working side. Drive elbow tight against ribcage toward the iliac crest without rotating torso.',
        substitutions: [
          'Half-Kneeling Single-Arm Cable Pulldown',
          'Single-Arm Machine Lat Pulldown'
        ]
      },
      {
        id: 'reverse_pec_deck',
        name: 'Reverse Pec Deck / Cable Rear Delt',
        sets: 3,
        targetReps: [12, 15],
        targetRir: 0,
        targetRirLabel: '0 RIR (Failure)',
        restSeconds: 60,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause on Set 3',
          badgeClass: 'badge-rest-pause',
          desc: 'On Set 3: hit failure (0 RIR), rest 15s, complete 4 reps, rest 15s, finish with 3 reps.'
        },
        cues: 'Handles 30 to 45 degrees below shoulder height to isolate rear delts and quiet the upper traps. Keep shoulder blades relatively stable.',
        substitutions: [
          'Incline DB Rear Delt Fly',
          'Rope Face Pulls (0 RIR)'
        ]
      },
      {
        id: 'cable_triceps_pushdown',
        name: 'Cable Triceps Pushdown (Straight / V-Bar)',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Lateral & medial heads',
          badgeClass: 'badge-pause',
          desc: 'Overloads lateral and medial triceps heads in the shortened position.'
        },
        cues: 'Elbows pinned firmly at ribs. Lock elbows out under control at the bottom.',
        substitutions: [
          'Rope Triceps Pushdown',
          'Parallel Bar Dips (assisted or bodyweight)'
        ]
      },
      {
        id: 'standing_db_hammer_curl',
        name: 'Standing DB Hammer Curl',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Brachialis & forearm',
          badgeClass: 'badge-pause',
          desc: 'Builds brachialis and brachioradialis for arm thickness.'
        },
        cues: 'Strict neutral grip (thumbs pointing up). Zero torso swing or hip drive.',
        substitutions: [
          'Rope Cable Hammer Curl',
          'Cross-Body DB Hammer Curl',
          'Reverse-Grip EZ-Bar Curl'
        ]
      }
    ]
  },

  lowerB: {
    id: 'lowerB',
    name: 'Lower B',
    dayName: 'Friday',
    title: 'Lower B: Posterior Chain & Adductor Focus',
    focus: 'Romanian Deadlift, High & Wide Leg Press, Adductors, Calves',
    exercises: [
      {
        id: 'romanian_deadlift',
        name: 'Romanian Deadlift (Barbell or DB)',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 2,
        targetRirLabel: '2 RIR',
        restSeconds: 180,
        isAxialCompound: true,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Pure hip hinge. Keep 2 RIR to protect spinal erectors and central nervous system.'
        },
        cues: 'Push hips back toward the wall behind you. Soft, fixed knee bend. Keep weight skimming your shins down to the hamstring stretch limit.',
        substitutions: [
          'Dumbbell RDL',
          '45° Back Extension (neutral spine)',
          'Trap Bar RDL'
        ]
      },
      {
        id: 'leg_press_wide',
        name: 'Leg Press (High & Wide Stance)',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 1.5,
        targetRirLabel: '1 to 2 RIR',
        restSeconds: 150,
        isAxialCompound: false,
        technique: {
          badge: 'Adductor & glute bias',
          badgeClass: 'badge-pause',
          desc: 'High and wide foot placement maximizes the moment arm for adductors and glutes.'
        },
        cues: 'Feet high on the sled, wider than shoulder width with toes angled 30 degrees outward. Lower deep without tucking tailbone.',
        substitutions: [
          'Barbell Sumo Squat',
          'Smith Machine Wide-Stance Squat'
        ]
      },
      {
        id: 'lying_leg_curl',
        name: 'Lying Leg Curl',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause on Set 2',
          badgeClass: 'badge-rest-pause',
          desc: 'On Set 2: reach 0 RIR, rest 15s, complete 3 reps, rest 15s, finish with 2 reps.'
        },
        cues: 'Hips pressed firmly into pad (squeeze glutes to avoid arching lower back). Curl up, then lower in 2 controlled seconds.',
        substitutions: [
          'Seated Leg Curl',
          'Single-Leg Standing Leg Curl'
        ]
      },
      {
        id: 'seated_hip_adduction',
        name: 'Seated Hip Adduction Machine',
        sets: 2,
        targetReps: [12, 15],
        targetRir: 0,
        targetRirLabel: '0 RIR (Failure)',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Lengthened partials (Set 2)',
          badgeClass: 'badge-partials',
          desc: 'On Set 2: upon full-range failure, pulse 5 to 6 reps in the widest stretched position.'
        },
        cues: 'Set machine to maximum comfortable hip abduction. Squeeze in with control and hold the outer stretch 1s.',
        substitutions: [
          'Cable Hip Adduction with ankle strap',
          'Copenhagen Plank'
        ]
      },
      {
        id: 'seated_calf_raise',
        name: 'Seated Calf Raise',
        sets: 3,
        targetReps: [12, 15],
        targetRir: 0.5,
        targetRirLabel: '0 to 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: '2s stretch pause (soleus)',
          badgeClass: 'badge-stretch',
          desc: 'With knees bent at 90 degrees, the soleus takes on nearly all the work.'
        },
        cues: 'Deep dorsiflexion stretch. Pause 2 full seconds at the bottom. Squeeze up under control.',
        substitutions: [
          'Standing Calf Raise (slight knee bend)'
        ]
      }
    ]
  }
};

// ============================================================================
// 2. STATE MANAGEMENT & STORAGE
// ============================================================================

const STORAGE_KEYS = {
  LOGS: 'hypertrophy_ddp_logs_v2',
  SETTINGS: 'hypertrophy_ddp_settings_v2',
  ACTIVE_DRAFT: 'hypertrophy_ddp_active_draft_v2',
  HISTORY: 'hypertrophy_ddp_history_v1'
};

const state = {
  currentSessionId: 'upperA',
  isWorkoutActive: false,
  activeWorkoutSessionId: null,
  workoutStartTime: null,
  weightUnit: 'kg', // 'kg' or 'lbs'
  isDeloadMode: false,
  audioVibrate: true,
  theme: 'system',
  logs: {},
  history: [],
  draft: {},
  substitutions: {},
  audioCtx: null,
  timer: {
    interval: null,
    hideTimeout: null,
    remainingSeconds: 0,
    totalSeconds: 0,
    isPaused: false,
    exerciseTitle: ''
  },
  progression: {
    exerciseId: null,
    metric: 'set1_weight',
    selectedPointIndex: null
  }
};

// Web Audio API Synth Sound
function playBeep(freq = 587.33, duration = 0.15, type = 'sine') {
  if (!state.audioVibrate) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!state.audioCtx) state.audioCtx = new AudioContextClass();
    if (state.audioCtx.state === 'suspended') state.audioCtx.resume();

    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, state.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(state.audioCtx.destination);

    osc.start();
    osc.stop(state.audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback error, falling back without sound:', e);
    state.audioCtx = null;
  }
}

function playCompletionChime() {
  playBeep(523.25, 0.12);
  setTimeout(() => playBeep(659.25, 0.12), 120);
  setTimeout(() => playBeep(783.99, 0.25), 240);
  if (state.audioVibrate && 'vibrate' in navigator) {
    try {
      navigator.vibrate([200, 100, 200, 100, 400]);
    } catch (err) {
      console.warn('Haptic vibration failed, continuing without vibration:', err);
    }
  }
}

function saveStorageItem(key, value) {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving to localStorage key "${key}":`, err);
    const isQuotaError = err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || err.code === 22 || err.code === 1014;
    if (isQuotaError && key === STORAGE_KEYS.HISTORY && Array.isArray(value) && value.length > 5) {
      try {
        const pruned = value.slice(-Math.floor(value.length * 0.8));
        localStorage.setItem(key, JSON.stringify(pruned));
        console.warn('Storage quota exceeded: pruned oldest history entries to preserve recent workouts.');
        return true;
      } catch (innerErr) {
        console.error('Fallback pruning failed to free quota:', innerErr);
      }
    }
    return false;
  }
}

function loadState() {
  try {
    const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (savedLogs) state.logs = JSON.parse(savedLogs);
  } catch (err) {
    console.warn('Corrupted logs in storage, resetting to default:', err);
    state.logs = {};
  }

  try {
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      state.history = Array.isArray(parsedHistory) ? parsedHistory : [];
    } else {
      state.history = [];
    }
  } catch (err) {
    console.warn('Corrupted history in storage, resetting to empty array:', err);
    state.history = [];
  }

  try {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      state.weightUnit = parsed.weightUnit || 'kg';
      state.isDeloadMode = !!parsed.isDeloadMode;
      state.audioVibrate = parsed.audioVibrate !== false;
      state.theme = ['light', 'dark'].includes(parsed.theme) ? parsed.theme : 'system';
    }
  } catch (err) {
    console.warn('Corrupted settings in storage, using defaults:', err);
  }

  try {
    const savedDraft = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
    if (savedDraft) {
      state.draft = JSON.parse(savedDraft);
      if (state.draft && typeof state.draft.substitutions === 'object' && state.draft.substitutions !== null) {
        state.substitutions = state.draft.substitutions;
      } else {
        state.substitutions = {};
      }
      if (state.draft.isWorkoutActive) {
        state.isWorkoutActive = true;
        state.activeWorkoutSessionId = state.draft.activeWorkoutSessionId || state.draft.currentSessionId || 'upperA';
        state.workoutStartTime = state.draft.workoutStartTime || Date.now();
        state.currentSessionId = state.draft.currentSessionId || 'upperA';
      }
    } else {
      state.substitutions = {};
    }
  } catch (err) {
    console.warn('Corrupted active draft in storage, resetting draft:', err);
    state.draft = {};
    state.substitutions = {};
  }
}

function saveLogs() {
  saveStorageItem(STORAGE_KEYS.LOGS, state.logs);
}

function saveHistory() {
  saveStorageItem(STORAGE_KEYS.HISTORY, state.history);
}

function saveSettings() {
  return saveStorageItem(STORAGE_KEYS.SETTINGS, {
    weightUnit: state.weightUnit,
    isDeloadMode: state.isDeloadMode,
    audioVibrate: state.audioVibrate,
    theme: state.theme
  });
}

function applyTheme() {
  if (state.theme === 'system') {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = state.theme;
  }
  const select = document.getElementById('themeSelect');
  if (select) select.value = state.theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.body).backgroundColor;
}

function saveDraft() {
  if (!state.draft) state.draft = {};
  state.draft.isWorkoutActive = state.isWorkoutActive;
  state.draft.activeWorkoutSessionId = state.activeWorkoutSessionId;
  state.draft.workoutStartTime = state.workoutStartTime;
  state.draft.currentSessionId = state.currentSessionId;
  state.draft.substitutions = state.substitutions || {};
  saveStorageItem(STORAGE_KEYS.ACTIVE_DRAFT, state.draft);
}

// ============================================================================
// 3. REST TIMER IMPLEMENTATION
// ============================================================================

function startRestTimer(seconds, exerciseName = 'Rest') {
  clearInterval(state.timer.interval);
  clearTimeout(state.timer.hideTimeout);
  state.timer.totalSeconds = seconds;
  state.timer.remainingSeconds = seconds;
  state.timer.isPaused = false;
  state.timer.exerciseTitle = exerciseName;

  const bar = document.getElementById('restTimerBar');
  const label = document.getElementById('timerExerciseLabel');
  const toggleIcon = document.getElementById('timerToggleIcon');

  if (bar) bar.classList.remove('hidden');
  if (label) label.textContent = exerciseName;
  if (toggleIcon) {
    toggleIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
  }

  updateTimerUI();

  state.timer.interval = setInterval(() => {
    if (!state.timer.isPaused) {
      state.timer.remainingSeconds--;
      updateTimerUI();

      if (state.timer.remainingSeconds <= 0) {
        clearInterval(state.timer.interval);
        playCompletionChime();
        if (bar) {
          state.timer.hideTimeout = setTimeout(() => {
            bar.classList.add('hidden');
          }, 3000);
        }
      }
    }
  }, 1000);
}

function updateTimerUI() {
  const clock = document.getElementById('timerClock');
  const progress = document.getElementById('timerProgressBar');

  const mins = Math.floor(Math.max(0, state.timer.remainingSeconds) / 60);
  const secs = Math.max(0, state.timer.remainingSeconds) % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (clock) clock.textContent = formatted;
  if (progress && state.timer.totalSeconds > 0) {
    const pct = Math.max(0, Math.min(100, (state.timer.remainingSeconds / state.timer.totalSeconds) * 100));
    progress.style.transform = `scaleX(${pct / 100})`;
  }
}

function stopRestTimer() {
  clearInterval(state.timer.interval);
  clearTimeout(state.timer.hideTimeout);
  const bar = document.getElementById('restTimerBar');
  if (bar) bar.classList.add('hidden');
}

// ============================================================================
// 4. DYNAMIC DOUBLE PROGRESSION (DDP) LOGIC
// ============================================================================

function evaluateDdpSet(exercise, setIndex, weight, reps, rir) {
  const minReps = exercise.targetReps[0];
  const maxReps = exercise.targetReps[1];
  const unit = state.weightUnit;

  if (setIndex === 0) {
    if (reps >= maxReps) {
      const minInc = (weight * 0.025).toFixed(1);
      const maxInc = (weight * 0.05).toFixed(1);
      return {
        type: 'ceiling',
        message: `<strong>Ceiling hit on Set 1:</strong> Completed ${reps} reps (target: ${maxReps}). DDP: Increase load 2.5% to 5% next week (+${minInc} to +${maxInc} ${unit}).`
      };
    } else if (reps < minReps) {
      return {
        type: 'floor',
        message: `Set 1 below floor (${reps} of ${minReps} reps). Keep current weight next week until you hit the rep target.`
      };
    }
    return null;
  } else {
    if (reps < minReps) {
      const dropAmount = (weight * 0.075).toFixed(1);
      return {
        type: 'floor',
        message: `<strong>Fatigue drop-off:</strong> Completed ${reps} reps (below ${minReps}). DDP: Reduce load 5% to 10% (-${dropAmount} ${unit}) on next set.`
      };
    }
    return null;
  }
}

// ============================================================================
// 5. UI RENDERING
// ============================================================================

function renderSession() {
  const session = ROUTINE_DATA[state.currentSessionId];
  if (!session) return;

  const titleEl = document.getElementById('sessionTitle');
  const focusEl = document.getElementById('sessionFocus');
  const totalSetsEl = document.getElementById('totalSetsCount');
  const unitPill = document.getElementById('currentUnitPill');
  const deloadStatus = document.getElementById('deloadStatus');

  if (titleEl) titleEl.textContent = session.title;
  if (focusEl) focusEl.textContent = session.focus;
  if (unitPill) unitPill.textContent = state.weightUnit;

  if (deloadStatus) {
    deloadStatus.textContent = state.isDeloadMode 
      ? 'Deload active (50% volume, 3 to 4 RIR)' 
      : '4-day upper and lower split';
    deloadStatus.style.color = state.isDeloadMode ? 'var(--color-accent-2)' : 'var(--color-muted)';
  }

  const btnToggle = document.getElementById('btnToggleWorkout');
  const lblAction = document.getElementById('lblWorkoutAction');
  if (btnToggle && lblAction) {
    if (state.isWorkoutActive) {
      if (!state.activeWorkoutSessionId || state.activeWorkoutSessionId === state.currentSessionId) {
        btnToggle.classList.add('active-workout');
        lblAction.textContent = 'Finish workout';
      } else {
        btnToggle.classList.remove('active-workout');
        const activeName = ROUTINE_DATA[state.activeWorkoutSessionId]?.name || 'other workout';
        lblAction.textContent = `${activeName} in progress`;
      }
    } else {
      btnToggle.classList.remove('active-workout');
      lblAction.textContent = 'Start workout';
    }
  }

  let totalSets = 0;
  session.exercises.forEach(ex => {
    totalSets += state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;
  });
  if (totalSetsEl) totalSetsEl.textContent = `${totalSets} sets`;

  const container = document.getElementById('exercisesList');
  if (!container) return;
  container.innerHTML = '';

  const prevSessionData = state.logs[session.id] || null;

  session.exercises.forEach((exercise) => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.id = `card_${exercise.id}`;

    const subData = state.substitutions && state.substitutions[exercise.id];
    const isSubstituted = Boolean(subData && subData.name);
    const exerciseDisplayName = isSubstituted ? subData.name : exercise.name;

    const plannedSets = state.isDeloadMode 
      ? Math.max(1, Math.round(exercise.sets * 0.5)) 
      : exercise.sets;

    const rirLabel = state.isDeloadMode ? '3 to 4 RIR' : exercise.targetRirLabel;

    let rowsHtml = '';
    for (let i = 0; i < plannedSets; i++) {
      const setNum = i + 1;
      
      let prevText = '—';
      const currentExerciseName = isSubstituted ? subData.name : exercise.name;
      let matchingPrevSets = null;

      if (prevSessionData && prevSessionData.exercises && prevSessionData.exercises[exercise.id]) {
        const prevMeta = prevSessionData.exerciseLogs && prevSessionData.exerciseLogs[exercise.id];
        const prevName = prevMeta ? prevMeta.exerciseName : exercise.name;
        if (prevName === currentExerciseName) {
          matchingPrevSets = prevSessionData.exercises[exercise.id];
        }
      }

      if (!matchingPrevSets && Array.isArray(state.history)) {
        for (const h of state.history) {
          if (h.sessionId === session.id && h.exercises && h.exercises[exercise.id]) {
            const hMeta = h.exerciseLogs && h.exerciseLogs[exercise.id];
            const hName = hMeta ? hMeta.exerciseName : exercise.name;
            if (hName === currentExerciseName) {
              matchingPrevSets = h.exercises[exercise.id];
              break;
            }
          }
        }
      }

      if (matchingPrevSets && matchingPrevSets[i]) {
        const prevSet = matchingPrevSets[i];
        if (prevSet && prevSet.weight !== undefined && prevSet.weight !== null && prevSet.reps) {
          prevText = `${prevSet.weight}x${prevSet.reps}`;
        }
      }

      const draftKey = `${session.id}_${exercise.id}_${i}`;
      const draftData = (state.draft && state.draft[draftKey]) || {};
      const valWeight = draftData.weight !== undefined ? draftData.weight : '';
      const valReps = draftData.reps !== undefined ? draftData.reps : '';
      const valRir = draftData.rir !== undefined ? draftData.rir : (state.isDeloadMode ? '3' : Math.round(exercise.targetRir));
      const isCompleted = !!draftData.done;

      rowsHtml += `
        <div class="set-row ${isCompleted ? 'completed' : ''}" id="row_${exercise.id}_${i}">
          <div class="set-col-num">${setNum}</div>
          <div class="set-col-prev" title="Previous">${prevText}</div>
          <div>
            <input type="number" step="0.5" inputmode="decimal" class="set-input set-input-weight" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="${state.weightUnit}" 
                   value="${valWeight}" aria-label="Weight for set ${setNum}">
          </div>
          <div>
            <input type="number" inputmode="numeric" class="set-input set-input-reps" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="reps" 
                   value="${valReps}" aria-label="Reps for set ${setNum}">
          </div>
          <div>
            <input type="number" step="0.5" inputmode="decimal" class="set-input set-input-rir" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="RIR" 
                   value="${valRir}" aria-label="RIR for set ${setNum}">
          </div>
          <div>
            <button class="set-check-btn" data-ex="${exercise.id}" data-set="${i}" aria-label="Mark set ${setNum} as completed" aria-pressed="${isCompleted ? 'true' : 'false'}">
              ${isCompleted ? '✓' : ''}
            </button>
          </div>
          <div class="set-ddp-insight hidden" id="insight_${exercise.id}_${i}"></div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="exercise-header">
        <div class="exercise-top-row">
          <div class="exercise-title">${exerciseDisplayName}</div>
          ${isSubstituted ? `
            <button type="button" class="btn-restore-sub" data-restore-sub="${exercise.id}" title="Restore original exercise" aria-label="Restore original exercise">
              ↺ Restore
            </button>
          ` : ''}
        </div>
        <div class="exercise-target-line">
          <span class="target-bracket">${plannedSets} sets x ${exercise.targetReps[0]} to ${exercise.targetReps[1]} reps</span>
          <span class="target-rir">${rirLabel}</span>
          <span class="target-rest">Rest: ${Math.round(exercise.restSeconds / 60 * 10) / 10} min</span>
        </div>
        ${isSubstituted ? `
          <div class="technique-badge badge-sub">
            Substitute for: ${exercise.name}
          </div>
        ` : ''}
        ${exercise.technique ? `
          <div class="technique-badge ${exercise.technique.badgeClass}">
            ${exercise.technique.badge}
          </div>
        ` : ''}
        <button class="btn-accordion" data-accordion="${exercise.id}" aria-expanded="false" aria-controls="drawer_${exercise.id}">
          <span>Technique & substitutions</span>
          <span class="accordion-chevron" aria-hidden="true"></span>
        </button>
      </div>

      <div class="accordion-drawer hidden" id="drawer_${exercise.id}">
        <p><strong>Execution cues:</strong> ${exercise.cues}</p>
        ${exercise.technique ? `<p style="margin-top:var(--space-2xs);"><strong>Technical detail:</strong> ${exercise.technique.desc}</p>` : ''}
        <button type="button" class="drawer-sub-btn" data-show-subs="${exercise.id}">View equipment & machine substitutions</button>
      </div>

      <div class="sets-table">
        <div class="table-header">
          <div>Set</div>
          <div>Prev</div>
          <div>${state.weightUnit}</div>
          <div>Reps</div>
          <div>RIR</div>
          <div>Done</div>
        </div>
        ${rowsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  session.exercises.forEach(ex => {
    const plannedSets = state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;
    for (let i = 0; i < plannedSets; i++) {
      const draftKey = `${session.id}_${ex.id}_${i}`;
      const draftData = (state.draft && state.draft[draftKey]) || {};
      if (draftData.done && draftData.reps) {
        showDdpInsight(ex, i, parseFloat(draftData.weight) || 0, parseInt(draftData.reps, 10), parseFloat(draftData.rir) || 0);
      }
    }
  });

  attachExerciseCardListeners();
}

function showDdpInsight(exercise, setIndex, weight, reps, rir) {
  const insightEl = document.getElementById(`insight_${exercise.id}_${setIndex}`);
  if (!insightEl) return;

  const result = evaluateDdpSet(exercise, setIndex, weight, reps, rir);
  if (result) {
    insightEl.innerHTML = result.message;
    insightEl.className = `set-ddp-insight ${result.type === 'ceiling' ? 'insight-ceiling' : 'insight-floor'}`;
    insightEl.classList.remove('hidden');

    if (result.type === 'ceiling') {
      const globalBanner = document.getElementById('ddpBanner');
      const alertText = document.getElementById('ddpAlertText');
      if (globalBanner && alertText) {
        alertText.innerHTML = result.message;
        globalBanner.classList.remove('hidden');
      }
    }
  } else {
    insightEl.classList.add('hidden');
  }
}

// ============================================================================
// 6. EVENT HANDLERS & LISTENERS
// ============================================================================

function attachExerciseCardListeners() {
  document.querySelectorAll('[data-accordion]').forEach(btn => {
    btn.onclick = () => {
      const exId = btn.getAttribute('data-accordion');
      const drawer = document.getElementById(`drawer_${exId}`);
      if (!drawer) {
        console.warn(`Accordion drawer missing for exercise ${exId}`);
        return;
      }
      const isHidden = drawer.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!isHidden));
    };
  });

  document.querySelectorAll('[data-show-subs]').forEach(btn => {
    btn.onclick = () => {
      const exId = btn.getAttribute('data-show-subs');
      openSubstitutionsModal(exId);
    };
  });

  document.querySelectorAll('[data-restore-sub]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const exId = btn.getAttribute('data-restore-sub');
      if (exId) restoreOriginalExercise(exId);
    };
  });

  document.querySelectorAll('.set-input').forEach(input => {
    input.oninput = (e) => {
      const exId = e.target.getAttribute('data-ex');
      const setIdx = e.target.getAttribute('data-set');
      const draftKey = `${state.currentSessionId}_${exId}_${setIdx}`;
      if (!state.draft[draftKey]) state.draft[draftKey] = {};

      if (e.target.classList.contains('set-input-weight')) {
        state.draft[draftKey].weight = e.target.value;
      } else if (e.target.classList.contains('set-input-reps')) {
        state.draft[draftKey].reps = e.target.value;
      } else if (e.target.classList.contains('set-input-rir')) {
        state.draft[draftKey].rir = e.target.value;
      }
      saveDraft();
    };
  });

  document.querySelectorAll('.set-check-btn').forEach(btn => {
    btn.onclick = () => {
      const exId = btn.getAttribute('data-ex');
      const setIdx = parseInt(btn.getAttribute('data-set'), 10);
      const row = document.getElementById(`row_${exId}_${setIdx}`);
      const draftKey = `${state.currentSessionId}_${exId}_${setIdx}`;

      if (!state.draft[draftKey]) state.draft[draftKey] = {};
      const isDone = !state.draft[draftKey].done;
      state.draft[draftKey].done = isDone;
      btn.setAttribute('aria-pressed', String(isDone));

      const exercise = ROUTINE_DATA[state.currentSessionId].exercises.find(e => e.id === exId);
      const weightVal = parseFloat(row.querySelector('.set-input-weight').value) || 0;
      const repsVal = parseInt(row.querySelector('.set-input-reps').value, 10) || 0;
      const rirVal = parseFloat(row.querySelector('.set-input-rir').value) || 0;

      state.draft[draftKey].weight = weightVal;
      state.draft[draftKey].reps = repsVal;
      state.draft[draftKey].rir = rirVal;

      saveDraft();

      if (isDone) {
        row.classList.add('completed');
        btn.textContent = '✓';
        playBeep(659.25, 0.1);

        if (exercise && repsVal > 0) {
          showDdpInsight(exercise, setIdx, weightVal, repsVal, rirVal);
        }

        if (exercise && exercise.restSeconds) {
          const subData = state.substitutions && state.substitutions[exId];
          const timerName = (subData && subData.name) || exercise.name;
          startRestTimer(exercise.restSeconds, `${timerName} (Set ${setIdx + 1})`);
        }
      } else {
        row.classList.remove('completed');
        btn.textContent = '';
        const insightEl = document.getElementById(`insight_${exId}_${setIdx}`);
        if (insightEl) insightEl.classList.add('hidden');
        if (setIdx === 0) {
          const globalBanner = document.getElementById('ddpBanner');
          if (globalBanner) globalBanner.classList.add('hidden');
        }
      }
    };
  });
}

function substituteExercise(exerciseId, substituteName, isCustom = false) {
  if (!exerciseId || !substituteName) return;
  const cleanName = typeof substituteName === 'string' ? substituteName.trim() : String(substituteName);
  if (!cleanName) return;
  if (!state.substitutions) state.substitutions = {};
  state.substitutions[exerciseId] = {
    name: cleanName,
    isCustom: Boolean(isCustom)
  };
  saveDraft();
  renderSession();
  const modal = document.getElementById('modalSubstitutions');
  if (modal) modal.classList.add('hidden');
}

function restoreOriginalExercise(exerciseId) {
  if (!exerciseId) return;
  if (state.substitutions && state.substitutions[exerciseId]) {
    delete state.substitutions[exerciseId];
    saveDraft();
    renderSession();
  }
  const modal = document.getElementById('modalSubstitutions');
  if (modal) modal.classList.add('hidden');
}

function openSubstitutionsModal(exerciseId) {
  const session = ROUTINE_DATA[state.currentSessionId];
  const ex = session?.exercises.find(e => e.id === exerciseId);
  if (!ex) return;

  const modal = document.getElementById('modalSubstitutions');
  const title = document.getElementById('subModalTitle');
  const body = document.getElementById('subModalBody');

  const subData = state.substitutions && state.substitutions[exerciseId];
  const isCurrentlySubbed = Boolean(subData && subData.name);

  if (title) {
    title.textContent = isCurrentlySubbed
      ? `Active substitute: ${subData.name}`
      : `Substitutes: ${ex.name}`;
  }

  if (body) {
    let html = '';

    if (isCurrentlySubbed) {
      html += `
        <div class="sub-active-banner">
          <div class="sub-active-info">
            <span class="sub-active-label">Currently substituting:</span>
            <strong class="sub-active-orig">${ex.name}</strong>
            <span class="sub-active-name">Current: ${subData.name}</span>
          </div>
          <button type="button" class="btn-restore-prominent" id="btnRestoreProminent" aria-label="Restore original exercise">
            ↺ Restore original exercise
          </button>
        </div>
      `;
    }

    html += `
      <div class="sub-section-header">
        <p class="sub-section-desc">
          Alternatives with matching resistance curves:
        </p>
      </div>
      <ul class="sub-options-list">
    `;

    const alternatives = Array.isArray(ex.substitutions) ? ex.substitutions : [];
    if (alternatives.length === 0) {
      html += `<li class="sub-empty">No predefined substitutes for this exercise.</li>`;
    } else {
      alternatives.forEach((sub, idx) => {
        const isThisActive = isCurrentlySubbed && subData.name === sub;
        html += `
          <li class="sub-option-item ${isThisActive ? 'is-active' : ''}" data-sub-idx="${idx}">
            <div class="sub-option-text">
              <strong class="sub-option-name">${sub}</strong>
              ${isThisActive ? '<span class="sub-active-chip">In use</span>' : ''}
            </div>
            <button type="button" class="btn-sub-select" data-sub-idx="${idx}" aria-label="Use substitute ${sub}">
              Use this substitute
            </button>
          </li>
        `;
      });
    }

    html += `
      </ul>
      <div class="sub-custom-card">
        <label for="inputCustomSub" class="sub-custom-label">Or enter a custom machine/exercise:</label>
        <div class="sub-custom-input-group">
          <input type="text" id="inputCustomSub" class="sub-custom-input" placeholder="Or enter a custom machine/exercise" aria-label="Custom substitute name" autocomplete="off">
          <button type="button" id="btnApplyCustomSub" class="btn-apply-sub">Apply</button>
        </div>
      </div>
    `;

    body.innerHTML = html;

    if (isCurrentlySubbed) {
      const btnRestore = document.getElementById('btnRestoreProminent');
      if (btnRestore) {
        btnRestore.onclick = () => {
          restoreOriginalExercise(exerciseId);
        };
      }
    }

    body.querySelectorAll('.sub-option-item').forEach(item => {
      const idx = parseInt(item.getAttribute('data-sub-idx'), 10);
      const selectedSub = alternatives[idx];
      const btn = item.querySelector('.btn-sub-select');

      const chooseSub = () => {
        if (selectedSub) {
          substituteExercise(exerciseId, selectedSub, false);
        }
      };

      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          chooseSub();
        };
      }
      item.onclick = () => {
        chooseSub();
      };
    });

    const btnApplyCustom = document.getElementById('btnApplyCustomSub');
    const inputCustom = document.getElementById('inputCustomSub');
    const handleApplyCustom = () => {
      const val = (inputCustom?.value || '').trim();
      if (val) {
        substituteExercise(exerciseId, val, true);
      }
    };

    if (btnApplyCustom) {
      btnApplyCustom.onclick = handleApplyCustom;
    }
    if (inputCustom) {
      inputCustom.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleApplyCustom();
        }
      };
    }
  }

  if (modal) modal.classList.remove('hidden');
}

// ============================================================================
// 7. GLOBAL CONTROLS & WORKOUT LIFECYCLE
// ============================================================================

function setupGlobalListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      const sessId = btn.getAttribute('data-session');
      if (sessId && sessId !== state.currentSessionId) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentSessionId = sessId;
        renderSession();
      }
    };
  });

  const btnToggleWorkout = document.getElementById('btnToggleWorkout');
  if (btnToggleWorkout) {
    btnToggleWorkout.onclick = () => {
      if (!state.isWorkoutActive) {
        state.isWorkoutActive = true;
        state.activeWorkoutSessionId = state.currentSessionId;
        state.workoutStartTime = Date.now();
        saveDraft();
        renderSession();
        playBeep(440, 0.15);
      } else {
        if (state.activeWorkoutSessionId && state.activeWorkoutSessionId !== state.currentSessionId) {
          const activeBtn = document.querySelector(`.tab-btn[data-session='${state.activeWorkoutSessionId}']`);
          if (activeBtn) activeBtn.click();
          return;
        }
        const confirmed = confirm('Do you want to finish and save this workout to your history?');
        if (confirmed) {
          finishWorkoutSession();
        }
      }
    };
  }

  const btnTimerMinus = document.getElementById('btnTimerMinus');
  const btnTimerPlus = document.getElementById('btnTimerPlus');
  const btnTimerToggle = document.getElementById('btnTimerToggle');
  const btnTimerSkip = document.getElementById('btnTimerSkip');
  const timerToggleIcon = document.getElementById('timerToggleIcon');

  if (btnTimerMinus) {
    btnTimerMinus.onclick = () => {
      state.timer.remainingSeconds = Math.max(5, state.timer.remainingSeconds - 30);
      updateTimerUI();
    };
  }

  if (btnTimerPlus) {
    btnTimerPlus.onclick = () => {
      state.timer.remainingSeconds += 30;
      state.timer.totalSeconds += 30;
      updateTimerUI();
    };
  }

  if (btnTimerToggle) {
    btnTimerToggle.onclick = () => {
      state.timer.isPaused = !state.timer.isPaused;
      if (timerToggleIcon) {
        timerToggleIcon.innerHTML = state.timer.isPaused 
          ? '<polygon points="5 3 19 12 5 21 5 3"></polygon>'
          : '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }
    };
  }

  if (btnTimerSkip) {
    btnTimerSkip.onclick = () => {
      stopRestTimer();
    };
  }

  const btnCloseDdpBanner = document.getElementById('btnCloseDdpBanner');
  if (btnCloseDdpBanner) {
    btnCloseDdpBanner.onclick = () => {
      document.getElementById('ddpBanner').classList.add('hidden');
    };
  }

  const btnSettings = document.getElementById('btnSettings');
  const modalSettings = document.getElementById('modalSettings');
  if (btnSettings && modalSettings) {
    btnSettings.onclick = () => modalSettings.classList.remove('hidden');
  }

  const btnQuickNotes = document.getElementById('btnQuickNotes');
  const modalGuide = document.getElementById('modalGuide');
  if (btnQuickNotes && modalGuide) {
    btnQuickNotes.onclick = () => modalGuide.classList.remove('hidden');
  }

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    };
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    };
  });

  const btnUnitKg = document.getElementById('btnUnitKg');
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.onchange = () => {
      state.theme = themeSelect.value;
      applyTheme();
      const saved = saveSettings();
      document.getElementById('themeStatus').textContent = saved
        ? 'Light, dark, or system preference'
        : 'Could not save theme override. Applied for this session only.';
    };
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.theme === 'system') applyTheme();
  });
  const btnUnitLbs = document.getElementById('btnUnitLbs');
  if (btnUnitKg && btnUnitLbs) {
    btnUnitKg.onclick = () => {
      state.weightUnit = 'kg';
      btnUnitKg.classList.add('active');
      btnUnitLbs.classList.remove('active');
      saveSettings();
      renderSession();
    };
    btnUnitLbs.onclick = () => {
      state.weightUnit = 'lbs';
      btnUnitLbs.classList.add('active');
      btnUnitKg.classList.remove('active');
      saveSettings();
      renderSession();
    };
  }

  const chkDeloadMode = document.getElementById('chkDeloadMode');
  if (chkDeloadMode) {
    chkDeloadMode.checked = state.isDeloadMode;
    chkDeloadMode.onchange = () => {
      state.isDeloadMode = chkDeloadMode.checked;
      saveSettings();
      renderSession();
    };
  }

  const chkAudioVibrate = document.getElementById('chkAudioVibrate');
  if (chkAudioVibrate) {
    chkAudioVibrate.checked = state.audioVibrate;
    chkAudioVibrate.onchange = () => {
      state.audioVibrate = chkAudioVibrate.checked;
      saveSettings();
    };
  }

  const btnExportMarkdown = document.getElementById('btnExportMarkdown');
  if (btnExportMarkdown) {
    btnExportMarkdown.onclick = () => exportWorkoutMarkdown();
  }

  const btnExportJson = document.getElementById('btnExportJson');
  const btnHistory = document.getElementById('btnHistory');
  const modalHistory = document.getElementById('modalHistory');
  if (btnHistory && modalHistory) {
    btnHistory.onclick = () => {
      renderHistoryModal();
      modalHistory.classList.remove('hidden');
    };
  }
  setupHistoryTabs();

  if (btnExportJson) {
    btnExportJson.onclick = () => exportJsonBackup();
  }

  const fileImportJson = document.getElementById('fileImportJson');
  if (fileImportJson) {
    fileImportJson.onchange = (e) => importJsonBackup(e);
  }

  const btnResetHistory = document.getElementById('btnResetHistory');
  if (btnResetHistory) {
    btnResetHistory.onclick = () => {
      if (confirm('Are you sure you want to clear your saved workout history?')) {
        state.logs = {};
        state.history = [];
        state.draft = {};
        state.substitutions = {};
        saveLogs();
        saveHistory();
        saveDraft();
        renderSession();
        renderHistoryModal();
        alert('Saved history cleared.');
      }
    };
  }
}

function finishWorkoutSession() {
  const sessionIdToFinish = state.activeWorkoutSessionId || state.currentSessionId;
  const session = ROUTINE_DATA[sessionIdToFinish];
  if (!session) return;

  const now = Date.now();
  const completedSession = {
    id: `workout_${now}_${session.id}`,
    sessionId: session.id,
    sessionTitle: session.title,
    dayName: session.dayName,
    timestamp: now,
    dateString: new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
    displayDate: new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    weightUnit: state.weightUnit,
    isDeloadMode: state.isDeloadMode,
    durationMinutes: state.workoutStartTime ? Math.max(1, Math.round((now - state.workoutStartTime) / 60000)) : 0,
    exercises: {},
    exerciseLogs: {}
  };

  session.exercises.forEach(ex => {
    completedSession.exercises[ex.id] = [];
    const sub = state.substitutions && state.substitutions[ex.id];
    const subName = (sub && sub.name) ? String(sub.name).trim() : null;
    const isSub = Boolean(subName);

    completedSession.exerciseLogs[ex.id] = {
      exerciseName: isSub ? subName : ex.name,
      isSubstituted: !!sub,
      originalName: ex.name
    };

    const plannedSets = state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;

    for (let i = 0; i < plannedSets; i++) {
      const draftKey = `${session.id}_${ex.id}_${i}`;
      const data = state.draft[draftKey] || {};
      completedSession.exercises[ex.id].push({
        weight: parseFloat(data.weight) || 0,
        reps: parseInt(data.reps, 10) || 0,
        rir: parseFloat(data.rir) || 0,
        done: !!data.done
      });
    }
  });

  state.logs[session.id] = completedSession;
  saveLogs();

  if (!Array.isArray(state.history)) state.history = [];
  state.history.unshift(completedSession);
  saveHistory();

  state.isWorkoutActive = false;
  state.activeWorkoutSessionId = null;
  state.workoutStartTime = null;
  state.draft = {};
  state.substitutions = {};
  saveDraft();

  const globalBanner = document.getElementById('ddpBanner');
  if (globalBanner) globalBanner.classList.add('hidden');

  stopRestTimer();
  renderSession();
  renderHistoryModal();
  playCompletionChime();

  alert(`${session.name} workout finished and recorded.`);
}

function setupHistoryTabs() {
  const tabSessions = document.getElementById('tabHistorySessions');
  const tabCharts = document.getElementById('tabHistoryCharts');
  const sessionsView = document.getElementById('historySessionsView');
  const chartsView = document.getElementById('historyChartsView');

  if (tabSessions && tabCharts && sessionsView && chartsView) {
    tabSessions.onclick = () => {
      tabSessions.classList.add('active');
      tabSessions.setAttribute('aria-selected', 'true');
      tabCharts.classList.remove('active');
      tabCharts.setAttribute('aria-selected', 'false');
      sessionsView.classList.remove('hidden');
      chartsView.classList.add('hidden');
    };

    tabCharts.onclick = () => {
      tabCharts.classList.add('active');
      tabCharts.setAttribute('aria-selected', 'true');
      tabSessions.classList.remove('active');
      tabSessions.setAttribute('aria-selected', 'false');
      chartsView.classList.remove('hidden');
      sessionsView.classList.add('hidden');
      renderProgressionView();
    };
  }
}

function renderHistoryModal() {
  renderHistorySessions();
  const chartsView = document.getElementById('historyChartsView');
  if (chartsView && !chartsView.classList.contains('hidden')) {
    renderProgressionView();
  }
}

function renderHistorySessions() {
  const container = document.getElementById('historySessionsView') || document.getElementById('historyModalBody');
  if (!container) return;

  if (!state.history || state.history.length === 0) {
    container.innerHTML = `
      <div class="history-empty">
        <div class="history-empty-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <p class="history-empty-title">No logged workouts</p>
        <p class="history-empty-desc">Complete a workout to save it in your history and track your progress.</p>
      </div>
    `;
    return;
  }

  let html = '<div class="history-list">';
  state.history.forEach((h) => {
    let totalCompletedSets = 0;
    let topSetSummary = '';

    if (h.exercises) {
      Object.keys(h.exercises).forEach(exId => {
        const sets = h.exercises[exId] || [];
        sets.forEach(s => {
          if (s.done || (s.reps > 0 && s.weight > 0)) {
            totalCompletedSets++;
          }
        });
      });
    }

    const sessionObj = ROUTINE_DATA[h.sessionId];
    const firstEx = sessionObj?.exercises?.[0];
    if (firstEx && h.exercises?.[firstEx.id]?.[0]) {
      const topSet = h.exercises[firstEx.id][0];
      if (topSet.reps > 0) {
        const firstExName = h.exerciseLogs?.[firstEx.id]?.exerciseName || firstEx.name;
        topSetSummary = `${firstExName}: ${topSet.weight}${h.weightUnit || 'kg'} × ${topSet.reps} reps`;
      }
    }

    html += `
      <div class="history-card" data-history-id="${h.id}">
        <div class="history-card-header">
          <div>
            <div class="history-card-title-row">
              <span class="history-card-title">${h.sessionTitle || h.sessionId}</span>
              ${h.isDeloadMode ? '<span class="history-badge deload">Deload</span>' : ''}
            </div>
            <span class="history-card-date">${h.displayDate || h.dateString || new Date(h.timestamp).toLocaleDateString()}</span>
          </div>
          <div class="history-header-meta">
            <span class="history-meta-pill">${h.durationMinutes ? `${h.durationMinutes} min` : `${totalCompletedSets} sets`}</span>
          </div>
        </div>
        ${topSetSummary ? `<div class="history-card-date"><strong>Top set:</strong> ${topSetSummary}</div>` : ''}

        <div class="history-card-details hidden" id="historyDetails_${h.id}">
          <table class="history-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Set</th>
                <th>Load (${h.weightUnit || 'kg'})</th>
                <th>Reps</th>
                <th>RIR</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (sessionObj) {
      sessionObj.exercises.forEach(ex => {
        const loggedSets = h.exercises?.[ex.id] || [];
        const recordedName = h.exerciseLogs?.[ex.id]?.exerciseName || ex.name;
        loggedSets.forEach((s, idx) => {
          html += `
            <tr>
              <td>${idx === 0 ? recordedName : ''}</td>
              <td style="text-align:center;">${idx + 1}</td>
              <td style="text-align:center;">${s.weight || '—'}</td>
              <td style="text-align:center;">${s.reps || '—'}</td>
              <td style="text-align:center;">${s.rir !== undefined ? s.rir : '—'}</td>
            </tr>
          `;
        });
      });
    }

    html += `
            </tbody>
          </table>
        </div>

        <div class="history-card-actions">
          <button class="btn-history-action btn-toggle-detail" data-toggle-history="${h.id}">
            View details
          </button>
          <button class="btn-history-action btn-copy-md" data-copy-history="${h.id}" title="Copy Markdown summary">
            Copy Markdown
          </button>
          <button class="btn-history-action btn-history-delete" data-delete-history="${h.id}" title="Delete this workout">
            Delete
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';

  container.innerHTML = html;

  container.querySelectorAll('[data-toggle-history]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-toggle-history');
      const details = document.getElementById(`historyDetails_${id}`);
      if (details) {
        const isHidden = details.classList.toggle('hidden');
        btn.textContent = isHidden ? 'View details' : 'Hide details';
      }
    };
  });

  container.querySelectorAll('[data-copy-history]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-copy-history');
      exportSingleHistoryMarkdown(id);
    };
  });

  container.querySelectorAll('[data-delete-history]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-delete-history');
      deleteHistoryEntry(id);
    };
  });
}

function getAllExercisesList() {
  const exercises = [];
  const seen = new Set();
  Object.values(ROUTINE_DATA).forEach(session => {
    session.exercises?.forEach(ex => {
      if (!seen.has(ex.id)) {
        seen.add(ex.id);
        exercises.push({ id: ex.id, name: ex.name, sessionTitle: session.title });
      }
    });
  });
  return exercises;
}

function getExerciseHistoryData(exerciseId) {
  if (!state.history || state.history.length === 0) return [];
  const sorted = [...state.history].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const points = [];

  sorted.forEach(entry => {
    const exSets = entry.exercises?.[exerciseId];
    if (!exSets || exSets.length === 0) return;

    const completedSets = exSets.filter(s => s.done || (s.weight > 0 && s.reps > 0));
    if (completedSets.length === 0) return;

    const set1 = completedSets[0];
    const set1Weight = Number(set1.weight) || 0;
    const set1Reps = Number(set1.reps) || 0;
    const set1Rir = set1.rir !== undefined ? set1.rir : null;

    // Epley formula for estimated 1RM
    const e1rm = set1Reps > 1 ? Math.round((set1Weight * (1 + set1Reps / 30)) * 10) / 10 : set1Weight;

    // Total exercise tonnage/volume in that session
    const totalVolume = completedSets.reduce((sum, s) => sum + ((Number(s.weight) || 0) * (Number(s.reps) || 0)), 0);

    points.push({
      historyId: entry.id,
      date: entry.displayDate || entry.dateString || new Date(entry.timestamp).toLocaleDateString(),
      timestamp: entry.timestamp,
      isDeload: !!entry.isDeloadMode,
      unit: entry.weightUnit || state.weightUnit || 'kg',
      set1_weight: set1Weight,
      set1_reps: set1Reps,
      set1_rir: set1Rir,
      e1rm: e1rm,
      total_volume: totalVolume,
      setsCount: completedSets.length
    });
  });

  return points;
}

function generateProgressionSvg(points, metricKey, unit) {
  const width = 600;
  const height = 280;
  const padding = { top: 35, right: 35, bottom: 45, left: 60 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const values = points.map(p => p[metricKey]);
  let minVal = Math.min(...values);
  let maxVal = Math.max(...values);

  if (minVal === maxVal) {
    minVal = Math.max(0, minVal - 5);
    maxVal = maxVal + 5;
  } else {
    const range = maxVal - minVal;
    minVal = Math.max(0, minVal - range * 0.15);
    maxVal = maxVal + range * 0.15;
  }

  const gridLines = [];
  const numGrid = 4;
  for (let i = 0; i <= numGrid; i++) {
    const yVal = minVal + ((maxVal - minVal) * (i / numGrid));
    const yPos = padding.top + plotH - ((yVal - minVal) / (maxVal - minVal)) * plotH;
    gridLines.push({ y: yPos, label: `${Math.round(yVal * 10) / 10}` });
  }

  const coords = points.map((p, idx) => {
    const x = points.length === 1
      ? padding.left + plotW / 2
      : padding.left + (idx / (points.length - 1)) * plotW;
    const y = padding.top + plotH - ((p[metricKey] - minVal) / (maxVal - minVal)) * plotH;
    return { x, y, point: p, index: idx };
  });

  const polylineStr = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const areaPolygonStr = [
    `${coords[0].x.toFixed(1)},${(padding.top + plotH).toFixed(1)}`,
    polylineStr,
    `${coords[coords.length - 1].x.toFixed(1)},${(padding.top + plotH).toFixed(1)}`
  ].join(' ');

  let svg = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Progression chart">
      <defs>
        <linearGradient id="progressionGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.32" />
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Gridlines & Y-Axis Labels -->
      <g class="chart-grid">
  `;

  gridLines.forEach(g => {
    svg += `
      <line x1="${padding.left}" y1="${g.y.toFixed(1)}" x2="${padding.left + plotW}" y2="${g.y.toFixed(1)}" stroke="var(--color-rule)" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padding.left - 10}" y="${(g.y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--color-muted)" font-family="var(--font-body)">${g.label}</text>
    `;
  });

  svg += `
      </g>

      <!-- Area fill & Line -->
      <polygon points="${areaPolygonStr}" fill="url(#progressionGradient)" />
      <polyline points="${polylineStr}" fill="none" stroke="var(--color-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Data points & hit targets -->
      <g class="chart-points">
  `;

  coords.forEach(c => {
    const isSelected = state.progression?.selectedPointIndex === c.index;
    svg += `
      <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${isSelected ? 7 : 5}" fill="var(--color-paper-2)" stroke="${isSelected ? 'var(--color-light)' : 'var(--color-accent)'}" stroke-width="${isSelected ? 3.5 : 2.5}" />
      <text x="${c.x.toFixed(1)}" y="${(padding.top + plotH + 20).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--color-muted)" font-family="var(--font-body)">${c.point.date.slice(0, 5)}</text>
      <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="24" fill="transparent" class="chart-hit-circle" data-chart-index="${c.index}" aria-label="Point ${c.point.date}: ${c.point[metricKey]} ${unit}" />
    `;
  });

  svg += `
      </g>
    </svg>
  `;

  return svg;
}

function renderProgressionView() {
  const container = document.getElementById('historyChartsView');
  if (!container) return;

  if (!state.progression) {
    state.progression = {
      exerciseId: null,
      metric: 'set1_weight',
      selectedPointIndex: null
    };
  }

  const exercises = getAllExercisesList();

  if (!state.progression.exerciseId) {
    const exerciseWithHistory = exercises.find(ex => {
      const data = getExerciseHistoryData(ex.id);
      return data.length > 0;
    });
    state.progression.exerciseId = exerciseWithHistory ? exerciseWithHistory.id : (exercises[0]?.id || '');
  }

  const selectedEx = exercises.find(e => e.id === state.progression.exerciseId) || exercises[0];
  const historyData = selectedEx ? getExerciseHistoryData(selectedEx.id) : [];

  let html = `
    <div class="chart-controls">
      <div class="chart-select-group">
        <label for="historyExerciseSelect" class="chart-label">Exercise to analyze</label>
        <select id="historyExerciseSelect" class="chart-select">
  `;

  exercises.forEach(ex => {
    const pointsCount = getExerciseHistoryData(ex.id).length;
    const badge = pointsCount > 0 ? ` (${pointsCount} workouts)` : '';
    const selected = ex.id === state.progression.exerciseId ? 'selected' : '';
    html += `<option value="${ex.id}" ${selected}>${ex.name}${badge}</option>`;
  });

  html += `
        </select>
      </div>

      <div class="chart-select-group">
        <span class="chart-label">Progression metric</span>
        <div class="chart-metric-pills" role="group" aria-label="Progression metric">
          <button class="metric-pill-btn ${state.progression.metric === 'set1_weight' ? 'active' : ''}" data-metric="set1_weight">
            Top Set Load
          </button>
          <button class="metric-pill-btn ${state.progression.metric === 'e1rm' ? 'active' : ''}" data-metric="e1rm">
            Est. 1RM
          </button>
          <button class="metric-pill-btn ${state.progression.metric === 'total_volume' ? 'active' : ''}" data-metric="total_volume">
            Total Volume
          </button>
        </div>
      </div>
    </div>
  `;

  if (historyData.length === 0) {
    html += `
      <div class="history-empty">
        <div class="history-empty-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <p class="history-empty-title">No data for this exercise</p>
        <p class="history-empty-desc">Complete a workout that includes <strong>${selectedEx ? selectedEx.name : 'this exercise'}</strong> to view its progression curve.</p>
      </div>
    `;
    container.innerHTML = html;
    bindProgressionEvents(container);
    return;
  }

  const unit = historyData[historyData.length - 1]?.unit || state.weightUnit || 'kg';
  const metric = state.progression.metric || 'set1_weight';

  const firstVal = historyData[0][metric];
  const lastVal = historyData[historyData.length - 1][metric];
  const maxVal = Math.max(...historyData.map(d => d[metric]));
  const diffVal = Math.round((lastVal - firstVal) * 10) / 10;
  const pctDiff = firstVal > 0 ? Math.round(((lastVal - firstVal) / firstVal) * 1000) / 10 : 0;
  const diffSign = diffVal > 0 ? '+' : '';

  html += `
    <div class="chart-svg-container">
      ${generateProgressionSvg(historyData, metric, unit)}
    </div>

    <div class="chart-stats-grid">
      <div class="chart-stat-card">
        <span class="chart-stat-label">Initial Load</span>
        <span class="chart-stat-value">${firstVal} ${unit}</span>
      </div>
      <div class="chart-stat-card">
        <span class="chart-stat-label">Peak Value</span>
        <span class="chart-stat-value accent">${maxVal} ${unit}</span>
      </div>
      <div class="chart-stat-card">
        <span class="chart-stat-label">Net Gain</span>
        <span class="chart-stat-value ${diffVal >= 0 ? 'positive' : ''}">${diffSign}${diffVal} ${unit} (${diffSign}${pctDiff}%)</span>
      </div>
    </div>
  `;

  const selectedIndex = (state.progression.selectedPointIndex !== null && state.progression.selectedPointIndex < historyData.length)
    ? state.progression.selectedPointIndex
    : historyData.length - 1;
  const selPoint = historyData[selectedIndex];

  if (selPoint) {
    html += `
      <div class="chart-tooltip-card" id="chartPointDetail">
        <div class="chart-tooltip-header">
          <span>${selPoint.date}</span>
          ${selPoint.isDeload ? '<span class="history-badge deload">Deload</span>' : ''}
        </div>
        <div>
          <strong>Top Set (Set 1):</strong> ${selPoint.set1_weight} ${selPoint.unit} × ${selPoint.set1_reps} reps
          ${selPoint.set1_rir !== null ? `(${selPoint.set1_rir} RIR)` : ''}
        </div>
        <div>
          <strong>Est. 1RM:</strong> ${selPoint.e1rm} ${selPoint.unit} | <strong>Total Volume:</strong> ${selPoint.total_volume} ${selPoint.unit}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  bindProgressionEvents(container);
}

function bindProgressionEvents(container) {
  const select = container.querySelector('#historyExerciseSelect');
  if (select) {
    select.onchange = (e) => {
      state.progression.exerciseId = e.target.value;
      state.progression.selectedPointIndex = null;
      renderProgressionView();
    };
  }

  container.querySelectorAll('.metric-pill-btn').forEach(btn => {
    btn.onclick = () => {
      const metric = btn.getAttribute('data-metric');
      if (metric) {
        state.progression.metric = metric;
        renderProgressionView();
      }
    };
  });

  container.querySelectorAll('.chart-hit-circle').forEach(circle => {
    circle.onclick = () => {
      const idx = parseInt(circle.getAttribute('data-chart-index'), 10);
      if (!isNaN(idx)) {
        state.progression.selectedPointIndex = idx;
        renderProgressionView();
      }
    };
  });
}

function exportSingleHistoryMarkdown(id) {
  const item = state.history.find(h => h.id === id);
  if (!item) return;

  const session = ROUTINE_DATA[item.sessionId];
  let md = `### Workout: ${item.sessionTitle || session?.title || item.sessionId}\n`;
  md += `**Date:** ${item.displayDate || item.dateString} | **Unit:** ${item.weightUnit || 'kg'}${item.isDeloadMode ? ' | **Deload Mode**' : ''}\n\n`;
  md += `| Exercise | Set | Load (${item.weightUnit || 'kg'}) | Reps | RIR |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: |\n`;

  if (session) {
    session.exercises.forEach(ex => {
      const sets = item.exercises?.[ex.id] || [];
      const recordedName = item.exerciseLogs?.[ex.id]?.exerciseName || ex.name;
      sets.forEach((s, idx) => {
        md += `| ${recordedName} | ${idx + 1} | ${s.weight || '—'} | ${s.reps || '—'} | ${s.rir !== undefined ? s.rir : '—'} |\n`;
      });
    });
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(md).then(() => {
      alert('Workout summary copied to clipboard.');
    }).catch(() => {
      prompt('Copy Markdown summary:', md);
    });
  } else {
    prompt('Copy Markdown summary:', md);
  }
}

function deleteHistoryEntry(id) {
  if (confirm('Are you sure you want to delete this workout from your history?')) {
    state.history = state.history.filter(h => h.id !== id);
    saveHistory();
    renderHistoryModal();
  }
}

function exportWorkoutMarkdown() {
  const session = ROUTINE_DATA[state.currentSessionId];
  let md = `### Workout: ${session.title}\n`;
  md += `**Date:** ${new Date().toLocaleDateString('en-US')} | **Unit:** ${state.weightUnit}\n\n`;
  md += `| Exercise | Set | Load (${state.weightUnit}) | Reps | RIR | Note |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: | :--- |\n`;

  const loggedSession = state.logs[session.id];

  session.exercises.forEach(ex => {
    const plannedSets = state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;
    const sub = state.substitutions && state.substitutions[ex.id];
    const exDisplayName = (sub && sub.name) ? sub.name : ex.name;
    for (let i = 0; i < plannedSets; i++) {
      const draftKey = `${session.id}_${ex.id}_${i}`;
      const draftData = state.draft[draftKey] || {};
      const loggedData = loggedSession?.exercises?.[ex.id]?.[i];

      const w = (draftData.weight !== undefined && draftData.weight !== '') 
        ? draftData.weight 
        : (loggedData?.weight !== undefined ? loggedData.weight : '—');
      const r = (draftData.reps !== undefined && draftData.reps !== '') 
        ? draftData.reps 
        : (loggedData?.reps !== undefined ? loggedData.reps : '—');
      const rir = (draftData.rir !== undefined && draftData.rir !== '') 
        ? draftData.rir 
        : (loggedData?.rir !== undefined ? loggedData.rir : '—');

      const note = i === 0 ? 'Top Set DDP' : (ex.technique ? ex.technique.badge : '');
      md += `| ${exDisplayName} | ${i + 1} | ${w} | ${r} | ${rir} | ${note} |\n`;
    }
  });

  if (navigator.clipboard) {
    navigator.clipboard.writeText(md).then(() => {
      alert('Session summary copied to clipboard in Markdown format.');
    }).catch(() => {
      prompt('Copy Markdown summary:', md);
    });
  } else {
    prompt('Copy Markdown summary:', md);
  }
}

function exportJsonBackup() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
    version: 3,
    timestamp: Date.now(),
    history: state.history,
    logs: state.logs,
    settings: {
      weightUnit: state.weightUnit,
      isDeloadMode: state.isDeloadMode,
      audioVibrate: state.audioVibrate,
      theme: state.theme
    }
  }, null, 2));

  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `hypertrophy_ddp_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importJsonBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.history && Array.isArray(imported.history)) {
        state.history = imported.history;
        saveHistory();
      }
      if (imported.logs) {
        state.logs = imported.logs;
        saveLogs();
      }
      if (imported.settings) {
        state.weightUnit = imported.settings.weightUnit || 'kg';
        state.isDeloadMode = !!imported.settings.isDeloadMode;
        state.audioVibrate = imported.settings.audioVibrate !== false;
        state.theme = ['light', 'dark', 'system'].includes(imported.settings.theme)
          ? imported.settings.theme : state.theme;
        applyTheme();
        saveSettings();
      }
      renderSession();
      renderHistoryModal();
      alert('Backup restored successfully.');
    } catch (err) {
      alert('Error parsing JSON backup file.');
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// ============================================================================
// 8. SERVICE WORKER REGISTRATION (OFFLINE SUPPORT)
// ============================================================================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('Hypertrophy PWA Service Worker registered successfully:', reg.scope);
        })
        .catch((err) => {
          console.warn('Service Worker registration failed, running with standard network fallback:', err);
        });
    });
  }
}

// ============================================================================
// 9. INITIALIZATION
// ============================================================================

window.ROUTINE_DATA = ROUTINE_DATA;
window.state = state;

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme();
  setupGlobalListeners();
  renderSession();
  registerServiceWorker();
});

})();
