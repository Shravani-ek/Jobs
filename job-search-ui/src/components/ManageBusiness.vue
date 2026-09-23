<template>
  <div class="mt-1 space-y-4 pb-8">

    <!-- =========================================================
         1. ABOUT COMPANY (Full Width with nested Mission & Vision)
    ========================================================== -->
    <div
      id="section-about"
      class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs"
    >
      <!-- Header -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
          >
            <Building2 class="h-5 w-5" />
          </div>
          <div>
            <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              About Company
            </h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">
              Tell people about your company and what you do.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="openModal('about')"
          class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
        >
          <Plus class="h-3.5 w-3.5" />
          <span>Add About</span>
        </button>
      </div>

      <!-- About Empty State Box -->
      <div
        v-if="!companyAbout"
        class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center"
      >
        <div class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50/80 border border-blue-100 text-blue-500 mb-3">
          <FileText class="h-7 w-7 stroke-[1.75]" />
          <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs">
            <Plus class="h-3 w-3 stroke-[3]" />
          </span>
        </div>
        <p class="text-xs sm:text-sm font-bold text-slate-800">
          No company description added yet.
        </p>
        <p class="text-xs text-slate-500 mt-1">
          Share your story, mission and what makes your company unique.
        </p>
      </div>

      <!-- Filled State -->
      <div v-else class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] p-5">
        <p class="text-xs sm:text-[13px] leading-relaxed text-slate-700">
          {{ companyAbout }}
        </p>
      </div>
    </div>

    <!-- =========================================================
         2. WHAT WE DO & COMPANY CULTURE (2-Column Grid)
    ========================================================== -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- WHAT WE DO -->
      <div
        id="section-services"
        class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
            >
              <Settings class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                What We Do
              </h2>
              <p class="text-xs text-slate-500 font-normal mt-0.5">
                Showcase the services and solutions you offer.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="openAddServiceModal"
            class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
          >
            <Plus class="h-3.5 w-3.5" />
            <span>Add Service</span>
          </button>
        </div>

        <!-- Empty State Box -->
        <div
          v-if="services.length === 0"
          class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center flex-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mb-3 shadow-2xs">
            <Box class="h-6 w-6 stroke-[1.75]" />
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No services added yet.
          </p>
          <p class="text-xs text-slate-500 mt-1">
            Highlight what your company does best.
          </p>
        </div>

        <!-- Filled Services List -->
        <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="(service, idx) in services"
            :key="service.id || idx"
            class="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-[#f8faff] p-3.5 relative group"
          >
            <div
              v-if="service.image"
              class="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-white"
            >
              <img :src="service.image" :alt="service.title" class="h-full w-full object-cover" />
            </div>
            <div
              v-else
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100/70 text-blue-600"
            >
              <Box class="h-5 w-5" />
            </div>
            <div class="flex-1 min-w-0 pr-6">
              <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate">{{ service.title }}</h4>
              <p v-if="service.description" class="text-xs text-slate-500 mt-0.5 line-clamp-2">{{ service.description }}</p>
            </div>
            <button
              type="button"
              @click="removeService(idx)"
              class="absolute top-2 right-2 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
              title="Remove service"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- COMPANY CULTURE -->
      <div
        id="section-culture"
        class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
            >
              <Users class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Company Culture
              </h2>
              <p class="text-xs text-slate-500 font-normal mt-0.5">
                Show your work environment and team culture.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="openAddCultureModal"
            class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
          >
            <Plus class="h-3.5 w-3.5" />
            <span>Add Culture</span>
          </button>
        </div>

        <!-- Empty State Box -->
        <div
          v-if="culturePhotos.length === 0"
          class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center flex-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mb-3 shadow-2xs">
            <ImageIcon class="h-6 w-6 stroke-[1.75]" />
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No culture photos added yet.
          </p>
          <p class="text-xs text-slate-500 mt-1">
            Upload photos of your workspace, team and events.
          </p>
        </div>

        <!-- Filled Culture Photos -->
        <div v-else class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="(photo, idx) in culturePhotos"
            :key="photo.id || idx"
            class="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex flex-col justify-end shadow-2xs"
          >
            <img
              v-if="photo.image"
              :src="photo.image"
              :alt="photo.caption || 'Culture photo'"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-500"
            >
              <ImageIcon class="h-8 w-8" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition"></div>
            <p class="relative z-10 p-2 text-xs font-semibold text-white truncate drop-shadow-xs">
              {{ photo.caption }}
            </p>
            <button
              type="button"
              @click="removeCulturePhoto(idx)"
              class="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-md bg-black/50 text-white hover:bg-rose-600 transition cursor-pointer opacity-0 group-hover:opacity-100"
              title="Remove photo"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =========================================================
         3. PROJECTS / WORK SHOWCASE (Full Width)
    ========================================================== -->
    <div
      id="section-projects"
      class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
          >
            <Briefcase class="h-5 w-5" />
          </div>
          <div>
            <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Projects / Work Showcase
            </h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">
              Showcase your best work and case studies.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="openAddProjectModal"
          class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
        >
          <Plus class="h-3.5 w-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <!-- Projects Empty State Box -->
      <div
        v-if="projects.length === 0"
        class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mb-3 shadow-2xs">
          <ImageIcon class="h-6 w-6 stroke-[1.75]" />
        </div>
        <p class="text-xs sm:text-sm font-bold text-slate-800">
          No projects added yet.
        </p>
        <p class="text-xs text-slate-500 mt-1">
          Share your work and the impact you've created.
        </p>
      </div>

      <!-- Filled Projects List -->
      <div v-else class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(project, idx) in projects"
          :key="project.id || idx"
          class="rounded-xl border border-slate-200/80 bg-[#f8faff] p-4 relative group flex flex-col justify-between"
        >
          <div class="flex items-start gap-3.5">
            <div
              v-if="project.photo"
              class="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white shadow-2xs"
            >
              <img :src="project.photo" :alt="project.title" class="h-full w-full object-cover" />
            </div>
            <div
              v-else
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600"
            >
              <Briefcase class="h-6 w-6" />
            </div>
            <div class="flex-1 min-w-0 pr-6">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="text-sm font-bold text-slate-900 truncate">{{ project.title }}</h4>
                <span
                  v-if="project.status"
                  class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold"
                  :class="project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'"
                >
                  {{ project.status }}
                </span>
                <span
                  v-if="project.category"
                  class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600"
                >
                  {{ project.category }}
                </span>
              </div>
              <p v-if="project.location" class="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <MapPin class="h-3 w-3 text-slate-400" />
                <span>{{ project.location }}</span>
              </p>
              <p v-if="project.description" class="text-xs text-slate-600 mt-1.5 line-clamp-2">
                {{ project.description }}
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="removeProject(idx)"
            class="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Remove project"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- =========================================================
         4. OUR TEAM & ACHIEVEMENTS (2-Column Grid)
    ========================================================== -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- OUR TEAM -->
      <div
        id="section-team"
        class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
            >
              <Users class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Our Team
              </h2>
              <p class="text-xs text-slate-500 font-normal mt-0.5">
                Meet the people behind our success.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="openAddTeamMemberModal"
            class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
          >
            <Plus class="h-3.5 w-3.5" />
            <span>Add Team Member</span>
          </button>
        </div>

        <!-- Empty State Box -->
        <div
          v-if="teamMembers.length === 0"
          class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center flex-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mb-3 shadow-2xs">
            <Users class="h-6 w-6 stroke-[1.75]" />
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No team members added yet.
          </p>
          <p class="text-xs text-slate-500 mt-1">
            Introduce your talented team.
          </p>
        </div>

        <!-- Filled Team List -->
        <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="(member, idx) in teamMembers"
            :key="member.id || idx"
            class="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-[#f8faff] p-3 relative group shadow-2xs"
          >
            <div
              v-if="member.photo"
              class="h-11 w-11 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-white shadow-2xs"
            >
              <img :src="member.photo" :alt="member.name" class="h-full w-full object-cover" />
            </div>
            <div
              v-else
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold text-sm"
            >
              {{ member.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0 pr-6">
              <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate">{{ member.name }}</h4>
              <p v-if="member.role" class="text-xs text-slate-600 font-medium truncate">{{ member.role }}</p>
              <p v-if="member.experience" class="text-[11px] text-slate-400 mt-0.5 truncate">{{ member.experience }}</p>
            </div>
            <button
              type="button"
              @click="removeTeamMember(idx)"
              class="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
              title="Remove team member"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- ACHIEVEMENTS -->
      <div
        id="section-achievements"
        class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
            >
              <Trophy class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Achievements
              </h2>
              <p class="text-xs text-slate-500 font-normal mt-0.5">
                Our milestones and recognition.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="openAddAchievementModal"
            class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
          >
            <Plus class="h-3.5 w-3.5" />
            <span>Add Achievement</span>
          </button>
        </div>

        <!-- Empty State Box -->
        <div
          v-if="achievements.length === 0"
          class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-8 px-4 flex flex-col items-center justify-center text-center flex-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mb-3 shadow-2xs">
            <Trophy class="h-6 w-6 stroke-[1.75]" />
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No achievements added yet.
          </p>
          <p class="text-xs text-slate-500 mt-1">
            Showcase your wins and growth.
          </p>
        </div>

        <!-- Filled Achievements List -->
        <div v-else class="mt-4 grid grid-cols-2 gap-3">
          <div
            v-for="(item, idx) in achievements"
            :key="item.id || idx"
            class="flex items-center justify-between rounded-xl border border-slate-200/80 bg-[#f8faff] p-3.5 relative group shadow-2xs"
          >
            <div class="min-w-0 pr-6">
              <span class="text-lg sm:text-xl font-extrabold text-blue-600 tracking-tight block">
                {{ item.value }}
              </span>
              <p class="text-xs font-bold text-slate-800 mt-0.5 truncate">
                {{ item.title }}
              </p>
            </div>
            <button
              type="button"
              @click="removeAchievement(idx)"
              class="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
              title="Remove metric"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =========================================================
         5. CLIENT FEEDBACK (Full Width)
    ========================================================== -->
    <div
      id="section-feedback"
      class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
          >
            <Quote class="h-5 w-5" />
          </div>
          <div>
            <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Client Feedback
            </h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">
              What your clients say about you.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="openAddReviewModal"
          class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
        >
          <Plus class="h-3.5 w-3.5" />
          <span>Add Review</span>
        </button>
      </div>

      <!-- Horizontal Empty State Box -->
      <div
        v-if="clientFeedback.length === 0"
        class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-5 px-6 flex items-center justify-center gap-3.5 text-center sm:text-left"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
          <MessageSquareQuote class="h-5 w-5 stroke-[1.75]" />
        </div>
        <div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No client feedback added yet.
          </p>
          <p class="text-xs text-slate-500 mt-0.5">
            Share testimonials from your happy clients.
          </p>
        </div>
      </div>

      <!-- Filled Feedback List -->
      <div v-else class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div
          v-for="(item, idx) in clientFeedback"
          :key="item.id || idx"
          class="rounded-xl border border-slate-200/80 bg-[#f8faff] p-4 relative group shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-amber-400 text-xs font-bold tracking-wider">
                {{ item.rating || '5 Stars ★★★★★' }}
              </span>
            </div>
            <p class="text-xs sm:text-[13px] italic text-slate-700 leading-relaxed">
              "{{ item.text }}"
            </p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
            <div>
              <p class="text-xs font-bold text-slate-900">{{ item.name || item.author }}</p>
              <p v-if="item.designation" class="text-[11px] text-slate-500 font-medium">{{ item.designation }}</p>
            </div>
          </div>
          <button
            type="button"
            @click="removeFeedback(idx)"
            class="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Remove review"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- =========================================================
         6. COMPANY UPDATES (Full Width)
    ========================================================== -->
    <div
      id="section-updates"
      class="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/70 text-violet-600"
          >
            <Megaphone class="h-5 w-5" />
          </div>
          <div>
            <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Company Updates
            </h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">
              Keep your audience informed with the latest news and announcements.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="openAddUpdateModal"
          class="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-50 hover:border-violet-300 transition cursor-pointer"
        >
          <Plus class="h-3.5 w-3.5" />
          <span>Add Update</span>
        </button>
      </div>

      <!-- Horizontal Empty State Box -->
      <div
        v-if="companyUpdates.length === 0"
        class="mt-4 rounded-xl border border-slate-100 bg-[#f8faff] py-5 px-6 flex items-center justify-center gap-3.5 text-center sm:text-left"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100/70 text-violet-600">
          <Newspaper class="h-5 w-5 stroke-[1.75]" />
        </div>
        <div>
          <p class="text-xs sm:text-sm font-bold text-slate-800">
            No updates added yet.
          </p>
          <p class="text-xs text-slate-500 mt-0.5">
            Share your latest news, events and announcements.
          </p>
        </div>
      </div>

      <!-- Filled Updates List -->
      <div v-else class="mt-4 space-y-3">
        <div
          v-for="(item, idx) in companyUpdates"
          :key="item.id || idx"
          class="rounded-xl border border-slate-200/80 bg-[#f8faff] p-4 relative group shadow-2xs flex flex-col justify-between"
        >
          <div class="pr-8">
            <div class="flex items-center gap-2 flex-wrap mb-1.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200 uppercase">
                {{ item.type || 'Announcement' }}
              </span>
              <span class="text-[11px] text-slate-400 font-medium">
                {{ item.date || 'Just now' }}
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">
              {{ item.title }}
            </h4>
            <p v-if="item.content" class="text-xs sm:text-[13px] text-slate-600 mt-1.5 leading-relaxed">
              {{ item.content }}
            </p>
          </div>
          <button
            type="button"
            @click="removeUpdate(idx)"
            class="absolute top-3.5 right-3.5 text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Remove update"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- =========================================================
         ADD NEW SERVICE MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showServiceModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeServiceModal"
      >
        <div
          class="w-full max-w-[460px] rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add New Service + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add New Service
            </h3>
            <button
              type="button"
              @click="closeServiceModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Service Title * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Service Title *
              </label>
              <input
                v-model="serviceForm.title"
                type="text"
                placeholder="e.g. Architectural Design"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Description
              </label>
              <textarea
                v-model="serviceForm.description"
                rows="3"
                placeholder="Short description of this service..."
                class="w-full min-h-[90px] rounded-xl border border-slate-200 p-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              ></textarea>
            </div>

            <!-- Service Image -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Service Image
              </label>

              <!-- Hidden input for file selection -->
              <input
                ref="serviceFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleServiceImageChange"
              />

              <!-- Not attached -->
              <button
                v-if="!serviceForm.image"
                type="button"
                @click="triggerServiceImageUpload"
                class="w-full rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-white transition cursor-pointer"
              >
                <Upload class="h-4 w-4 text-slate-700" />
                <span>Attach Image</span>
              </button>

              <!-- Attached preview state -->
              <div
                v-else
                class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 px-3.5"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <img
                    :src="serviceForm.image"
                    alt="Service Preview"
                    class="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <span class="text-xs font-semibold text-slate-800 truncate">
                    {{ serviceForm.imageName || 'image-attached.png' }}
                  </span>
                </div>
                <button
                  type="button"
                  @click="removeServiceImage"
                  class="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeServiceModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveService"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Save Service
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ADD PROJECT SHOWCASE MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showProjectModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeProjectModal"
      >
        <div
          class="w-full max-w-[480px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add Project Showcase + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add Project Showcase
            </h3>
            <button
              type="button"
              @click="closeProjectModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Project Title * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Project Title *
              </label>
              <input
                v-model="projectForm.title"
                type="text"
                placeholder="e.g. Global Tech Center"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Row 2: Location & Category -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Location
                </label>
                <input
                  v-model="projectForm.location"
                  type="text"
                  placeholder="City, State"
                  class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Category
                </label>
                <div class="relative">
                  <select
                    v-model="projectForm.category"
                    class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer"
                  >
                    <option value="General">General</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
            </div>

            <!-- Row 3: Status & Project Photo -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 items-end">
              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Status
                </label>
                <div class="relative">
                  <select
                    v-model="projectForm.status"
                    class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Project Photo
                </label>

                <!-- Hidden file input -->
                <input
                  ref="projectFileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleProjectPhotoChange"
                />

                <!-- Not attached -->
                <button
                  v-if="!projectForm.photo"
                  type="button"
                  @click="triggerProjectPhotoUpload"
                  class="h-11 w-full rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 px-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-white transition cursor-pointer"
                >
                  <Upload class="h-4 w-4 text-slate-700" />
                  <span>Attach Image</span>
                </button>

                <!-- Attached preview state -->
                <div
                  v-else
                  class="h-11 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-2.5"
                >
                  <div class="flex items-center gap-2 min-w-0">
                    <img
                      :src="projectForm.photo"
                      alt="Project Preview"
                      class="h-7 w-7 rounded-md object-cover border border-slate-200 shrink-0"
                    />
                    <span class="text-xs font-semibold text-slate-800 truncate">
                      {{ projectForm.photoName || 'photo.png' }}
                    </span>
                  </div>
                  <button
                    type="button"
                    @click="removeProjectPhoto"
                    class="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer ml-1 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Description
              </label>
              <textarea
                v-model="projectForm.description"
                rows="3"
                placeholder="Project overview..."
                class="w-full min-h-[85px] rounded-xl border border-slate-200 p-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeProjectModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveProject"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ADD CULTURE PHOTO MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showCultureModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeCultureModal"
      >
        <div
          class="w-full max-w-[460px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add Culture Photo + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add Culture Photo
            </h3>
            <button
              type="button"
              @click="closeCultureModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Photo Caption / Title * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Photo Caption / Title *
              </label>
              <input
                v-model="cultureForm.caption"
                type="text"
                placeholder="e.g. Team Celebration"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Photo File -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Photo File
              </label>

              <!-- Hidden file input -->
              <input
                ref="cultureFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleCulturePhotoChange"
              />

              <!-- Not attached -->
              <button
                v-if="!cultureForm.image"
                type="button"
                @click="triggerCulturePhotoUpload"
                class="w-full rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-white transition cursor-pointer"
              >
                <Upload class="h-4 w-4 text-blue-600" />
                <span>Select Image File</span>
              </button>

              <!-- Attached preview state -->
              <div
                v-else
                class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 px-3.5"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <img
                    :src="cultureForm.image"
                    alt="Culture Preview"
                    class="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <span class="text-xs font-semibold text-slate-800 truncate">
                    {{ cultureForm.imageName || 'culture-photo.png' }}
                  </span>
                </div>
                <button
                  type="button"
                  @click="removeCultureFormImage"
                  class="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeCultureModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveCulturePhoto"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ADD TEAM MEMBER MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showTeamModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeTeamModal"
      >
        <div
          class="w-full max-w-[480px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add Team Member + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add Team Member
            </h3>
            <button
              type="button"
              @click="closeTeamModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Member Name * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Member Name *
              </label>
              <input
                v-model="teamForm.name"
                type="text"
                placeholder="e.g. John Doe"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Row 2: Designation / Role & Experience -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Designation / Role
                </label>
                <input
                  v-model="teamForm.role"
                  type="text"
                  placeholder="e.g. Lead Engineer"
                  class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Experience
                </label>
                <input
                  v-model="teamForm.experience"
                  type="text"
                  placeholder="e.g. 5+ Years Experience"
                  class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            <!-- Profile Photo -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Profile Photo
              </label>

              <!-- Hidden file input -->
              <input
                ref="teamFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleTeamPhotoChange"
              />

              <!-- Not attached -->
              <button
                v-if="!teamForm.photo"
                type="button"
                @click="triggerTeamPhotoUpload"
                class="w-full rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-white transition cursor-pointer"
              >
                <Upload class="h-4 w-4 text-slate-700" />
                <span>Attach Photo</span>
              </button>

              <!-- Attached preview state -->
              <div
                v-else
                class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 px-3.5"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <img
                    :src="teamForm.photo"
                    alt="Member Preview"
                    class="h-9 w-9 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <span class="text-xs font-semibold text-slate-800 truncate">
                    {{ teamForm.photoName || 'photo.png' }}
                  </span>
                </div>
                <button
                  type="button"
                  @click="removeTeamPhoto"
                  class="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeTeamModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveTeamMember"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ADD ACHIEVEMENT METRIC MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showAchievementModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeAchievementModal"
      >
        <div
          class="w-full max-w-[450px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add Achievement Metric + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add Achievement Metric
            </h3>
            <button
              type="button"
              @click="closeAchievementModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Metric Title * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Metric Title *
              </label>
              <input
                v-model="achievementForm.title"
                type="text"
                placeholder="e.g. Projects Completed"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Value / Count * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Value / Count *
              </label>
              <input
                v-model="achievementForm.value"
                type="text"
                placeholder="e.g. 50+"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeAchievementModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveAchievement"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Save Metric
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ADD CLIENT REVIEW MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showReviewModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeReviewModal"
      >
        <div
          class="w-full max-w-[480px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Add Client Review + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Add Client Review
            </h3>
            <button
              type="button"
              @click="closeReviewModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Client Name * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Client Name *
              </label>
              <input
                v-model="reviewForm.name"
                type="text"
                placeholder="e.g. Amit Sharma"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Row 2: Client Designation & Rating (Stars) -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Client Designation
                </label>
                <input
                  v-model="reviewForm.designation"
                  type="text"
                  placeholder="e.g. Project Lead"
                  class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-800 mb-1.5">
                  Rating (Stars)
                </label>
                <div class="relative">
                  <select
                    v-model="reviewForm.rating"
                    class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer"
                  >
                    <option value="5 Stars ★★★★★">5 Stars ★★★★★</option>
                    <option value="4 Stars ★★★★☆">4 Stars ★★★★☆</option>
                    <option value="3 Stars ★★★☆☆">3 Stars ★★★☆☆</option>
                    <option value="2 Stars ★★☆☆☆">2 Stars ★★☆☆☆</option>
                    <option value="1 Star ★☆☆☆☆">1 Star ★☆☆☆☆</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
            </div>

            <!-- Testimonial Text * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Testimonial Text *
              </label>
              <textarea
                v-model="reviewForm.text"
                rows="3"
                placeholder="Write client feedback..."
                class="w-full min-h-[85px] rounded-xl border border-slate-200 p-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeReviewModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveReview"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Save Review
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         POST COMPANY UPDATE MODAL (Matches user reference screenshot)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showUpdateModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        @click.self="closeUpdateModal"
      >
        <div
          class="w-full max-w-[480px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100"
          @click.stop
        >
          <!-- Header: Post Company Update + X Close -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold text-slate-900 tracking-tight">
              Post Company Update
            </h3>
            <button
              type="button"
              @click="closeUpdateModal"
              class="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Post Title / Headline * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Post Title / Headline *
              </label>
              <input
                v-model="updateForm.title"
                type="text"
                placeholder="e.g. 📢 Exciting New Project Launch"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <!-- Content * -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-1.5">
                Content *
              </label>
              <textarea
                v-model="updateForm.content"
                rows="4"
                placeholder="Write your announcement or update..."
                class="w-full min-h-[95px] rounded-xl border border-slate-200 p-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              @click="closeUpdateModal"
              class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="publishUpdate"
              class="rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Publish Update
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- =========================================================
         ACTION MODAL (Generic / Contextual for all +Add buttons)
    ========================================================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="activeModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-sm font-bold text-slate-900">{{ modalTitle }}</h3>
            <button
              type="button"
              @click="activeModal = null"
              class="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="mt-4 space-y-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700">
                {{ modalFieldLabel }}
              </label>
              <textarea
                v-if="['about', 'mission', 'vision', 'feedback'].includes(activeModal)"
                v-model="modalInputValue"
                rows="4"
                :placeholder="modalPlaceholder"
                class="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              ></textarea>
              <input
                v-else
                type="text"
                v-model="modalInputValue"
                :placeholder="modalPlaceholder"
                class="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          <div class="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              @click="activeModal = null"
              class="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveModalData"
              class="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700 shadow-sm transition"
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Building2,
  Settings,
  Users,
  Briefcase,
  Trophy,
  Quote,
  Megaphone,
  Plus,
  Box,
  Image as ImageIcon,
  MessageSquareQuote,
  Newspaper,
  FileText,
  Upload,
  Trash2,
  X,
  ChevronDown,
  MapPin,
} from "lucide-vue-next";

withDefaults(
  defineProps<{
    companyName?: string;
    companyTagline?: string;
    website?: string;
  }>(),
  {
    companyName: "WebArtifacts",
    companyTagline: "Building digital experiences for a better tomorrow.",
    website: "www.webartifacts.com",
  }
);

/* -------------------------------------------------------------
   STATE: Data for each section (Initially empty to match screenshot)
------------------------------------------------------------- */
const companyAbout = ref("");
const companyMission = ref("");
const companyVision = ref("");

export interface ServiceItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  imageName?: string;
}

