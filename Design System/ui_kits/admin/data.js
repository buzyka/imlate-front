window.IL_DATA = {
  visitors: [
    { id: 101, name: 'Ada', surname: 'Lovelace', is_student: true, grade: 9, keys: ['A3F91B02','7C21D4E8'], image: '', updated_at: '2026-09-02T08:41:00Z', sign_status: 'signed_in', imported_from_isams: false },
    { id: 102, name: 'Grace', surname: 'Hopper', is_student: false, grade: null, keys: ['91FE2C77'], image: '', updated_at: '2026-09-02T07:58:00Z', sign_status: 'signed_out', imported_from_isams: false },
    { id: 103, name: 'Alan', surname: 'Turing', is_student: true, grade: 11, keys: [], image: '', updated_at: '2026-09-01T16:02:00Z', sign_status: 'not_signed', imported_from_isams: true },
    { id: 104, name: 'Katherine', surname: 'Johnson', is_student: true, grade: 7, keys: ['B0D5A311'], image: '', updated_at: '2026-09-02T08:12:00Z', sign_status: 'signed_in', imported_from_isams: false },
    { id: 105, name: 'Tim', surname: 'Berners-Lee', is_student: false, grade: null, keys: ['44C8E90A','2B77F103'], image: '', updated_at: '2026-09-02T06:30:00Z', sign_status: 'signed_out', imported_from_isams: false },
    { id: 106, name: 'Radia', surname: 'Perlman', is_student: true, grade: 12, keys: ['D91C2E45'], image: '', updated_at: '2026-08-29T14:20:00Z', sign_status: 'not_signed', imported_from_isams: true }
  ],
  admins: [
    { id: 1, username: 'admin', name: 'Alex', surname: 'Morgan', role: 'admin', is_active: true, created_at: '2025-11-04T09:00:00Z', updated_at: '2026-08-30T11:24:00Z' },
    { id: 2, username: 'reception', name: 'Priya', surname: 'Nair', role: 'admin', is_active: true, created_at: '2026-01-15T10:30:00Z', updated_at: '2026-07-02T15:41:00Z' },
    { id: 3, username: 'gate-terminal', name: 'Main', surname: 'Entrance', role: 'terminal', is_active: true, created_at: '2026-02-02T08:00:00Z', updated_at: '2026-02-02T08:00:00Z' },
    { id: 4, username: 'j.doe', name: 'Jordan', surname: 'Doe', role: 'admin', is_active: false, created_at: '2026-03-19T13:10:00Z', updated_at: '2026-06-11T09:05:00Z' }
  ],
  attendance: [
    { id: 101, name: 'Ada', surname: 'Lovelace', is_student: true, grade: 9, check_in: '08:41', check_out: '15:32', hours: 6.85, entry_status: 'on_time', days_present: 19, days_total: 20 },
    { id: 104, name: 'Katherine', surname: 'Johnson', is_student: true, grade: 7, check_in: '08:12', check_out: '15:30', hours: 7.3, entry_status: 'on_time', days_present: 20, days_total: 20 },
    { id: 106, name: 'Radia', surname: 'Perlman', is_student: true, grade: 12, check_in: '09:14', check_out: '15:28', hours: 6.23, entry_status: 'late', days_present: 16, days_total: 20 },
    { id: 103, name: 'Alan', surname: 'Turing', is_student: true, grade: 11, check_in: '09:02', check_out: '12:40', hours: 3.63, entry_status: 'early_leave', days_present: 14, days_total: 20 },
    { id: 102, name: 'Grace', surname: 'Hopper', is_student: false, grade: null, check_in: '07:58', check_out: '16:44', hours: 8.77, entry_status: 'on_time', days_present: 20, days_total: 20 },
    { id: 105, name: 'Tim', surname: 'Berners-Lee', is_student: false, grade: null, check_in: '', check_out: '', hours: 0, entry_status: 'absent', days_present: 11, days_total: 20 },
    { id: 107, name: 'Barbara', surname: 'Liskov', is_student: false, grade: null, check_in: '08:26', check_out: '17:05', hours: 8.65, entry_status: 'on_time', days_present: 18, days_total: 20 },
    { id: 108, name: 'Margaret', surname: 'Hamilton', is_student: true, grade: 10, check_in: '09:31', check_out: '15:29', hours: 5.97, entry_status: 'late', days_present: 15, days_total: 20 }
  ],
  themeSlots: [
    { key: 'favicon', label: 'Favicon', help: 'Browser tab icon used on the tracking page.', accepted: 'PNG', preview: '../../assets/app-icon.png', is_custom: false, updated_at: '' },
    { key: 'logo_background', label: 'Logo background', help: 'Large background image shown on the welcome screen.', accepted: 'PNG, JPEG, WEBP', preview: '../../assets/logo.png', is_custom: true, updated_at: '30/08/2026, 11:24' },
    { key: 'welcome_animation', label: 'Welcome animation', help: 'Animation shown after a successful sign-in event.', accepted: 'GIF', preview: '../../assets/logo.png', is_custom: false, updated_at: '' },
    { key: 'goodbye_animation', label: 'Goodbye animation', help: 'Animation shown after a successful sign-out event.', accepted: 'GIF', preview: '../../assets/logo.png', is_custom: false, updated_at: '' }
  ]
};

/* Deterministic per-day attendance for the matrix view — same person + same date
   always yields the same record, so scrolling and refiltering stay stable. */
(() => {
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const seed = (id, key) => {
    let h = id * 7919 + 13;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 99991;
    return h / 99991;
  };
  const hm = (v) => String(Math.floor(v)).padStart(2, '0') + ':' + String(Math.round((v % 1) * 60)).padStart(2, '0');
  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  window.IL_DATA.iso = iso;
  window.IL_DATA.hm = hm;

  /* state: weekend | future | absent | active | late | complete */
  window.IL_DATA.attendanceDay = (person, date) => {
    const key = iso(date);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return { state: 'weekend', key };
    const day = new Date(date); day.setHours(0, 0, 0, 0);
    if (day > TODAY) return { state: 'future', key };

    const r = seed(person.id, key);
    const rate = person.days_present / person.days_total;
    if (r > rate) return { state: 'absent', key };

    const checkIn = 8.05 + r * 1.5;
    const late = checkIn >= 9;
    if (day.getTime() === TODAY.getTime() && r < 0.55) {
      return { state: 'active', key, checkIn, checkInLabel: hm(checkIn) };
    }
    const hours = 5.6 + r * 3.4;
    return { state: late ? 'late' : 'complete', key, checkIn, checkInLabel: hm(checkIn), checkOut: checkIn + hours, checkOutLabel: hm(checkIn + hours), hours };
  };

  window.IL_DATA.eachDay = (from, to, cap = 45) => {
    const out = [];
    if (!from || !to) return out;
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    while (d <= end && out.length < cap) { out.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return out;
  };
})();
