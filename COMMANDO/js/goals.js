(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#goals-content");
    if (!root) return;
    const sections = [
      {
        id: "fat-loss",
        number: "01",
        title: "Fat loss",
        intro: "Aim for a gradual, maintainable change in body fat while keeping strength, energy and everyday wellbeing in view. Consistent habits matter more than crash diets.",
        focus: [
          ["Build balanced meals", "Include a protein food, vegetables or fruit, and a satisfying portion of staple carbohydrates. Adjust portions gradually rather than cutting out whole food groups."],
          ["Keep strength training", "Train the major movement patterns regularly and focus on good technique. Strength work can help you maintain muscle while body weight changes."],
          ["Add movement you enjoy", "Walking, cycling or another activity you like can help increase weekly movement. Start at a level you can recover from and build steadily."],
          ["Track useful habits", "Notice workout consistency, sleep, energy and how clothes fit—not just day-to-day scale changes. Weight naturally fluctuates."],
          ["Make recovery part of the plan", "Prioritize regular sleep, water according to thirst and rest when you need it. Avoid extreme restrictions or dehydration tactics."]
        ],
        coachCue: "Choose two or three repeatable habits for the next few weeks. Review how you feel and adjust gradually."
      },
      {
        id: "muscle-gain",
        number: "02",
        title: "Muscle gain",
        intro: "Muscle-building is a long-term process: train consistently, gradually challenge your muscles, eat enough nourishing food and allow time to recover.",
        focus: [
          ["Follow a repeatable strength plan", "Train each major muscle group regularly with movements you can perform safely. A coach can help choose exercises that fit your experience and equipment."],
          ["Progress one step at a time", "When your form is steady, progress by adding a repetition, a small amount of load, or better control. You do not need to max out every session."],
          ["Eat enough across the day", "Use regular meals and snacks that include protein, carbohydrates and energy-dense whole foods as needed. Supplements are not a substitute for a consistent routine."],
          ["Include protein foods", "Dairy, pulses, beans, soy, eggs, fish, meat, nuts and seeds can all contribute. Choose options that fit your preferences and dietary needs."],
          ["Respect recovery", "Sleep consistently, leave time between hard sessions for the same muscles and take an easier day when fatigue is building."]
        ],
        coachCue: "Keep a simple training log. Small, repeatable progress with sound technique beats chasing heavy lifts before you're ready."
      },
      {
        id: "be-healthy",
        number: "03",
        title: "Be healthy",
        intro: "A healthy routine is more than a workout. Build a balanced week of strength, movement, recovery and everyday habits that feel sustainable.",
        focus: [
          ["Move regularly", "Break up long periods of sitting and choose active travel, walking or recreation where it works for you."],
          ["Mix strength and cardio", "Include strength work and aerobic activity across the week. If you are new to exercise, begin with manageable sessions and gradually build duration."],
          ["Practice the basics", "Eat a variety of foods, drink regularly, and keep a steady sleep routine where possible. Consistency is more useful than perfection."],
          ["Warm up and learn technique", "Start with a few easy minutes of movement, then practice lighter versions of the exercises planned for the session."],
          ["Listen to your body", "Muscle effort can be expected; sharp, worsening or unusual pain is a reason to stop and get appropriate guidance."]
        ],
        coachCue: "Set a small weekly target you can keep—even on a busy week—then add more only when that feels comfortable."
      }
    ];
    const weekPlan = [
      ["Monday", "Full-body strength", "Practice a squat or leg press, a push, a pull and a simple core exercise."],
      ["Tuesday", "Easy movement", "Choose a comfortable walk or activity you enjoy."],
      ["Wednesday", "Rest or mobility", "Take a rest day or do gentle, comfortable mobility."],
      ["Thursday", "Full-body strength", "Repeat familiar movements; use manageable resistance and controlled reps."],
      ["Friday", "Easy movement", "Walk, cycle or take an active recovery day."],
      ["Saturday", "Optional activity", "Enjoy a sport, longer walk or coached session if you feel recovered."],
      ["Sunday", "Rest and reset", "Recover, plan sessions and get ready for the coming week."]
    ];
    root.innerHTML = `<section class="goal-coach-intro">
      <span class="eyebrow accent">Coach's guide</span>
      <h2>Simple principles. Progress you can sustain.</h2>
      <p>Use these general starting points to plan your training week. Your best routine depends on your experience, schedule, recovery and individual needs.</p>
      <a class="text-link" href="#starter-week">See a sample training week ↓</a>
    </section>
    <div class="goal-sections">${sections.map((section) => `<section class="goal-section" id="${section.id}">
      <div class="goal-section-heading"><span class="goal-number">${section.number}</span><div><span class="eyebrow accent">Goal guide</span><h2>${section.title}</h2></div></div>
      <p class="goal-intro">${section.intro}</p>
      <div class="goal-advice-grid">${section.focus.map(([title, description], index) => `<article class="goal-advice"><span class="goal-advice-index">${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${description}</p></article>`).join("")}</div>
      <p class="coach-cue"><strong>Coach's cue</strong>${section.coachCue}</p>
    </section>`).join("")}</div>
    <section class="goal-section weekly-plan" id="starter-week">
      <span class="eyebrow accent">Example only · adjust to your level</span>
      <h2>A balanced starter week</h2>
      <p>This is a general illustration, not an individualized prescription. New lifters should ask a coach to demonstrate equipment and help adapt sessions.</p>
      <div class="week-plan-list">${weekPlan.map(([day, title, detail]) => `<article class="week-plan-item"><strong>${day}</strong><div><h3>${title}</h3><p>${detail}</p></div></article>`).join("")}</div>
    </section>
    <aside class="goal-personal-note">
      <span class="eyebrow accent">Want a plan made for you?</span>
      <h2>Ask our coaches for a personalized diet and workout plan.</h2>
      <p>Share your goal, training experience, schedule and food preferences with a coach so your starting plan fits your routine. If you have a medical condition, injury, pregnancy, or a clinical nutrition need, consult an appropriately qualified health professional.</p>
      <a class="btn btn-primary" href="contact.html">Talk to the gym</a>
    </aside>`;
  });
})();
