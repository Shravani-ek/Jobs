<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  X,
  Image as ImageIcon,
  Video,
  FileText,
  Plus,
  Send,
  ChevronDown,
  Check,
  Trash2,
} from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    userInitial?: string;
  }>(),
  {
    modelValue: true,
    userInitial: "S",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "post", data: { text: string; audience: string; attachment?: { name: string; url?: string; type: string } }): void;
}>();

const postText = ref("");
const showAudienceMenu = ref(false);
const selectedAudience = ref("Everyo...");

const audiences = [
  { id: "everyone", label: "Everyo...", fullLabel: "Everyone (Public)" },
  { id: "connections", label: "Connect...", fullLabel: "Connections only" },
  { id: "company", label: "Company", fullLabel: "Company members only" },
];

// File Attachments
const fileInput = ref<HTMLInputElement | null>(null);
const fileTypeFilter = ref<string>("image/*");
const attachment = ref<{ name: string; url?: string; type: string } | null>(null);

function triggerFileInput(type: "image" | "video" | "document") {
  if (type === "image") {
    fileTypeFilter.value = "image/*";
  } else if (type === "video") {
    fileTypeFilter.value = "video/*";
  } else {
    fileTypeFilter.value = ".pdf,.doc,.docx,.txt";
  }
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const isImage = file.type.startsWith("image/");
    attachment.value = {
      name: file.name,
      type: file.type,
      url: isImage ? URL.createObjectURL(file) : undefined,
    };
  }
}

function removeAttachment() {
  if (attachment.value?.url) {
    URL.revokeObjectURL(attachment.value.url);
  }
  attachment.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
}

function selectAudience(aud: { id: string; label: string }) {
  selectedAudience.value = aud.label;
  showAudienceMenu.value = false;
}

function handleClose() {
  emit("update:modelValue", false);
  emit("close");
}

function handlePublish() {
  if (!postText.value.trim() && !attachment.value) return;

  emit("post", {
    text: postText.value.trim(),
    audience: selectedAudience.value,
    attachment: attachment.value || undefined,
  });

  postText.value = "";
  attachment.value = null;
  handleClose();
}

