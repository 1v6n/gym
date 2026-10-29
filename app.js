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
  ACTIVE_DRAFT: 'hypertrophy_ddp_active_draft_v2'
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
  draft: {}
};

// Web Audio API Synth Sound
let audioCtx = null;
function playBeep(freq = 587.33, duration = 0.15, type = 'sine') {
  if (!state.audioVibrate) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
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
    } catch (_) {}
  }
}

function loadState() {
  try {
    const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (savedLogs) state.logs = JSON.parse(savedLogs);

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      state.weightUnit = parsed.weightUnit || 'kg';
      state.isDeloadMode = !!parsed.isDeloadMode;
      state.audioVibrate = parsed.audioVibrate !== false;
    }

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
    console.error('Error loading state from localStorage:', err);
  }
}

function saveLogs() {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(state.logs));
  } catch (e) {
    console.error('Save logs error', e);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      weightUnit: state.weightUnit,
      isDeloadMode: state.isDeloadMode,
      audioVibrate: state.audioVibrate
    }));
  } catch (e) {
    console.error('Save settings error', e);
  }
}

function saveDraft() {
  try {
    state.draft.isWorkoutActive = state.isWorkoutActive;
    state.draft.activeWorkoutSessionId = state.activeWorkoutSessionId;
    state.draft.workoutStartTime = state.workoutStartTime;
    state.draft.currentSessionId = state.currentSessionId;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DRAFT, JSON.stringify(state.draft));
  } catch (e) {
    console.error('Save draft error', e);
  }
}

// ============================================================================
// 3. REST TIMER IMPLEMENTATION
// ============================================================================

let timerInterval = null;
let timerHideTimeout = null;
let timerRemainingSeconds = 0;
let timerTotalSeconds = 0;
let timerIsPaused = false;
let timerExerciseTitle = '';

function startRestTimer(seconds, exerciseName = 'Descanso') {
  clearInterval(timerInterval);
  clearTimeout(timerHideTimeout);
  timerTotalSeconds = seconds;
  timerRemainingSeconds = seconds;
  timerIsPaused = false;
  timerExerciseTitle = exerciseName;

  const bar = document.getElementById('restTimerBar');
  const label = document.getElementById('timerExerciseLabel');
  const toggleIcon = document.getElementById('timerToggleIcon');

  if (bar) bar.classList.remove('hidden');
  if (label) label.textContent = exerciseName;
  if (toggleIcon) {
    toggleIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
  }

  updateTimerUI();

  timerInterval = setInterval(() => {
    if (!timerIsPaused) {
      timerRemainingSeconds--;
      updateTimerUI();

      if (timerRemainingSeconds <= 0) {
        clearInterval(timerInterval);
        playCompletionChime();
        if (bar) {
          timerHideTimeout = setTimeout(() => {
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

  const mins = Math.floor(Math.max(0, timerRemainingSeconds) / 60);
  const secs = Math.max(0, timerRemainingSeconds) % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (clock) clock.textContent = formatted;
  if (progress && timerTotalSeconds > 0) {
    const pct = Math.max(0, Math.min(100, (timerRemainingSeconds / timerTotalSeconds) * 100));
    progress.style.transform = `scaleX(${pct / 100})`;
  }
}

function stopRestTimer() {
  clearInterval(timerInterval);
  clearTimeout(timerHideTimeout);
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
      timerRemainingSeconds = Math.max(5, timerRemainingSeconds - 30);
      updateTimerUI();
    };
  }

  if (btnTimerPlus) {
    btnTimerPlus.onclick = () => {
      timerRemainingSeconds += 30;
      timerTotalSeconds += 30;
      updateTimerUI();
    };
  }

  if (btnTimerToggle) {
    btnTimerToggle.onclick = () => {
      timerIsPaused = !timerIsPaused;
      if (timerToggleIcon) {
        timerToggleIcon.innerHTML = timerIsPaused 
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
        state.draft = {};
        saveLogs();
        saveDraft();
        renderSession();
        alert('Historial borrado.');
      }
    };
  }
}

function finishWorkoutSession() {
  const sessionIdToFinish = state.activeWorkoutSessionId || state.currentSessionId;
  const session = ROUTINE_DATA[sessionIdToFinish];
  if (!session) return;

  const completedSession = {
    timestamp: Date.now(),
    dateString: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
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

  state.isWorkoutActive = false;
  state.activeWorkoutSessionId = null;
  state.workoutStartTime = null;
  state.draft = {};
  saveDraft();

  const globalBanner = document.getElementById('ddpBanner');
  if (globalBanner) globalBanner.classList.add('hidden');

  stopRestTimer();
  renderSession();
  playCompletionChime();

  alert(`Entrenamiento ${session.name} finalizado y registrado.`);
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
    version: 2,
    timestamp: Date.now(),
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
