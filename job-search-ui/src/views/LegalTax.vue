<script setup lang="ts">
import { computed, ref } from "vue";
import CompanyPreview from "../components/CompanyPreview.vue";

import {
  Eye,
  FileText,
  ShieldCheck,
  Upload,
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Users,
  CalendarDays,
  Globe,
} from "lucide-vue-next";

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

/* ---------------------------------
   FORM DATA
--------------------------------- */

const cin = ref("");
const llpin = ref("");
const pan = ref("");
const gstin = ref("");
const udyam = ref("");

const documentType = ref("Certificate of Incorporation");
const documentNumber = ref("");

const selectedFile = ref<File | null>(null);

/* ---------------------------------
   DOCUMENT OPTIONS
--------------------------------- */

const documentTypes = [
  "Certificate of Incorporation",
  "GST Registration Certificate",
  "PAN Card",
  "Udyam Registration",
  "Other Verification Document",
];

/* ---------------------------------
   LEGAL IDENTIFIER FIELDS
--------------------------------- */

const legalFields = [
  {
    id: "cin",
    label: "CIN (CORPORATE IDENTIFICATION NUMBER)",
    placeholder: "E.G. U72200MH2020PTC123456",
    model: cin,
    span: "col-span-1",
  },
  {
    id: "llpin",
    label: "LLPIN (FOR LLP COMPANIES)",
    placeholder: "E.G. AAA-1234",
    model: llpin,
    span: "col-span-1",
  },
  {
    id: "pan",
    label: "COMPANY PAN NUMBER",
    placeholder: "ABCDE1234F",
    model: pan,
    span: "col-span-1",
  },
  {
    id: "gstin",
    label: "GSTIN NUMBER",
    placeholder: "22AAAAA0000A1Z5",
    model: gstin,
    span: "col-span-1",
  },
  {
    id: "udyam",
    label: "UDYAM / MSME NUMBER",
    placeholder: "UDYAM-KR-00-0000000",
    model: udyam,
    span: "col-span-1",
  },
];

/* ---------------------------------
   PREVIEW DATA
--------------------------------- */

const companyName = ref("jhgbjh");
const industry = ref("Software & IT Services");
const legalType = ref("Private");
const location = ref("Amravati, Maharashtra");
const companySize = ref("11-50 employees");
const foundedYear = ref("2026");

/* ---------------------------------
   FILE UPLOAD
--------------------------------- */

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
  }
}

function openFilePicker() {
  const input = document.getElementById(
    "verification-file"
  ) as HTMLInputElement | null;

  input?.click();
}

/* ---------------------------------
   SANITIZATION
--------------------------------- */

function sanitizeInput(value: string) {
  return value.replace(/[<>]/g, "");
}

function updateField(
  field: {
    value: string;
  },
  event: Event
) {
  const target = event.target as HTMLInputElement;

  field.value = sanitizeInput(target.value);
}

/* ---------------------------------
   PREVIEW STATUS
--------------------------------- */

const hasVerificationData = computed(() => {
  return (
    cin.value.trim() ||
    llpin.value.trim() ||
    pan.value.trim() ||
    gstin.value.trim() ||
    udyam.value.trim() ||
    selectedFile.value
  );
});

