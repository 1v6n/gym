/**
 * HYPERTROPHY DDP COACH - PWA ENGINE
 * Evidence-based progressive overload, RIR guardrails, stretch mechanics, & timer.
 * Follows Hallmark UI rules: no slop, accessible controls, clean copy.
 */

// ============================================================================
// 1. ROUTINE BLUEPRINT & EXERCISE DATABASE
// ============================================================================

const ROUTINE_DATA = {
  upperA: {
    id: 'upperA',
    name: 'Upper A',
    dayName: 'Lunes',
    title: 'Upper A: Horizontal Push y Vertical Pull',
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
          desc: 'La Serie 1 dicta la progresion de la semana. Manten 2 RIR para gestionar la fatiga axial.'
        },
        cues: 'Escapulas retraidas y deprimidas contra la banca. Descenso profundo para maximo estiramiento pectoral; codos a 45 grados respecto al torso. Pausa de 1s en el fondo.',
        substitutions: [
          'Barbell Flat Bench Press (3 x 6 a 8 reps a 2 RIR)',
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
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: 'Pausa de 2s en estiramiento',
          badgeClass: 'badge-stretch',
          desc: 'Pausa de 2 segundos en el estiramiento maximo arriba en cada repeticion.'
        },
        cues: 'Agarre neutro (palmas enfrentadas) a anchura de hombros. Deja que la escapula suba libremente arriba (2s pausa), y tracciona guiando con los codos hacia los bolsillos.',
        substitutions: [
          'Neutral-Grip Pull-ups (con lastre si es necesario)',
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
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: 'Excentrica de 3s',
          badgeClass: 'badge-pause',
          desc: 'Fase excentrica controlada en 3 segundos estrictos.'
        },
        cues: 'Inclinacion de banca a 30 grados para enfatizar el haz clavicular. Toca la barra suavemente en la parte alta del pecho y empuja sin bloquear codos agresivamente.',
        substitutions: [
          'Incline Dumbbell Press 30 grados',
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
          badge: 'Enfoque en espalda alta',
          badgeClass: 'badge-pause',
          desc: 'Sin balanceo lumbar; tension mecanica pura en romboides y trapecio medio.'
        },
        cues: 'Banca a 30 o 45 grados. Apoya el pecho firme. Abre los codos a 45 grados y aprieta escapulas en la cima durante 1 segundo antes de bajar con control.',
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
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 60,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause en serie 3',
          badgeClass: 'badge-rest-pause',
          desc: 'En la Serie 3: llega al fallo (0 RIR), descansa 15s, saca 4 reps, descansa 15s, saca 3 reps.'
        },
        cues: 'Polea a la altura de la muneca. Eleva en el plano escapular (30 grados por delante del cuerpo). Perfil de resistencia constante a lo largo de todo el recorrido.',
        substitutions: [
          'Dumbbell Lateral Raise con pausa',
          'Machine Lateral Raise'
        ]
      },
      {
        id: 'cable_katana_ext',
        name: 'Overhead Cable Katana Extension',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Parciales en elongacion (serie 2)',
          badgeClass: 'badge-partials',
          desc: 'En la Serie 2: al fallar el rango completo, realiza 4 a 6 pulsos en la mitad estirada detras de la cabeza.'
        },
        cues: 'Cables cruzados detras de la cabeza. Codos flexionados profundamente para estirar la cabeza larga del triceps al maximo. Extiende sin descolocar los codos.',
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
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Parciales en elongacion (serie 2)',
          badgeClass: 'badge-partials',
          desc: 'En la Serie 2: al fallar, saca 4 a 5 repeticiones parciales en el fondo estirado.'
        },
        cues: 'Banca a 45 grados. Deja que los brazos cuelguen perpendiculares al suelo. Manten hombros pegados a la banca para pre-estirar la cabeza larga del biceps.',
        substitutions: [
          'Behind-the-Back Cable Curl (Bayesian Curl)',
          'Preacher Curl en banco Scott',
          'Seated Dumbbell Curl'
        ]
      }
    ]
  },

  lowerA: {
    id: 'lowerA',
    name: 'Lower A',
    dayName: 'Martes',
    title: 'Lower A: Quad Bias y Knee Flexion',
    focus: 'Hack Squat, Seated Leg Curl, Bulgarian Split Squats, Calves',
    exercises: [
      {
        id: 'hack_squat',
        name: 'Hack Squat or Leg Press',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 1.5,
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 180,
        isAxialCompound: true,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Profundidad maxima sin redondear pelvis. Serie 1 dicta la progresion semanal.'
        },
        cues: 'Pies en la parte baja o media de la plataforma para favorecer la flexion de rodilla sobre la punta del pie. Descenso en 3s controlados.',
        substitutions: [
          '45° Leg Press (pies bajos)',
          'Smith Machine Squat (pies adelantados o talones elevados)',
          'Barbell High Bar Squat'
        ]
      },
      {
        id: 'seated_leg_curl',
        name: 'Seated Leg Curl',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: 'Parciales en elongacion (serie 3)',
          badgeClass: 'badge-partials',
          desc: 'En Serie 3: al fallar, realiza 4 a 5 pulsos en el estiramiento con rodillas casi extendidas.'
        },
        cues: 'Torso erguido o ligeramente inclinado hacia adelante para pre-estirar los isquiosurales en la cadera. Aprieta el soporte firmemente contra los muslos.',
        substitutions: [
          'Lying Leg Curl con almohadilla bajo caderas',
          'Nordic Hamstring Curl'
        ]
      },
      {
        id: 'bulgarian_split_squat',
        name: 'Bulgarian Split Squat',
        sets: 2,
        targetReps: [8, 10],
        targetRir: 2,
        targetRirLabel: '2 RIR por pierna',
        restSeconds: 90,
        isAxialCompound: true,
        technique: {
          badge: 'Estabilidad unilateral',
          badgeClass: 'badge-pause',
          desc: '90s de descanso entre cada pierna para evitar deficit cardiovascular.'
        },
        cues: 'Inclinacion de torso de 15 a 20 grados hacia adelante para equilibrar tension en gluteo y cuadriceps. Apoya el pie trasero en banco o rodillo.',
        substitutions: [
          'Walking Dumbbell Lunges',
          'Reverse Lunges con barra o mancuernas',
          'Single-Leg Press'
        ]
      },
      {
        id: 'leg_extension',
        name: 'Leg Extension Machine',
        sets: 2,
        targetReps: [12, 15],
        targetRir: 0,
        targetRirLabel: '0 RIR (Fallo)',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause en serie 2',
          badgeClass: 'badge-rest-pause',
          desc: 'En Serie 2: llega a 0 RIR, suelta 15s, saca 4 reps, suelta 15s, saca 3 reps.'
        },
        cues: 'Alinea el eje de giro de la maquina con la articulacion de la rodilla. Pausa de 1s en la contraccion pico sin hiperextender bruscamente.',
        substitutions: [
          'Sissy Squat asistida',
          'Reverse Nordic Curl'
        ]
      },
      {
        id: 'standing_calf_raise',
        name: 'Standing Calf Raise',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Pausa de 2s en estiramiento',
          badgeClass: 'badge-stretch',
          desc: 'Pausa obligatoria de 2 segundos en el fondo del estiramiento para eliminar el rebote del tendon de Aquiles.'
        },
        cues: 'Rodillas bloqueadas (gastrocnemio estirado). Baja profundo, congela 2s abajo, y sube con propulsion controlada sobre el metatarso.',
        substitutions: [
          'Leg Press Calf Press con 2s pausa',
          'Smith Machine Calf Raise'
        ]
      }
    ]
  },

  upperB: {
    id: 'upperB',
    name: 'Upper B',
    dayName: 'Jueves',
    title: 'Upper B: Vertical Push y Horizontal Pull',
    focus: 'T-Bar Row, Seated DB Shoulder Press, Incline Cable Flyes, Arms',
    exercises: [
      {
        id: 'tbar_cable_row',
        name: 'Chest-Supported T-Bar or Cable Row',
        sets: 3,
        targetReps: [6, 8],
        targetRir: 1.5,
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 150,
        isAxialCompound: false,
        technique: {
          badge: 'Top set driver',
          badgeClass: 'badge-pause',
          desc: 'Top Set Progression Driver para densidad de espalda alta.'
        },
        cues: 'Agarre semi-ancho. Deja que los hombros se protraigan completamente al frente en el estiramiento, y retrae escapulas al maximo en el tiron.',
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
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 120,
        isAxialCompound: false,
        technique: {
          badge: 'Banca a 75 grados',
          badgeClass: 'badge-pause',
          desc: 'La inclinacion a 75 grados protege el hombro y reduce el arco lumbar compensatorio.'
        },
        cues: 'Baja las mancuernas hasta la altura de las orejas o menton para estirar el deltoides anterior. Codos ligeramente en plano escapular (30 grados hacia adelante).',
        substitutions: [
          'Overhead Smith Machine Press',
          'Seated Machine Shoulder Press',
          'Standing Overhead Barbell Press (1 a 2 RIR)'
        ]
      },
      {
        id: 'incline_cable_flyes',
        name: 'Incline Cable Flyes',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Loaded stretch de 10s (serie 3)',
          badgeClass: 'badge-stretch',
          desc: 'Al terminar la ultima repeticion de la Serie 3, sosten la apertura estirada bajo carga durante 10 segundos continuos.'
        },
        cues: 'Poleas a media altura. Codos ligeramente flexionados de manera fija. Concentrate en sentir el estiramiento de las fibras pectorales superiores.',
        substitutions: [
          'Pec Deck Machine con 10s loaded stretch al final',
          'Flat Cable Crossover',
          'Dumbbell Incline Flyes'
        ]
      },
      {
        id: 'single_arm_lat_pulldown',
        name: 'Single-Arm Lat Pulldown',
        sets: 3,
        targetReps: [10, 12],
        targetRir: 1,
        targetRirLabel: '1 RIR por lado',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Alineacion de fibras lumbares',
          badgeClass: 'badge-pause',
          desc: 'Alinea la linea de fuerza directamente con las fibras lumbares e iliacas del dorsal.'
        },
        cues: 'Ligera inclinacion lateral hacia el lado activo. Tira conduciendo el codo pegado al costado hacia la cresta iliaca sin rotar el torso.',
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
        targetRirLabel: '0 RIR (Fallo)',
        restSeconds: 60,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause en serie 3',
          badgeClass: 'badge-rest-pause',
          desc: 'En Serie 3: falla en 0 RIR, descansa 15s, saca 4 reps, descansa 15s, saca 3 reps.'
        },
        cues: 'Brazos a 30 o 45 grados por debajo de la altura del hombro para aislar el deltoides posterior y evitar trapecio superior. No retraigas escapulas bruscamente.',
        substitutions: [
          'Incline DB Rear Delt Fly',
          'Face Pulls con cuerda a 0 RIR'
        ]
      },
      {
        id: 'cable_triceps_pushdown',
        name: 'Cable Triceps Pushdown (Straight / V-Bar)',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Cabezas lateral y medial',
          badgeClass: 'badge-pause',
          desc: 'Sobrecarga las cabezas lateral y medial del triceps en la posicion acortada.'
        },
        cues: 'Codos pegados firmes a los costados. Bloquea la articulacion del codo en la parte baja con control.',
        substitutions: [
          'Rope Triceps Pushdown',
          'Dips en paralelas asistidas o peso corporal'
        ]
      },
      {
        id: 'standing_db_hammer_curl',
        name: 'Standing DB Hammer Curl',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Braquial y antebrazo',
          badgeClass: 'badge-pause',
          desc: 'Desarrolla el braquial y braquiorradial para engrosar el brazo.'
        },
        cues: 'Agarre neutro estricto (pulgares hacia arriba). Sin balanceo de cadera ni impulso del torso.',
        substitutions: [
          'Rope Cable Hammer Curl',
          'Cross-Body DB Hammer Curl',
          'Reverse Grip EZ-Bar Curl'
        ]
      }
    ]
  },

  lowerB: {
    id: 'lowerB',
    name: 'Lower B',
    dayName: 'Viernes',
    title: 'Lower B: Posterior Chain y Adductor Focus',
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
          desc: 'Bisagra de cadera pura. Respeta los 2 RIR para proteger erectores espinales y SNC.'
        },
        cues: 'Empuja la cadera horizontalmente hacia la pared trasera. Rodillas con flexion minima y fija. Desciende la carga pegada a las tibias hasta el limite del estiramiento.',
        substitutions: [
          'Dumbbell RDL',
          '45° Hyperextension con espalda neutra',
          'Trap Bar RDL'
        ]
      },
      {
        id: 'leg_press_wide',
        name: 'Leg Press (High & Wide Stance)',
        sets: 3,
        targetReps: [8, 10],
        targetRir: 1.5,
        targetRirLabel: '1 a 2 RIR',
        restSeconds: 150,
        isAxialCompound: false,
        technique: {
          badge: 'Enfoque en aductores y gluteos',
          badgeClass: 'badge-pause',
          desc: 'Posicion de pies alta y abierta para maximizar brazo de momento de aductores y gluteos.'
        },
        cues: 'Pies en la parte superior de la plataforma, separados mas que la anchura de hombros y puntas hacia afuera (30 grados). Baja profundo sin despegar el coxis.',
        substitutions: [
          'Barbell Sumo Squat',
          'Smith Machine Wide Stance Squat'
        ]
      },
      {
        id: 'lying_leg_curl',
        name: 'Lying Leg Curl',
        sets: 2,
        targetReps: [10, 12],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Rest-pause en serie 2',
          badgeClass: 'badge-rest-pause',
          desc: 'En Serie 2: falla en 0 RIR, descansa 15s, saca 3 reps, descansa 15s, saca 2 reps.'
        },
        cues: 'Caderas pegadas a la almohadilla (aprieta gluteos para evitar arquear la zona lumbar). Flexiona y desciende en 2s controlados.',
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
        targetRirLabel: '0 RIR (Fallo)',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Parciales en elongacion (serie 2)',
          badgeClass: 'badge-partials',
          desc: 'En Serie 2: al fallar el rango completo, realiza 5 a 6 pulsos en la apertura maxima estirada.'
        },
        cues: 'Abre la maquina a la maxima amplitud que permita tu movilidad. Cierra con fuerza controlada y aguanta el estiramiento 1s abajo.',
        substitutions: [
          'Cable Hip Adduction con tobillera',
          'Copenhagen Plank'
        ]
      },
      {
        id: 'seated_calf_raise',
        name: 'Seated Calf Raise',
        sets: 3,
        targetReps: [12, 15],
        targetRir: 0.5,
        targetRirLabel: '0 a 1 RIR',
        restSeconds: 90,
        isAxialCompound: false,
        technique: {
          badge: 'Pausa de 2s en estiramiento del soleo',
          badgeClass: 'badge-stretch',
          desc: 'Con rodillas flexionadas a 90 grados, el soleo asume casi todo el trabajo hipertrofico.'
        },
        cues: 'Descenso profundo en dorsiflexion. Pausa de 2 segundos completos en el fondo del estiramiento. Contraccion controlada arriba.',
        substitutions: [
          'Standing Calf Raise con rodillas ligeramente flexionadas'
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
  logs: {},
  history: [],
  draft: {},
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
    console.warn('Audio play failed', e);
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
      console.debug('Haptics vibrate unavailable:', err);
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
    }
  } catch (err) {
    console.warn('Corrupted settings in storage, using defaults:', err);
  }

  try {
    const savedDraft = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
    if (savedDraft) {
      state.draft = JSON.parse(savedDraft);
      if (state.draft.isWorkoutActive) {
        state.isWorkoutActive = true;
        state.activeWorkoutSessionId = state.draft.activeWorkoutSessionId || state.draft.currentSessionId || 'upperA';
        state.workoutStartTime = state.draft.workoutStartTime || Date.now();
        state.currentSessionId = state.draft.currentSessionId || 'upperA';
      }
    }
  } catch (err) {
    console.warn('Corrupted active draft in storage, resetting draft:', err);
    state.draft = {};
  }
}