export interface ProjectItem {
  id?: string | number;
  title: string;
  location?: string;
  category?: string;
  status?: string;
  photo?: string;
  photoName?: string;
  description?: string;
}

export interface CulturePhotoItem {
  id?: string | number;
  caption: string;
  image: string;
  imageName?: string;
}

export interface TeamMemberItem {
  id?: string | number;
  name: string;
  role?: string;
  experience?: string;
  photo?: string;
  photoName?: string;
}

export interface AchievementItem {
  id?: string | number;
  title: string;
  value: string;
  description?: string;
}

export interface ReviewItem {
  id?: string | number;
  name: string;
  designation?: string;
  rating?: string;
  text: string;
  author?: string;
}

export interface CompanyUpdateItem {
  id?: string | number;
  type?: string;
  title: string;
  content?: string;
  date?: string;
}

const services = ref<ServiceItem[]>([]);
const culturePhotos = ref<CulturePhotoItem[]>([]);
const projects = ref<ProjectItem[]>([]);
const teamMembers = ref<TeamMemberItem[]>([]);
const achievements = ref<AchievementItem[]>([]);
const clientFeedback = ref<ReviewItem[]>([]);
const companyUpdates = ref<CompanyUpdateItem[]>([]);

/* -------------------------------------------------------------
   DEDICATED ADD SERVICE MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showServiceModal = ref(false);

const serviceForm = ref({
  title: "",
  description: "",
  image: "",
  imageName: "",
});

const serviceFileInput = ref<HTMLInputElement | null>(null);

function openAddServiceModal() {
  serviceForm.value = {
    title: "",
    description: "",
    image: "",
    imageName: "",
  };
  showServiceModal.value = true;
}

function closeServiceModal() {
  showServiceModal.value = false;
  serviceForm.value = {
    title: "",
    description: "",
    image: "",
    imageName: "",
  };
  if (serviceFileInput.value) {
    serviceFileInput.value.value = "";
  }
}

function triggerServiceImageUpload() {
  serviceFileInput.value?.click();
}

function handleServiceImageChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    serviceForm.value.imageName = file.name;
    serviceForm.value.image = URL.createObjectURL(file);
  }
}

function removeServiceImage() {
  serviceForm.value.image = "";
  serviceForm.value.imageName = "";
  if (serviceFileInput.value) {
    serviceFileInput.value.value = "";
  }
}

function saveService() {
  if (!serviceForm.value.title.trim()) return;
  services.value.push({
    id: Date.now(),
    title: serviceForm.value.title.trim(),
    description: serviceForm.value.description.trim(),
    image: serviceForm.value.image,
    imageName: serviceForm.value.imageName,
  });
  closeServiceModal();
}

function removeService(index: number) {
  services.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED ADD PROJECT MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showProjectModal = ref(false);

const projectForm = ref({
  title: "",
  location: "",
  category: "General",
  status: "Completed",
  photo: "",
  photoName: "",
  description: "",
});

const projectFileInput = ref<HTMLInputElement | null>(null);

function openAddProjectModal() {
  projectForm.value = {
    title: "",
    location: "",
    category: "General",
    status: "Completed",
    photo: "",
    photoName: "",
    description: "",
  };
  showProjectModal.value = true;
}

function closeProjectModal() {
  showProjectModal.value = false;
  projectForm.value = {
    title: "",
    location: "",
    category: "General",
    status: "Completed",
    photo: "",
    photoName: "",
    description: "",
  };
  if (projectFileInput.value) {
    projectFileInput.value.value = "";
  }
}

function triggerProjectPhotoUpload() {
  projectFileInput.value?.click();
}

function handleProjectPhotoChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    projectForm.value.photoName = file.name;
    projectForm.value.photo = URL.createObjectURL(file);
  }
}

function removeProjectPhoto() {
  projectForm.value.photo = "";
  projectForm.value.photoName = "";
  if (projectFileInput.value) {
    projectFileInput.value.value = "";
  }
}

function saveProject() {
  if (!projectForm.value.title.trim()) return;
  projects.value.push({
    id: Date.now(),
    title: projectForm.value.title.trim(),
    location: projectForm.value.location.trim(),
    category: projectForm.value.category,
    status: projectForm.value.status,
    photo: projectForm.value.photo,
    photoName: projectForm.value.photoName,
    description: projectForm.value.description.trim(),
  });
  closeProjectModal();
}

function removeProject(index: number) {
  projects.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED ADD CULTURE PHOTO MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showCultureModal = ref(false);

const cultureForm = ref({
  caption: "",
  image: "",
  imageName: "",
});

const cultureFileInput = ref<HTMLInputElement | null>(null);

function openAddCultureModal() {
  cultureForm.value = {
    caption: "",
    image: "",
    imageName: "",
  };
  showCultureModal.value = true;
}

function closeCultureModal() {
  showCultureModal.value = false;
  cultureForm.value = {
    caption: "",
    image: "",
    imageName: "",
  };
  if (cultureFileInput.value) {
    cultureFileInput.value.value = "";
  }
}

function triggerCulturePhotoUpload() {
  cultureFileInput.value?.click();
}

function handleCulturePhotoChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    cultureForm.value.imageName = file.name;
    cultureForm.value.image = URL.createObjectURL(file);
  }
}

function removeCultureFormImage() {
  cultureForm.value.image = "";
  cultureForm.value.imageName = "";
  if (cultureFileInput.value) {
    cultureFileInput.value.value = "";
  }
}

function saveCulturePhoto() {
  if (!cultureForm.value.caption.trim() && !cultureForm.value.image) return;
  culturePhotos.value.push({
    id: Date.now(),
    caption: cultureForm.value.caption.trim() || "Culture Photo",
    image: cultureForm.value.image,
    imageName: cultureForm.value.imageName,
  });
  closeCultureModal();
}

function removeCulturePhoto(index: number) {
  culturePhotos.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED ADD TEAM MEMBER MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showTeamModal = ref(false);

const teamForm = ref({
  name: "",
  role: "",
  experience: "",
  photo: "",
  photoName: "",
});

const teamFileInput = ref<HTMLInputElement | null>(null);

function openAddTeamMemberModal() {
  teamForm.value = {
    name: "",
    role: "",
    experience: "",
    photo: "",
    photoName: "",
  };
  showTeamModal.value = true;
}

function closeTeamModal() {
  showTeamModal.value = false;
  teamForm.value = {
    name: "",
    role: "",
    experience: "",
    photo: "",
    photoName: "",
  };
  if (teamFileInput.value) {
    teamFileInput.value.value = "";
  }
}

function triggerTeamPhotoUpload() {
  teamFileInput.value?.click();
}

function handleTeamPhotoChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    teamForm.value.photoName = file.name;
    teamForm.value.photo = URL.createObjectURL(file);
  }
}

function removeTeamPhoto() {
  teamForm.value.photo = "";
  teamForm.value.photoName = "";
  if (teamFileInput.value) {
    teamFileInput.value.value = "";
  }
}

function saveTeamMember() {
  if (!teamForm.value.name.trim()) return;
  teamMembers.value.push({
    id: Date.now(),
    name: teamForm.value.name.trim(),
    role: teamForm.value.role.trim(),
    experience: teamForm.value.experience.trim(),
    photo: teamForm.value.photo,
    photoName: teamForm.value.photoName,
  });
  closeTeamModal();
}

function removeTeamMember(index: number) {
  teamMembers.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED ADD ACHIEVEMENT METRIC MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showAchievementModal = ref(false);

const achievementForm = ref({
  title: "",
  value: "",
});

function openAddAchievementModal() {
  achievementForm.value = {
    title: "",
    value: "",
  };
  showAchievementModal.value = true;
}

function closeAchievementModal() {
  showAchievementModal.value = false;
  achievementForm.value = {
    title: "",
    value: "",
  };
}

function saveAchievement() {
  if (!achievementForm.value.title.trim() || !achievementForm.value.value.trim()) return;
  achievements.value.push({
    id: Date.now(),
    title: achievementForm.value.title.trim(),
    value: achievementForm.value.value.trim(),
  });
  closeAchievementModal();
}

function removeAchievement(index: number) {
  achievements.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED ADD CLIENT REVIEW MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showReviewModal = ref(false);

const reviewForm = ref({
  name: "",
  designation: "",
  rating: "5 Stars ★★★★★",
  text: "",
});

function openAddReviewModal() {
  reviewForm.value = {
    name: "",
    designation: "",
    rating: "5 Stars ★★★★★",
    text: "",
  };
  showReviewModal.value = true;
}

function closeReviewModal() {
  showReviewModal.value = false;
  reviewForm.value = {
    name: "",
    designation: "",
    rating: "5 Stars ★★★★★",
    text: "",
  };
}

function saveReview() {
  if (!reviewForm.value.name.trim() || !reviewForm.value.text.trim()) return;
  clientFeedback.value.push({
    id: Date.now(),
    name: reviewForm.value.name.trim(),
    designation: reviewForm.value.designation.trim(),
    rating: reviewForm.value.rating,
    text: reviewForm.value.text.trim(),
    author: reviewForm.value.name.trim(),
  });
  closeReviewModal();
}

function removeFeedback(index: number) {
  clientFeedback.value.splice(index, 1);
}

/* -------------------------------------------------------------
   DEDICATED POST COMPANY UPDATE MODAL STATE & ACTIONS
------------------------------------------------------------- */
const showUpdateModal = ref(false);

