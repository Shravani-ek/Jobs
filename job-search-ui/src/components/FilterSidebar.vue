<script setup lang="ts">
import { ref, computed } from "vue";
import {
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  Search,
  Briefcase,
  GraduationCap,
  Award,
  Laptop,
  Globe,
  Landmark,
  Map,
  Building2,
  Navigation,
  IndianRupee,
  Factory,
  Clock,
  Zap,
} from "lucide-vue-next";

const emit = defineEmits<{
  (e: "apply", filters: any): void;
  (e: "clear"): void;
}>();

/* =========================
   DROPDOWN STATES
========================= */

const openSection = ref<string | null>(null);
const openLocationSub = ref<string | null>(null);

const openDropdown = (section: string) => {
  if (openSection.value === section) {
    openSection.value = null;
    openLocationSub.value = null;
  } else {
    openSection.value = section;
    openLocationSub.value = null;
  }
};

const toggleLocationSub = (sub: string) => {
  openLocationSub.value = openLocationSub.value === sub ? null : sub;
};

/* =========================
   FILTER VALUES
========================= */

const selectedJobType = ref("");
const selectedExperience = ref("");
const selectedWorkMode = ref("");

// Location
const selectedCountry = ref("");
const selectedState = ref("");
const selectedDistrict = ref("");
const selectedCity = ref("");
const locationSearch = ref("");

// Education
const selectedEducationLevel = ref("");
const selectedStream = ref("");
const selectedDiploma = ref("");
const selectedDegree = ref("");
const selectedSpecialization = ref("");
const selectedPhdField = ref("");

// Salary
const selectedMinSalary = ref("");
const selectedMaxSalary = ref("");

// Industry, Shift, Urgency
const selectedIndustry = ref("");
const selectedShift = ref("");
const selectedUrgency = ref("");

/* =========================
   OPTIONS
========================= */

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
];

const experienceLevels = [
  "Fresher",
  "Entry Level",
  "Intermediate",
  "Experienced",
];

const workModes = [
  "On-site",
  "Remote",
  "Hybrid",
];

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
];

const states = [
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
];

const districts = [
  "Pune",
  "Nagpur",
  "Mumbai",
  "Chandrapur",
  "Nashik",
];

const cities = [
  "Pune",
  "Nagpur",
  "Mumbai",
  "Bangalore",
  "Delhi",
];

const filteredCountries = computed(() => {
  if (!locationSearch.value.trim()) return countries;
  const q = locationSearch.value.toLowerCase().trim();
  return countries.filter((c) => c.toLowerCase().includes(q));
});

const filteredStates = computed(() => {
  if (!locationSearch.value.trim()) return states;
  const q = locationSearch.value.toLowerCase().trim();
  return states.filter((s) => s.toLowerCase().includes(q));
});

const filteredDistricts = computed(() => {
  if (!locationSearch.value.trim()) return districts;
  const q = locationSearch.value.toLowerCase().trim();
  return districts.filter((d) => d.toLowerCase().includes(q));
});

const filteredCities = computed(() => {
  if (!locationSearch.value.trim()) return cities;
  const q = locationSearch.value.toLowerCase().trim();
  return cities.filter((c) => c.toLowerCase().includes(q));
});

const locationDisplay = computed(() => {
  const parts = [selectedCity.value, selectedState.value, selectedCountry.value].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Select location";
});

// Education Levels
const educationLevels = [
  "Below 10th",
  "10th / SSC",
  "12th / HSC",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
];

// 12th Streams
const streams = [
  "Science",
  "Commerce",
  "Arts / Humanities",
  "Vocational",
  "Other",
];

// Diploma Options
const diplomaOptions = [
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical & Electronics",
  "Computer Engineering / IT",
  "Electronics & Communication",
  "Chemical Engineering",
  "Automobile Engineering",
  "Graphic Design & Animation",
  "Digital Marketing",
  "Hotel Management",
  "Pharmacy (D.Pharm)",
  "Other",
];

