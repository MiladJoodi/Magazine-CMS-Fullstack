"use client"

import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../services/authors.service";

export function useAuthors() {
    return useQuery({
      queryKey: ["authors"],
      queryFn: getAuthors,
    });
  }