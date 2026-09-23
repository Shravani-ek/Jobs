<script setup lang="ts">
import { ref } from "vue";
import {
  ShieldCheck,
  Upload,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-vue-next";

export interface LegalTaxForm {
  cin: string;
  llpin: string;
  pan: string;
  gstin: string;
  udyam: string;
  documentType: string;
  documentNumber: string;
  uploadedFileName: string;
}

const props = defineProps<{
  form: LegalTaxForm;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);

const documentTypes = [
  "Certificate of Incorporation",
  "GST Registration Certificate",
  "Company PAN Card",
  "Udyam / MSME Certificate",
  "Other Official Business License",
];

function triggerFilePicker() {
  fileInputRef.value?.click();
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    props.form.uploadedFileName = target.files[0].name;
  }
}
</script>

<template>
  <section class="p-5 sm:p-6 pb-0 sm:pb-0">
    <!-- Verified Badge Notice -->
    <div class="flex items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50/70 p-3.5">
      <ShieldCheck class="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
      <div class="text-xs leading-5 text-indigo-900">
        <span class="font-bold">Verified Employer Advantage:</span> Submitting valid GSTIN, PAN, or CIN verification gives your company the green verified checkmark badge across all published job postings and candidate views.
      </div>
    </div>

    <!-- Form Content -->
    <div class="mt-5 space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- CIN -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            CIN (Corporate Identification Number)
          </label>
          <input
            v-model="form.cin"
            type="text"
            placeholder="e.g. U72200MH2020PTC123456"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 uppercase"
          />
        </div>

        <!-- LLPIN -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            LLPIN (For LLP Companies)
          </label>
          <input
            v-model="form.llpin"
            type="text"
            placeholder="e.g. AAA-1234"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 uppercase"
          />
        </div>

        <!-- PAN -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company PAN Number
          </label>
          <input
            v-model="form.pan"
            type="text"
            placeholder="e.g. ABCDE1234F"
            maxlength="10"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 uppercase"
          />
        </div>

        <!-- GSTIN -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            GSTIN Number
          </label>
          <input
            v-model="form.gstin"
            type="text"
            placeholder="e.g. 29AAAAA0000A1Z5"
            maxlength="15"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 uppercase"
          />
        </div>

        <!-- Udyam / MSME -->
        <div class="md:col-span-2">
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Udyam / MSME Registration Number
          </label>
          <input
            v-model="form.udyam"
            type="text"
            placeholder="e.g. UDYAM-KR-00-0000000"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 uppercase"
          />
        </div>
      </div>

      <!-- Verification Document Upload -->
      <div class="pt-3 border-t border-slate-100">
        <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
          Upload Verification Document
        </label>
        
        <div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- Document Type -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500">Document Type</label>
            <div class="relative mt-1">
              <select
                v-model="form.documentType"
                class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
              >
                <option v-for="d in documentTypes" :key="d" :value="d">{{ d }}</option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <!-- Document Number -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500">Document / Certificate Number</label>
            <input
              v-model="form.documentNumber"
              type="text"
              placeholder="e.g. DOC-98765432"
              class="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- File Upload Area -->
        <input
          ref="fileInputRef"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          class="hidden"
          @change="handleFileUpload"
        />

        <div
          @click="triggerFilePicker"
          class="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 transition hover:border-violet-300 hover:bg-slate-50"
        >
          <div v-if="form.uploadedFileName" class="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 class="h-5 w-5" />
            <span class="text-xs font-semibold">{{ form.uploadedFileName }}</span>
          </div>
          <div v-else class="flex flex-col items-center justify-center text-center">
            <Upload class="h-6 w-6 text-slate-400" />
            <p class="mt-1 text-xs font-semibold text-slate-700">Click to upload document file</p>
            <p class="text-[11px] text-slate-400">PDF, PNG, or JPG (max 5MB)</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons (Sticky Fixed at Bottom) -->
      <div class="sticky bottom-0 z-10 mt-4 -mx-5 sm:-mx-6 flex items-center justify-between border-t border-slate-200 bg-white px-4 sm:px-6 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-b-lg">
        <button
          type="button"
          @click="emit('back')"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          @click="emit('continue')"
          class="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
        >
          <span>Save &amp; Continue</span>
          <ArrowRight class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </section>
</template>