const updateForm = ref({
  title: "",
  content: "",
});

function openAddUpdateModal() {
  updateForm.value = {
    title: "",
    content: "",
  };
  showUpdateModal.value = true;
}

function closeUpdateModal() {
  showUpdateModal.value = false;
  updateForm.value = {
    title: "",
    content: "",
  };
}

function publishUpdate() {
  if (!updateForm.value.title.trim() || !updateForm.value.content.trim()) return;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  companyUpdates.value.unshift({
    id: Date.now(),
    type: "Announcement",
    title: updateForm.value.title.trim(),
    content: updateForm.value.content.trim(),
    date: dateFormatted,
  });
  closeUpdateModal();
}

function removeUpdate(index: number) {
  companyUpdates.value.splice(index, 1);
}

/* -------------------------------------------------------------
   GENERIC MODAL DIALOG INTERACTIVITY (For other sections)
------------------------------------------------------------- */
type ModalType =
  | "about"
  | "mission"
  | "vision"
  | "culture"
  | "project"
  | "team"
  | "achievement"
  | "feedback"
  | "update"
  | null;

const activeModal = ref<ModalType>(null);
const modalInputValue = ref("");

function openModal(type: ModalType) {
  activeModal.value = type;
  if (type === "about") modalInputValue.value = companyAbout.value;
  else if (type === "mission") modalInputValue.value = companyMission.value;
  else if (type === "vision") modalInputValue.value = companyVision.value;
  else modalInputValue.value = "";
}