// Bachelor's Degrees
const bachelorDegrees = [
  "BCA",
  "B.Tech / BE",
  "B.Sc",
  "B.Com",
  "BBA",
  "BA",
  "B.Pharm",
  "LLB",
  "Other",
];

// Master's Degrees
const masterDegrees = [
  "MCA",
  "M.Tech",
  "M.Sc",
  "M.Com",
  "MBA",
  "MA",
  "M.Pharm",
  "LLM",
  "Other",
];

// Degree Specializations
const degreeSpecializations: Record<string, string[]> = {
  BCA: [
    "Computer Applications",
    "Cloud Computing & Security",
    "Data Science",
    "Web & Full Stack Development",
    "Software Engineering",
    "Other",
  ],
  "B.Tech / BE": [
    "Computer Science & Engineering (CSE)",
    "Information Technology (IT)",
    "Artificial Intelligence & ML",
    "Data Science",
    "Electronics & Communication (ECE)",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical & Electronics (EEE)",
    "Chemical Engineering",
    "Other",
  ],
  "B.Sc": [
    "Computer Science",
    "Information Technology",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biotechnology",
    "Statistics",
    "Electronics",
    "Other",
  ],
  "B.Com": [
    "Accounting & Finance",
    "Banking & Insurance",
    "Financial Markets",
    "Taxation",
    "Computer Applications",
    "General",
    "Other",
  ],
  BBA: [
    "Marketing",
    "Finance",
    "Human Resources (HR)",
    "Operations & Supply Chain",
    "Business Analytics",
    "International Business",
    "Other",
  ],
  BA: [
    "English Literature",
    "Economics",
    "Psychology",
    "Political Science",
    "Sociology",
    "Journalism & Mass Comm",
    "History",
    "Other",
  ],
  "B.Pharm": [
    "General Pharmacy",
    "Pharmaceutical Chemistry",
    "Pharmacology",
    "Pharmaceutics",
    "Other",
  ],
  LLB: [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Constitutional Law",
    "Intellectual Property Rights",
    "Cyber Law",
    "Other",
  ],
  MCA: [
    "Computer Applications",
    "Software Development",
    "Artificial Intelligence & Data Science",
    "Cloud & DevOps",
    "Cyber Security",
    "Other",
  ],
  "M.Tech": [
    "Computer Science & Engineering",
    "Software Engineering",
    "VLSI & Embedded Systems",
    "Data Science & AI",
    "Thermal & Mechanical Systems",
    "Structural Engineering",
    "Other",
  ],
  "M.Sc": [
    "Computer Science",
    "Data Science",
    "Information Technology",
    "Biotechnology",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Other",
  ],
  "M.Com": [
    "Advanced Accounting",
    "Banking & Financial Services",
    "Taxation & Auditing",
    "Business Management",
    "Other",
  ],
  MBA: [
    "Finance",
    "Marketing",
    "Human Resources (HR)",
    "Operations & Logistics",
    "Business Analytics",
    "Information Technology (IT)",
    "International Business",
    "Other",
  ],
  MA: [
    "English",
    "Economics",
    "Psychology",
    "Public Administration",
    "Sociology",
    "Journalism & Mass Comm",
    "Other",
  ],
  "M.Pharm": [
    "Pharmaceutics",
    "Pharmacology",
    "Pharmaceutical Analysis",
    "Pharmaceutical Chemistry",
    "Other",
  ],
  LLM: [
    "Corporate & Commercial Law",
    "Criminal Law",
    "Constitutional Law",
    "IPR & Technology Law",
    "International Trade Law",
    "Other",
  ],
};

const defaultSpecializations = [
  "Computer Science / IT",
  "Data Science & AI",
  "Finance & Accounting",
  "Marketing & Sales",
  "Human Resources",
  "Operations Management",
  "General / Other",
];

