<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  Building2,
  Settings,
  CircleHelp,
  Eye,
  MessageSquare,
  Moon,
  LogOut,
  ChevronDown,
} from "lucide-vue-next";

const router = useRouter();

const emit = defineEmits<{
  (e: "logout"): void;
}>();

/* --------------------------------
   Navigation
--------------------------------- */

const goTo = (path?: string) => {
  if (path) {
    router.push(path);
  }
};

/* --------------------------------
   Company badge dropdown
--------------------------------- */

const companyMenuOpen = ref(false);

const companyOptions = [
  {
    id: 1,
    short: "WA",
    path: "/company-dashboard",
    name: "WebArtifacts",
    bg: "bg-[#E9D5FF]",
    text: "text-black",
  },
  {
    id: 2,
    short: "S",
    path: "/company-dashboard",
    name: "SD Engineering",
    bg: "bg-[#E9D5FF]",
    text: "text-white",
  },
];

const toggleCompanyMenu = () => {
  companyMenuOpen.value = !companyMenuOpen.value;
};

const selectCompany = (company: (typeof companyOptions)[number]) => {
  console.log("Selected company:", company.short);

  // Add your company switching logic here
  companyMenuOpen.value = false;

  if (company.short === "WA") {
    router.push("/company-dashboard");
  }
};

/* --------------------------------
   Main dropdown items
--------------------------------- */

const dropdownOptions = [
  {
    label: "Register a Company",
    icon: Building2,
    color: "text-indigo-500",
    path: "/register-company",
  },

  {
    label: "Company Management", 
    icon: Building2,
    color: "text-indigo-500",
    type: "company",
  },

  {
    label: "Settings & Privacy",
    icon: Settings,
    color: "text-blue-500",
    path: "/settings",
  },

  {
    label: "Help & Support",
    icon: CircleHelp,
    color: "text-green-600",
    path: "/help",
  },

  {
    label: "Display & Accessibility",
    icon: Eye,
    color: "text-violet-500",
    path: "/accessibility",
  },

  {
    label: "Give Feedback",
    icon: MessageSquare,
    color: "text-orange-500",
    path: "/feedback",
  },
];

/* --------------------------------
   Bottom items
--------------------------------- */

const bottomItems = [
  {
    label: "Dark Mode",
    icon: Moon,
    color: "text-indigo-600",
    type: "toggle",
  },

  {
    label: "Log Out",
    icon: LogOut,
    color: "text-red-500",
    type: "logout",
  },
];

/* --------------------------------
   Bottom click
--------------------------------- */

function handleBottomClick(type: string) {
  if (type === "logout") {
    emit("logout");
  }
}
</script>

<template>
  <div
    class="absolute right-0 top-13 z-50 w-[300px] overflow-visible rounded-lg border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.15)]"
  >
    <!-- =================================
         PROFILE HEADER
    ================================== -->

    <div
      class="flex items-center gap-2 border-b border-slate-200 bg-white px-2 py-3"
    >
      <!-- Avatar -->

      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-2xl font-semibold text-white shadow-md"
      >
        S
      </div>

      <!-- User information -->

      <div class="min-w-0">
        <p class="truncate text-sm font-bold text-slate-700">
          Shravani Ekre
        </p>

        <p class="text-xs font-medium text-orange-500">
          Premium Member
        </p>
      </div>
    </div>

    <!-- =================================
         MAIN MENU
    ================================== -->

    <div class="py-1">
      <div
        v-for="item in dropdownOptions"
        :key="item.label"
        class="relative w-full"
      >
        <!-- MENU BUTTON -->

        <button
          type="button"
          @click="
            item.type === 'company'
              ? toggleCompanyMenu()
              : goTo(item.path)
          "
          class="group flex w-full items-center gap-2 px-2 py-1.5 text-left transition hover:bg-slate-50"
        >
          <!-- ICON -->

          <div
            class="flex h-5 w-5 shrink-0 items-center justify-center"
          >
            <component
              :is="item.icon"
              class="h-6 w-6"
              :class="item.color"
            />
          </div>

          <!-- LABEL -->

          <span
            class="flex-1 text-sm font-semibold text-slate-600"
          >
            {{ item.label }}
          </span>

          <!-- =================================
               COMPANY BADGES
          ================================== -->

          <template v-if="item.type === 'company'">
            <div class="ml-auto flex items-center gap-3">
              <div class="flex items-center">
                <div
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9D5FF] text-[10px] font-bold text-black shadow-sm ring-2 ring-white"
                >
                  WA
                </div>

                <div
                  class="-ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#111827] text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                >
                  SD
                </div>
              </div>
              <ChevronDown
                class="h-5 w-5 text-slate-600 transition-transform duration-200"
                :class="{ 'rotate-180': companyMenuOpen }"
              />
            </div>
          </template>
        </button>

        <!-- =================================
             COMPANY BADGE FLOATING DROPDOWN
        ================================== -->

        <div
          v-if="item.type === 'company' && companyMenuOpen"
          class="absolute right-[-118px] top-[44px] z-[50] w-[180px] rounded-lg border border-white/60 bg-white/60 p-1 shadow-[0_10px_25px_rgba(15,23,42,0.12)] backdrop-blur-md"
        >
          <div class="space-y-2">
            <button
              type="button"
              @click="selectCompany(companyOptions[0])"
              class="flex w-full items-center gap-3 rounded-md px-1 py-1 text-left transition hover:bg-slate-50"
            >
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E9D5FF] text-[10px] font-bold text-violet-600">
                WA
              </span>
              <span class="truncate text-xs font-semibold text-slate-700">
                {{ companyOptions[0].name }}
              </span>
            </button>

            <div class="border-t border-slate-200"></div>

            <button
              type="button"
              @click="selectCompany(companyOptions[1])"
              class="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left transition hover:bg-slate-50"
            >
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[10px] font-bold text-white">
                SD
              </span>
              <span class="truncate text-xs font-semibold text-slate-700">
                {{ companyOptions[1].name }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================
         BOTTOM OPTIONS
    ================================== -->

    <div class="border-t border-slate-200">
      <button
        v-for="item in bottomItems"
        :key="item.label"
        type="button"
        @click="handleBottomClick(item.type)"
        class="flex w-full items-center gap-2 px-2 py-2 text-left transition"
        :class="
          item.type === 'logout'
            ? 'hover:bg-red-50'
            : 'hover:bg-slate-50'
        "
      >
        <!-- ICON -->

        <div
          class="flex h-5 w-5 shrink-0 items-center justify-center"
        >
          <component
            :is="item.icon"
            class="h-4 w-4"
            :class="item.color"
          />
        </div>

        <!-- LABEL -->

        <span
          class="text-sm font-semibold"
          :class="
            item.type === 'logout'
              ? 'text-red-500'
              : 'text-slate-600'
          "
        >
          {{ item.label }}
        </span>

        <!-- =================================
             DARK MODE TOGGLE
        ================================== -->

        <div
          v-if="item.type === 'toggle'"
          class="relative ml-auto h-8 w-14 rounded-full bg-slate-200 p-1"
        >
          <div
            class="h-6 w-6 rounded-full bg-white shadow-sm"
          ></div>
        </div>
      </button>
    </div>
  </div>
</template>