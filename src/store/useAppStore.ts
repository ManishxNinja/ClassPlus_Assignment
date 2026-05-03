"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TemplateCategory } from "@/types/template";

type AuthMethod = "google" | "email" | "guest";

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

interface AppState {
  hydrated: boolean;
  isAuthenticated: boolean;
  authMethod: AuthMethod | null;
  profile: Profile | null;
  isPremium: boolean;
  selectedCategory: TemplateCategory | "All";
  pendingTemplateId: string | null;
  editor: EditorSettings;
  setHydrated: (hydrated: boolean) => void;
  login: (method: AuthMethod) => void;
  logout: () => void;
  setProfile: (profile: Profile) => void;
  setPremium: (value: boolean) => void;
  setSelectedCategory: (category: TemplateCategory | "All") => void;
  setPendingTemplateId: (templateId: string | null) => void;
  setEditor: (editor: Partial<EditorSettings>) => void;
  resetEditor: () => void;
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
      setHydrated: (hydrated) => set({ hydrated }),
      login: (method) =>
        set({
          isAuthenticated: true,
          authMethod: method,
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
      }),
    },
  ),
);

