<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Eye,
  ShieldCheck,
  Users,
  Globe,
  MapPin,
} from "lucide-vue-next";

import Navbar from "../components/Navbar.vue";
import CompanyPreview from "../components/CompanyPreview.vue";
import ContactLocation from "./ContactLocation.vue";
import LegalTax from "./LegalTax.vue";
import BrandingBio from "./BrandingBio.vue";
import ReviewSubmit from "./ReviewSubmit.vue";

const router = useRouter();

/* -----------------------------
   FORM DATA
----------------------------- */

const companyForm = ref({
  legalName: "",
  brandName: "",
  industry: "Software & IT Services",
  organizationType: "Private Limited",
  companySize: "11–50 employees",
  foundedYear: "2020",
});

/* -----------------------------
   DROPDOWN OPTIONS
----------------------------- */

const industryOptions = [
  "Software & IT Services",
  "FinTech",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Consulting",
];

const organizationOptions = [
  "Private Limited",
  "Public Limited",
  "LLP",
  "Partnership",
  "Sole Proprietorship",
];

const companySizeOptions = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

/* -----------------------------
   REGISTRATION STEPS
----------------------------- */

const steps = [
  {
    number: 1,
    title: "Company Profile",
  },
  {
    number: 2,
    title: "Contact & Location",
  },
  {
    number: 3,
    title: "Legal & Tax",
  },
  {
    number: 4,
    title: "Branding & Bio",
  },
  {
    number: 5,
    title: "Review & Submit",
  },
];

const currentStep = ref(1);

/* -----------------------------
   NAVIGATION
----------------------------- */

function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.push("/");
  }
}

function continueStep() {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
}

function saveAndExit() {
  console.log("Company registration saved", companyForm.value);

  router.push("/company-dashboard");
}
</script>

<template>
  <div class="fixed inset-0 flex flex-col overflow-hidden bg-slate-50 text-slate-900">

    <!-- =====================================
         EXISTING NAVBAR
    ====================================== -->

    <Navbar :show-secondary="false" />

    <!-- =====================================
         PAGE CONTENT
    ====================================== -->

    <main class="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden px-6 pb-2 pt-0">

      <!-- =====================================
           STEPS
      ====================================== -->

      <section
        class="mt-3 shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
      >
        <div class="flex items-center gap-4 lg:gap-6">
          <button
            @click="goBack"
            class="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-[#4F46E5]"
          >
            <ArrowLeft class="h-4 w-4" />
            <span>Back</span>
          </button>

          <div class="h-6 w-px shrink-0 bg-slate-200" />

          <div class="flex flex-1 items-center justify-between gap-3 overflow-x-auto">
            <template
              v-for="(step, index) in steps"
              :key="step.number"
            >
              <div class="flex items-center gap-3">
                <!-- Number -->
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  :class="
                    currentStep === step.number
                      ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                      : currentStep > step.number
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                        : 'border-slate-300 bg-white text-slate-700'
                  "
                >
                  <span class="text-sm font-semibold">
                    {{ step.number }}
                  </span>
                </div>

                <!-- Text -->
                <div class="hidden lg:block">
                  <p
                    class="text-xs font-semibold"
                    :class="
                      currentStep === step.number
                        ? 'text-[#4F46E5]'
                        : 'text-slate-700'
                    "
                  >
                    {{ step.title }}
                  </p>
                </div>
              </div>

              <!-- Arrow -->
              <ArrowRight
                v-if="index < steps.length - 1"
                class="h-5 w-5 shrink-0 text-slate-400"
              />
            </template>
          </div>
        </div>
      </section>

      <div class="mt-3 min-h-0 flex-1 overflow-hidden">

      <div v-if="currentStep === 1" class="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)]">

        <!-- =====================================
             LEFT FORM
        ====================================== -->

        <section
          class="custom-scroll h-full min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        >

          <!-- Section heading -->

          <div class="flex items-center gap-3">

            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50"
            >
              <Building2 class="h-5 w-5 text-[#4F46E5]" />
            </div>

            <div>
              <h2 class="text-md font-bold text-slate-900">
                Company Core Profile
              </h2>

              <p class="text-xs text-slate-500">
                Enter the core details about your organization.
              </p>
            </div>

          </div>

          <!-- =====================================
               FORM FIELDS
          ====================================== -->

          <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">

            <!-- Legal Company Name -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Legal Company Name
                <span class="text-red-500">*</span>
              </label>

              <input
                v-model="companyForm.legalName"
                type="text"
                placeholder="e.g. Amazon Private Limited"
                class="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <!-- Display Brand Name -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Display Brand Name
                <span class="text-red-500">*</span>
              </label>

              <input
                v-model="companyForm.brandName"
                type="text"
                placeholder="e.g. Acme Corp"
                class="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <!-- Industry -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Industry Sector
                <span class="text-red-500">*</span>
              </label>

              <div class="relative">

                <select
                  v-model="companyForm.industry"
                  class="mt-2 h-8 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
                >
                  <option
                    v-for="industry in industryOptions"
                    :key="industry"
                    :value="industry"
                  >
                    {{ industry }}
                  </option>
                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-2 h-5 w-5 text-slate-500"
                />

              </div>
            </div>

            <!-- Organization -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Organization Type
                <span class="text-red-500">*</span>
              </label>

              <div class="relative">

                <select
                  v-model="companyForm.organizationType"
                  class="mt-2 h-8 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
                >
                  <option
                    v-for="type in organizationOptions"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>

                <ChevronDown
                  class="pointer-events-none absolute right-3 top-2 h-5 w-5 text-slate-500"
                />

              </div>
            </div>

            <!-- Company Size -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Company Size
                <span class="text-red-500">*</span>
              </label>

              <div class="relative">

                <select
                  v-model="companyForm.companySize"
                  class="mt-2 h-8 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
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
                  class="pointer-events-none absolute right-3 top-3 h-5 w-5 text-slate-500"
                />

              </div>
            </div>

            <!-- Founded Year -->

            <div>
              <label class="text-xs font-bold uppercase tracking-wide text-slate-600">
                Founded Year
                <span class="text-red-500">*</span>
              </label>

              <div class="relative">

                <input
                  v-model="companyForm.foundedYear"
                  type="number"
                  class="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
                />

                <CalendarDays
                  class="pointer-events-none absolute right-3 top-2 h-4 w-4 text-slate-500"
                />

              </div>
            </div>

          </div>

          <!-- =====================================
               CONTINUE
          ====================================== -->

          <div class="mt-8 flex justify-end">

            <button
              @click="continueStep"
              class="inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338CA]"
            >
              Continue
              <ArrowRight class="h-4 w-4" />
            </button>

          </div>

        </section>

        <!-- =====================================
             RIGHT LIVE PREVIEW
        ====================================== -->
        <aside class="custom-scroll h-full min-h-0 min-w-0 overflow-y-auto pr-1">
          <CompanyPreview
            :company-name="companyForm.brandName || companyForm.legalName"
            :industry="companyForm.industry"
            :legal-info="companyForm.legalName"
            :company-size="companyForm.companySize"
            :organization-type="companyForm.organizationType"
            :founded-year="companyForm.foundedYear"
          />
        </aside> 

