<script setup lang="ts">
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  Eye,
  ShieldCheck,
} from "lucide-vue-next";

import { computed, ref } from "vue";
import CompanyPreview from "../components/CompanyPreview.vue";

/* =========================
   EMITS
========================= */

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

/* =========================
   FORM DATA
========================= */

const form = ref({
  email: "",
  phone: "",
  website: "",
  country: "Nagpur",
  state: "",
  city: "",
  streetAddress: "",
  pincode: "",
});

/* =========================
   CONTACT FIELDS
========================= */

const contactFields = [
  {
    label: "Official Company Email",
    key: "email",
    type: "email",
    placeholder: "ekreshavani@gmail.com",
    required: true,
    icon: Mail,
    grid: "md:col-span-1",
  },
  {
    label: "Company Phone",
    key: "phone",
    type: "tel",
    placeholder: "9876543210",
    required: true,
    icon: Phone,
    grid: "md:col-span-1",
  },
  {
    label: "Official Website URL",
    key: "website",
    type: "url",
    placeholder: "https://www.yourcompany.com",
    required: false,
    icon: Globe,
    grid: "md:col-span-2",
  },
];

/* =========================
   LOCATION SELECT FIELDS
========================= */

const locationFields = [
  {
    label: "Country",
    key: "country",
    placeholder: "Select Country",
    required: true,
    options: [
      "India",
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
    ],
  },
  {
    label: "State / Region",
    key: "state",
    placeholder: "Select State",
    required: true,
    options: [
      "Maharashtra",
      "Karnataka",
      "Gujarat",
      "Delhi",
      "Telangana",
      "Tamil Nadu",
      "West Bengal",
    ],
  },
  {
    label: "City",
    key: "city",
    placeholder: "Select City",
    required: true,
    options: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Bangalore",
      "Hyderabad",
      "Delhi",
    ],
  },
];

/* =========================
   ADDRESS FIELDS
========================= */

const addressFields = [
  {
    label: "Street Address",
    key: "streetAddress",
    type: "text",
    placeholder: "123 Corporate Park, Tech Zone",
    required: true,
    grid: "md:col-span-2",
  },
  {
    label: "Pincode / ZIP Code",
    key: "pincode",
    type: "text",
    placeholder: "e.g. 560001",
    required: true,
    grid: "md:col-span-1",
  },
];

/* =========================
   PREVIEW INFORMATION
========================= */

const previewItems = computed(() => [
  {
    label: "Location",
    value:
      form.value.city && form.value.state
        ? `${form.value.city}, ${form.value.state}`
        : "India",
    icon: MapPin,
  },
  {
    label: "Employees",
    value: "11–50 employees",
    icon: Users,
  },
  {
    label: "Type",
    value: "Private",
    icon: Building2,
  },
  {
    label: "Founded",
    value: "Est. 2026",
    icon: CalendarDays,
  },
]);

/* =========================
   SECURITY INFORMATION
========================= */

const securityItems = [
  "Invalid characters stripped instantly on keystroke",
  "Search bar blocks special symbols",
  "PAN, GSTIN & Phone strictly filtered per field rules",
];

/* =========================
   PREVIEW DETAILS
========================= */

const previewCompany = [
  {
    label: "Company Name",
    value: "Company Name",
  },
  {
    label: "Industry",
    value: "Software & IT Services",
  },
  {
    label: "Legal Name",
    value: "Legal company name",
  },
];

/* =========================
   FUNCTIONS
========================= */

function handleContinue() {
  emit("continue");
}

function handleBack() {
  emit("back");
}
</script>