const currentDegreeOptions = computed(() => {
  if (selectedEducationLevel.value === "Bachelor's Degree") {
    return bachelorDegrees;
  }
  if (selectedEducationLevel.value === "Master's Degree") {
    return masterDegrees;
  }
  return [];
});

const currentSpecializationOptions = computed(() => {
  if (selectedDegree.value && degreeSpecializations[selectedDegree.value]) {
    return degreeSpecializations[selectedDegree.value];
  }
  return defaultSpecializations;
});

// PhD Fields
const phdFields = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Robotics",
  "Data Science & Analytics",
  "Electrical & Electronics",
  "Mechanical & Manufacturing",
  "Management & Business Studies",
  "Economics & Commerce",
  "Biological & Life Sciences",
  "Physical Sciences",
  "Humanities & Social Sciences",
  "Other",
];

// Salary Options (in LPA)
const minSalaryOptions = [
  "₹3 LPA",
  "₹6 LPA",
  "₹10 LPA",
  "₹15 LPA",
  "₹20 LPA",
  "₹25 LPA",
  "₹35 LPA",
  "₹50 LPA",
];

const maxSalaryOptions = [
  "₹6 LPA",
  "₹10 LPA",
  "₹15 LPA",
  "₹20 LPA",
  "₹25 LPA",
  "₹35 LPA",
  "₹50 LPA",
  "₹75+ LPA",
];

// Industry Options
const industryOptions = [
  "IT Services & Software",
  "Banking & Financial (BFSI)",
  "E-Commerce & Retail",
  "Healthcare & Life Sciences",
  "Manufacturing & Automotive",
  "Education & EdTech",
  "Media & Entertainment",
  "Consulting & Professional Services",
  "Telecommunications",
  "Hospitality & Travel",
  "Other",
];

// Shift Options
const shiftOptions = [
  "Day Shift",
  "Night Shift",
  "Rotational Shift",
  "Flexible Timing",
  "Morning Shift",
  "Evening Shift",
];

// Hiring Urgency Options
const urgencyOptions = [
  "Urgently Hiring (Immediate)",
  "Joining in 15 Days",
  "Joining in 30 Days",
  "Within 60 Days",
  "Flexible / Standard",
];

/* =========================
   SELECT HANDLERS
========================= */

const selectCountry = (c: string) => {
  selectedCountry.value = selectedCountry.value === c ? "" : c;
  openLocationSub.value = null;
};

const selectState = (s: string) => {
  selectedState.value = selectedState.value === s ? "" : s;
  openLocationSub.value = null;
};

const selectDistrict = (d: string) => {
  selectedDistrict.value = selectedDistrict.value === d ? "" : d;
  openLocationSub.value = null;
};

const selectCity = (c: string) => {
  selectedCity.value = selectedCity.value === c ? "" : c;
  openLocationSub.value = null;
};

const useCurrentLocation = () => {
  selectedCountry.value = "India";
  selectedState.value = "Maharashtra";
  selectedDistrict.value = "Pune";
  selectedCity.value = "Pune";
  openLocationSub.value = null;
};

const selectJobType = (value: string) => {
  selectedJobType.value = value;
  openSection.value = null;
};

const selectExperience = (value: string) => {
  selectedExperience.value = value;
  openSection.value = null;
};

const selectWorkMode = (value: string) => {
  selectedWorkMode.value = value;
  openSection.value = null;
};

const selectEducationLevel = (level: string) => {
  if (selectedEducationLevel.value !== level) {
    selectedStream.value = "";
    selectedDiploma.value = "";
    selectedDegree.value = "";
    selectedSpecialization.value = "";
    selectedPhdField.value = "";
  }
  selectedEducationLevel.value = level;
  openSection.value = null;
};

const selectStream = (stream: string) => {
  selectedStream.value = stream;
  openSection.value = null;
};

const selectDiploma = (diploma: string) => {
  selectedDiploma.value = diploma;
  openSection.value = null;
};

