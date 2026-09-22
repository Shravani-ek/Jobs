<script setup lang="ts">
import { ref } from "vue";
import {
  Briefcase,
  DollarSign,
  FileText,
  MapPin,
  Building2,
  Coffee,
  Clock,
  ArrowLeft,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  CheckCircle2,
  Wifi,
  Car,
  Dumbbell,
  Utensils,
  Zap,
} from "lucide-vue-next";

const emit = defineEmits<{
  (e: "back"): void;
  (e: "cancel"): void;
  (e: "created", job: any): void;
}>();

/* ---------------------------------------------------------
   WIZARD STEPS DEFINITION (Matching Screenshot Tabs)
--------------------------------------------------------- */
const steps = [
  { id: "details", label: "Job Details", icon: Briefcase },
  { id: "salary", label: "Salary & Benefits", icon: DollarSign },
  { id: "requirements", label: "Requirements", icon: FileText },
  { id: "location", label: "Location", icon: MapPin },
  { id: "company", label: "Company Profile", icon: Building2 },
  { id: "facilities", label: "Office Facilities", icon: Coffee },
  { id: "shift", label: "Shift & Travel", icon: Clock },
];

const currentStep = ref("details");
const stepperContainer = ref<HTMLElement | null>(null);

function scrollStepper(direction: "left" | "right") {
  if (!stepperContainer.value) return;
  const scrollAmount = direction === "left" ? -200 : 200;
  stepperContainer.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

/* ---------------------------------------------------------
   FORM STATE - JOB SPECIFICATION & DETAILS
--------------------------------------------------------- */
interface JobFormState {
  title: string;
  roleDesignation: string;
  domain: string;
  category: string;
  subcategory: string;
  department: string;
  employmentType: string;
  workMode: string;
  openings: number | string;
  minExperience: string;
  maxExperience: string;
  description: string;
  skills: string[];

  // Salary & Benefits
  currency: string;
  minSalary: string;
  maxSalary: string;
  salaryPeriod: string;
  showSalaryOnPost: boolean;
  selectedPerks: string[];

  // Requirements
  qualification: string;
  preferredSkills: string[];
  certifications: string;

  // Location
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  relocationAssistance: boolean;

  // Company Profile
  companyName: string;
  companyOverview: string;
  hiringManager: string;
  contactEmail: string;

  // Office Facilities
  selectedFacilities: string[];

  // Shift & Travel
  shiftTiming: string;
  workingDays: string;
  travelRequirement: string;
  overtimePolicy: string;
}

const defaultFormState = (): JobFormState => ({
  title: "",
  roleDesignation: "",
  domain: "",
  category: "",
  subcategory: "",
  department: "",
  employmentType: "",
  workMode: "",
  openings: "",
  minExperience: "",
  maxExperience: "",
  description: "",
  skills: [],

  currency: "",
  minSalary: "",
  maxSalary: "",
  salaryPeriod: "Per Year",
  showSalaryOnPost: true,
  selectedPerks: [],

  qualification: "",
  preferredSkills: [],
  certifications: "",

  country: "",
  state: "",
  city: "",
  postalCode: "",
  address: "",
  relocationAssistance: false,

  companyName: "",
  companyOverview: "",
  hiringManager: "",
  contactEmail: "",

  selectedFacilities: [],

  shiftTiming: "",
  workingDays: "",
  travelRequirement: "",
  overtimePolicy: "",
});

const form = ref<JobFormState>(defaultFormState());
const showResetAlert = ref(false);
const showSuccessNotification = ref(false);
const newSkillInput = ref("");

/* ---------------------------------------------------------
   DROPDOWN OPTIONS
--------------------------------------------------------- */
const domainOptions = [
  "Information Technology & Services",
  "Software Products & SaaS",
  "Healthcare & Life Sciences",
  "Banking, Financial Services & Insurance",
  "E-Commerce & Retail",
  "Manufacturing & Automotive",
  "Education & EdTech",
  "Telecommunications & Media",
  "Consulting & Professional Services",
];

const categoryOptions = [
  "Software Engineering & Architecture",
  "Frontend & UI Engineering",
  "Backend & Distributed Systems",
  "Product Management",
  "UI / UX & Product Design",
  "Data Science & Machine Learning",
  "DevOps & Cloud Infrastructure",
  "Quality Assurance & Automation",
  "Marketing & Growth",
  "Human Resources & Talent",
];

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const workModes = ["On-site", "Hybrid", "Remote"];

const experienceYears = [
  "0 (Fresher)",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];

const availablePerks = [
  "Health Insurance",
  "Provident Fund",
  "Performance Bonus",
  "Paid Leaves",
  "Flexible Work Hours",
  "Wellness Allowance",
  "Internet & Equipment Stipend",
  "Annual Learning Budget",
];

const allFacilities = [
  { id: "Cafeteria & Meals", icon: Utensils },
  { id: "High-Speed Internet", icon: Wifi },
  { id: "Free Parking", icon: Car },
  { id: "Ergonomic Chairs", icon: Zap },
  { id: "Fitness Center / Gym", icon: Dumbbell },
  { id: "Gaming & Relaxation Lounge", icon: Coffee },
];

/* ---------------------------------------------------------
   METHODS
--------------------------------------------------------- */
function resetForm() {
  form.value = defaultFormState();
  showResetAlert.value = true;
  setTimeout(() => {
    showResetAlert.value = false;
  }, 3000);
}

function addSkill() {
  const val = newSkillInput.value.trim();
  if (val && !form.value.skills.includes(val)) {
    form.value.skills.push(val);
    newSkillInput.value = "";
  }
}

function removeSkill(index: number) {
  form.value.skills.splice(index, 1);
}

function togglePerk(perk: string) {
  const idx = form.value.selectedPerks.indexOf(perk);
  if (idx >= 0) {
    form.value.selectedPerks.splice(idx, 1);
  } else {
    form.value.selectedPerks.push(perk);
  }
}

function toggleFacility(facility: string) {
  const idx = form.value.selectedFacilities.indexOf(facility);
  if (idx >= 0) {
    form.value.selectedFacilities.splice(idx, 1);
  } else {
    form.value.selectedFacilities.push(facility);
  }
}

function goToNextStep() {
  const currentIndex = steps.findIndex((s) => s.id === currentStep.value);
  if (currentIndex < steps.length - 1) {
    currentStep.value = steps[currentIndex + 1].id;
  } else {
    submitJob();
  }
}

function goToPrevStep() {
  const currentIndex = steps.findIndex((s) => s.id === currentStep.value);
  if (currentIndex > 0) {
    currentStep.value = steps[currentIndex - 1].id;
  } else {
    emit("back");
  }
}

function submitJob() {
  const newJob = {
    title: form.value.title || "Untitled Job",
    role: form.value.roleDesignation || "Role Not Specified",
    location:
      form.value.city || form.value.state
        ? `${form.value.city || ""}${form.value.city && form.value.state ? ", " : ""}${form.value.state || ""}`
        : "Location Not Specified",
    type: form.value.employmentType || "Full-time",
    applications: 0,
    status: "Active",
    posted: "Just now",
    department: form.value.department || "General",
    workMode: form.value.workMode || "On-site",
    openings: form.value.openings || 1,
    experience:
      form.value.minExperience || form.value.maxExperience
        ? `${form.value.minExperience || "0"} - ${form.value.maxExperience || "0"} Years`
        : "Not Specified",
    salary:
      form.value.minSalary || form.value.maxSalary
        ? `${form.value.currency ? form.value.currency + " " : ""}${form.value.minSalary || "0"} - ${form.value.maxSalary || "0"} ${form.value.salaryPeriod}`
        : "Competitive / Not Disclosed",
    description: form.value.description,
    skills: form.value.skills,
  };

  showSuccessNotification.value = true;
  setTimeout(() => {
    showSuccessNotification.value = false;
    emit("created", newJob);
  }, 1200);
}
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-col overflow-hidden">
    <!-- SUCCESS TOAST -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="showSuccessNotification"
        class="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-3 text-emerald-800 shadow-lg"
      >
        <CheckCircle2 class="h-5 w-5 text-emerald-600" />
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-emerald-900">
            Success
          </p>
          <p class="text-sm font-medium text-emerald-700">
            Job post has been published successfully!
          </p>
        </div>
      </div>
    </transition>

    <!-- RESET TOAST -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="showResetAlert"
        class="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-rose-800 shadow-xl"
      >
        <RotateCcw class="h-5 w-5 text-rose-600" />
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-rose-900">
            Reset
          </p>
          <p class="text-sm font-medium text-rose-700">
            Form has been reset to default values.
          </p>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         MAIN CARD CONTAINER (Joined Stepper + Form)
    ========================================================== -->
    <div
      class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs"
    >
      <!-- HORIZONTAL STEPPER NAVIGATION BAR (Fixed Top) -->
      <div
        class="shrink-0 sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-3 py-1"
      >
        <!-- Scroll Left Arrow -->
        <button
          type="button"
          @click="scrollStepper('left')"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          title="Scroll Left"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>

        <!-- Stepper Pills Container -->
        <div
          ref="stepperContainer"
          class="mx-2 -mb-px flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <button
            v-for="step in steps"
            :key="step.id"
            type="button"
            @click="currentStep = step.id"
            class="flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition"
            :class="
              currentStep === step.id
                ? 'border-[#4338CA] text-[#4338CA]'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
            "
          >
            <component
              :is="step.icon"
              class="h-4 w-4"
              :class="currentStep === step.id ? 'text-[#4338CA]' : 'text-slate-400'"
            />
            <span>{{ step.label }}</span>
          </button>
        </div>

        <!-- Scroll Right Arrow -->
        <button
          type="button"
          @click="scrollStepper('right')"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          title="Scroll Right"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>

      <!-- FORM CONTENT BODY (Scrollable Viewport) -->
      <div class="custom-scroll min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">

      <!-- =======================================================
           STEP 1: JOB SPECIFICATION 
      ======================================================== -->
      <div v-show="currentStep === 'details'" class="space-y-6">
        <!-- ROW 1: Job Title * & Job Role / Designation -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Job Title * -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Job Title <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              placeholder="e.g. Senior Frontend Architect, Full Stack Developer"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Job Role / Designation -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Job Role / Designation
            </label>
            <input
              v-model="form.roleDesignation"
              type="text"
              placeholder="e.g. Software Engineer II"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 2: Job Domain / Industry | Category | Subcategory -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Job Domain / Industry -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Job Domain / Industry
            </label>
            <div class="relative">
              <select
                v-model="form.domain"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>
                  Select Domain (e.g. Healthcare, IT, Finance)
                </option>
                <option
                  v-for="opt in domainOptions"
                  :key="opt"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Category -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Category
            </label>
            <div class="relative">
              <select
                v-model="form.category"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select Category</option>
                <option
                  v-for="opt in categoryOptions"
                  :key="opt"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Subcategory -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Subcategory
            </label>
            <input
              v-model="form.subcategory"
              type="text"
              placeholder="e.g. Web Development, UI Engineering"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 3: Department | Employment Type * | Work Mode * -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Department -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Department
            </label>
            <input
              v-model="form.department"
              type="text"
              placeholder="e.g. Engineering & IT"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Employment Type * -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Employment Type <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.employmentType"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select Employment Type</option>
                <option
                  v-for="opt in employmentTypes"
                  :key="opt"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Work Mode * -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Work Mode <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.workMode"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select Work Mode</option>
                <option
                  v-for="opt in workModes"
                  :key="opt"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <!-- ROW 4: Number of Openings * | Min Experience (Years) | Max Experience (Years) -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Number of Openings * -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Number of Openings <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.openings"
              type="number"
              min="1"
              placeholder="e.g. 5"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Min Experience (Years) -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Min Experience (Years)
            </label>
            <div class="relative">
              <select
                v-model="form.minExperience"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>e.g. 2</option>
                <option
                  v-for="year in experienceYears"
                  :key="year"
                  :value="year"
                >
                  {{ year }} {{ year === "0 (Fresher)" ? "" : "Years" }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Max Experience (Years) -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Max Experience (Years)
            </label>
            <div class="relative">
              <select
                v-model="form.maxExperience"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>e.g. 5</option>
                <option
                  v-for="year in experienceYears"
                  :key="year"
                  :value="year"
                >
                  {{ year }} {{ year === "0 (Fresher)" ? "" : "Years" }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <!-- ROW 5: Job Description -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Job Description <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Provide a comprehensive description of the role, core responsibilities, key deliverables, and team culture..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>

        <!-- ROW 6: Skills & Technologies -->
        <div>
          <label class="mb-1.5 block text-xs   font-medium text-slate-700">
            Key Skills & Technologies
          </label>
          <div
            class="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3"
          >
            <div
              v-for="(skill, idx) in form.skills"
              :key="skill"
              class="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-[#4338CA]"
            >
              <span>{{ skill }}</span>
              <button
                type="button"
                @click="removeSkill(idx)"
                class="text-indigo-400 hover:text-indigo-700"
              >
                <X class="h-3.5 w-3.5" />
              </button>
            </div>

            <div class="flex items-center gap-2">
              <input
                v-model="newSkillInput"
                type="text"
                @keydown.enter.prevent="addSkill"
                placeholder="Add skill & press Enter..."
                class="text-xs text-slate-700 placeholder:text-slate-400 outline-none"
              />
              <button
                type="button"
                @click="addSkill"
                class="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- =======================================================
           STEP 2: SALARY & BENEFITS
      ======================================================== -->
      <div v-show="currentStep === 'salary'" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Currency
            </label>
            <div class="relative">
              <select
                v-model="form.currency"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select Currency</option>
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Minimum Salary
            </label>
            <input
              v-model="form.minSalary"
              type="text"
              placeholder="e.g. 12,00,000"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Maximum Salary
            </label>
            <input
              v-model="form.maxSalary"
              type="text"
              placeholder="e.g. 22,00,000"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label class="mb-3 block text-sm font-medium text-slate-700">
            Perks & Company Benefits
          </label>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              v-for="perk in availablePerks"
              :key="perk"
              type="button"
              @click="togglePerk(perk)"
              class="flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition"
              :class="
                form.selectedPerks.includes(perk)
                  ? 'border-[#4338CA] bg-indigo-50/50 text-[#4338CA]'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              "
            >
              <div
                class="flex h-4 w-4 shrink-0 items-center justify-center rounded border"
                :class="
                  form.selectedPerks.includes(perk)
                    ? 'border-[#4338CA] bg-[#4338CA] text-white'
                    : 'border-slate-300'
                "
              >
                <CheckCircle2
                  v-if="form.selectedPerks.includes(perk)"
                  class="h-3 w-3"
                />
              </div>
              <span>{{ perk }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- =======================================================
           STEP 3: REQUIREMENTS
      ======================================================== -->
      <div v-show="currentStep === 'requirements'" class="space-y-6">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Minimum Qualification / Education
          </label>
          <input
            v-model="form.qualification"
            type="text"
            placeholder="e.g. Bachelor's in Computer Science or equivalent"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Certifications (Optional)
          </label>
          <input
            v-model="form.certifications"
            type="text"
            placeholder="e.g. AWS Certified Developer, CKA, PMP"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <!-- =======================================================
           STEP 4: LOCATION
      ======================================================== -->
      <div v-show="currentStep === 'location'" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              v-model="form.city"
              type="text"
              placeholder="e.g. Bangalore"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              State / Region
            </label>
            <input
              v-model="form.state"
              type="text"
              placeholder="e.g. Karnataka"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Country
            </label>
            <input
              v-model="form.country"
              type="text"
              placeholder="e.g. India"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Office Street Address
          </label>
          <input
            v-model="form.address"
            type="text"
            placeholder="e.g. WebArtifacts Hub, Outer Ring Road"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <!-- =======================================================
           STEP 5: COMPANY PROFILE
      ======================================================== -->
      <div v-show="currentStep === 'company'" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Hiring Manager / Team Lead
            </label>
            <input
              v-model="form.hiringManager"
              type="text"
              placeholder="e.g. VP of Engineering"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Contact Email for Queries
            </label>
            <input
              v-model="form.contactEmail"
              type="email"
              placeholder="e.g. careers@webartifacts.com"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Company Overview for this Post
          </label>
          <textarea
            v-model="form.companyOverview"
            rows="3"
            placeholder="e.g. Building digital experiences for a better tomorrow. High-growth tech consulting and product engineering..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>
      </div>

      <!-- =======================================================
           STEP 6: OFFICE FACILITIES
      ======================================================== -->
      <div v-show="currentStep === 'facilities'" class="space-y-6">
        <p class="text-sm text-slate-500">
          Highlight key on-campus amenities available for employees.
        </p>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          <button
            v-for="facility in allFacilities"
            :key="facility.id"
            type="button"
            @click="toggleFacility(facility.id)"
            class="flex items-center gap-3 rounded-xl border p-4 text-left transition"
            :class="
              form.selectedFacilities.includes(facility.id)
                ? 'border-[#4338CA] bg-indigo-50/50 text-[#4338CA]'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            "
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg"
              :class="
                form.selectedFacilities.includes(facility.id)
                  ? 'bg-[#4338CA] text-white'
                  : 'bg-slate-100 text-slate-600'
              "
            >
              <component :is="facility.icon" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-bold">{{ facility.id }}</p>
              <p class="text-[11px] text-slate-400">Available at site</p>
            </div>
          </button>
        </div>
      </div>

      <!-- =======================================================
           STEP 7: SHIFT & TRAVEL
      ======================================================== -->
      <div v-show="currentStep === 'shift'" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Shift Timing
            </label>
            <input
              v-model="form.shiftTiming"
              type="text"
              placeholder="e.g. Day Shift (9:30 AM - 6:30 PM)"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Working Days
            </label>
            <input
              v-model="form.workingDays"
              type="text"
              placeholder="e.g. Monday to Friday (5 Days)"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Travel Requirement
            </label>
            <input
              v-model="form.travelRequirement"
              type="text"
              placeholder="e.g. No Travel Required"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Overtime / Weekend Policy
            </label>
            <input
              v-model="form.overtimePolicy"
              type="text"
              placeholder="e.g. Compensatory Offs Available"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      <!-- =======================================================
           BOTTOM ACTIONS BAR (Previous / Save Draft / Next)
      ======================================================== -->
      <div
        class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5"
      >
        <button
          type="button"
          @click="goToPrevStep"
          class="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          <span>{{ currentStep === "details" ? "Back to Jobs" : "Previous Step" }}</span>
        </button>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="resetForm"
            class="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Clear Fields
          </button>

          <button
            type="button"
            @click="submitJob"
            class="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-[#4338CA] transition hover:bg-indigo-100"
          >
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            @click="goToNextStep"
            class="flex items-center gap-2 rounded-xl bg-[#4338CA] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <span>
              {{
                currentStep === "shift"
                  ? "Publish Job Post"
                  : "Next Step"
              }}
            </span>
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
