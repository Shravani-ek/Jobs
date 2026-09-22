<script setup lang="ts">
import { ref, nextTick } from "vue";
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
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Gift,
  Check,
  X,
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

function scrollToStep(stepId: string) {
  currentStep.value = stepId;
  nextTick(() => {
    if (!stepperContainer.value) return;
    const activeEl = stepperContainer.value.querySelector<HTMLElement>(`[data-step-id="${stepId}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  });
}

function handleStepperWheel(e: WheelEvent) {
  if (!stepperContainer.value) return;
  if (stepperContainer.value.scrollWidth > stepperContainer.value.clientWidth) {
    stepperContainer.value.scrollLeft += e.deltaY || e.deltaX;
  }
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
  noticePeriod: string;
  postingStatus: string;
  description: string;
  skills: string[];

  // Salary & Benefits
  currency: string;
  minSalary: string;
  maxSalary: string;
  salaryPeriod: string;
  showSalaryOnPost: boolean;
  benefitsDescription: string;
  selectedPerks: string[];

  // Requirements
  qualification: string;
  education?: string;
  jobLanguages: string;
  applicationDeadline: string;
  genderPreference: string;
  ageRequirement: string;
  preferredSkills: string[];
  certifications?: string;

  // Location
  country: string;
  state: string;
  city: string;
  areaSuburb: string;
  postalCode: string;
  address: string;
  relocationAssistance: boolean;

  // Company Profile
  companyName: string;
  companyLogoUrl: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  foundedYear: string;
  companyType: string;
  hiringManager?: string;
  contactEmail: string;
  phoneCountryCode: string;
  contactPhone: string;
  companyOverview: string;
  saveCompanyProfile: boolean;

  // Office Facilities
  selectedFacilities: string[];

  // Shift & Travel
  shiftType: string;
  shiftStartTime: string;
  shiftEndTime: string;
  workingDays: string;
  weeklyOff: string;
  dailyWorkingHours: string;
  expectedJoiningDate: string;
  travelRequired: boolean;
  relocationRequired: boolean;
  shiftTiming?: string;
  travelRequirement?: string;
  overtimePolicy?: string;
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
  noticePeriod: "",
  postingStatus: "Active",
  description: "",
  skills: [],

  currency: "INR (₹) - Indian Rupee",
  minSalary: "",
  maxSalary: "",
  salaryPeriod: "Per Annum (Yearly)",
  showSalaryOnPost: true,
  benefitsDescription: "",
  selectedPerks: [],

  qualification: "",
  education: "",
  jobLanguages: "",
  applicationDeadline: "",
  genderPreference: "Any / No Preference",
  ageRequirement: "",
  preferredSkills: [],
  certifications: "",

  country: "India IN",
  state: "",
  city: "",
  areaSuburb: "",
  postalCode: "",
  address: "",
  relocationAssistance: false,

  companyName: "ADS",
  companyLogoUrl: "",
  companyWebsite: "",
  industry: "Software & IT Services",
  companySize: "11-50 employees",
  foundedYear: "",
  companyType: "Private Limited",
  hiringManager: "",
  contactEmail: "",
  phoneCountryCode: "+91",
  contactPhone: "",
  companyOverview: "",
  saveCompanyProfile: false,

  selectedFacilities: [],

  shiftType: "",
  shiftStartTime: "",
  shiftEndTime: "",
  workingDays: "",
  weeklyOff: "",
  dailyWorkingHours: "",
  expectedJoiningDate: "",
  travelRequired: false,
  relocationRequired: false,
  shiftTiming: "",
  travelRequirement: "",
  overtimePolicy: "",
});

const form = ref<JobFormState>(defaultFormState());
const showResetAlert = ref(false);
const showSuccessNotification = ref(false);
const newPrimarySkillInput = ref("");
const newPreferredSkillInput = ref("");

/* ---------------------------------------------------------
   DROPDOWN OPTIONS
--------------------------------------------------------- */
const noticePeriodOptions = [
  "Immediate Joiner",
  "15 Days or less",
  "30 Days",
  "45 Days",
  "60 Days",
  "90 Days",
  "Serving Notice Period",
];

const postingStatusOptions = [
  "Active",
  "Urgent Hiring",
  "Immediate Joining",
  "Draft",
  "Closed",
];
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

const currencyOptions = [
  "INR (₹) - Indian Rupee",
  "USD ($) - US Dollar",
  "EUR (€) - Euro",
  "GBP (£) - British Pound",
  "AED (د.إ) - UAE Dirham",
  "CAD ($) - Canadian Dollar",
  "SGD ($) - Singapore Dollar",
  "AUD ($) - Australian Dollar",
];

const salaryPeriodOptions = [
  "Per Annum (Yearly)",
  "Per Month",
  "Per Week",
  "Per Day",
  "Per Hour",
];

const jobBenefitsList = [
  "Health Insurance",
  "Life Insurance",
  "Paid Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Provident Fund (PF)",
  "Gratuity",
  "Annual / Performance Bonus",
  "Incentives",
  "Overtime Pay",
  "Food Provided",
  "Transport Provided",
  "Accommodation Provided",
  "Uniform Provided",
  "Training & Skill Development",
];

const jobLanguageOptions = [
  "English",
  "Hindi",
  "English & Hindi",
  "Spanish",
  "French",
  "German",
  "Mandarin Chinese",
  "Japanese",
  "Arabic",
  "Any / Not Specified",
];

const genderPreferenceOptions = [
  "Any / No Preference",
  "Female Preferred",
  "Male Preferred",
  "Equal Opportunity / Any",
];

const countryOptions = [
  "India IN",
  "United States US",
  "United Kingdom UK",
  "Canada CA",
  "Australia AU",
  "Germany DE",
  "Singapore SG",
  "United Arab Emirates AE",
];

const stateOptions = [
  "Karnataka",
  "Maharashtra",
  "Delhi NCR",
  "Telangana",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "Haryana",
  "Kerala",
  "West Bengal",
  "Punjab",
  "Rajasthan",
  "Madhya Pradesh",
  "Other",
];

const cityOptions = [
  "Bangalore",
  "Pune",
  "Mumbai",
  "Hyderabad",
  "Chennai",
  "Gurgaon / Gurugram",
  "Noida",
  "Delhi",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Other",
];

const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const companyTypeOptions = [
  "Private Limited",
  "Public Limited",
  "LLP (Limited Liability Partnership)",
  "Partnership",
  "Sole Proprietorship",
  "Non-Profit / NGO",
  "Startup",
];

const phoneCountryCodeOptions = [
  { code: "+91", label: "IN India (+91)" },
  { code: "+1", label: "US United States (+1)" },
  { code: "+44", label: "UK United Kingdom (+44)" },
  { code: "+971", label: "AE UAE (+971)" },
  { code: "+65", label: "SG Singapore (+65)" },
  { code: "+61", label: "AU Australia (+61)" },
  { code: "+49", label: "DE Germany (+49)" },
  { code: "+1-ca", label: "CA Canada (+1)" },
];

const officeFacilitiesList = [
  "Washroom",
  "Clean Drinking Water",
  "Vehicle Parking",
  "Elevator / Lift",
  "Cafeteria",
  "Canteen",
  "Pantry Room",
  "Air Conditioning",
  "High-speed Wi-Fi",
  "Power Backup (UPS/Generator)",
  "24/7 Security Guard",
  "First Aid Kit",
  "Wheelchair Accessible",
  "Near Public Transport",
  "Employee Transport / Cab",
  "Staff Accommodation",
  "Changing Room",
  "Personal Locker",
  "Childcare / Daycare",
];

const shiftTypeOptions = [
  "Day Shift",
  "Night Shift",
  "Rotational Shift",
  "Flexible Shift",
  "Split Shift",
  "US / UK Shift",
];

/* ---------------------------------------------------------
   METHODS
--------------------------------------------------------- */
function resetForm() {
  form.value = defaultFormState();
  newPrimarySkillInput.value = "";
  newPreferredSkillInput.value = "";
  showResetAlert.value = true;
  setTimeout(() => {
    showResetAlert.value = false;
  }, 3000);
}

function addPrimarySkill() {
  const val = newPrimarySkillInput.value.trim();
  if (val && !form.value.skills.includes(val)) {
    form.value.skills.push(val);
    newPrimarySkillInput.value = "";
  }
}

function removePrimarySkill(index: number) {
  form.value.skills.splice(index, 1);
}

function addPreferredSkill() {
  const val = newPreferredSkillInput.value.trim();
  if (val && !form.value.preferredSkills.includes(val)) {
    form.value.preferredSkills.push(val);
    newPreferredSkillInput.value = "";
  }
}

function removePreferredSkill(index: number) {
  form.value.preferredSkills.splice(index, 1);
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
    scrollToStep(steps[currentIndex + 1].id);
  } else {
    submitJob();
  }
}

function goToPrevStep() {
  const currentIndex = steps.findIndex((s) => s.id === currentStep.value);
  if (currentIndex > 0) {
    scrollToStep(steps[currentIndex - 1].id);
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
        ? `${form.value.areaSuburb ? form.value.areaSuburb + ", " : ""}${form.value.city || ""}${form.value.city && form.value.state ? ", " : ""}${form.value.state || ""}`
        : "Location Not Specified",
    type: form.value.employmentType || "Full-time",
    applications: 0,
    status: form.value.postingStatus || "Active",
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
        ? `${form.value.currency ? form.value.currency.split(" ")[0] + " " : ""}${form.value.minSalary || "0"} - ${form.value.maxSalary || "0"} ${form.value.salaryPeriod}`
        : "Competitive / Not Disclosed",
    salaryPeriod: form.value.salaryPeriod,
    showSalaryOnPost: form.value.showSalaryOnPost,
    benefitsDescription: form.value.benefitsDescription,
    benefits: form.value.selectedPerks,
    noticePeriod: form.value.noticePeriod,
    postingStatus: form.value.postingStatus || "Active",
    education: form.value.qualification,
    qualification: form.value.qualification,
    jobLanguages: form.value.jobLanguages,
    applicationDeadline: form.value.applicationDeadline,
    genderPreference: form.value.genderPreference,
    ageRequirement: form.value.ageRequirement,
    preferredSkills: form.value.preferredSkills,
    companyName: form.value.companyName,
    companyLogoUrl: form.value.companyLogoUrl,
    companyWebsite: form.value.companyWebsite,
    industry: form.value.industry,
    companySize: form.value.companySize,
    foundedYear: form.value.foundedYear,
    companyType: form.value.companyType,
    contactEmail: form.value.contactEmail,
    contactPhone: `${form.value.phoneCountryCode} ${form.value.contactPhone}`.trim(),
    companyOverview: form.value.companyOverview,
    facilities: form.value.selectedFacilities,
    selectedFacilities: form.value.selectedFacilities,
    shiftType: form.value.shiftType,
    shiftStartTime: form.value.shiftStartTime,
    shiftEndTime: form.value.shiftEndTime,
    shiftTiming: form.value.shiftStartTime && form.value.shiftEndTime
      ? `${form.value.shiftType} (${form.value.shiftStartTime} - ${form.value.shiftEndTime})`
      : form.value.shiftType || "Day Shift",
    workingDays: form.value.workingDays,
    weeklyOff: form.value.weeklyOff,
    dailyWorkingHours: form.value.dailyWorkingHours,
    expectedJoiningDate: form.value.expectedJoiningDate,
    travelRequired: form.value.travelRequired,
    relocationRequired: form.value.relocationRequired,
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
        class="shrink-0 sticky top-0 z-10 flex items-center border-b border-slate-200 bg-white px-1 sm:px-2"
      >
        <!-- Stepper Pills Container -->
        <div
          ref="stepperContainer"
          @wheel="handleStepperWheel"
          class="-mb-px flex flex-1 items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <button
            v-for="step in steps"
            :key="step.id"
            :data-step-id="step.id"
            type="button"
            @click="scrollToStep(step.id)"
            class="flex flex-1 shrink-0 items-center justify-center gap-1.5 border-b-2 px-2 xl:px-2.5 py-2.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer"
            :class="
              currentStep === step.id
                ? 'border-[#4338CA] text-[#4338CA]'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
            "
          >
            <component
              :is="step.icon"
              class="h-3.5 w-3.5 shrink-0"
              :class="currentStep === step.id ? 'text-[#4338CA]' : 'text-slate-400'"
            />
            <span>{{ step.label }}</span>
          </button>
        </div>
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

        <!-- ROW 5: Notice Period & Posting Status -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Notice Period -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Notice Period
            </label>
            <div class="relative">
              <select
                v-model="form.noticePeriod"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled>Select Notice Period</option>
                <option
                  v-for="period in noticePeriodOptions"
                  :key="period"
                  :value="period"
                >
                  {{ period }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Posting Status -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Posting Status
            </label>
            <div class="relative">
              <select
                v-model="form.postingStatus"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="status in postingStatusOptions"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- =======================================================
           STEP 2: SALARY & BENEFITS
      ======================================================== -->
      <div v-show="currentStep === 'salary'" class="space-y-6">
        <!-- ROW 1: Salary Currency, Salary Min, Salary Max, Salary Period -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Salary Currency -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Salary Currency
            </label>
            <div class="relative">
              <select
                v-model="form.currency"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="curr in currencyOptions"
                  :key="curr"
                  :value="curr"
                >
                  {{ curr }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Salary Min -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Salary Min
            </label>
            <input
              v-model="form.minSalary"
              type="text"
              placeholder="e.g. 600000"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Salary Max -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Salary Max
            </label>
            <input
              v-model="form.maxSalary"
              type="text"
              placeholder="e.g. 1500000"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Salary Period -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Salary Period
            </label>
            <div class="relative">
              <select
                v-model="form.salaryPeriod"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="period in salaryPeriodOptions"
                  :key="period"
                  :value="period"
                >
                  {{ period }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <!-- ROW 2: Display salary details publicly on the job card -->
        <div>
          <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="form.showSalaryOnPost"
              class="h-4 w-4 rounded border-slate-300 text-blue-600 accent-[#2563EB] focus:ring-blue-500 cursor-pointer"
            />
            <span class="text-sm font-medium text-slate-700">
              Display salary details publicly on the job card
            </span>
          </label>
        </div>

        <!-- ROW 3: General Benefits Description -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            General Benefits Description
          </label>
          <textarea
            v-model="form.benefitsDescription"
            rows="3"
            placeholder="e.g. Stock options, flexible hours, annual wellness budget..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>

        <!-- ROW 4: JOB-SPECIFIC BENEFITS CHECKLIST -->
        <div class="space-y-3.5 pt-2">
          <!-- Section Title with Gift Icon -->
          <div class="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#4338CA] uppercase">
            <Gift class="h-4 w-4 text-[#4338CA]" />
            <span>JOB-SPECIFIC BENEFITS CHECKLIST</span>
          </div>

          <!-- Checklist Grid (5 columns on desktop) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <button
              v-for="benefit in jobBenefitsList"
              :key="benefit"
              type="button"
              @click="togglePerk(benefit)"
              class="flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-xs sm:text-sm font-medium transition cursor-pointer"
              :class="
                form.selectedPerks.includes(benefit)
                  ? 'border-[#4338CA] bg-indigo-50/50 text-slate-900 shadow-xs ring-1 ring-[#4338CA]'
                  : 'border-slate-200 bg-[#f8fafc]/60 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              "
            >
              <div
                class="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                :class="
                  form.selectedPerks.includes(benefit)
                    ? 'border-[#4338CA] bg-[#4338CA] text-white'
                    : 'border-slate-300 bg-white'
                "
              >
                <Check
                  v-if="form.selectedPerks.includes(benefit)"
                  class="h-3 w-3 stroke-[3]"
                />
              </div>
              <span class="leading-tight text-slate-700 select-none">{{ benefit }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- =======================================================
           STEP 3: REQUIREMENTS
      ======================================================== -->
      <div v-show="currentStep === 'requirements'" class="space-y-6">
        <!-- ROW 1: Education | Job Language(s) | Application Deadline -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Education -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Education
            </label>
            <input
              v-model="form.qualification"
              type="text"
              placeholder="e.g. B.Tech / M.Tech in CS"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Job Language(s) -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Job Language(s)
            </label>
            <div class="relative">
              <select
                v-model="form.jobLanguages"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select required language(s)...</option>
                <option
                  v-for="lang in jobLanguageOptions"
                  :key="lang"
                  :value="lang"
                >
                  {{ lang }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Application Deadline -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Application Deadline
            </label>
            <input
              v-model="form.applicationDeadline"
              type="date"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 2: Gender Preference | Age Requirement -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Gender Preference -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Gender Preference
            </label>
            <div class="relative">
              <select
                v-model="form.genderPreference"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="pref in genderPreferenceOptions"
                  :key="pref"
                  :value="pref"
                >
                  {{ pref }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Age Requirement -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Age Requirement
            </label>
            <input
              v-model="form.ageRequirement"
              type="text"
              placeholder="e.g. 18 - 35 Years"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Empty 3rd column to maintain exact grid alignment from image -->
          <div class="hidden md:block"></div>
        </div>

        <!-- ROW 3: REQUIRED PRIMARY SKILLS -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Required Primary Skills
          </label>
          <div class="flex items-center gap-3">
            <input
              v-model="newPrimarySkillInput"
              type="text"
              @keydown.enter.prevent="addPrimarySkill"
              placeholder="Type skill and press Enter"
              class="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="button"
              @click="addPrimarySkill"
              class="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
            >
              <span>+ Add</span>
            </button>
          </div>
          <!-- Primary Skills Tags -->
          <div v-if="form.skills && form.skills.length > 0" class="mt-2.5 flex flex-wrap items-center gap-2">
            <div
              v-for="(skill, idx) in form.skills"
              :key="skill"
              class="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4338CA]"
            >
              <span>{{ skill }}</span>
              <button
                type="button"
                @click="removePrimarySkill(idx)"
                class="text-indigo-400 hover:text-indigo-700 cursor-pointer"
              >
                <X class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- ROW 4: PREFERRED GOOD-TO-HAVE SKILLS -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Preferred Good-to-Have Skills
          </label>
          <div class="flex items-center gap-3">
            <input
              v-model="newPreferredSkillInput"
              type="text"
              @keydown.enter.prevent="addPreferredSkill"
              placeholder="Type preferred skill and press Enter"
              class="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="button"
              @click="addPreferredSkill"
              class="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
            >
              <span>+ Add</span>
            </button>
          </div>
          <!-- Preferred Skills Tags -->
          <div v-if="form.preferredSkills && form.preferredSkills.length > 0" class="mt-2.5 flex flex-wrap items-center gap-2">
            <div
              v-for="(skill, idx) in form.preferredSkills"
              :key="skill"
              class="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              <span>{{ skill }}</span>
              <button
                type="button"
                @click="removePreferredSkill(idx)"
                class="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- ROW 5: Detailed Job Description * -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Detailed Job Description <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Provide complete role responsibilities, key projects, team structure, and expectations..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>
      </div>

      <!-- =======================================================
           STEP 4: LOCATION
      ======================================================== -->
      <div v-show="currentStep === 'location'" class="space-y-6">
        <!-- ROW 1: Country | State / Province | City -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Country -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Country
            </label>
            <div class="relative">
              <select
                v-model="form.country"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="c in countryOptions"
                  :key="c"
                  :value="c"
                >
                  {{ c }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- State / Province -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              State / Province
            </label>
            <div class="relative">
              <select
                v-model="form.state"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select state...</option>
                <option
                  v-for="s in stateOptions"
                  :key="s"
                  :value="s"
                >
                  {{ s }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- City -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              City
            </label>
            <div class="relative">
              <select
                v-model="form.city"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled selected>Select city...</option>
                <option
                  v-for="ct in cityOptions"
                  :key="ct"
                  :value="ct"
                >
                  {{ ct }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <!-- ROW 2: Area / Suburb | Pincode / Zip Code -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Area / Suburb -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Area / Suburb
            </label>
            <input
              v-model="form.areaSuburb"
              type="text"
              placeholder="e.g. Indiranagar, HSR Layout"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Pincode / Zip Code -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Pincode / Zip Code
            </label>
            <input
              v-model="form.postalCode"
              type="text"
              placeholder="e.g. 560038"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Empty 3rd column matching screenshot -->
          <div class="hidden md:block"></div>
        </div>

        <!-- ROW 3: Detailed Address -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Detailed Address
          </label>
          <textarea
            v-model="form.address"
            rows="4"
            placeholder="Full building/street address..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>
      </div>

      <!-- =======================================================
           STEP 5: COMPANY PROFILE
      ======================================================== -->
      <div v-show="currentStep === 'company'" class="space-y-6">
        <!-- ROW 1: Company Name * | Company Logo URL | Company Website -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Company Name * -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Company Name <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.companyName"
              type="text"
              placeholder="ADS"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Company Logo URL -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Company Logo URL
            </label>
            <input
              v-model="form.companyLogoUrl"
              type="text"
              placeholder="https://example.com/logo.png"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Company Website -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Company Website
            </label>
            <input
              v-model="form.companyWebsite"
              type="text"
              placeholder="https://example.com"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 2: Industry | Company Size | Founded Year -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Industry -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Industry
            </label>
            <input
              v-model="form.industry"
              type="text"
              placeholder="Software & IT Services"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Company Size -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Company Size
            </label>
            <div class="relative">
              <select
                v-model="form.companySize"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="size in companySizeOptions"
                  :key="size"
                  :value="size"
                >
                  {{ size }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Founded Year -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Founded Year
            </label>
            <input
              v-model="form.foundedYear"
              type="text"
              placeholder="e.g. 2018"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 3: Company Type | HR / Contact Email | Contact Phone -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Company Type -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Company Type
            </label>
            <div class="relative">
              <select
                v-model="form.companyType"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option
                  v-for="type in companyTypeOptions"
                  :key="type"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- HR / Contact Email -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              HR / Contact Email
            </label>
            <input
              v-model="form.contactEmail"
              type="email"
              placeholder="hr@example.com"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Contact Phone -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Contact Phone
            </label>
            <div class="flex items-center gap-2">
              <div class="relative w-36 shrink-0">
                <select
                  v-model="form.phoneCountryCode"
                  class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
                >
                  <option
                    v-for="country in phoneCountryCodeOptions"
                    :key="country.code"
                    :value="country.code"
                  >
                    {{ country.label }}
                  </option>
                </select>
                <ChevronDown
                  class="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />
              </div>
              <input
                v-model="form.contactPhone"
                type="tel"
                placeholder="10-digit phone numb..."
                class="h-11 flex-1 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        <!-- ROW 4: Company Overview / Description -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Company Overview / Description
          </label>
          <textarea
            v-model="form.companyOverview"
            rows="4"
            placeholder="Brief summary of the company culture, mission, and achievements..."
            class="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>

        <!-- ROW 5: Bottom Checkbox -->
        <div>
          <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="form.saveCompanyProfile"
              class="h-4 w-4 rounded border-slate-300 text-blue-600 accent-[#2563EB] focus:ring-blue-500 cursor-pointer"
            />
            <span class="text-sm font-medium text-slate-700">
              Save this company profile for future job posts
            </span>
          </label>
        </div>
      </div>

      <!-- =======================================================
           STEP 6: OFFICE FACILITIES
      ======================================================== -->
      <div v-show="currentStep === 'facilities'" class="space-y-6">
        <!-- Checklist Grid (4 columns on desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            v-for="facility in officeFacilitiesList"
            :key="facility"
            type="button"
            @click="toggleFacility(facility)"
            class="flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-xs sm:text-sm font-medium transition cursor-pointer"
            :class="
              form.selectedFacilities.includes(facility)
                ? 'border-[#4338CA] bg-indigo-50/50 text-slate-900 shadow-xs ring-1 ring-[#4338CA]'
                : 'border-slate-200 bg-[#f8fafc]/60 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            "
          >
            <div
              class="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
              :class="
                form.selectedFacilities.includes(facility)
                  ? 'border-[#4338CA] bg-[#4338CA] text-white'
                  : 'border-slate-300 bg-white'
              "
            >
              <Check
                v-if="form.selectedFacilities.includes(facility)"
                class="h-3 w-3 stroke-[3]"
              />
            </div>
            <span class="leading-tight text-slate-700 select-none">{{ facility }}</span>
          </button>
        </div>
      </div>

      <!-- =======================================================
           STEP 7: SHIFT & TRAVEL
      ======================================================== -->
      <div v-show="currentStep === 'shift'" class="space-y-6">
        <!-- ROW 1: Shift Type | Shift Start Time | Shift End Time -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Shift Type -->
          <div class="relative">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Shift Type
            </label>
            <div class="relative">
              <select
                v-model="form.shiftType"
                class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              >
                <option value=""></option>
                <option
                  v-for="shift in shiftTypeOptions"
                  :key="shift"
                  :value="shift"
                >
                  {{ shift }}
                </option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <!-- Shift Start Time -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Shift Start Time
            </label>
            <input
              v-model="form.shiftStartTime"
              type="time"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Shift End Time -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Shift End Time
            </label>
            <input
              v-model="form.shiftEndTime"
              type="time"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 2: Working Days | Weekly Off | Daily Working Hours -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Working Days -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Working Days
            </label>
            <input
              v-model="form.workingDays"
              type="text"
              placeholder="e.g. 5 Days (Mon-Fri)"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Weekly Off -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Weekly Off
            </label>
            <input
              v-model="form.weeklyOff"
              type="text"
              placeholder="e.g. Saturday & Sunday"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Daily Working Hours -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Daily Working Hours
            </label>
            <input
              v-model="form.dailyWorkingHours"
              type="text"
              placeholder="e.g. 8 Hours/Day"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- ROW 3: Expected Joining Date -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Expected Joining Date
            </label>
            <input
              v-model="form.expectedJoiningDate"
              type="date"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div class="hidden md:block"></div>
          <div class="hidden md:block"></div>
        </div>

        <!-- ROW 4: Checkbox Cards (Travel Required | Candidate Relocation Required) -->
        <div class="border-t border-slate-100 pt-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Travel Required for this Role -->
            <button
              type="button"
              @click="form.travelRequired = !form.travelRequired"
              class="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition cursor-pointer"
              :class="
                form.travelRequired
                  ? 'border-[#4338CA] bg-indigo-50/50 text-slate-900 shadow-xs ring-1 ring-[#4338CA]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
              "
            >
              <div
                class="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                :class="
                  form.travelRequired
                    ? 'border-[#4338CA] bg-[#4338CA] text-white'
                    : 'border-slate-300 bg-white'
                "
              >
                <Check
                  v-if="form.travelRequired"
                  class="h-3 w-3 stroke-[3]"
                />
              </div>
              <span class="text-sm font-medium text-slate-700 select-none">
                Travel Required for this Role
              </span>
            </button>

            <!-- Candidate Relocation Required -->
            <button
              type="button"
              @click="form.relocationRequired = !form.relocationRequired"
              class="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition cursor-pointer"
              :class="
                form.relocationRequired
                  ? 'border-[#4338CA] bg-indigo-50/50 text-slate-900 shadow-xs ring-1 ring-[#4338CA]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
              "
            >
              <div
                class="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                :class="
                  form.relocationRequired
                    ? 'border-[#4338CA] bg-[#4338CA] text-white'
                    : 'border-slate-300 bg-white'
                "
              >
                <Check
                  v-if="form.relocationRequired"
                  class="h-3 w-3 stroke-[3]"
                />
              </div>
              <span class="text-sm font-medium text-slate-700 select-none">
                Candidate Relocation Required
              </span>
            </button>
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
