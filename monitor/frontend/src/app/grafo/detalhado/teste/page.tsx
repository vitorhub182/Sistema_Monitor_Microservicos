"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import span from '@/app/grafo/detalhado/teste/datateste.json' 


const Home = () => {

  return (
    <Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right" className="w-[800px] sm:w-[800px]">
    <SheetHeader>
      <SheetTitle>Dados do Span</SheetTitle>
      <SheetDescription>
      <pre>{JSON.stringify(span, null, 2)}</pre>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  );
};

export default Home;