// Close on Escape key
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    handleClose();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  if (attachment.value?.url) {
    URL.revokeObjectURL(attachment.value.url);
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity"
      @click.self="handleClose"
    >
      <!-- Hidden File Input for Attachments -->
      <input
        ref="fileInput"
        type="file"
        :accept="fileTypeFilter"
        class="hidden"
        @change="handleFileSelected"
      />

      <!-- MODAL CARD CONTAINER (Matching Screenshot) -->
      <div
        class="relative w-full max-w-2xl rounded-lg border border-slate-100 bg-white p-5 sm:p-6 shadow-2xl transition-all"
      >
        <!-- Top Bar: Close Button -->
        <div class="flex justify-end -mt-1 -mr-1 mb-2.5">
          <button
            type="button"
            @click="handleClose"
            class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none cursor-pointer"
            title="Close"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- TOP ROW: Avatar + Textarea Input Box -->
        <div class="flex items-start gap-3.5 sm:gap-4">
          <!-- Circular Blue Avatar with "S" -->
          <div
            class="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-base sm:text-lg font-bold text-white shadow-xs select-none"
          >
            {{ userInitial }}
          </div>

          <!-- Gray Textarea Container -->
          <div class="flex-1 rounded-lg bg-[#f8fafc] p-3.5 sm:p-4 transition focus-within:ring-2 focus-within:ring-indigo-100">
            <textarea
              v-model="postText"
              rows="4"
              maxlength="2000"
              placeholder="What's on your mind? Mention users with @"
              class="w-full resize-none border-0 bg-transparent p-0 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              autofocus
            ></textarea>

            <!-- Attachment Preview (if any) -->
            <div
              v-if="attachment"
              class="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <img
                  v-if="attachment.url"
                  :src="attachment.url"
                  alt="Attachment preview"
                  class="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
                <div v-else class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText class="h-5 w-5" />
                </div>
                <div class="min-w-0">
                  <p class="truncate text-xs font-semibold text-slate-800">{{ attachment.name }}</p>
                  <p class="text-[11px] text-slate-400">Attached file</p>
                </div>
              </div>

              <button
                type="button"
                @click="removeAttachment"
                class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                title="Remove attachment"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- BOTTOM TOOLBAR -->
        <div class="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <!-- Left: Colorful Media Buttons + Character Counter -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <!-- 1. Sky Blue Image Button -->
            <button
              type="button"
              @click="triggerFileInput('image')"
              class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] transition hover:bg-[#bae6fd] hover:scale-105 active:scale-95 cursor-pointer"
              title="Add Image"
            >
              <ImageIcon class="h-4.5 w-4.5" />
            </button>

            <!-- 2. Mint Green Video Button -->
            <button
              type="button"
              @click="triggerFileInput('video')"
              class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#dcfce7] text-[#16a34a] transition hover:bg-[#bbf7d0] hover:scale-105 active:scale-95 cursor-pointer"
              title="Add Video"
            >
              <Video class="h-4.5 w-4.5" />
            </button>

            <!-- 3. Lilac Purple Poll / List Button -->
            <button
              type="button"
              class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#9333ea] transition hover:bg-[#e9d5ff] hover:scale-105 active:scale-95 cursor-pointer"
              title="Create Poll / List"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="5" x2="4" y2="19" />
                <line x1="8" y1="7" x2="20" y2="7" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="17" x2="18" y2="17" />
              </svg>
            </button>

            <!-- 4. Peach Orange Document Button -->
            <button
              type="button"
              @click="triggerFileInput('document')"
              class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ffedd5] text-[#ea580c] transition hover:bg-[#fed7aa] hover:scale-105 active:scale-95 cursor-pointer"
              title="Add Document"
            >
              <FileText class="h-4.5 w-4.5" />
            </button>

            <!-- 5. Rose Pink Plus Button (with Red Square Inside) -->
            <button
              type="button"
              class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ffe4e6] transition hover:bg-[#fecdd3] hover:scale-105 active:scale-95 cursor-pointer"
              title="More Options"
            >
              <div class="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#ef4444] text-white">
                <Plus class="h-3 w-3 stroke-[3]" />
              </div>
            </button>

            <!-- 6. Character Count Pill -->
            <div
              class="flex h-9 sm:h-10 items-center rounded-xl bg-[#f1f5f9] px-3 text-xs font-semibold text-slate-500 select-none"
            >
              {{ postText.length }}/2000
            </div>
          </div>

          <!-- Right: Audience Dropdown + Gradient Post Button -->
          <div class="flex items-center gap-2 sm:gap-2.5">
            <!-- Audience Dropdown Button -->
            <div class="relative">
              <button
                type="button"
                @click="showAudienceMenu = !showAudienceMenu"
                class="flex h-9 sm:h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <span>{{ selectedAudience }}</span>
                <ChevronDown class="h-3.5 w-3.5 text-slate-400" />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showAudienceMenu"
                class="absolute bottom-full right-0 mb-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-10"
              >
                <div class="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Who can see this?
                </div>
                <button
                  v-for="aud in audiences"
                  :key="aud.id"
                  type="button"
                  @click="selectAudience(aud)"
                  class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <span>{{ aud.fullLabel }}</span>
                  <Check v-if="selectedAudience === aud.label" class="h-3.5 w-3.5 text-indigo-600" />
                </button>
              </div>
            </div>

            <!-- Gradient Post Button (Blue to Indigo/Purple) -->
            <button
              type="button"
              @click="handlePublish"
              class="flex h-9 sm:h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c8bf7] via-[#6366f1] to-[#8b5cf6] px-4.5 sm:px-5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:opacity-95 hover:shadow active:scale-95 cursor-pointer"
              :class="{ 'opacity-60 cursor-not-allowed': !postText.trim() && !attachment }"
            >
              <Send class="h-3.5 w-3.5 -rotate-12 fill-white text-white" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