const selectDegree = (degree: string) => {
  if (selectedDegree.value !== degree) {
    selectedSpecialization.value = "";
  }
  selectedDegree.value = degree;
  openSection.value = null;
};

const selectSpecialization = (spec: string) => {
  selectedSpecialization.value = spec;
  openSection.value = null;
};

const selectPhdField = (field: string) => {
  selectedPhdField.value = field;
  openSection.value = null;
};

// Salary handlers
const selectMinSalary = (val: string) => {
  selectedMinSalary.value = selectedMinSalary.value === val ? "" : val;
  openSection.value = null;
};

const selectMaxSalary = (val: string) => {
  selectedMaxSalary.value = selectedMaxSalary.value === val ? "" : val;
  openSection.value = null;
};

// Industry, Shift, Urgency handlers
const selectIndustry = (val: string) => {
  selectedIndustry.value = val;
  openSection.value = null;
};

const selectShift = (val: string) => {
  selectedShift.value = val;
  openSection.value = null;
};

const selectUrgency = (val: string) => {
  selectedUrgency.value = val;
  openSection.value = null;
};

/* =========================
   APPLY
========================= */

const applyFilters = () => {
  emit("apply", {
    jobType: selectedJobType.value,
    experience: selectedExperience.value,
    workMode: selectedWorkMode.value,
    country: selectedCountry.value,
    state: selectedState.value,
    district: selectedDistrict.value,
    city: selectedCity.value,
    location: locationSearch.value,
    educationLevel: selectedEducationLevel.value,
    stream: selectedStream.value,
    diploma: selectedDiploma.value,
    degree: selectedDegree.value,
    specialization: selectedSpecialization.value,
    phdField: selectedPhdField.value,
    minSalary: selectedMinSalary.value,
    maxSalary: selectedMaxSalary.value,
    industry: selectedIndustry.value,
    shift: selectedShift.value,
    urgency: selectedUrgency.value,
  });
};

/* =========================
   CLEAR
========================= */

const clearFilters = () => {
  selectedJobType.value = "";
  selectedExperience.value = "";
  selectedWorkMode.value = "";

  selectedCountry.value = "";
  selectedState.value = "";
  selectedDistrict.value = "";
  selectedCity.value = "";

  selectedEducationLevel.value = "";
  selectedStream.value = "";
  selectedDiploma.value = "";
  selectedDegree.value = "";
  selectedSpecialization.value = "";
  selectedPhdField.value = "";

  selectedMinSalary.value = "";
  selectedMaxSalary.value = "";
  selectedIndustry.value = "";
  selectedShift.value = "";
  selectedUrgency.value = "";

  locationSearch.value = "";

  openSection.value = null;
  openLocationSub.value = null;

  emit("clear");
};
</script>

