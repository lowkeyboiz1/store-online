"use client"

import { atom } from "jotai"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export const cartAtom = atom<CartItem[]>([])