const securityItems = [
  "Invalid characters stripped instantly on keystroke",
  "Search bar blocks special symbols",
  "PAN, GSTIN & Phone strictly filtered per field rules",
];
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-1 overflow-hidden bg-slate-50">
    <div class="grid h-full min-h-0 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_380px]">

      <!-- =====================================================
           LEFT : LEGAL & TAX FORM
      ====================================================== -->

      <section
        class="legal-tax-scroll min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >

        <!-- HEADER -->
        <div
          class="flex items-start gap-3 border-b border-slate-100 pb-5"
        >
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50"
          >
            <FileText class="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h2 class="text-md font-bold text-slate-900">
              Legal & Tax Identifiers
            </h2>

            <p class="mt-1 text-xs text-slate-500">
              Provide tax numbers & verification documents for employer
              verification.
            </p>
          </div>
        </div>

        <!-- =================================================
             VERIFICATION BANNER
        ================================================== -->

        <div
          class="mt-2 flex items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3"
        >
          <ShieldCheck
            class="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
          />

          <p class="text-xs leading-5 text-indigo-700">
            <span class="font-bold">
              Verified Employer Badge:
            </span>

            Submitting valid GSTIN, PAN, or CIN speeds up account
            verification and earns a green checkmark badge on your
            job postings.
          </p>
        </div>

        <!-- =================================================
             LEGAL IDENTIFIERS
        ================================================== -->

        <div class="mt-4 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">

          <div
            v-for="field in legalFields"
            :key="field.id"
            :class="field.span"
          >
            <label
              :for="field.id"
              class="mb-2 block text-xs font-bold tracking-wide text-slate-700"
            >
              {{ field.label }}
            </label>

            <input
              :id="field.id"
              :value="field.model.value"
              :placeholder="field.placeholder"
              @input="updateField(field.model, $event)"
              type="text"
              class="h-8 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

        </div>

        <!-- =================================================
             VERIFICATION DOCUMENT HEADER
        ================================================== -->

        <div class=" mt-3 flex items-center gap-2">
          <Upload class="h-3 w-3 text-violet-600" />

          <h3
            class="text-sm font-bold tracking-wide text-slate-800"
          >
            VERIFICATION DOCUMENT UPLOAD
          </h3>
        </div>

        <!-- DOCUMENT FIELDS -->

        <div
          class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
        >

          <!-- DOCUMENT TYPE -->

          <div>
            <label
              class="mb-2 block text-xs font-bold text-slate-700"
            >
              Document Type
            </label>

            <div class="relative">
              <select
                v-model="documentType"
                class="h-8 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
                <option
                  v-for="type in documentTypes"
                  :key="type"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>

              <div
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  class="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- DOCUMENT NUMBER -->

          <div>
            <label
              for="documentNumber"
              class="mb-1 mt-1 block text-xs font-bold text-slate-700"
            >
              Document Number
            </label>

            <input
              id="documentNumber"
              v-model="documentNumber"
              type="text"
              placeholder="e.g. Cert / License No."
              class="h-8 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              @input="
                documentNumber = sanitizeInput(
                  documentNumber
                )
              "
            />
          </div>

        </div>

        <!-- =================================================
             FILE UPLOAD
        ================================================== -->

        <input
          id="verification-file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          class="hidden"
          @change="handleFileUpload"
        />

        <div
          class="mt-4 flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/40 px-5 py-6 text-center transition hover:border-violet-300 hover:bg-violet-50/30"
          @click="openFilePicker"
        >

          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50"
          >
            <Upload class="h-6 w-6 text-violet-500" />
          </div>

          <p class="mt-3 text-xs font-bold text-slate-800">
            {{
              selectedFile
                ? selectedFile.name
                : "Upload Certificate or Verification Document"
            }}
          </p>

          <p class="mt-1 text-[11px] text-slate-400">
            PDF, PNG, or JPG up to 10MB
          </p>

          <button
            type="button"
            class="mt-3 rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
            @click.stop="openFilePicker"
          >
            Browse File
          </button>

        </div>

        <!-- =================================================
             FOOTER BUTTONS
        ================================================== -->

        <div
          class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5"
        >

          <button
            type="button"
            @click="emit('back')"
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft class="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            @click="emit('continue')"
            class="inline-flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            Continue
            <ArrowRight class="h-4 w-4" />
          </button>

        </div>

      </section>


      <!-- =====================================================
           RIGHT : LIVE CARD PREVIEW
      ====================================================== -->

      <aside class="min-h-0 min-w-0 overflow-hidden space-y-4">
        <CompanyPreview
          :company-name="companyName"
          :industry="industry"
          :legal-info="cin || llpin || 'Legal company name'"
          :location="location"
          :company-size="companySize"
          :founded-year="foundedYear"
          :tax-status="hasVerificationData ? 'Documents Added' : 'Pending Docs'"
          verified
        />
        <div v-if="false">

        <!-- PREVIEW HEADER -->

        <div class="flex items-center justify-between px-1">

          <div class="flex items-center gap-3">
            <Eye class="h-4 w-4 text-indigo-600" />

            <span
              class="text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Live Card Preview
            </span>
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

            <!-- COMPANY HEADER -->

            <div class="flex items-start gap-3">

              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-indigo-50"
              >
                <Building2
                  class="h-7 w-7 text-violet-600"
                />
              </div>

              <div class="min-w-0">

                <div class="flex items-center gap-1.5">

                  <h3
                    class="truncate text-base font-bold text-slate-900"
                  >
                    {{ companyName }}
                  </h3>

                  <ShieldCheck
                    class="h-4 w-4 shrink-0 text-emerald-500"
                  />

                </div>

                <p
                  class="mt-1 text-xs font-medium text-violet-600"
                >
                  {{ industry }}
                </p>

                <p class="mt-1 truncate text-[10px] text-slate-400">
                  Legal:
                  {{ cin || llpin || "jhgvjhvjhvb" }}
                </p>

              </div>

            </div>


            <!-- COMPANY TAGLINE -->

            <p
              class="mt-4 text-xs italic leading-5 text-slate-500"
            >
              "Company tagline or mission statement will display
              here."
            </p>

            <!-- DIVIDER -->

            <div class="my-3 border-t border-slate-200"></div>


            <!-- COMPANY INFORMATION -->

            <div class="grid grid-cols-2 gap-y-3">

              <div class="flex items-center gap-2">

                <MapPin
                  class="h-4 w-4 text-slate-400"
                />

                <span class="truncate text-xs text-slate-500">
                  {{ location }}
                </span>

              </div>

              <div class="flex items-center gap-2">

                <Users
                  class="h-4 w-4 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  {{ companySize }}
                </span>

              </div>

              <div class="flex items-center gap-2">

                <Building2
                  class="h-4 w-4 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  {{ legalType }}
                </span>

              </div>

              <div class="flex items-center gap-2">

                <CalendarDays
                  class="h-4 w-4 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  Est. {{ foundedYear }}
                </span>

              </div>

            </div>

            <!-- TAX VERIFICATION -->

            <div class="mt-3 flex items-center justify-between">

              <span
                class="text-[10px] font-semibold text-slate-400"
              >
                Tax Verification
              </span>

              <span
                class="text-[10px] font-medium"
                :class="
                  hasVerificationData
                    ? 'text-emerald-500'
                    : 'text-slate-400'
                "
              >
                {{
                  hasVerificationData
                    ? "Documents Added"
                    : "Pending Docs"
                }}
              </span>

            </div>


            <!-- COMPANY PROFILE BUTTON -->

            <button
              type="button"
              class="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <Globe class="h-4 w-4" />
              Company Profile
            </button>

          </div>

        </div>


        <!-- =================================================
             SECURITY / SANITIZATION CARD
        ================================================== -->

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

<style scoped>
.legal-tax-scroll {
  scrollbar-color: #cbd5e1 transparent;
  scrollbar-width: thin;
}

.legal-tax-scroll::-webkit-scrollbar {
  width: 6px;
}

.legal-tax-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.legal-tax-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

.legal-tax-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>