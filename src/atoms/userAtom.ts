"use client"

import { atom } from "jotai"

export const userAtom = atom<{ id: string; name: string; email: string } | null>(null)