<template>
  <aside
    class="w-full h-full min-h-0 flex flex-col bg-white border border-slate-300 rounded-lg overflow-hidden"
  >

    <!-- ================= HEADER ================= -->

    <div
      class="shrink-0 flex items-center justify-between px-3 py-2 border-b border-slate-300 bg-white"
    >
      <div class="flex items-center gap-2">
        <SlidersHorizontal
          class="w-4 h-4 text-violet-600"
        />

        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            Filters
          </h2>

          <p class="text-[11px] text-slate-400">
            {{ 
              [
                selectedJobType,
                selectedExperience,
                selectedWorkMode,
                selectedCountry,
                selectedState,
                selectedDistrict,
                selectedCity,
                selectedEducationLevel,
                selectedStream,
                selectedDiploma,
                selectedDegree,
                selectedSpecialization,
                selectedPhdField,
                selectedMinSalary,
                selectedMaxSalary,
                selectedIndustry,
                selectedShift,
                selectedUrgency,
              ].filter(Boolean).length
            }}
            active
          </p>
        </div>
      </div>

      <button
        type="button"
        @click="clearFilters"
        class="text-xs font-medium text-violet-600 hover:text-violet-700"
      >
        Clear all
      </button>
    </div>


    <!-- ================= SCROLLABLE CONTENT ================= -->

    <div
      class="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-3"
    >

      <!-- ================= LOCATION ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <MapPin
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Location
          </h3>
        </div>

        <!-- Location Container -->

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <!-- Location holder -->

          <button
            type="button"
            @click="openDropdown('location')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm truncate"
              :class="
                selectedCity ||
                selectedState ||
                selectedCountry
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ locationDisplay }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'location'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>


          <!-- Location dropdown -->

          <div
            v-if="openSection === 'location'"
            class="border-t border-slate-200 p-2 space-y-2 bg-slate-50/50"
          >

            <!-- Search -->

            <div class="relative">
              <Search
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              />

              <input
                v-model="locationSearch"
                type="text"
                placeholder="Search location"
                class="w-full h-7 rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-200"
              />
            </div>


            <!-- Current Location -->

            <button
              type="button"
              @click="useCurrentLocation"
              class="w-full h-7 rounded-md bg-violet-50 text-violet-600 text-xs font-semibold hover:bg-violet-100 transition flex items-center justify-center gap-1.5"
            >
              <Navigation class="w-3.5 h-3.5" />
              <span>Use Current Location</span>
            </button>


            <!-- Country -->

            <div>
              <label
                class="flex items-center gap-1.5 mb-1 text-sm font-medium text-slate-700"
              >
                <Globe class="w-3.5 h-3.5 text-slate-400" />
                <span>Country</span>
              </label>

              <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  @click="toggleLocationSub('country')"
                  class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span
                    class="text-sm truncate"
                    :class="selectedCountry ? 'text-slate-900 font-medium' : 'text-slate-400'"
                  >
                    {{ selectedCountry || "Select country" }}
                  </span>

                  <ChevronDown
                    class="w-4 h-4 text-slate-400 transition"
                    :class="openLocationSub === 'country' ? 'rotate-180' : ''"
                  />
                </button>

                <div
                  v-if="openLocationSub === 'country'"
                  class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-40 overflow-y-auto"
                >
                  <button
                    v-for="country in filteredCountries"
                    :key="country"
                    type="button"
                    @click="selectCountry(country)"
                    class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition truncate"
                    :class="
                      selectedCountry === country
                        ? 'bg-violet-50 text-violet-600 font-medium'
                        : 'text-slate-700'
                    "
                  >
                    {{ country }}
                  </button>
                </div>
              </div>
            </div>


            <!-- State -->

            <div>
              <label
                class="flex items-center gap-1.5 mb-1 text-sm font-medium text-slate-700"
              >
                <Landmark class="w-3.5 h-3.5 text-slate-400" />
                <span>State</span>
              </label>

              <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  @click="toggleLocationSub('state')"
                  class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span
                    class="text-sm truncate"
                    :class="selectedState ? 'text-slate-900 font-medium' : 'text-slate-400'"
                  >
                    {{ selectedState || "Select state" }}
                  </span>

                  <ChevronDown
                    class="w-4 h-4 text-slate-400 transition"
                    :class="openLocationSub === 'state' ? 'rotate-180' : ''"
                  />
                </button>

                <div
                  v-if="openLocationSub === 'state'"
                  class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-40 overflow-y-auto"
                >
                  <button
                    v-for="state in filteredStates"
                    :key="state"
                    type="button"
                    @click="selectState(state)"
                    class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition truncate"
                    :class="
                      selectedState === state
                        ? 'bg-violet-50 text-violet-600 font-medium'
                        : 'text-slate-700'
                    "
                  >
                    {{ state }}
                  </button>
                </div>
              </div>
            </div>


            <!-- District -->

            <div>
              <label
                class="flex items-center gap-1.5 mb-1 text-sm font-medium text-slate-700"
              >
                <Map class="w-3.5 h-3.5 text-slate-400" />
                <span>District</span>
              </label>

              <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  @click="toggleLocationSub('district')"
                  class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span
                    class="text-sm truncate"
                    :class="selectedDistrict ? 'text-slate-900 font-medium' : 'text-slate-400'"
                  >
                    {{ selectedDistrict || "Select district" }}
                  </span>

                  <ChevronDown
                    class="w-4 h-4 text-slate-400 transition"
                    :class="openLocationSub === 'district' ? 'rotate-180' : ''"
                  />
                </button>

                <div
                  v-if="openLocationSub === 'district'"
                  class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-40 overflow-y-auto"
                >
                  <button
                    v-for="district in filteredDistricts"
                    :key="district"
                    type="button"
                    @click="selectDistrict(district)"
                    class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition truncate"
                    :class="
                      selectedDistrict === district
                        ? 'bg-violet-50 text-violet-600 font-medium'
                        : 'text-slate-700'
                    "
                  >
                    {{ district }}
                  </button>
                </div>
              </div>
            </div>


            <!-- City -->

            <div>
              <label
                class="flex items-center gap-1.5 mb-1 text-sm font-medium text-slate-700"
              >
                <Building2 class="w-3.5 h-3.5 text-slate-400" />
                <span>City</span>
              </label>

              <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  @click="toggleLocationSub('city')"
                  class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span
                    class="text-sm truncate"
                    :class="selectedCity ? 'text-slate-900 font-medium' : 'text-slate-400'"
                  >
                    {{ selectedCity || "Select city" }}
                  </span>

                  <ChevronDown
                    class="w-4 h-4 text-slate-400 transition"
                    :class="openLocationSub === 'city' ? 'rotate-180' : ''"
                  />
                </button>

                <div
                  v-if="openLocationSub === 'city'"
                  class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-40 overflow-y-auto"
                >
                  <button
                    v-for="city in filteredCities"
                    :key="city"
                    type="button"
                    @click="selectCity(city)"
                    class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition truncate"
                    :class="
                      selectedCity === city
                        ? 'bg-violet-50 text-violet-600 font-medium'
                        : 'text-slate-700'
                    "
                  >
                    {{ city }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <!-- ================= JOB TYPE ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Briefcase
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Job Type
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('jobType')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-md"
              :class="
                selectedJobType
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedJobType || "Select job type" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'jobType'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'jobType'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="type in jobTypes"
              :key="type"
              type="button"
              @click="selectJobType(type)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedJobType === type
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ type }}
            </button>
          </div>

        </div>
      </section>


      <!-- ================= EXPERIENCE ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Award
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Experience Level
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('experience')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-sm"
              :class="
                selectedExperience
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{
                selectedExperience ||
                "Select experience level"
              }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'experience'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'experience'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="experience in experienceLevels"
              :key="experience"
              type="button"
              @click="selectExperience(experience)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedExperience === experience
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ experience }}
            </button>
          </div>

        </div>
      </section>


      <!-- ================= EDUCATION ================= -->

      <section class="space-y-2">
        <!-- Education Heading -->
        <div class="flex items-center gap-2 mb-2">
          <GraduationCap
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Education
          </h3>
        </div>

        <!-- 1. Education Level Dropdown Container -->
        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('educationLevel')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedEducationLevel
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedEducationLevel || "Select education level" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'educationLevel'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'educationLevel'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="level in educationLevels"
              :key="level"
              type="button"
              @click="selectEducationLevel(level)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedEducationLevel === level
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ level }}
            </button>
          </div>
        </div>

        <!-- 2. Stream Dropdown (for 12th / HSC) -->
        <div
          v-if="selectedEducationLevel === '12th / HSC'"
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('stream')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedStream
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedStream || "Select stream" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'stream'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'stream'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="stream in streams"
              :key="stream"
              type="button"
              @click="selectStream(stream)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedStream === stream
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ stream }}
            </button>
          </div>
        </div>

        <!-- 3. Diploma Dropdown (for Diploma) -->
        <div
          v-if="selectedEducationLevel === 'Diploma'"
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('diploma')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedDiploma
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedDiploma || "Select diploma" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'diploma'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'diploma'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="diploma in diplomaOptions"
              :key="diploma"
              type="button"
              @click="selectDiploma(diploma)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedDiploma === diploma
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ diploma }}
            </button>
          </div>
        </div>

        <!-- 4. Degree Dropdown (for Bachelor's Degree or Master's Degree) -->
        <div
          v-if="selectedEducationLevel === 'Bachelor\'s Degree' || selectedEducationLevel === 'Master\'s Degree'"
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('degree')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedDegree
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedDegree || "Select degree" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'degree'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'degree'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="degree in currentDegreeOptions"
              :key="degree"
              type="button"
              @click="selectDegree(degree)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedDegree === degree
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ degree }}
            </button>
          </div>
        </div>

        <!-- 5. Specialization Dropdown (after Bachelor's or Master's Degree is selected) -->
        <div
          v-if="(selectedEducationLevel === 'Bachelor\'s Degree' || selectedEducationLevel === 'Master\'s Degree') && selectedDegree"
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('specialization')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedSpecialization
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedSpecialization || "Select specialization" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'specialization'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'specialization'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="spec in currentSpecializationOptions"
              :key="spec"
              type="button"
              @click="selectSpecialization(spec)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedSpecialization === spec
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ spec }}
            </button>
          </div>
        </div>

        <!-- 6. Field Dropdown (for PhD / Doctorate) -->
        <div
          v-if="selectedEducationLevel === 'PhD / Doctorate'"
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            @click="openDropdown('phdField')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <span
              class="text-sm"
              :class="
                selectedPhdField
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedPhdField || "Select field" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'phdField'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'phdField'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="field in phdFields"
              :key="field"
              type="button"
              @click="selectPhdField(field)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedPhdField === field
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ field }}
            </button>
          </div>
        </div>
      </section>


      <!-- ================= SALARY ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <IndianRupee
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Salary
          </h3>
        </div>

        <div class="grid grid-cols-2 gap-2 items-start">
          <!-- Minimum Salary Dropdown -->
          <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              @click="openDropdown('minSalary')"
              class="w-full h-7 px-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <span
                class="text-xs truncate"
                :class="
                  selectedMinSalary
                    ? 'text-slate-900 font-medium'
                    : 'text-slate-400'
                "
              >
                {{ selectedMinSalary ? `Min: ${selectedMinSalary}` : "Min salary" }}
              </span>

              <ChevronDown
                class="w-3.5 h-3.5 shrink-0 text-slate-400 transition"
                :class="
                  openSection === 'minSalary'
                    ? 'rotate-180'
                    : ''
                "
              />
            </button>

            <div
              v-if="openSection === 'minSalary'"
              class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-44 overflow-y-auto"
            >
              <button
                v-for="min in minSalaryOptions"
                :key="min"
                type="button"
                @click="selectMinSalary(min)"
                class="w-full px-2 py-1 rounded text-left text-xs hover:bg-violet-50 hover:text-violet-600 transition truncate"
                :class="
                  selectedMinSalary === min
                    ? 'bg-violet-50 text-violet-600 font-medium'
                    : 'text-slate-700'
                "
              >
                {{ min }}
              </button>
            </div>
          </div>

          <!-- Maximum Salary Dropdown -->
          <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              @click="openDropdown('maxSalary')"
              class="w-full h-7 px-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <span
                class="text-xs truncate"
                :class="
                  selectedMaxSalary
                    ? 'text-slate-900 font-medium'
                    : 'text-slate-400'
                "
              >
                {{ selectedMaxSalary ? `Max: ${selectedMaxSalary}` : "Max salary" }}
              </span>

              <ChevronDown
                class="w-3.5 h-3.5 shrink-0 text-slate-400 transition"
                :class="
                  openSection === 'maxSalary'
                    ? 'rotate-180'
                    : ''
                "
              />
            </button>

            <div
              v-if="openSection === 'maxSalary'"
              class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-44 overflow-y-auto"
            >
              <button
                v-for="max in maxSalaryOptions"
                :key="max"
                type="button"
                @click="selectMaxSalary(max)"
                class="w-full px-2 py-1 rounded text-left text-xs hover:bg-violet-50 hover:text-violet-600 transition truncate"
                :class="
                  selectedMaxSalary === max
                    ? 'bg-violet-50 text-violet-600 font-medium'
                    : 'text-slate-700'
                "
              >
                {{ max }}
              </button>
            </div>
          </div>
        </div>
      </section>


      <!-- ================= WORK MODE ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Laptop
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Work Mode
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('workMode')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-sm"
              :class="
                selectedWorkMode
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedWorkMode || "Select work mode" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'workMode'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'workMode'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="mode in workModes"
              :key="mode"
              type="button"
              @click="selectWorkMode(mode)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedWorkMode === mode
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ mode }}
            </button>
          </div>

        </div>
      </section>


      <!-- ================= INDUSTRY ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Factory
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Industry
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('industry')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-sm"
              :class="
                selectedIndustry
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedIndustry || "Select industry" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'industry'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'industry'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5 max-h-48 overflow-y-auto"
          >
            <button
              v-for="ind in industryOptions"
              :key="ind"
              type="button"
              @click="selectIndustry(ind)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedIndustry === ind
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ ind }}
            </button>
          </div>

        </div>
      </section>


      <!-- ================= SHIFT ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Clock
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Shift
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('shift')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-sm"
              :class="
                selectedShift
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedShift || "Select shift" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'shift'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'shift'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="shift in shiftOptions"
              :key="shift"
              type="button"
              @click="selectShift(shift)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedShift === shift
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ shift }}
            </button>
          </div>

        </div>
      </section>


      <!-- ================= HIRING URGENCY ================= -->

      <section>
        <div class="flex items-center gap-2 mb-2">
          <Zap
            class="w-4 h-4 text-violet-600"
          />

          <h3 class="text-sm font-semibold text-slate-900">
            Hiring Urgency
          </h3>
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white overflow-hidden"
        >

          <button
            type="button"
            @click="openDropdown('urgency')"
            class="w-full h-7 px-3 flex items-center justify-between text-left hover:bg-slate-50"
          >
            <span
              class="text-sm"
              :class="
                selectedUrgency
                  ? 'text-slate-900'
                  : 'text-slate-400'
              "
            >
              {{ selectedUrgency || "Select hiring urgency" }}
            </span>

            <ChevronDown
              class="w-4 h-4 text-slate-400 transition"
              :class="
                openSection === 'urgency'
                  ? 'rotate-180'
                  : ''
              "
            />
          </button>

          <div
            v-if="openSection === 'urgency'"
            class="border-t border-slate-200 p-1 bg-slate-50/50 space-y-0.5"
          >
            <button
              v-for="urgency in urgencyOptions"
              :key="urgency"
              type="button"
              @click="selectUrgency(urgency)"
              class="w-full px-2.5 py-1 rounded text-left text-sm hover:bg-violet-50 hover:text-violet-600 transition"
              :class="
                selectedUrgency === urgency
                  ? 'bg-violet-50 text-violet-600 font-medium'
                  : 'text-slate-700'
              "
            >
              {{ urgency }}
            </button>
          </div>

        </div>
      </section>

    </div>


    <!-- ================= APPLY BUTTON ================= -->

    <div
      class="shrink-0 p-3 border-t border-slate-200 bg-white"
    >
      <button
        type="button"
        @click="applyFilters"
        class="w-full h-10 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition flex items-center justify-center gap-2"
      >
        Apply Filters
      </button>
    </div>

  </aside>
</template>