const modalTitle = computed(() => {
  switch (activeModal.value) {
    case "about": return "Add Company Description";
    case "mission": return "Add Company Mission";
    case "vision": return "Add Company Vision";
    case "culture": return "Add Culture Photo URL";
    case "project": return "Add Work Showcase Project";
    case "team": return "Add Team Member Name & Role";
    case "achievement": return "Add Milestone or Recognition";
    case "feedback": return "Add Client Testimonial";
    case "update": return "Add Company Announcement";
    default: return "Add Content";
  }
});

const modalFieldLabel = computed(() => {
  switch (activeModal.value) {
    case "about": return "Detailed About Information";
    case "mission": return "Mission Statement";
    case "vision": return "Vision Statement";
    case "culture": return "Image URL";
    case "project": return "Project Title";
    case "team": return "Full Name";
    case "achievement": return "Milestone Title";
    case "feedback": return "Client Feedback Quote";
    case "update": return "Announcement Title";
    default: return "Content";
  }
});

const modalPlaceholder = computed(() => {
  switch (activeModal.value) {
    case "about": return "Write about your company history, values and solutions...";
    case "mission": return "e.g. Empowering modern businesses with top engineering...";
    case "vision": return "e.g. To be the premier digital engineering studio...";
    case "culture": return "https://example.com/photo.jpg";
    case "project": return "e.g. Global FinTech Platform Migration";
    case "team": return "e.g. Sarah Jenkins (Lead Architect)";
    case "achievement": return "e.g. Top 10 B2B Software Provider 2026";
    case "feedback": return "e.g. WebArtifacts delivered exceptional engineering speed and quality.";
    case "update": return "e.g. WebArtifacts Expands to New Innovation Hub";
    default: return "Enter details...";
  }
});

