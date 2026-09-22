<script setup lang="ts">
import { ref } from "vue";
import {
  Building2,
  MapPin,
  FileText,
  Palette,
  BadgeCheck,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  ArrowRight,
} from "lucide-vue-next";

import ManageCompanyProfile from "./ManageCompanyProfile.vue";
import ManageContactLocation from "./ManageContactLocation.vue";
import ManageLegalTax from "./ManageLegalTax.vue";
import ManageBrandingBio from "./ManageBrandingBio.vue";
import ManageReviewSubmit from "./ManageReviewSubmit.vue";

const props = defineProps<{
  initialData?: {
    name?: string;
    tagline?: string;
    industry?: string;
    location?: string;
    website?: string;
  };
}>();

const emit = defineEmits<{
  (e: "saved", profile: any): void;
  (e: "back"): void;
  (e: "remove"): void;
}>();

/* -------------------------------------------------------------
   STATE: 5 Registration / Profile Steps
------------------------------------------------------------- */
const steps = [
  { id: 1, title: "Company Profile", icon: Building2 },
  { id: 2, title: "Contact & Location", icon: MapPin },
  { id: 3, title: "Legal & Tax", icon: FileText },
  { id: 4, title: "Branding & Bio", icon: Palette },
  { id: 5, title: "Review & Submit", icon: BadgeCheck },
];

const currentStep = ref(1);
const showSuccessNotification = ref(false);
const showDeleteModal = ref(false);
const showRemoveToast = ref(false);

/* -------------------------------------------------------------
   REACTIVE FORM DATA
------------------------------------------------------------- */
const profileForm = ref({
  name: props.initialData?.name || "WebArtifacts",
  tagline: props.initialData?.tagline || "Building digital experiences for a better tomorrow.",
  industry: props.initialData?.industry || "IT Services & Consulting",
  companySize: "51–200 employees",
  foundedYear: "2020",
  about: "WebArtifacts delivers cutting-edge digital products, cloud architectures, and user-centric web applications for high-growth startups and global enterprises.",
  logoUrl: "",
});

const contactForm = ref({
  email: "contact@webartifacts.com",
  phone: "+91 9876543210",
  website: props.initialData?.website || "https://webartifacts.com",
  country: "India",
  state: "Karnataka",
  city: "Bangalore",
  streetAddress: "402, Outer Ring Road, Tech Park",
  pincode: "560103",
});

const legalForm = ref({
  cin: "U72200KA2020PTC134567",
  llpin: "",
  pan: "AABCW1234D",
  gstin: "29AABCW1234D1Z8",
  udyam: "UDYAM-KR-03-0012345",
  documentType: "Certificate of Incorporation",
  documentNumber: "COI-2020-KA",
  uploadedFileName: "incorporation_certificate.pdf",
});

const brandingForm = ref({
  mission: "Empowering businesses worldwide through modern cloud architecture, intuitive UX, and agile engineering.",
  vision: "To be the most trusted global engineering studio for digital innovation.",
  culture: "Async-first, transparent communication, continuous learning, and customer obsession.",
  linkedin: "https://linkedin.com/company/webartifacts",
  twitter: "https://x.com/webartifacts",
  github: "https://github.com/webartifacts",
});

/* -------------------------------------------------------------
   STEP NAVIGATION
------------------------------------------------------------- */
function goToStep(stepNumber: number) {
  currentStep.value = stepNumber;
}

function nextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    emit("back");
  }
}

function handleSaveAndPublish() {
  showSuccessNotification.value = true;
  emit("saved", {
    profile: profileForm.value,
    contact: contactForm.value,
    legal: legalForm.value,
    branding: brandingForm.value,
  });

  setTimeout(() => {
    showSuccessNotification.value = false;
  }, 4000);
}

