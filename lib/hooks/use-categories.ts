"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/lib/services/categories.service";
import type { CreateCategoryInput } from "@/lib/types/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (slug: string) => deleteCategory(slug),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });
  }