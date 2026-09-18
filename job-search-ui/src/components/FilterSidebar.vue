<script setup lang="ts">
import {
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  Navigation,
  BriefcaseBusiness,
  GraduationCap,
  Building2,
  Layers3,
  BookOpen,
  UserRound,
  Clock3,
  UsersRound,
} from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps<{
  mode?: "job" | "internship";
}>();

/* -----------------------------
   FILTER STATE
----------------------------- */

const salary = ref(300);

const openSections = ref<Record<string, boolean>>({
  location: true,
  jobType: false,
  experience: false,
  department: false,
  companyType: false,
  roleCategory: false,
  education: false,
  postedBy: false,
  industry: false,
  freshness: false,
  applicants: false,
  workMode: false,
});

/* -----------------------------
   LOCATION
----------------------------- */

const locality = ref("");

const selectedCountry = ref("");
const selectedState = ref("");
const selectedDistrict = ref("");
const selectedCity = ref("");

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
];

const states = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Telangana",
  "Gujarat",
];

const districts = [
  "Nagpur",
  "Pune",
  "Mumbai",
  "Chandrapur",
  "Nashik",
];

const cities = [
  "Nagpur",
  "Pune",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
];

/* -----------------------------
   OTHER FILTER OPTIONS
----------------------------- */

const jobTypes = [
  "Hybrid",
  "Remote",
  "Full-Time",
  "Part-Time",
];

const experience = [
  "Entry Level",
  "Intermediate",
  "Expert",
];

const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
];

const companyTypes = [
  "Startup",
  "Enterprise",
  "Agency",
  "Remote First",
];

const roleCategories = [
  "Developer",
  "Manager",
  "Analyst",
  "Designer",
];

const educations = [
  "Bachelor",
  "Master",
  "PhD",
  "Diploma",
];

const postedBy = [
  "Recruiter",
  "Company",
  "Agency",
];

const industries = [
  "IT Services",
  "Fintech",
  "Healthcare",
  "E-commerce",
];

const freshness = [
  "Any Time",
  "Last 24 Hours",
  "Last 7 Days",
  "Last 30 Days",
];

const applicants = [
  "Less than 10",
  "10 to 50",
  "50 to 100",
];

/* -----------------------------
   TOGGLE SECTION
----------------------------- */

function toggleSection(section: string) {
  openSections.value[section] =
    !openSections.value[section];
}

/* -----------------------------
   CURRENT LOCATION
----------------------------- */

function useCurrentLocation() {
  locality.value = "Current Location";
}

/* -----------------------------
   CLEAR FILTERS
----------------------------- */

function clearAll() {
  salary.value = 300;

  locality.value = "";

  selectedCountry.value = "";
  selectedState.value = "";
  selectedDistrict.value = "";
  selectedCity.value = "";
}
</script>