function saveLogs() {
  saveStorageItem(STORAGE_KEYS.LOGS, state.logs);
}

function saveHistory() {
  saveStorageItem(STORAGE_KEYS.HISTORY, state.history);
}

function saveSettings() {
  saveStorageItem(STORAGE_KEYS.SETTINGS, {
    weightUnit: state.weightUnit,
    isDeloadMode: state.isDeloadMode,
    audioVibrate: state.audioVibrate
  });
}

function saveDraft() {
  state.draft.isWorkoutActive = state.isWorkoutActive;
  state.draft.activeWorkoutSessionId = state.activeWorkoutSessionId;
  state.draft.workoutStartTime = state.workoutStartTime;
  state.draft.currentSessionId = state.currentSessionId;
  saveStorageItem(STORAGE_KEYS.ACTIVE_DRAFT, state.draft);
}

// ============================================================================
// 3. REST TIMER IMPLEMENTATION
// ============================================================================

function startRestTimer(seconds, exerciseName = 'Descanso') {
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
        message: `<strong>Techo alcanzado en Serie 1:</strong> completaste ${reps} reps (objetivo: ${maxReps}). Motor DDP: la proxima semana sube la carga entre 2.5% y 5% (+${minInc} a +${maxInc} ${unit}).`
      };
    } else if (reps < minReps) {
      return {
        type: 'floor',
        message: `Serie 1 por debajo del piso (${reps} de ${minReps} reps). Manten el peso la proxima semana hasta consolidar el rango.`
      };
    }
    return null;
  } else {
    if (reps < minReps) {
      const dropAmount = (weight * 0.075).toFixed(1);
      return {
        type: 'floor',
        message: `<strong>Caida por fatiga:</strong> hiciste ${reps} reps (menor a ${minReps}). DDP recomienda reducir la carga entre 5% y 10% (-${dropAmount} ${unit}) en la siguiente serie.`
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
      ? 'Modo deload activo (50% volumen, 3 a 4 RIR)' 
      : '4-day upper and lower split';
    deloadStatus.style.color = state.isDeloadMode ? 'var(--color-accent-2)' : 'var(--color-muted)';
  }

  const btnToggle = document.getElementById('btnToggleWorkout');
  const lblAction = document.getElementById('lblWorkoutAction');
  if (btnToggle && lblAction) {
    if (state.isWorkoutActive) {
      if (!state.activeWorkoutSessionId || state.activeWorkoutSessionId === state.currentSessionId) {
        btnToggle.classList.add('active-workout');
        lblAction.textContent = 'Finalizar sesion';
      } else {
        btnToggle.classList.remove('active-workout');
        const activeName = ROUTINE_DATA[state.activeWorkoutSessionId]?.name || 'otra sesion';
        lblAction.textContent = `Sesion activa en ${activeName}`;
      }
    } else {
      btnToggle.classList.remove('active-workout');
      lblAction.textContent = 'Iniciar entrenamiento';
    }
  }

  let totalSets = 0;
  session.exercises.forEach(ex => {
    totalSets += state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;
  });
  if (totalSetsEl) totalSetsEl.textContent = `${totalSets} series`;

  const container = document.getElementById('exercisesList');
  if (!container) return;
  container.innerHTML = '';

  const prevSessionData = state.logs[session.id] || null;

  session.exercises.forEach((exercise) => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.id = `card_${exercise.id}`;

    const plannedSets = state.isDeloadMode 
      ? Math.max(1, Math.round(exercise.sets * 0.5)) 
      : exercise.sets;

    const rirLabel = state.isDeloadMode ? '3 a 4 RIR' : exercise.targetRirLabel;

    let rowsHtml = '';
    for (let i = 0; i < plannedSets; i++) {
      const setNum = i + 1;
      
      let prevText = '—';
      if (prevSessionData && prevSessionData.exercises && prevSessionData.exercises[exercise.id]) {
        const prevSet = prevSessionData.exercises[exercise.id][i];
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
          <div class="set-col-prev" title="Anterior">${prevText}</div>
          <div>
            <input type="number" step="0.5" inputmode="decimal" class="set-input set-input-weight" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="${state.weightUnit}" 
                   value="${valWeight}" aria-label="Peso para serie ${setNum}">
          </div>
          <div>
            <input type="number" inputmode="numeric" class="set-input set-input-reps" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="reps" 
                   value="${valReps}" aria-label="Repeticiones para serie ${setNum}">
          </div>
          <div>
            <input type="number" step="0.5" inputmode="decimal" class="set-input set-input-rir" 
                   data-ex="${exercise.id}" data-set="${i}" placeholder="RIR" 
                   value="${valRir}" aria-label="RIR para serie ${setNum}">
          </div>
          <div>
            <button class="set-check-btn" data-ex="${exercise.id}" data-set="${i}" aria-label="Marcar serie ${setNum} como completada">
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
          <div class="exercise-title">${exercise.name}</div>
        </div>
        <div class="exercise-target-line">
          <span class="target-bracket">${plannedSets} series x ${exercise.targetReps[0]} a ${exercise.targetReps[1]} reps</span>
          <span class="target-rir">${rirLabel}</span>
          <span class="target-rest">Descanso: ${Math.round(exercise.restSeconds / 60 * 10) / 10} min</span>
        </div>
        ${exercise.technique ? `
          <div class="technique-badge ${exercise.technique.badgeClass}">
            ${exercise.technique.badge}
          </div>
        ` : ''}
        <button class="btn-accordion" data-accordion="${exercise.id}">
          <span>Tecnica y sustituciones</span>
        </button>
      </div>

      <div class="accordion-drawer hidden" id="drawer_${exercise.id}">
        <p><strong>Cues de ejecucion:</strong> ${exercise.cues}</p>
        ${exercise.technique ? `<p style="margin-top:var(--space-2xs);"><strong>Detalle tecnico:</strong> ${exercise.technique.desc}</p>` : ''}
        <button type="button" class="drawer-sub-btn" data-show-subs="${exercise.id}">Ver sustituciones de maquinas y pesas</button>
      </div>

      <div class="sets-table">
        <div class="table-header">
          <div>Serie</div>
          <div>Previa</div>
          <div>${state.weightUnit}</div>
          <div>Reps</div>
          <div>RIR</div>
          <div>Fin</div>
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
      if (drawer) drawer.classList.toggle('hidden');
    };
  });

  document.querySelectorAll('[data-show-subs]').forEach(btn => {
    btn.onclick = () => {
      const exId = btn.getAttribute('data-show-subs');
      openSubstitutionsModal(exId);
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
          startRestTimer(exercise.restSeconds, `${exercise.name} (Serie ${setIdx + 1})`);
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

function openSubstitutionsModal(exerciseId) {
  const session = ROUTINE_DATA[state.currentSessionId];
  const ex = session.exercises.find(e => e.id === exerciseId);
  if (!ex) return;

  const modal = document.getElementById('modalSubstitutions');
  const title = document.getElementById('subModalTitle');
  const body = document.getElementById('subModalBody');

  if (title) title.textContent = `Sustitutos: ${ex.name}`;
  if (body) {
    let listHtml = `<p style="font-size:var(--text-xs); color:var(--color-muted); margin-bottom:var(--space-sm);">
      Alternativas con identico perfil de resistencia y estiramiento:
    </p><ul style="padding-left:var(--space-md); line-height:1.6; font-size:var(--text-xs);">`;

    ex.substitutions.forEach(sub => {
      listHtml += `<li><strong>${sub}</strong></li>`;
    });
    listHtml += `</ul>`;
    body.innerHTML = listHtml;
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
        const confirmed = confirm('Deseas finalizar y guardar esta sesion en tu historial?');
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

  const btnUnitKg = document.getElementById('btnUnitKg');
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
      if (confirm('Estas seguro de que deseas borrar el historial de entrenamientos guardados?')) {
        state.logs = {};
        state.history = [];
        state.draft = {};
        saveLogs();
        saveHistory();
        saveDraft();
        renderSession();
        renderHistoryModal();
        alert('Historial borrado.');
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
    dateString: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
    displayDate: new Date().toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    weightUnit: state.weightUnit,
    isDeloadMode: state.isDeloadMode,
    durationMinutes: state.workoutStartTime ? Math.max(1, Math.round((now - state.workoutStartTime) / 60000)) : 0,
    exercises: {}
  };

  session.exercises.forEach(ex => {
    completedSession.exercises[ex.id] = [];
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
  saveDraft();

  const globalBanner = document.getElementById('ddpBanner');
  if (globalBanner) globalBanner.classList.add('hidden');

  stopRestTimer();
  renderSession();
  renderHistoryModal();
  playCompletionChime();

  alert(`Entrenamiento ${session.name} finalizado y registrado.`);
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
        <p class="history-empty-title">Sin entrenamientos registrados</p>
        <p class="history-empty-desc">Completa una sesion para guardarla en tu historial y ver tu progreso.</p>
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
        topSetSummary = `${firstEx.name}: ${topSet.weight}${h.weightUnit || 'kg'} × ${topSet.reps} reps`;
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
            <span class="history-meta-pill">${h.durationMinutes ? `${h.durationMinutes} min` : `${totalCompletedSets} series`}</span>
          </div>
        </div>
        ${topSetSummary ? `<div class="history-card-date"><strong>Top set:</strong> ${topSetSummary}</div>` : ''}

        <div class="history-card-details hidden" id="historyDetails_${h.id}">
          <table class="history-table">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Serie</th>
                <th>Carga (${h.weightUnit || 'kg'})</th>
                <th>Reps</th>
                <th>RIR</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (sessionObj) {
      sessionObj.exercises.forEach(ex => {
        const loggedSets = h.exercises?.[ex.id] || [];
        loggedSets.forEach((s, idx) => {
          html += `
            <tr>
              <td>${idx === 0 ? ex.name : ''}</td>
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
            Ver detalle
          </button>
          <button class="btn-history-action btn-copy-md" data-copy-history="${h.id}" title="Copiar resumen en Markdown">
            Copiar Markdown
          </button>
          <button class="btn-history-action btn-history-delete" data-delete-history="${h.id}" title="Eliminar este entrenamiento">
            Eliminar
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
        btn.textContent = isHidden ? 'Ver detalle' : 'Ocultar detalle';
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
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Grafico de progresion">
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
      <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="24" fill="transparent" class="chart-hit-circle" data-chart-index="${c.index}" aria-label="Punto ${c.point.date}: ${c.point[metricKey]} ${unit}" />
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
        <label for="historyExerciseSelect" class="chart-label">Ejercicio a analizar</label>
        <select id="historyExerciseSelect" class="chart-select">
  `;

  exercises.forEach(ex => {
    const pointsCount = getExerciseHistoryData(ex.id).length;
    const badge = pointsCount > 0 ? ` (${pointsCount} sesiones)` : '';
    const selected = ex.id === state.progression.exerciseId ? 'selected' : '';
    html += `<option value="${ex.id}" ${selected}>${ex.name}${badge}</option>`;
  });

  html += `
        </select>
      </div>

      <div class="chart-select-group">
        <span class="chart-label">Métrica de progresión</span>
        <div class="chart-metric-pills" role="group" aria-label="Métrica de progresión">
          <button class="metric-pill-btn ${state.progression.metric === 'set1_weight' ? 'active' : ''}" data-metric="set1_weight">
            Peso Top Set
          </button>
          <button class="metric-pill-btn ${state.progression.metric === 'e1rm' ? 'active' : ''}" data-metric="e1rm">
            1RM Estimado
          </button>
          <button class="metric-pill-btn ${state.progression.metric === 'total_volume' ? 'active' : ''}" data-metric="total_volume">
            Volumen Total
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
        <p class="history-empty-title">Sin datos para este ejercicio</p>
        <p class="history-empty-desc">Completa un entrenamiento que incluya <strong>${selectedEx ? selectedEx.name : 'este ejercicio'}</strong> para visualizar su curva de progresión.</p>
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
        <span class="chart-stat-label">Carga Inicial</span>
        <span class="chart-stat-value">${firstVal} ${unit}</span>
      </div>
      <div class="chart-stat-card">
        <span class="chart-stat-label">Máximo Logrado</span>
        <span class="chart-stat-value accent">${maxVal} ${unit}</span>
      </div>
      <div class="chart-stat-card">
        <span class="chart-stat-label">Progreso Neto</span>
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
          <strong>Top Set (Serie 1):</strong> ${selPoint.set1_weight} ${selPoint.unit} × ${selPoint.set1_reps} reps
          ${selPoint.set1_rir !== null ? `(${selPoint.set1_rir} RIR)` : ''}
        </div>
        <div>
          <strong>1RM Estimado:</strong> ${selPoint.e1rm} ${selPoint.unit} | <strong>Volumen Total:</strong> ${selPoint.total_volume} ${selPoint.unit}
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
  let md = `### Sesion: ${item.sessionTitle || session?.title || item.sessionId}\n`;
  md += `**Fecha:** ${item.displayDate || item.dateString} | **Unidad:** ${item.weightUnit || 'kg'}${item.isDeloadMode ? ' | **Modo Deload**' : ''}\n\n`;
  md += `| Ejercicio | Serie | Carga (${item.weightUnit || 'kg'}) | Reps | RIR |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: |\n`;

  if (session) {
    session.exercises.forEach(ex => {
      const sets = item.exercises?.[ex.id] || [];
      sets.forEach((s, idx) => {
        md += `| ${ex.name} | ${idx + 1} | ${s.weight || '—'} | ${s.reps || '—'} | ${s.rir !== undefined ? s.rir : '—'} |\n`;
      });
    });
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(md).then(() => {
      alert('Resumen del entrenamiento copiado al portapapeles.');
    }).catch(() => {
      prompt('Copia tu resumen markdown:', md);
    });
  } else {
    prompt('Copia tu resumen markdown:', md);
  }
}

function deleteHistoryEntry(id) {
  if (confirm('Estas seguro de eliminar este entrenamiento del historial?')) {
    state.history = state.history.filter(h => h.id !== id);
    saveHistory();
    renderHistoryModal();
  }
}

function exportWorkoutMarkdown() {
  const session = ROUTINE_DATA[state.currentSessionId];
  let md = `### Sesion: ${session.title}\n`;
  md += `**Fecha:** ${new Date().toLocaleDateString()} | **Unidad:** ${state.weightUnit}\n\n`;
  md += `| Ejercicio | Serie | Carga (${state.weightUnit}) | Reps | RIR | Nota |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: | :--- |\n`;

  const loggedSession = state.logs[session.id];

  session.exercises.forEach(ex => {
    const plannedSets = state.isDeloadMode ? Math.max(1, Math.round(ex.sets * 0.5)) : ex.sets;
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
      md += `| ${ex.name} | ${i + 1} | ${w} | ${r} | ${rir} | ${note} |\n`;
    }
  });

  if (navigator.clipboard) {
    navigator.clipboard.writeText(md).then(() => {
      alert('Resumen de la sesion copiado al portapapeles en formato Markdown.');
    }).catch(() => {
      prompt('Copia tu resumen markdown:', md);
    });
  } else {
    prompt('Copia tu resumen markdown:', md);
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
      audioVibrate: state.audioVibrate
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
        saveSettings();
      }
      renderSession();
      renderHistoryModal();
      alert('Respaldo restaurado correctamente.');
    } catch (err) {
      alert('Error al procesar el archivo JSON de respaldo.');
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
          console.log('Hypertrophy PWA Service Worker registrado con exito:', reg.scope);
        })
        .catch((err) => {
          console.warn('Error al registrar Service Worker:', err);
        });
    });
  }
}

// ============================================================================
// 9. INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  setupGlobalListeners();
  renderSession();
  registerServiceWorker();
});