<template>
  <div class="h-full min-h-0 w-full flex-1 overflow-hidden bg-slate-50">

    <div
      class="grid h-full min-h-0 w-full grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_380px]"
    >

      <!-- =====================================
           LEFT FORM
        ====================================== -->

      <div
        class="custom-scroll h-full min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >

        <!-- HEADER -->

        

          <div class="flex items-center gap-3">

            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50"
            >
              <MapPin class="h-5 w-5 text-indigo-600" />
            </div>

            <div>

              <h1 class="text-md font-bold text-slate-900">
                Contact & Location Details
              </h1>

              <p class=" text-xs text-slate-500">
                Help applicants and partners get in touch with your team.
              </p>

            </div>

        </div>

        <!-- =====================================
             CONTACT FIELDS
        ====================================== -->

        <div class="mt-5">

          <div class="grid gap-3 md:grid-cols-2">

            <div
              v-for="field in contactFields"
              :key="field.key"
              :class="field.grid"
            >

              <!-- LABEL -->

              <label
                class="text-xs font-bold uppercase tracking-wide text-slate-700"
              >
                {{ field.label }}

                <span
                  v-if="field.required"
                  class="text-red-500"
                >
                  *
                </span>
              </label>

              <!-- INPUT -->

              <div class="relative mt-2">

                <component
                  :is="field.icon"
                  class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />

                <input
                  v-model="form[field.key as keyof typeof form]"
                  :type="field.type"
                  :placeholder="field.placeholder"
                  class="h-8 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

            </div>

          </div>

        </div>

        <!-- =====================================
             HEADQUARTERS
        ====================================== -->

        

          <h2
            class="mt-4 text-sm font-bold uppercase tracking-wide text-slate-700"
          >
            Headquarters Location
          </h2>

          <!-- COUNTRY STATE CITY -->

          <div
            class="mt-2 grid gap-4 md:grid-cols-3"
          >

            <div
              v-for="field in locationFields"
              :key="field.key"
            >

              <label
                class="text-xs font-medium text-slate-600"
              >
                {{ field.label }}

                <span
                  v-if="field.required"
                  class="text-red-500"
                >
                  *
                </span>
              </label>

              <select
                v-model="form[field.key as keyof typeof form]"
                class="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >

                <option
                  v-if="field.key !== 'country'"
                  value=""
                >
                  {{ field.placeholder }}
                </option>

                <option
                  v-for="option in field.options"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>

              </select>

            </div>


          <!-- ADDRESS -->

          <div
            class="mt-2 grid gap-4 md:grid-cols-3"
          >

            <div
              v-for="field in addressFields"
              :key="field.key"
              :class="field.grid"
            >

              <label
                class="text-xs font-medium text-slate-600"
              >
                {{ field.label }}

                <span
                  v-if="field.required"
                  class="text-red-500"
                >
                  *
                </span>
              </label>

              <input
                v-model="form[field.key as keyof typeof form]"
                :type="field.type"
                :placeholder="field.placeholder"
                class="mt-2 h-8 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

        </div>

        <!-- =====================================
             BUTTONS
        ====================================== -->

        <div
          class="mt-3 flex items-center justify-between border-t border-slate-200 pt-6"
        >

          <button
            @click="handleBack"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft class="h-4 w-4" />

            Back
          </button>

          <button
            @click="handleContinue"
            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Continue

            <ArrowRight class="h-4 w-4" />
          </button>

        </div>

      </div>

      <!-- =====================================
           RIGHT SIDEBAR
      ====================================== -->

      <aside class="custom-scroll h-full min-h-0 min-w-0 overflow-y-auto pr-1">
        <CompanyPreview
          :company-name="previewCompany[0].value"
          :industry="previewCompany[1].value"
          :legal-info="previewCompany[2].value"
          :location="previewItems[0].value"
          :company-size="previewItems[1].value"
          :organization-type="previewItems[2].value"
          :founded-year="previewItems[3].value"
        />
        <div v-if="false">

        <!-- LIVE PREVIEW -->

        <div>

          <!-- PREVIEW HEADER -->

          <div class="flex items-center justify-between">

            <div class="flex items-center gap-2">

              <Eye class="h-4 w-4 text-indigo-600" />

              <h2
                class="text-xs font-bold text-slate-700"
              >
                LIVE CARD PREVIEW
              </h2>

            </div>

            <span class="text-xs text-slate-400">
              Employer Profile
            </span>

          </div>

          <!-- PREVIEW CARD -->

          <div
            class="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >

            <div class="p-5">

            <!-- COMPANY -->

            <div class="flex items-start gap-3">

              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-indigo-50"
              >
                <Building2
                  class="h-7 w-7 text-indigo-600"
                />
              </div>

              <div class="min-w-0">

                <h3 class="font-bold text-slate-900">
                  {{ previewCompany[0].value }}
                </h3>

                <p class="text-sm font-medium text-indigo-600">
                  {{ previewCompany[1].value }}
                </p>

                <p class="text-xs text-slate-400">
                  {{ previewCompany[2].label }}:
                  {{ previewCompany[2].value }}
                </p>

              </div>

            </div>

            <p
              class="mt-4 text-xs italic text-slate-500"
            >
              "Company tagline or mission statement will
              display here."
            </p>

            <div
              class="my-3 border-t border-slate-200"
            ></div>

            <!-- PREVIEW ITEMS -->

            <div
              class="grid grid-cols-2 gap-y-4"
            >

              <div
                v-for="item in previewItems"
                :key="item.label"
                class="flex items-center gap-2 text-xs text-slate-600"
              >

                <component
                  :is="item.icon"
                  class="h-4 w-4 text-slate-400"
                />

                <span>
                  {{ item.value }}
                </span>

              </div>

            </div>

           

            <!-- TAX -->

            <div
              class="mt-5 flex items-center justify-between text-xs"
            >

              <span
                class="font-semibold text-slate-400"
              >
                Tax Verification
              </span>

              <span class="text-slate-400">
                Pending Docs
              </span>

            </div>

            <button
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-600"
            >
              <Globe class="h-4 w-4" />

              Company Profile
            </button>

            </div>

          </div>

        </div>

        <!-- =====================================
             SECURITY CARD
        ====================================== -->

        <div
          class="rounded-lg border border-indigo-100 bg-indigo-50/70 p-4"
        >

          <div class="flex items-center gap-2">

            <ShieldCheck
              class="h-5 w-5 text-indigo-600"
            />

            <h3
              class="text-sm font-bold text-indigo-800"
            >
              Native DOM Instant Sanitization
            </h3>

          </div>

          <ul
            class="mt-3 space-y-2 text-xs text-indigo-700"
          >

            <li
              v-for="item in securityItems"
              :key="item"
              class="flex gap-2"
            >
              <span>•</span>

              <span>
                {{ item }}
              </span>

            </li>

          </ul>

        </div>

        </div>
      </aside>

    </div>

  </div>
</template>