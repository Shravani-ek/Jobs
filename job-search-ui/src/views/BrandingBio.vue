<script setup lang="ts">
import { computed, ref } from "vue";

import {
  Palette,
  ImagePlus,
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Users,
  CalendarDays,
  Globe,
  Globe2,
  ShieldCheck,
  Eye,

} from "lucide-vue-next";
import CompanyPreview from "../components/CompanyPreview.vue";

/* ---------------------------------
   EMITS
--------------------------------- */

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

/* ---------------------------------
   FORM DATA
--------------------------------- */

const tagline = ref("");
const aboutCompany = ref("");

const website = ref("");

const selectedLogo = ref<File | null>(null);

/* ---------------------------------
   PREVIEW DATA
   These can later come from
   RegisterCompany.vue
--------------------------------- */

const companyName = ref("Company Name");
const industry = ref("Software & IT Services");
const location = ref("India");
const companySize = ref("11-50 employees");
const organizationType = ref("Private");
const foundedYear = ref("2026");

/* ---------------------------------
   BRANDING FIELDS
--------------------------------- */

const brandingFields = [
  {
    id: "tagline",
    label: "COMPANY TAGLINE",
    placeholder: "e.g. Building the future, one solution at a time",
    type: "text",
    model: tagline,
  },
  {
    id: "website",
    label: "COMPANY WEBSITE",
    placeholder: "https://www.yourcompany.com",
    type: "url",
    model: website,
  },
];


/* ---------------------------------
   SANITIZATION
--------------------------------- */

function sanitizeInput(value: string) {
  return value.replace(/[<>]/g, "");
}

function updateField(
  field: { value: string },
  event: Event
) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  field.value = sanitizeInput(target.value);
}

/* ---------------------------------
   LOGO UPLOAD
--------------------------------- */

function handleLogoUpload(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    selectedLogo.value = input.files[0];
  }
}

function openLogoPicker() {
  const input = document.getElementById(
    "company-logo"
  ) as HTMLInputElement | null;

  input?.click();
}

/* ---------------------------------
   LOGO PREVIEW
--------------------------------- */

