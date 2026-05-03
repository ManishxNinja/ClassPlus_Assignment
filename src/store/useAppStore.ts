"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GreetingTemplate } from "@/types/template";
import { TemplateCategory } from "@/types/template";

type AuthMethod = "email";

interface Profile {
  name: string;
  imageDataUrl: string;
}

interface EditorSettings {
  textX: number;
  textY: number;
  textSize: number;
  photoX: number;
  photoY: number;
  photoSize: number;
}

const MAX_USER_TEMPLATES = 12;

interface AppState {
  hydrated: boolean;
  isAuthenticated: boolean;
  authMethod: AuthMethod | null;
  profile: Profile | null;
  isPremium: boolean;
  selectedCategory: TemplateCategory | "All";
  pendingTemplateId: string | null;
  editor: EditorSettings;
  /** User-uploaded backgrounds (stored as data URLs in localStorage). */
  userTemplates: GreetingTemplate[];
  setHydrated: (hydrated: boolean) => void;
  login: () => void;
  logout: () => void;
  setProfile: (profile: Profile) => void;
  setPremium: (value: boolean) => void;
  setSelectedCategory: (category: TemplateCategory | "All") => void;
  setPendingTemplateId: (templateId: string | null) => void;
  setEditor: (editor: Partial<EditorSettings>) => void;
  resetEditor: () => void;
  addUserTemplate: (template: GreetingTemplate) => void;
  removeUserTemplate: (id: string) => void;
}

const defaultEditor: EditorSettings = {
  textX: 540,
  textY: 910,
  textSize: 56,
  photoX: 540,
  photoY: 270,
  photoSize: 260,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hydrated: false,
      isAuthenticated: false,
      authMethod: null,
      profile: null,
      isPremium: false,
      selectedCategory: "All",
      pendingTemplateId: null,
      editor: defaultEditor,
      userTemplates: [],
      setHydrated: (hydrated) => set({ hydrated }),
      login: () =>
        set({
          isAuthenticated: true,
          authMethod: "email",
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          authMethod: null,
          profile: null,
          isPremium: false,
          pendingTemplateId: null,
          editor: defaultEditor,
        }),
      setProfile: (profile) => set({ profile }),
      setPremium: (value) => set({ isPremium: value }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setPendingTemplateId: (templateId) => set({ pendingTemplateId: templateId }),
      setEditor: (editor) =>
        set((state) => ({
          editor: {
            ...state.editor,
            ...editor,
          },
        })),
      resetEditor: () => set({ editor: defaultEditor }),
      addUserTemplate: (template) =>
        set((state) => {
          const next = [...state.userTemplates.filter((t) => t.id !== template.id), template];
          const trimmed =
            next.length > MAX_USER_TEMPLATES ? next.slice(next.length - MAX_USER_TEMPLATES) : next;
          return { userTemplates: trimmed };
        }),
      removeUserTemplate: (id) =>
        set((state) => ({
          userTemplates: state.userTemplates.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "custom-greetings-app-store",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        authMethod: state.authMethod,
        profile: state.profile,
        isPremium: state.isPremium,
        selectedCategory: state.selectedCategory,
        userTemplates: state.userTemplates,
      }),
    },
  ),
);