<template>
  <aside
    class="ui-card ui-card--compact flex h-full min-h-0 w-full flex-col rounded-lg overflow-hidden"
  >

    <!-- =========================================
         FILTER HEADER
    ========================================== -->

    <div
      class="shrink-0 border-b border-slate-200 bg-white px-3 py-3"
    >
      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600"
          >
            <SlidersHorizontal class="h-4 w-4" />
          </div>

          <div>
            <h2 class="text-sm font-semibold text-slate-900">
              Filters
            </h2>

            <p class="text-[11px] text-slate-400">
              0 active
            </p>
          </div>

        </div>

        <button
          type="button"
          @click="clearAll"
          class="text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          Clear all
        </button>

      </div>
    </div>


    <!-- =========================================
         SCROLLABLE FILTER CONTENT
    ========================================== -->

    <div
      class="flex-1 min-h-0 overflow-y-auto scrollbar-hide"
    >

      <div class="px-3">


        <!-- =====================================
             LOCATION
        ====================================== -->

        <div class="border-b border-slate-200 py-3">

          <!-- Simple text row -->
          <div
            class="flex cursor-pointer items-center justify-between"
            @click="toggleSection('location')"
          >

            <div class="flex items-center gap-2">

              <MapPin
                class="h-4 w-4 text-violet-600"
              />

              <span
                class="text-sm font-semibold text-slate-900"
              >
                Location
              </span>

            </div>

            <ChevronDown
              class="h-4 w-4 text-slate-500 transition-transform duration-200"
              :class="
                openSections.location
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>


          <!-- Location content -->
          <div
            v-if="openSections.location"
            class="mt-3"
          >

            <!-- Locality -->
            <div>

              <label
                class="mb-1.5 block text-xs font-medium text-slate-600"
              >
                Nearby Locality / Landmark
              </label>

              <input
                v-model="locality"
                type="text"
                placeholder="e.g. Manish Nagar, Katol Road"
                class="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />

            </div>


            <!-- Current Location -->
            <button
              type="button"
              @click="useCurrentLocation"
              class="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-violet-50 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
            >

              <Navigation class="h-3.5 w-3.5" />

              Use Current Location

            </button>


            <!-- Country -->
            <div class="mt-3">

              <label
                class="mb-1.5 block text-xs font-semibold text-slate-800"
              >
                Country
              </label>

              <div class="relative">

                <select
                  v-model="selectedCountry"
                  class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 pr-9 text-xs text-slate-600 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                >

                  <option value="" disabled>
                    Select country
                  </option>

                  <option
                    v-for="country in countries"
                    :key="country"
                    :value="country"
                  >
                    {{ country }}
                  </option>

                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            <!-- State -->
            <div class="mt-3">

              <label
                class="mb-1.5 block text-xs font-semibold text-slate-800"
              >
                State
              </label>

              <div class="relative">

                <select
                  v-model="selectedState"
                  class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 pr-9 text-xs text-slate-600 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                >

                  <option value="" disabled>
                    Select state
                  </option>

                  <option
                    v-for="state in states"
                    :key="state"
                    :value="state"
                  >
                    {{ state }}
                  </option>

                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            <!-- District -->
            <div class="mt-3">

              <label
                class="mb-1.5 block text-xs font-semibold text-slate-800"
              >
                District
              </label>

              <div class="relative">

                <select
                  v-model="selectedDistrict"
                  class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 pr-9 text-xs text-slate-600 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                >

                  <option value="" disabled>
                    Select district
                  </option>

                  <option
                    v-for="district in districts"
                    :key="district"
                    :value="district"
                  >
                    {{ district }}
                  </option>

                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            <!-- City -->
            <div class="mt-3">

              <label
                class="mb-1.5 block text-xs font-semibold text-slate-800"
              >
                City
              </label>

              <div class="relative">

                <select
                  v-model="selectedCity"
                  class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 pr-9 text-xs text-slate-600 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                >

                  <option value="" disabled>
                    Select city
                  </option>

                  <option
                    v-for="city in cities"
                    :key="city"
                    :value="city"
                  >
                    {{ city }}
                  </option>

                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

          </div>

        </div>


        <!-- =====================================
             JOB TYPE
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('jobType')"
          >

            <div class="flex items-center gap-2">

              <BriefcaseBusiness class="filter-icon" />

              <span>
                {{ props.mode === "internship"
                  ? "Internship Type"
                  : "Job Type"
                }}
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.jobType
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.jobType"
            class="filter-options"
          >

            <button
              v-for="item in jobTypes"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             EXPERIENCE
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('experience')"
          >

            <div class="flex items-center gap-2">

              <GraduationCap class="filter-icon" />

              <span>
                Experience Level
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.experience
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.experience"
            class="filter-options"
          >

            <button
              v-for="item in experience"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             SALARY RANGE
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('salary')"
          >

            <div class="flex items-center gap-2">

              <span class="text-sm font-semibold text-violet-600">
                ₹
              </span>

              <span>
                Salary Range
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.salary
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.salary"
            class="px-1 pb-2 pt-2"
          >

            <div
              class="mb-2 flex items-center justify-between"
            >

              <span class="text-xs text-slate-500">
                Salary
              </span>

              <span
                class="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white"
              >
                ${{ salary }}
              </span>

            </div>

            <input
              v-model="salary"
              type="range"
              min="300"
              max="5000"
              class="w-full accent-violet-600"
            />

            <div
              class="mt-1 flex justify-between text-[11px] text-slate-400"
            >
              <span>$300</span>
              <span>$5k</span>
            </div>

          </div>

        </div>


        <!-- =====================================
             DEPARTMENT
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('department')"
          >

            <div class="flex items-center gap-2">

              <Building2 class="filter-icon" />

              <span>
                {{ props.mode === "internship"
                  ? "Field"
                  : "Department"
                }}
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.department
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.department"
            class="filter-options"
          >

            <button
              v-for="item in departments"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             COMPANY TYPE
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('companyType')"
          >

            <div class="flex items-center gap-2">

              <Layers3 class="filter-icon" />

              <span>
                Company Type
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.companyType
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.companyType"
            class="filter-options"
          >

            <button
              v-for="item in companyTypes"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             ROLE CATEGORY
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('roleCategory')"
          >

            <div class="flex items-center gap-2">

              <UsersRound class="filter-icon" />

              <span>
                Role Category
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.roleCategory
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.roleCategory"
            class="filter-options"
          >

            <button
              v-for="item in roleCategories"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             EDUCATION
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('education')"
          >

            <div class="flex items-center gap-2">

              <BookOpen class="filter-icon" />

              <span>
                Education
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.education
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.education"
            class="filter-options"
          >

            <button
              v-for="item in educations"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             POSTED BY
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('postedBy')"
          >

            <div class="flex items-center gap-2">

              <UserRound class="filter-icon" />

              <span>
                Posted By
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.postedBy
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.postedBy"
            class="filter-options"
          >

            <button
              v-for="item in postedBy"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             INDUSTRY
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('industry')"
          >

            <div class="flex items-center gap-2">

              <Building2 class="filter-icon" />

              <span>
                Industry
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.industry
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.industry"
            class="filter-options"
          >

            <button
              v-for="item in industries"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             FRESHNESS
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('freshness')"
          >

            <div class="flex items-center gap-2">

              <Clock3 class="filter-icon" />

              <span>
                Freshness
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.freshness
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.freshness"
            class="filter-options"
          >

            <button
              v-for="item in freshness"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


        <!-- =====================================
             APPLICANTS
        ====================================== -->

        <div class="filter-row">

          <div
            class="filter-title"
            @click="toggleSection('applicants')"
          >

            <div class="flex items-center gap-2">

              <UsersRound class="filter-icon" />

              <span>
                Applicants
              </span>

            </div>

            <ChevronDown
              class="filter-chevron"
              :class="
                openSections.applicants
                  ? 'rotate-180'
                  : ''
              "
            />

          </div>

          <div
            v-if="openSections.applicants"
            class="filter-options"
          >

            <button
              v-for="item in applicants"
              :key="item"
              class="filter-option"
            >
              {{ item }}
            </button>

          </div>

        </div>


      </div>

    </div>


    <!-- =========================================
         APPLY BUTTON
    ========================================== -->

    <div
      class="shrink-0 border-t border-slate-200 bg-white p-3"
    >

      <button
        type="button"
        class="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
      >
        Apply Filters
      </button>

    </div>

  </aside>
</template>


<style scoped>

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}


/* --------------------------------
   SIMPLE FILTER ROW
-------------------------------- */

.filter-row {
  border-bottom: 1px solid #e2e8f0;
  padding: 13px 0;
}

.filter-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  color: #0f172a;
  font-size: 14px;
  font-weight: 600;

  transition: color 0.2s ease;
}

.filter-title:hover {
  color: #6d28d9;
}

.filter-icon {
  width: 16px;
  height: 16px;
  color: #7c3aed;
}

.filter-chevron {
  width: 16px;
  height: 16px;
  color: #64748b;

  transition: transform 0.2s ease;
}


/* --------------------------------
   FILTER OPTIONS
-------------------------------- */

.filter-options {
  margin-top: 8px;

  display: flex;
  flex-direction: column;
  gap: 3px;

  border: 1px solid #e2e8f0;
  border-radius: 8px;

  padding: 4px;

  background: #ffffff;
}

.filter-option {
  width: 100%;

  border: 0;
  border-radius: 6px;

  background: transparent;

  padding: 8px 9px;

  text-align: left;

  color: #475569;

  font-size: 12px;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.filter-option:hover {
  background: #f5f3ff;
  color: #6d28d9;
}

</style>