function confirmRemoveProfile() {
  showDeleteModal.value = false;
  profileForm.value = {
    name: "",
    tagline: "",
    industry: "IT Services & Consulting",
    companySize: "1–10 employees",
    foundedYear: "",
    about: "",
    logoUrl: "",
  };
  contactForm.value = {
    email: "",
    phone: "",
    website: "",
    country: "India",
    state: "",
    city: "",
    streetAddress: "",
    pincode: "",
  };
  legalForm.value = {
    cin: "",
    llpin: "",
    pan: "",
    gstin: "",
    udyam: "",
    documentType: "Certificate of Incorporation",
    documentNumber: "",
    uploadedFileName: "",
  };
  brandingForm.value = {
    mission: "",
    vision: "",
    culture: "",
    linkedin: "",
    twitter: "",
    github: "",
  };
  currentStep.value = 1;
  showRemoveToast.value = true;
  emit("remove");

  setTimeout(() => {
    showRemoveToast.value = false;
  }, 4000);
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
          <p class="text-xs font-bold uppercase tracking-wider text-emerald-900">Success</p>
          <p class="text-sm font-medium text-emerald-700">Company profile updated &amp; published successfully!</p>
        </div>
      </div>
    </transition>

    <!-- REMOVE TOAST -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="showRemoveToast"
        class="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-red-800 shadow-lg"
      >
        <Trash2 class="h-5 w-5 text-red-600" />
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-red-900">Profile Removed</p>
          <p class="text-sm font-medium text-red-700">Company profile information has been cleared.</p>
        </div>
      </div>
    </transition>

    <!-- =====================================
         MAIN CARD CONTAINER (JOINED STEPPER + VIEWPORT)
    ====================================== -->
    <div
      class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs"
    >
      <!-- Stepper & Actions Header Row (Fixed Top) -->
      <section class="shrink-0 sticky top-0 z-10 border-b border-slate-200 bg-white px-3.5 py-2">
        <div class="flex items-center justify-between gap-3 overflow-x-auto">
          <!-- 5 Steps (Text & Connectors, No Step Containers) -->
          <div class="flex flex-1 items-center justify-between gap-3 overflow-x-auto">
            <template v-for="(step, index) in steps" :key="step.id">
              <button
                type="button"
                @click="goToStep(step.id)"
                class="inline-flex items-center gap-1.5 whitespace-nowrap text-xs transition hover:opacity-80 focus:outline-none cursor-pointer"
                :class="[
                  currentStep === step.id
                    ? 'font-bold text-[#4F46E5]'
                    : currentStep > step.id
                      ? 'font-semibold text-emerald-600 hover:text-emerald-700'
                      : 'font-medium text-slate-500 hover:text-slate-800'
                ]"
              >
                <span>{{ step.id }}. {{ step.title }}</span>
              </button>

              <!-- Connector in between -->
              <ArrowRight
                v-if="index < steps.length - 1"
                class="h-3.5 w-3.5 shrink-0 text-slate-300"
              />
            </template>
          </div>

          <div class="h-5 w-px shrink-0 bg-slate-200" />

          <!-- Remove Profile Button -->
          <button
            type="button"
            @click="showDeleteModal = true"
            class="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/60 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
            title="Remove Company Profile"
          >
            <Trash2 class="h-3.5 w-3.5" />
            <span>Remove Profile</span>
          </button>
        </div>
      </section>

      <!-- Main Viewport (Active Step Form) -->
      <div class="min-h-0 flex-1 overflow-hidden">
      <!-- Step 1: Company Profile -->
      <ManageCompanyProfile
        v-if="currentStep === 1"
        :form="profileForm"
        @continue="nextStep"
      />

      <!-- Step 2: Contact & Location -->
      <ManageContactLocation
        v-else-if="currentStep === 2"
        :form="contactForm"
        @back="prevStep"
        @continue="nextStep"
      />

      <!-- Step 3: Legal & Tax -->
      <ManageLegalTax
        v-else-if="currentStep === 3"
        :form="legalForm"
        @back="prevStep"
        @continue="nextStep"
      />

      <!-- Step 4: Branding & Bio -->
      <ManageBrandingBio
        v-else-if="currentStep === 4"
        :form="brandingForm"
        @back="prevStep"
        @continue="nextStep"
      />

      <!-- Step 5: Review & Submit -->
      <ManageReviewSubmit
        v-else-if="currentStep === 5"
        :profile="profileForm"
        :contact="contactForm"
        :legal="legalForm"
        :branding="brandingForm"
        @back="prevStep"
        @submit="handleSaveAndPublish"
      />
    </div>
    </div>

    <!-- CONFIRMATION MODAL: REMOVE PROFILE -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs"
      >
        <div
          class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-2xl transition"
        >
          <div class="flex items-start gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle class="h-6 w-6" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">
                Remove Company Profile?
              </h3>
              <p class="mt-1 text-xs leading-5 text-slate-500">
                Are you sure you want to remove the company profile for
                <span class="font-bold text-slate-800">{{ profileForm.name || "this organization" }}</span>?
                All public profile information, branding assets, contact details, and uploaded verification documents will be cleared.
              </p>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              @click="showDeleteModal = false"
              class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmRemoveProfile"
              class="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <Trash2 class="h-3.5 w-3.5" />
              <span>Yes, Remove Profile</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
