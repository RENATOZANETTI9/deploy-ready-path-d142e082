import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "legal-e-viver-progress";

interface FormData {
  cpf: string;
  pixType: string;
  pixKey: string;
  proposals: any[];
}

interface ProgressData {
  currentStep: number;
  formData: FormData;
  lastUpdated: string;
}

const defaultFormData: FormData = {
  cpf: "",
  pixType: "",
  pixKey: "",
  proposals: [],
};

export const useProgressStorage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadProgress = useCallback((): ProgressData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as ProgressData;
        // Verifica se os dados não são muito antigos (24 horas)
        const lastUpdated = new Date(data.lastUpdated);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          return data;
        } else {
          // Dados expirados, limpa o storage
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    }
    return null;
  }, []);

  const saveProgress = useCallback((currentStep: number, formData: FormData) => {
    try {
      const data: ProgressData = {
        currentStep,
        formData,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  }, []);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar progresso:", error);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return {
    loadProgress,
    saveProgress,
    clearProgress,
    isLoaded,
    defaultFormData,
  };
};
