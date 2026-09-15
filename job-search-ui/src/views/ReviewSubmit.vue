<script setup lang="ts">
import {
  BadgeCheck,
  Building2,
  Eye,
  Globe,
  CheckCircle2,
  MapPin,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-vue-next";
import CompanyPreview from "../components/CompanyPreview.vue";

const emit = defineEmits<{
  (e: "back"): void;
  (e: "submit"): void;
}>();

/* ---------------------------------
   Company Information
---------------------------------- */

const companyDetails = [
  {
    label: "LEGAL NAME",
    value: "fv f b",
  },
  {
    label: "DISPLAY NAME",
    value: "fSDSAF",
  },
  {
    label: "INDUSTRY",
    value: "Software & IT Services",
  },
  {
    label: "ORGANIZATION TYPE",
    value: "Private",
  },
  {
    label: "OFFICIAL EMAIL",
    value: "ekresharavani@gmail.com",
  },
  {
    label: "CONTACT PHONE",
    value: "+91 9850734450",
  },
  {
    label: "HEADQUARTERS",
    value: "Amravati, Maharashtra, India",
  },
  {
    label: "PINCODE",
    value: "234567",
  },
];

/* ---------------------------------
   Legal / Tax Information
---------------------------------- */

const taxDetails = [
  {
    label: "CIN",
    value: "U72200MH2020PTC123456",
  },
  {
    label: "PAN",
    value: "N/A",
  },
  {
    label: "GSTIN",
    value: "N/A",
  },
  {
    label: "UDYAM NO.",
    value: "23456",
  },
];

/* ---------------------------------
   Primary Contact
---------------------------------- */

const primaryContact = {
  role: "Owner",
  id: "21",
};

/* ---------------------------------
   Preview Information
---------------------------------- */

const previewDetails = [
  {
    label: "India",
    icon: MapPin,
  },
  {
    label: "11-50 employees",
    icon: Users,
  },
  {
    label: "Private",
    icon: BriefcaseBusiness,
  },
  {
    label: "Est. 2026",
    icon: CalendarDays,
  },
];

/* ---------------------------------
   Submit
---------------------------------- */

function handleSubmit() {
  emit("submit");
}
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-1 overflow-hidden">
    <div class="grid h-full min-h-0 w-full grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">

      <!-- =========================================
           LEFT : REVIEW REGISTRATION
      ========================================== -->
      <div
        class="review-submit-scroll min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >

        <!-- Header -->
        <div
          class="flex items-start gap-3 border-b border-slate-200 pb-4"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50"
          >
            <BadgeCheck class="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 class="text-md font-bold text-slate-900">
              Review Registration Schema
            </h2>

            <p class="mt-1 text-xs text-slate-500">
              Confirm all company schema fields before submission.
            </p>
          </div>
        </div>

        <!-- =====================================
             COMPANY INFORMATION CARD
        ====================================== -->
        <div
          class="mt-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3"
        >

          <!-- Company Details -->
          <div class="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">

            <div
              v-for="item in companyDetails"
              :key="item.label"
            >
              <p
                class="text-[10px] font-semibold tracking-wide text-slate-400"
              >
                {{ item.label }}
              </p>

              <p
                class="mt-1 text-[12px] font-medium text-slate-900"
              >
                {{ item.value }}
              </p>
            </div>

          </div>

          <!-- Tax Details -->
          <div
            class="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
          >
            <div
              v-for="item in taxDetails"
              :key="item.label"
            >
              <p
                class="text-[10px] font-semibold tracking-wide text-slate-400"
              >
                {{ item.label }}
              </p>

              <p
                class="mt-1 break-all text-[12px] font-medium text-slate-900"
              >
                {{ item.value }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="my-3 border-t border-slate-200"></div>

          <!-- Primary Contact -->
          <div class="flex items-center justify-between gap-3">

            <div class="flex items-center gap-2">
              <CheckCircle2
                class="h-4 w-4 text-emerald-500"
              />

              <span class="text-[12px] text-slate-600">
                Primary Contact Role:
                <span class="font-medium text-slate-700">
                  {{ primaryContact.role }}
                </span>
                (ID: {{ primaryContact.id }})
              </span>
            </div>

            <span
              class="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-600"
            >
              PRIMARY CONTACT
            </span>

          </div>
        </div>

        <!-- =====================================
             EMPLOYER AGREEMENT
        ====================================== -->
        <div
          class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4"
        >
          <div class="flex items-start gap-3">

            <ShieldCheck
              class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
            />

            <div>
              <p
                class="text-[12px] font-bold text-amber-700"
              >
                Employer Agreement
              </p>

              <p
                class="mt-1 text-[12px] leading-5 text-amber-700"
              >
                By submitting, you verify that you are an authorized
                representative of this company and agree to NxtTurn Employer
                Terms.
              </p>
            </div>

          </div>
        </div>

        <!-- =====================================
             BOTTOM BUTTONS
        ====================================== -->
        <div
          class="mt-8 flex items-center justify-between border-t border-slate-200 pt-5"
        >

          <!-- Back -->
          <button
            type="button"
            @click="emit('back')"
            class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>

          <!-- Submit -->
          <button
            type="button"
            @click="handleSubmit"
            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Sparkles class="h-4 w-4" />

            Submit Company Registration
          </button>

        </div>
      </div>


      <!-- =========================================
           RIGHT : LIVE CARD PREVIEW
      ========================================== -->
      <aside class="min-h-0 min-w-0 overflow-hidden">
        <CompanyPreview
          company-name="fSDSAF"
          industry="Software & IT Services"
          legal-info="fv f b"
          location="Amravati, Maharashtra, India"
          company-size="11-50 employees"
          organization-type="Private"
          founded-year="2026"
          tax-status="Document Attached"
          verified
        />
        <div v-if="false">

        <!-- Preview Heading -->
        <div class="mb-2 flex items-center justify-between">

          <div
            class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-slate-500"
          >
            <Eye class="h-4 w-4 text-indigo-500" />
            Live Card Preview
          </div>

          <span class="text-[11px] text-slate-400">
            Employer Profile
          </span>

        </div>

        <!-- Preview Card -->
        <div
          class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >

          <div class="p-5">

            <!-- Company Header -->
            <div class="flex items-start gap-4">

              <!-- Logo -->
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50"
              >
                <Building2
                  class="h-7 w-7 text-indigo-600"
                />
              </div>

              <!-- Name -->
              <div class="min-w-0">

                <div class="flex items-center gap-2">

                  <h3
                    class="truncate text-[17px] font-bold text-slate-900"
                  >
                    fSDSAF
                  </h3>

                  <CheckCircle2
                    class="h-4 w-4 shrink-0 text-emerald-500"
                  />

                </div>

                <p
                  class="text-[12px] font-medium text-indigo-600"
                >
                  Software & IT Services
                </p>

                <p
                  class="text-[10px] text-slate-400"
                >
                  Legal: fv f b
                </p>

              </div>
            </div>

            <!-- Tagline -->
            <p
              class="mt-3 text-[11px] italic leading-5 text-slate-500"
            >
              "Company tagline or mission statement will display here."
            </p>

            <div class="my-3 border-t border-slate-200"></div>

            <!-- Preview Details -->
            <div
              class="grid grid-cols-2 gap-x-4 gap-y-3"
            >

              <div
                v-for="item in previewDetails"
                :key="item.label"
                class="flex items-center gap-2"
              >
                <component
                  :is="item.icon"
                  class="h-4 w-4 shrink-0 text-slate-400"
                />

                <span
                  class="truncate text-[11px] text-slate-500"
                >
                  {{ item.label }}
                </span>
              </div>

            </div>

            <!-- Tax Verification -->
            <div class="mt-4 flex items-center justify-between"
            >
              <span
                class="text-[10px] font-medium text-slate-400"
              >
                Tax Verification
              </span>

              <span
                class="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"
              >
                Document Attached
              </span>
            </div>

            <!-- Company Profile Button -->
            <button
              type="button"
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 text-[12px] font-medium text-slate-600"
            >
              <Globe class="h-4 w-4" />
              Company Profile
            </button>

          </div>
        </div>


        <!-- =====================================
             SANITIZATION INFORMATION
        ====================================== -->
        <div
          class="mt-4 rounded-lg border border-indigo-100 bg-indigo-50/70 p-4"
        >

          <div class="flex items-center gap-2">
            <ShieldCheck
              class="h-4 w-4 text-indigo-600"
            />

            <p
              class="text-[11px] font-bold text-indigo-700"
            >
              Native DOM Instant Sanitization
            </p>
          </div>

          <ul
            class="mt-2 space-y-1.5 pl-4 text-[11px] leading-4 text-indigo-600"
          >
            <li class="list-disc">
              Invalid characters stripped instantly on keystroke
            </li>

            <li class="list-disc">
              Search bar blocks special symbols
            </li>

            <li class="list-disc">
              PAN, GSTIN & Phone strictly filtered per field rules
            </li>
          </ul>

        </div>

        </div>
      </aside>

    </div>
  </div>
</template>

<style scoped>
.review-submit-scroll {
  scrollbar-color: #cbd5e1 transparent;
  scrollbar-width: thin;
}

.review-submit-scroll::-webkit-scrollbar {
  width: 6px;
}

.review-submit-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.review-submit-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

.review-submit-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>