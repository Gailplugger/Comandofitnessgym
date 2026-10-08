import { ADMIN_EMAIL, auth, db, firestore } from "./firebase.js";

(function () {
  "use strict";
  const KEYS = {
    machines: "commando_machines",
    fees: "commando_fees",
    notifications: "commando_notifications",
    surveys: "commando_surveys",
    responses: "commando_responses",
    enquiries: "commando_enquiries",
    reads: "commando_notification_reads"
  };
  const MACHINE_CATALOG_VERSION = "commando_machines_catalog_version";
  const FEE_CATALOG_VERSION = "commando_fee_catalog_version";
  const cloudCollections = ["machines", "fees", "notifications", "surveys"];
  const cloudCache = Object.create(null);
  let cloudContentLoaded = false;
  let cloudContentPromise = null;
  const businessInfo = {
    name: "COMMando Fitness Gym",
    area: "Rajgarh, Rajasthan",
    address: "J9PQ+9PP, near Court–Railway Station Road, Taranagar, Sadulpur, Rajasthan 331023 (Rajgarh)",
    addressSource: "Google Maps business listing",
    phone: "",
    phoneNote: "A phone number is not currently listed on the Google Maps business profile.",
    email: "",
    hours: "Check current hours on Google Maps or Instagram before visiting.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=COMMando+Fitness+Gym%2C+J9PQ%2B9PP%2C+Taranagar%2C+Sadulpur%2C+Rajasthan+331023",
    mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=28.6359431%2C75.3890328",
    instagramHandle: "commandofittness_rj10",
    instagramUrl: "https://www.instagram.com/commandofittness_rj10/"
  };

  const seed = {
    machines: [
      { id: "chest-back-combo", name: "Chest & Back Combo", category: "Chest", muscles: "Chest, shoulders, upper back", description: "A plate-loaded multi-exercise station pictured with supported pressing arms. Confirm the machine's setup label before using any alternate back movement.", instructions: "Check the setup label; load both sides evenly; set the seat and back pad; press handles smoothly; return under control.", sets: "3", reps: "8-12", commonMistakes: "Loading one side more than the other or letting the shoulders roll forward.", safetyTips: "Check plate collars and the machine's range before starting; ask a coach if the setup is unfamiliar.", coachTip: "Begin with a light load and keep the movement smooth.", tutorialUrl: "", image: "assets/images/chest-back-combo.jpg", status: "Published" },
      { id: "preacher-bicep-curl", name: "Preacher Bicep Curl", category: "Arms", muscles: "Biceps", description: "A selectorized preacher-curl station with an angled arm pad to support controlled elbow flexion.", instructions: "Adjust the seat so your upper arms rest comfortably on the pad; grip the handles; curl without lifting your elbows; lower slowly.", sets: "2-3", reps: "10-15", commonMistakes: "Using momentum or letting the elbows leave the pad.", safetyTips: "Do not forcefully lock the elbows at the bottom; use a comfortable range.", coachTip: "Keep your upper arms supported and lower the weight with control.", tutorialUrl: "", image: "assets/images/preacher-bicep-curl.jpg", status: "Published" },
      { id: "flat-bench-press", name: "Flat Bench Press", category: "Chest", muscles: "Chest, shoulders, triceps", description: "A flat barbell bench and rack setup for horizontal pressing.", instructions: "Set the bench centrally under the rack; lie with eyes below the bar; take a balanced grip; unrack with a spotter; lower to a comfortable chest position and press back up.", sets: "3", reps: "6-10", commonMistakes: "Unracking without a stable setup or bouncing the bar off the chest.", safetyTips: "Use a spotter or correctly set safeties; never bench alone without a safe re-rack plan.", coachTip: "Plant your feet and keep your upper back supported on the bench.", tutorialUrl: "", image: "assets/images/flat-bench-press.jpg", status: "Published" },
      { id: "incline-bench-press", name: "Incline Bench Press", category: "Chest", muscles: "Upper chest, shoulders, triceps", description: "An inclined barbell bench with a rack for an angled pressing variation.", instructions: "Set the bench angle and rack height; lie with feet planted; grip evenly; unrack with a spotter; lower with control and press smoothly.", sets: "3", reps: "6-10", commonMistakes: "Setting the bench too steep or flaring elbows excessively.", safetyTips: "Use a spotter or set safeties before lifting; keep a load you can control.", coachTip: "Keep wrists stacked over elbows as you press.", tutorialUrl: "", image: "assets/images/incline-bench-press.jpg", status: "Published" },
      { id: "decline-bench-press", name: "Decline Bench Press", category: "Chest", muscles: "Chest, triceps", description: "A decline bench and rack setup for a downward-angled barbell press.", instructions: "Secure yourself on the decline bench; set the rack and safeties; grip evenly; unrack with assistance; lower to a comfortable position and press.", sets: "3", reps: "6-10", commonMistakes: "Using an unsecured bench or starting without a spotter.", safetyTips: "Check leg restraints, rack hooks, and safeties before loading the bar.", coachTip: "Use a steady tempo and avoid bouncing the bar.", tutorialUrl: "", image: "assets/images/decline-bench-press.jpg", status: "Published" },
      { id: "functional-trainer", name: "Functional Trainer", category: "Other", muscles: "Varies by cable exercise", description: "A dual adjustable pulley station with independent cable positions for a variety of resistance exercises.", instructions: "Set both pulley heights and attachments; select a manageable resistance; stand securely; perform the selected movement with control.", sets: "2-3", reps: "10-15", commonMistakes: "Using mismatched pulley heights or allowing the cable to pull you off balance.", safetyTips: "Check attachments and pin positions before use; keep clear of moving cables.", coachTip: "Start light while learning the cable path and stance.", tutorialUrl: "", image: "assets/images/functional-trainer.jpg", status: "Published" },
      { id: "lat-pulldown-cable-row", name: "Lat Pulldown & Cable Row", category: "Back", muscles: "Lats, mid-back, biceps", description: "A cable station pictured with an overhead pulldown bar and seated thigh support; use the low pulley only if the station is configured for rows.", instructions: "Set the thigh pad; attach the correct handle; grip the bar; pull toward the upper chest without swinging; return slowly. For low rows, use the low pulley and a suitable handle.", sets: "3", reps: "8-12", commonMistakes: "Pulling behind the neck or leaning back to move the load.", safetyTips: "Check the pin and cable attachment; do not use a frayed cable or damaged handle.", coachTip: "Keep your torso steady and guide the pull with your elbows.", tutorialUrl: "", image: "assets/images/lat-pulldown-cable-row.jpg", status: "Published" },
      { id: "leg-extension-curl", name: "Leg Extension & Leg Curl", category: "Legs", muscles: "Quadriceps, hamstrings", description: "A seated selectorized leg station pictured with padded rollers for knee-extension and knee-flexion variations.", instructions: "Set the seat and roller position for the movement; align the machine pivot near your knee; extend or curl smoothly; return without dropping the stack.", sets: "2-3", reps: "10-15", commonMistakes: "Using a roller position that does not fit or swinging the weight.", safetyTips: "Use a comfortable range and stop if you feel sharp knee pain; ask for help adjusting the station.", coachTip: "Keep the movement slow, especially on the return.", tutorialUrl: "", image: "assets/images/leg-extension-curl.jpg", status: "Published" },
      { id: "shoulder-press", name: "Selectorized Shoulder Press", category: "Shoulders", muscles: "Deltoids, triceps", description: "The machine placard identifies this as a shoulder press station.", instructions: "Adjust the seat so the handles start near shoulder level; keep your back supported; press up without locking hard; lower slowly to a comfortable starting point.", sets: "2-3", reps: "8-12", commonMistakes: "Arching the lower back or lowering the handles too far.", safetyTips: "Set a light starting weight and stop if shoulder movement is painful; ask a coach to confirm the handles and settings.", coachTip: "Keep your ribs down and press in a comfortable range.", tutorialUrl: "", image: "assets/images/selectorized-shoulder-press.jpg", status: "Published" },
      { id: "smith-rack-station", name: "Squat / Press Rack Station", category: "Other", muscles: "Varies by barbell exercise", description: "An adjustable barbell rack station. The image does not clearly establish whether the bar is fixed/guided or moves freely, so check the equipment label before use.", instructions: "Identify the bar path; set hooks and safeties for the planned movement; check the rack is stable; load both sides evenly; use a spotter for barbell presses.", sets: "3", reps: "6-12", commonMistakes: "Assuming the rack style or safety positions without checking how it operates.", safetyTips: "Do not lift until a coach has confirmed the bar path, hooks, and safety setup.", coachTip: "Start with an unloaded bar while learning the rack.", tutorialUrl: "", image: "assets/images/smith-rack-station.jpg", status: "Published" },
      { id: "standing-calf-raise", name: "Standing Calf Raise", category: "Legs", muscles: "Calves", description: "The pictured setup resembles a standing calf-raise station with shoulder pads and a raised foot platform; confirm the frame label before use.", instructions: "Confirm the machine label and safety lock; place the balls of your feet securely on the platform; position under the pads; raise and lower your heels slowly through a comfortable range.", sets: "2-4", reps: "10-15", commonMistakes: "Bouncing at the bottom or using a range that causes discomfort.", safetyTips: "Ask a coach to confirm the machine's setup before loading; keep your feet secure and check the lock mechanism.", coachTip: "Pause briefly at the top and lower under control.", tutorialUrl: "", image: "assets/images/standing-calf-raise.jpg", status: "Published" },
      { id: "lever-press-combo", name: "Plate-Loaded Lever Press", category: "Chest", muscles: "Chest, shoulders, triceps (confirm station label)", description: "A seated plate-loaded lever machine with supported pressing arms. Confirm the intended exercise from the station label before use.", instructions: "Check the frame label; set the seat and start position; load both arms evenly; press smoothly through a comfortable range; return under control.", sets: "3", reps: "8-12", commonMistakes: "Loading sides unevenly or forcing a range beyond the shoulder's comfort.", safetyTips: "Confirm the movement and start/stop mechanism with a coach before using this unfamiliar station.", coachTip: "Begin with no plates until you understand the lever path.", tutorialUrl: "", image: "assets/images/lever-press-combo.jpg", status: "Published" }
    ],
    fees: [
      { id: "monthly", plan: "Monthly", duration: "1 month", price: "₹1,000", features: ["Gym access for one month", "Ask the coach about getting started"], status: "Published" },
      { id: "quarterly", plan: "Quarterly", duration: "3 months", price: "₹2,800", features: ["Gym access for three months", "₹200 less than three monthly renewals"], status: "Published" },
      { id: "half-yearly", plan: "Half-yearly", duration: "6 months", price: "₹4,800", features: ["Gym access for six months", "₹1,200 less than six monthly renewals"], status: "Published" },
      { id: "yearly", plan: "Yearly", duration: "12 months", price: "₹8,000", features: ["Gym access for twelve months", "Best value: ₹4,000 less than twelve monthly renewals"], status: "Published" }
    ],
    notifications: [
      { id: "timing-update", title: "Gym timing update available", message: "Please contact the gym for the current schedule. This is sample notification content.", type: "Gym Update", priority: "Important", date: "2026-10-01", status: "Published", banner: true },
      { id: "training-note", title: "Build a steady training routine", message: "A consistent routine can help make movement a sustainable part of your week.", type: "Announcement", priority: "Normal", date: "2026-09-25", status: "Published", banner: false },
      { id: "feedback-survey", title: "Member feedback survey", message: "Share your thoughts in our sample feedback survey.", type: "Survey", priority: "Normal", date: "2026-09-20", status: "Published", banner: false }
    ],
    surveys: [
      { id: "member-feedback", title: "Member Feedback", description: "Tell us about your experience and what would make your visits better.", status: "Published", minutes: 3, questions: [{ id: "visit-frequency", text: "How often do you visit the gym?", type: "multiple", required: true, options: ["Daily", "A few times a week", "Weekly", "Occasionally"] }, { id: "experience", text: "How would you rate your overall experience?", type: "rating", required: true }, { id: "suggestion", text: "What would you like us to improve?", type: "long", required: false }] },
      { id: "fitness-goals", title: "Fitness Goals Survey", description: "Help us understand the fitness goals you are working toward.", status: "Published", minutes: 2, questions: [{ id: "goal", text: "What is your main fitness goal?", type: "dropdown", required: true, options: ["Build strength", "Improve fitness", "Fat loss", "Muscle gain", "General health"] }, { id: "start-date", text: "When would you like to start?", type: "date", required: false }] },
      { id: "gym-experience", title: "Gym Experience Survey", description: "A short check-in about your training environment and experience.", status: "Published", minutes: 4, questions: [{ id: "recommend", text: "Would you recommend the gym to a friend?", type: "yesno", required: true }, { id: "notes", text: "Anything else you would like to share?", type: "short", required: false }] }
    ],
    responses: [],
    enquiries: []
  };

  function migrateMachineCatalog() {
    try {
      if (localStorage.getItem(MACHINE_CATALOG_VERSION) === "2") return;
      const raw = localStorage.getItem(KEYS.machines);
      if (!raw) {
        localStorage.setItem(MACHINE_CATALOG_VERSION, "2");
        return;
      }
      const previous = JSON.parse(raw);
      if (!Array.isArray(previous)) {
        console.warn("Previous local machine data was malformed; retaining the current fallback catalogue.");
        localStorage.setItem(MACHINE_CATALOG_VERSION, "2");
        return;
      }
      const retiredIds = new Set(["chest-press", "lat-pulldown", "leg-press", "cable-row", "treadmill"]);
      const newIds = new Set(seed.machines.map((machine) => machine.id));
      const priorStatus = new Map(previous.filter((machine) => machine && machine.id).map((machine) => [machine.id, machine.status]));
      const customMachines = previous.filter((machine) => machine && machine.id && !retiredIds.has(machine.id) && !newIds.has(machine.id));
      const refreshedCatalog = seed.machines.map((machine) => ({
        ...machine,
        status: priorStatus.get(machine.id) || machine.status
      }));
      const migrated = [...refreshedCatalog, ...customMachines];
      localStorage.setItem(KEYS.machines, JSON.stringify(migrated));
      localStorage.setItem(MACHINE_CATALOG_VERSION, "2");
    } catch (error) {
      console.error("Local machine catalog could not be upgraded:", error);
    }
  }

  function migrateFeeCatalog() {
    try {
      if (localStorage.getItem(FEE_CATALOG_VERSION) === "2") return;
      const raw = localStorage.getItem(KEYS.fees);
      if (!raw) {
        localStorage.setItem(FEE_CATALOG_VERSION, "2");
        return;
      }
      const previous = JSON.parse(raw);
      if (!Array.isArray(previous)) {
        console.warn("Previous local fee data was malformed; retaining the current fee fallback.");
        localStorage.setItem(FEE_CATALOG_VERSION, "2");
        return;
      }
      const updatedPlans = seed.fees.map((plan) => {
        const prior = previous.find((item) => item && item.id === plan.id);
        return { ...plan, status: prior?.status || plan.status };
      });
      const standardIds = new Set(seed.fees.map((plan) => plan.id));
      const customPlans = previous.filter((plan) => plan && plan.id && !standardIds.has(plan.id));
      localStorage.setItem(KEYS.fees, JSON.stringify([...updatedPlans, ...customPlans]));
      localStorage.setItem(FEE_CATALOG_VERSION, "2");
    } catch (error) {
      console.error("Local fee catalogue could not be upgraded:", error);
    }
  }

  function read(key) {
    try {
      if (key === "machines") migrateMachineCatalog();
      if (key === "fees") migrateFeeCatalog();
      const raw = localStorage.getItem(KEYS[key]);
      if (!raw) return structuredClone(seed[key]);
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : structuredClone(seed[key]);
    } catch (error) {
      console.warn("Local demo data could not be read:", error);
      return structuredClone(seed[key]);
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(KEYS[key], JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Local demo data could not be saved:", error);
      return false;
    }
  }
  function get(key) {
    return cloudCollections.includes(key) && cloudCache[key]
      ? structuredClone(cloudCache[key])
      : read(key);
  }
  function save(key, item) {
    const list = read(key);
    const value = { ...item, id: item.id || `${key}-${Date.now()}` };
    const index = list.findIndex((entry) => entry.id === value.id);
    if (index >= 0) list[index] = value;
    else list.unshift(value);
    return write(key, list) ? value : null;
  }
  function remove(key, id) { return write(key, read(key).filter((item) => item.id !== id)); }

  function cacheCloudItems(key, items) {
    if (!Array.isArray(items)) throw new TypeError(`Invalid cloud data for ${key}.`);
    cloudCache[key] = structuredClone(items);
  }

  async function fetchCollection(key, isAdmin) {
    const source = firestore.collection(db, key);
    const result = await firestore.getDocs(isAdmin
      ? source
      : firestore.query(source, firestore.where("status", "==", "Published")));
    return result.docs.map((entry) => ({ ...entry.data(), id: entry.id }))
      .sort((left, right) => Number(left.sortOrder ?? Number.MAX_SAFE_INTEGER) - Number(right.sortOrder ?? Number.MAX_SAFE_INTEGER));
  }

  async function seedCloudCollections() {
    const batch = firestore.writeBatch(db);
    for (const key of cloudCollections) {
      const existing = await firestore.getDocs(firestore.collection(db, key));
      if (!existing.empty) continue;
      for (const [index, item] of read(key).entries()) {
        const { id, ...fields } = item;
        batch.set(firestore.doc(db, key, id), { ...fields, sortOrder: index });
      }
    }
    await batch.commit();
  }

  function loadCloudContent() {
    if (!cloudContentPromise) {
      cloudContentPromise = (async () => {
        const user = auth.currentUser;
        const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
        if (isAdmin) {
          const allEmpty = await Promise.all(cloudCollections.map(async (key) =>
            (await firestore.getDocs(firestore.collection(db, key))).empty
          ));
          if (allEmpty.every(Boolean)) await seedCloudCollections();
        }
        for (const key of cloudCollections) {
          cacheCloudItems(key, await fetchCollection(key, isAdmin));
        }
        cloudContentLoaded = true;
        return true;
      })();
    }
    return cloudContentPromise;
  }

  function requireAdmin() {
    if (auth.currentUser?.email?.toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Sign in with the authorized gym admin account before making changes.");
    }
  }

  async function saveCloud(key, item) {
    requireAdmin();
    const documentId = item.id || `${key}-${crypto.randomUUID()}`;
    const currentItems = get(key);
    const existing = currentItems.find((entry) => entry.id === documentId);
    const sortOrder = existing?.sortOrder ?? Math.min(-1, ...currentItems.map((entry) => Number(entry.sortOrder)).filter(Number.isFinite)) - 1;
    const value = { ...item, id: documentId, sortOrder };
    const { id, ...fields } = value;
    await firestore.setDoc(firestore.doc(db, key, documentId), fields);
    const items = get(key).filter((entry) => entry.id !== documentId);
    items.unshift(value);
    cacheCloudItems(key, items);
    return value;
  }

  async function removeCloud(key, id) {
    requireAdmin();
    await firestore.deleteDoc(firestore.doc(db, key, id));
    cacheCloudItems(key, get(key).filter((item) => item.id !== id));
    return true;
  }

  window.CommandoData = {
    config: businessInfo,
    loadCloudContent,
    get cloudContentLoaded() { return cloudContentLoaded; },
    getMachines: () => get("machines"),
    saveMachine: (item) => saveCloud("machines", item),
    deleteMachine: (id) => removeCloud("machines", id),
    getFees: () => get("fees"),
    saveFee: (item) => saveCloud("fees", item),
    deleteFee: (id) => removeCloud("fees", id),
    getNotifications: () => get("notifications"),
    saveNotification: (item) => saveCloud("notifications", item),
    deleteNotification: (id) => removeCloud("notifications", id),
    getSurveys: () => get("surveys"),
    saveSurvey: (item) => saveCloud("surveys", item),
    deleteSurvey: (id) => removeCloud("surveys", id),
    getSurveyResponses: () => get("responses"),
    saveSurveyResponse: (item) => save("responses", item),
    getEnquiries: () => get("enquiries"),
    saveEnquiry: (item) => save("enquiries", item),
    updateEnquiry: (item) => save("enquiries", item),
    getReadNotifications: () => {
      try {
        const parsed = JSON.parse(localStorage.getItem(KEYS.reads) || "[]");
        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
      }
      catch (error) { console.warn("Notification read state could not be read:", error); return []; }
    },
    setReadNotifications: (ids) => {
      try { localStorage.setItem(KEYS.reads, JSON.stringify(ids)); return true; }
      catch (error) { console.error("Notification read state could not be saved:", error); return false; }
    },
    keys: KEYS
  };
})();