function saveModalData() {
  const val = modalInputValue.value.trim();
  if (!val) {
    activeModal.value = null;
    return;
  }

  if (activeModal.value === "about") {
    companyAbout.value = val;
  } else if (activeModal.value === "mission") {
    companyMission.value = val;
  } else if (activeModal.value === "vision") {
    companyVision.value = val;
  } else if (activeModal.value === "culture") {
    culturePhotos.value.push({ id: Date.now(), caption: "Company Culture", image: val });
  } else if (activeModal.value === "project") {
    projects.value.push({ id: Date.now(), title: val, description: "Delivered scalable production architecture." });
  } else if (activeModal.value === "team") {
    teamMembers.value.push({ id: Date.now(), name: val, role: "Core Team Member" });
  } else if (activeModal.value === "achievement") {
    achievements.value.push({ id: Date.now(), title: val, value: "100+", description: "Industry recognition." });
  } else if (activeModal.value === "feedback") {
    clientFeedback.value.push({ id: Date.now(), name: "Verified Client", designation: "Partner", rating: "5 Stars ★★★★★", text: val, author: "Verified Client" });
  } else if (activeModal.value === "update") {
    companyUpdates.value.unshift({ id: Date.now(), type: "Announcement", title: val, content: "Company announcement details.", date: "Just now" });
  }

  activeModal.value = null;
  modalInputValue.value = "";
}
</script>