const logoPreview = computed(() => {
  if (!selectedLogo.value) {
    return "";
  }

  return URL.createObjectURL(selectedLogo.value);
});
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-1 overflow-hidden bg-slate-50">

    <div
      class="grid h-full min-h-0 w-full grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_380px]"
    >

      <!-- =====================================================
           LEFT : BRANDING & BIO FORM
      ====================================================== -->

      <section
        class="branding-bio-scroll h-full min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >

        <!-- HEADER -->

        <div
          class="flex items-start gap-3 border-b border-slate-100 pb-5"
        >
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50"
          >
            <Palette class="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h2 class="text-md font-bold text-slate-900">
              Branding & Bio
            </h2>

            <p class="text-xs text-slate-500">
              Add your company branding and information to attract
              the right candidates.
            </p>
          </div>
        </div>


        <!-- =================================================
             COMPANY LOGO
        ================================================== -->

        <div class="mt-1">

          <label
            class="mb-2 block text-xs font-bold tracking-wide text-slate-700"
          >
            COMPANY LOGO
          </label>

          <div class="flex items-center gap-4">

            <!-- LOGO PREVIEW -->

            <div
              class="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-violet-50"
            >

              <img
                v-if="logoPreview"
                :src="logoPreview"
                alt="Company logo"
                class="h-full w-full object-cover"
              />

              <Building2
                v-else
                class="h-9 w-9 text-violet-600"
              />

            </div>

            <!-- UPLOAD -->

            <div>

              <input
                id="company-logo"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                class="hidden"
                @change="handleLogoUpload"
              />

              <button
                type="button"
                @click="openLogoPicker"
                class="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ImagePlus class="h-4 w-4 text-violet-600" />

                {{
                  selectedLogo
                    ? "Change Logo"
                    : "Upload Logo"
                }}
              </button>

              <p class="mt-1 text-[11px] text-slate-400">
                PNG, JPG or WEBP. Recommended 400 × 400px.
              </p>

            </div>

          </div>

        </div>


        <!-- =================================================
             BRANDING FIELDS
        ================================================== -->

        <div
          class="mt-3 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2"
        >

          <div
            v-for="field in brandingFields"
            :key="field.id"
            :class="
              field.id === 'tagline'
                ? 'md:col-span-2'
                : ''
            "
          >

            <label
              :for="field.id"
              class="mb-1 block text-xs font-bold tracking-wide text-slate-700"
            >
              {{ field.label }}
            </label>

            <input
              :id="field.id"
              :type="field.type"
              :value="field.model.value"
              :placeholder="field.placeholder"
              @input="updateField(field.model, $event)"
              class="h-8 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

          </div>

        </div>


        <!-- =================================================
             ABOUT COMPANY
        ================================================== -->

        <div class="mt-3">

          <label
            for="aboutCompany"
            class="mb-1 block text-xs font-bold tracking-wide text-slate-700"
          >
            ABOUT YOUR COMPANY
          </label>

          <textarea
            id="aboutCompany"
            :value="aboutCompany"
            @input="updateField({ value: aboutCompany }, $event)"
            rows="3"
            maxlength="500"
            placeholder="Tell candidates about your company, culture, mission and what makes your organization unique..."
            class="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          ></textarea>

          <div class="flex justify-end">
            <span class="text-[10px] text-slate-400">
              {{ aboutCompany.length }}/500
            </span>
          </div>

        </div>

        <!-- =================================================
             TIP
        ================================================== -->

        <div
          class="mt-6 flex items-start gap-3 rounded-xl bg-violet-50 px-4 py-3"
        >

          <Eye
            class="mt-0.5 h-4 w-4 shrink-0 text-violet-600"
          />

          <p class="text-xs leading-5 text-violet-700">
            <span class="font-bold">
              Tip:
            </span>

            A clear company description and professional branding
            helps candidates understand your organization before
            applying.
          </p>

        </div>


        <!-- =================================================
             FOOTER
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

      <aside class="branding-bio-scroll h-full min-h-0 min-w-0 overflow-y-auto space-y-4 pr-1">
        <CompanyPreview
          :company-name="companyName"
          :industry="industry"
          :location="location"
          :company-size="companySize"
          :organization-type="organizationType"
          :founded-year="foundedYear"
          :tagline="tagline"
          :website="website"
          :logo-url="logoPreview"
          profile-label="View Company Profile"
        />
        <div v-if="false">

        <!-- PREVIEW CARD -->

        <div
          class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >

          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-3">

            <div class="flex items-center gap-2">

              <Eye class="h-4 w-4 text-violet-600" />

              <span class="text-xs font-bold uppercase tracking-wide text-slate-500">
                Live Card Preview
              </span>

            </div>

            <span class="text-xs text-slate-400">
              Employer Profile
            </span>

          </div>

          <div class="p-5">

            <!-- COMPANY -->

            <div class="flex items-start gap-3">

              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-violet-50"
              >

                <img
                  v-if="logoPreview"
                  :src="logoPreview"
                  alt="Company logo"
                  class="h-full w-full object-cover"
                />

                <Building2
                  v-else
                  class="h-7 w-7 text-violet-600"
                />

              </div>


              <div class="min-w-0">

                <div
                  class="flex items-center gap-1"
                >

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
                  class="text-xs font-medium text-violet-600"
                >
                  {{ industry }}
                </p>

                <p class="text-[10px] text-slate-400">
                  Official Employer
                </p>

              </div>

            </div>


            <!-- TAGLINE -->

            <p
              class="mt-3 text-xs italic leading-5 text-slate-500"
            >
              {{
                tagline ||
                '"Company tagline or mission statement will display here."'
              }}
            </p>


            <!-- DIVIDER -->

            <div
              class="my-3 border-t border-slate-200"
            ></div>


            <!-- COMPANY DETAILS -->

            <div class="grid grid-cols-2 gap-y-3">

              <div class="flex items-center gap-2">

                <MapPin
                  class="h-4 w-4 shrink-0 text-slate-400"
                />

                <span
                  class="truncate text-xs text-slate-500"
                >
                  {{ location }}
                </span>

              </div>


              <div class="flex items-center gap-2">

                <Users
                  class="h-4 w-4 shrink-0 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  {{ companySize }}
                </span>

              </div>


              <div class="flex items-center gap-2">

                <Building2
                  class="h-4 w-4 shrink-0 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  {{ organizationType }}
                </span>

              </div>


              <div class="flex items-center gap-2">

                <CalendarDays
                  class="h-4 w-4 shrink-0 text-slate-400"
                />

                <span class="text-xs text-slate-500">
                  Est. {{ foundedYear }}
                </span>

              </div>

            </div>


            <div
              v-if="website"
              class="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4"
            >
              <Globe
                class="h-4 w-4 text-violet-500"
              />

              <span
                class="truncate text-xs font-medium text-violet-600"
              >
                {{ website }}
              </span>

            </div>


            <!-- TAX VERIFICATION -->

            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

              <span class="text-[10px] font-bold text-slate-400">
                Tax Verification
              </span>

              <span class="text-[10px] text-slate-400">
                Pending Docs
              </span>

            </div>


            <!-- PROFILE BUTTON -->

            <button
              type="button"
              class="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <Globe2 class="h-5 w-5" />

              View Company Profile
            </button>

          </div>

        </div>


           <!-- =================================================
             SECURITY / SANITIZATION CARD
           ================================================== -->

        <div
          class="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4"
        >

          <div class="flex items-center gap-2">

            <ShieldCheck
              class="h-4 w-4 text-indigo-600"
            />

            <h3
              class="text-xs font-bold text-indigo-800"
            >
              Native DOM Instant Sanitization
            </h3>

          </div>

          <ul
            class="mt-2 space-y-2 pl-4 text-[11px] leading-4 text-indigo-700"
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
.branding-bio-scroll {
  scrollbar-color: #cbd5e1 transparent;
  scrollbar-width: thin;
}

.branding-bio-scroll::-webkit-scrollbar {
  width: 6px;
}

.branding-bio-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.branding-bio-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

.branding-bio-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>