<div v-if="false" class="space-y-4">

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
                  {{ companyForm.brandName || "Company Name" }}
                </h3>

                <p class="text-sm font-medium text-indigo-600">
                  {{ companyForm.industry }}
                </p>

                <p class="text-xs text-slate-400">
                  Legal Name:
                  {{ companyForm.legalName || "Legal company name" }}
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
              class="my-4 border-t border-slate-200"
            ></div>

            <!-- PREVIEW ITEMS -->

            <div
              class="grid grid-cols-2 gap-y-4"
            >

              <div class="flex items-center gap-2 text-xs text-slate-600">
                <MapPin class="h-4 w-4 text-slate-400" />
                <span>Nagpur</span>
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-600">
                <Users class="h-4 w-4 text-slate-400" />
                <span>{{ companyForm.companySize }}</span>
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-600">
                <Building2 class="h-4 w-4 text-slate-400" />
                <span>{{ companyForm.organizationType }}</span>
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-600">
                <CalendarDays class="h-4 w-4 text-slate-400" />
                <span>Est. {{ companyForm.foundedYear }}</span>
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
        
          <div class="rounded-lg border border-indigo-100 bg-indigo-50/70 px-4 py-4 text-indigo-900">
          <div class="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck class="h-4 w-4 text-indigo-600" />
            <span>Native DOM Instant Sanitization</span>
          </div>

          <ul class="mt-2 space-y-1 text-xs text-indigo-700">
            <li class="flex gap-2">
              <span aria-hidden="true">&#8226;</span>
              <span>Invalid characters stripped instantly on keystroke</span>
            </li>
            <li class="flex gap-2">
              <span aria-hidden="true">&#8226;</span>
              <span>Search bar blocks special symbols</span>
            </li>
            <li class="flex gap-2">
              <span aria-hidden="true">&#8226;</span>
              <span>PAN, GSTIN &amp; Phone strictly filtered per field rules</span>
            </li>
          </ul>
          </div>

        </div>

      </div>

      <ContactLocation
        v-else-if="currentStep === 2"
        @back="currentStep--"
        @continue="continueStep"
      />

      <LegalTax
        v-else-if="currentStep === 3"
        @back="currentStep--"
        @continue="continueStep"
      />

      <BrandingBio
        v-else-if="currentStep === 4"
        @back="currentStep--"
        @continue="continueStep"
      />

      <ReviewSubmit
        v-else-if="currentStep === 5"
        @back="currentStep--"
        @submit="saveAndExit"
      />

      </div>

    </main>

  </div>
</template>